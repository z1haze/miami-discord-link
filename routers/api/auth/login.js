const { googleOAuthClient} = require('../../../google');

module.exports = async (req, res, next) => {
  const authorizationUrl = googleOAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: process.env.GOOGLE_SCOPES.split(','),
    include_granted_scopes: true
  });

  res.redirect(authorizationUrl);
};
