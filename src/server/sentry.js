/* eslint-disable import/no-extraneous-dependencies */
const Sentry = require('@sentry/node');

const sentryStart = ({ env, dsn, release }) => {
  Sentry.init({
    environment: env,
    release,
    dsn,
    integrations: [new Sentry.Integrations.Http({ tracing: true })],
    beforeSend(event) {
      return event;
    },
    tracesSampleRate: 1.0,
  });

  const apolloServerSentryPlugin = {
    requestDidStart({ request, context }) {
      if (request.operationName) {
        // set the transaction Name if we have named queries
        context.transaction.setName(context.operation);
      }
      return {
        willSendResponse(rc) {
          // hook for transaction finished
          rc.context.transaction.finish();
        },
        executionDidStart() {
          return {
            willResolveField(rc) {
              // hook for each new resolver
              const span = rc.context.transaction.startChild({
                op: 'resolver',
                description: `${rc.info.parentType.name}.${rc.info.fieldName}`,
              });
              return () => {
                // this will execute once the resolver is finished
                span.finish();
              };
            },
          };
        },
        didResolveOperation(rc) {
          // eslint-disable-next-line no-param-reassign
          rc.context.tracker = rc.queryHash + Date.now();
        },
        didEncounterErrors(rc) {
          Sentry.withScope((scope) => {
            scope.addEventProcessor((event) => Sentry.Handlers.parseRequest(event, rc.request));

            const id = rc.context.userId;
            if (id) {
              scope.setUser({
                id,
                // ip_address: rc.context.req.ip,
              });
            }
            scope.setExtra('query', rc.request.query);
            scope.setExtra('variables', rc.request.variables);
            scope.setLevel('info');
            scope.setTags({
              graphqlName: rc.context.operation,
              userAgent: rc.context.userAgent,
              coremeter: rc.context.coreMeter,
            });

            rc.errors.forEach((error) => {
              const errorType = error.message.split('|')[0];

              if (
                errorType !== 'WARNING'
                && error.path
                && !error.stack.includes('Handleerror')
              ) {
                scope.setExtras({
                  path: error.path,
                  source: rc.source,
                });
                Sentry.captureException(error);
              } else {
                scope.setExtras({});
                Sentry.captureMessage(`GraphQLWrongQuery: ${error.message}`);
              }
            });
          });
        },
      };
    },
  };
  return apolloServerSentryPlugin;
};

module.exports = { sentryStart };
