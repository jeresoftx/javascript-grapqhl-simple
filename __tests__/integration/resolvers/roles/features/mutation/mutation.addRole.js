const mutationAddRole = `
  mutation addRole(
    $name: NonEmptyString!
    $description: NonEmptyString!
    $permissions: [PermissionInput]
  ) {
    addRole(
      name: $name
      description: $description
      permissions: $permissions
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

module.exports = { mutationAddRole };
