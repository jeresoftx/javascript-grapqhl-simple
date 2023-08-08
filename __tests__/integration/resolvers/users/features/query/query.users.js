const queryUsers = `
  query users($params: ParamsInput!) {
    users(params: $params) {
      fullName
    }
  }`;

module.exports = { queryUsers };
