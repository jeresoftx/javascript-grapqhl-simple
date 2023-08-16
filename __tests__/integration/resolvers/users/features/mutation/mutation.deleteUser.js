const mutationDeleteUser = `
  mutation deleteUser(
    $id: ID!
  ) {
    deleteUser(
      id: $id
    )
  }`;

module.exports = { mutationDeleteUser };
