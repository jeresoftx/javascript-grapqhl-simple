const mutationDeleteRole = `
  mutation deleteRole(
    $id: ID!
  ) {
    deleteRole(
      id: $id
    )
  }`;

module.exports = { mutationDeleteRole };
