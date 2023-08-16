const queryPermission = `
  query permission($id: ID!) {
    permission(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }`;

module.exports = { queryPermission };
