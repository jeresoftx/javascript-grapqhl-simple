const queryRole = `
  query role($id: ID!) {
    role(id: $id) {
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

module.exports = { queryRole };
