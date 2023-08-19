const packageJson = require('../../../../package.json');

const versionQ = async () => {
  const { name, description, version } = packageJson;

  return `${name} - ${version} ${description}`;
};

module.exports = { versionQ };
