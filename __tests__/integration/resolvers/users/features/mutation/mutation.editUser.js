const mutationEditUser = `
  mutation editUser(
    $id: ID!
    $name: NonEmptyString!
    $lastName: NonEmptyString!
  ) {
    editUser(
      id: $id
      name: $name
      lastName: $lastName
    ) {
      id
      name
      lastName
      fullName
    }
  }`;

module.exports = { mutationEditUser };
