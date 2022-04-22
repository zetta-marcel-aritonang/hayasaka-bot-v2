const GuildModel = require('./guild.model');

const subscribeChannel = async (guild_id, channel_id) => {
  const guild = await GuildModel.findOne({ guild_id });
  if (guild) {
    guild.channel_id = channel_id;
    guild.save();
    console.log(`Updated guild ${guild._id} to db`);
  } else {
    const newGuild = await GuildModel.create({
      guild_id,
      channel_id,
      is_subscribe: true,
    });
    console.log(`Saved guild ${newGuild._id} to db`);
  }
}

module.exports = {
  subscribeChannel,
}