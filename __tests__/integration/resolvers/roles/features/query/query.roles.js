const queryRoles = `
  query roles($params: ParamsInput!) {
    roles(params: $params) {
      id
      name
      description
      permissions {
        id
        permission
      }
      createdAt
      updatedAt
    }
  }`;

module.exports = { queryRoles };
