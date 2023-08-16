const mutationEditRole = `
  mutation editRole(
    $id: ID!
    $name: NonEmptyString!
    $description: NonEmptyString!
  ) {
    editRole(
      id: $id
      name: $name
      description: $description
    ) {
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

module.exports = { mutationEditRole };
