const queryUsers = `
  query users($params: paramsInput!) {
    users(params: $params) {
      fullName
    }
  }`;

module.exports = { queryUsers };
