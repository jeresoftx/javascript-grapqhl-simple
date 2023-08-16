const mutationAddPermission = `
  mutation addPermission(
    $name: NonEmptyString!
    $description: NonEmptyString!
  ) {
    addPermission(
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

module.exports = { mutationAddPermission };
