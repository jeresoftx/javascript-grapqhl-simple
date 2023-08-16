const queryPermissions = `
  query permissions($params: ParamsInput!) {
    permissions(params: $params) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }`;

module.exports = { queryPermissions };
