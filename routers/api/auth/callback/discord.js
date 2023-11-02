const {discordOAuthClient} = require('../../../../discord');

module.exports = async (req, res, next) => {
  const {code} = req.query;

  if (!code) {
    return res.redirect('/');
  }

  try {
    const {access_token} = await discordOAuthClient.tokenRequest({
      code,
      grantType: 'authorization_code'
    });

    const user = await discordOAuthClient.getUser(access_token);

    await discordOAuthClient.addMember({
      accessToken: access_token,
      botToken: process.env.DISCORD_BOT_TOKEN,
      guildId: process.env.DISCORD_GUILD_ID,
      userId: user.id,
      nickname: `${req.user.name} [${req.user.studentId}]`,
      roles: [process.env.DISCORD_VERIFIED_ROLE_ID]
    });

    res.send("You've been successfully added to the discord!");
  } catch (err) {
    console.error(err);

    res.redirect('/');
  }
};
