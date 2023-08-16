const mutationDeletePermission = `
  mutation deletePermission(
    $id: ID!
  ) {
    deletePermission(
      id: $id
    )
  }`;

module.exports = { mutationDeletePermission };
