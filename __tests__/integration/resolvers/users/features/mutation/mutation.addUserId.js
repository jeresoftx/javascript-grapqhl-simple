const mutationAddUserId = `
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
      id
    }
  }`;

module.exports = { mutationAddUserId };
