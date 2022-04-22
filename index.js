require('dotenv').config();
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');
const initCronJob = require('./cron');

const GuildUtility = require('./res/guild/guild.utilities');
const setCommands = require('./utils/commands');

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);
const db = mongoose.connection;
db.on('open', () => console.log('Connected to mongodb'));

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate',async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, channelId, guildId, channel } = interaction;

	if (commandName === 'remind_here') {
    await GuildUtility.subscribeChannel(guildId, channelId);
    await interaction.reply(`I will remind in channel #${channel.name}`);
  }
});

client.on('messageCreate', async message => {
  const subscribeCommand = /\/subscribe/;
  const isSubscribing = subscribeCommand.test(message.content);
  if (isSubscribing) {
    setCommands(message.guildId);
    await GuildUtility.subscribeChannel(message.guildId, message.channelId);
  }
  console.log('message', message.content);
});

client.on('error', console.log);

client.login(process.env.TOKEN);

// setup cron
initCronJob(client);

// client.guilds.cache.each(guild => {
//   guild.channels.cache.find()
// })