const mutationLogin = `
  mutation login(
    $username: String!
    $password: String!
    $remember: Boolean
  ) {
    login(
      username: $username
      password: $password
      remember: $remember
    )
  }`;

module.exports = { mutationLogin };
