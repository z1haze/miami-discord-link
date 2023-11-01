const DiscordOauth2 = require('discord-oauth2');

module.exports = {
  discordOAuthClient: new DiscordOauth2({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    redirectUri: process.env.APP_URL + process.env.DISCORD_REDIRECT_URL
  })
};
