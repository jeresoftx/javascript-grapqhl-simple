FROM mongo:6.0.25-rc0

COPY docker-entrypoint.sh /usr/local/bin/
COPY ./json /json

RUN ["chmod", "+x", "/usr/local/bin/docker-entrypoint.sh"]
ENTRYPOINT ["sh", "/usr/local/bin/docker-entrypoint.sh"]
