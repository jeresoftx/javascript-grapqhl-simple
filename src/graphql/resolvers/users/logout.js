const Token = require('../../../models/token');

module.exports = async (parent, data, context) => {
  if (!context.isAuth) {
    throw new Error('Acceso denegado!');
  }

  const token = await Token.findOne({
    token: context.token,
    active: true,
  });
  if (token) {
    token.active = false;
    await token.save();
  }

  return true;
};
