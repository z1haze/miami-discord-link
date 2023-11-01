const {google} = require('googleapis');
const crypto = require('crypto');

const { googleOAuthClient } =  require('../../../../google');
const {discordOAuthClient} = require('../../../../discord');

module.exports = async (req, res, next) => {
  const {code} = req.query;

  if (!code) {
    return res.redirect('/');
  }

  try {
    const { tokens } = await googleOAuthClient.getToken(code);

    googleOAuthClient.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: googleOAuthClient,
      version: 'v2'
    });

    const { data } = await oauth2.userinfo.get();

    req.session.hd = data.hd;
    req.session.name = data.name;
    req.session.email = data.email;
    req.session.verified = data.verified_email;
  } catch(err) {
    res.redirect('/');
  }

  // forward them to discord after a successful login to google
  const authUrl = discordOAuthClient.generateAuthUrl({
    scope: ['identify', 'guilds', 'guilds.join'],
    state: crypto.randomBytes(16).toString("hex")
  });

  res.redirect(authUrl);
};
