const {discordOAuthClient} = require('../../../../discord');

module.exports = async (req, res, next) => {
  const {code} = req.query;

  if (!code) {
    return res.redirect('/');
  }

  try {
    const data = await discordOAuthClient.tokenRequest({
      code,
      grantType: 'authorization_code'
    });

    console.log(data.access_token);

    const user = await discordOAuthClient.getUser(data.access_token);

    await discordOAuthClient.addMember({
      accessToken: data.access_token,
      botToken: process.env.DISCORD_BOT_TOKEN,
      guildId: process.env.DISCORD_GUILD_ID,
      userId: user.id,
      nickname: `${req.user.name} [${req.user.studentId}]`,
      roles: [process.env.DISCORD_VERIFIED_ROLE_ID]
    });
  } catch (err) {
    console.error(err);
  }

  res.redirect('/');
};
