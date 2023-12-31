const Token = require('../../../models/token');

const logout = async (parent, data, context) => {
  if (context?.isAuth) {
    const token = await Token.findOne({
      token: context.token,
      active: true,
    }).exec();
    if (token) {
      token.active = false;
      await token.save();
    }
  }

  return true;
};

module.exports = { logout };
