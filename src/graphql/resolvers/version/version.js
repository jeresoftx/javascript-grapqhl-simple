const pjson = require('../../../../package.json');

module.exports = async () => {
  const { name, description, version } = pjson;

  return `${name} - ${version} ${description}`;
};
