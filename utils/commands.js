const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const setCommands = (guildId) => {
  const commands = [
    new SlashCommandBuilder().setName('remind_here').setDescription('Put anime reminder in this channel')
  ].map(command => command.toJSON());
  
  const rest = new REST({ version: '9'}).setToken(process.env.TOKEN);
  
  rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), 
    { body: commands }
  )
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
}

module.exports = setCommands;