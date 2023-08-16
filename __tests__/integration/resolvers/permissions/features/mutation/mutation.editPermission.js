const mutationEditPermission = `
  mutation editPermission(
    $id: ID!
    $name: NonEmptyString!
    $description: NonEmptyString!
  ) {
    editPermission(
      id: $id
      name: $name
      description: $description
    ) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }`;

module.exports = { mutationEditPermission };
