const pjson = require('../../../../package.json');

const versionQ = async () => {
  const { name, description, version } = pjson;

  return `${name} - ${version} ${description}`;
};

module.exports = { versionQ };
