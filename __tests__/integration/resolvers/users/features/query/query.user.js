const queryUser = `
  query user($id: ID!) {
    user(id: $id) {
      fullName
    }
  }`;

module.exports = { queryUser };
