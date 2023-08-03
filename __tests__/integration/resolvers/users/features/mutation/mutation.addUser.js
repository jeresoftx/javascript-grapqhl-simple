const mutationAddUser = `
  mutation addUser(
    $name: NonEmptyString!
    $lastName: NonEmptyString!
    $username: NonEmptyString!
    $email: EmailAddress!
    $phone: PhoneNumber!
    $password: String!
  ) {
    addUser(
      name: $name
      lastName: $lastName
      username: $username
      email: $email
      phone: $phone
      password: $password
    ) {
      fullName
    }
  }`;

module.exports = { mutationAddUser };
