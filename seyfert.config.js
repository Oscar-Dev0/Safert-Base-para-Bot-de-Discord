// @ts-check is better
const { config } = require('seyfert');
require("dotenv").config();

const token = process.env.BotToken;
if (!token) throw new Error("No token found in .env file");

module.exports = config.bot({
   token,
   intents: ["Guilds", "MessageContent", "GuildMembers", "GuildPresences"],
   "debug": true,
   locations: {
       base: "src",
       output: "dist", 
       commands: "commands",
       events: "events"
   }
});