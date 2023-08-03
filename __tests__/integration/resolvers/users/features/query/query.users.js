const queryUser = `
  query users($params: paramsInput!) {
    users(params: $params) {
      fullName
    }
  }`;

module.exports = { queryUser };
