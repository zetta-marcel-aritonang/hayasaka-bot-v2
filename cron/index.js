const { CronJob } = require('cron');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const AnimeModel = require('../res/anime/anime.model');
const GuildModel = require('../res/guild/guild.model');

const initCronJob = (client) => {
  const job = new CronJob('*/1 * * * *', () => {
    console.log('Cron triggered');
    const today = moment().utcOffset(8).day();
    const now = moment().utcOffset(8).format('HH:mm');
    client.guilds.cache.each(async guild => {
      const currentGuild = await GuildModel.findOne({
        guild_id: guild.id
      }).lean();
      if (!currentGuild) return;
      const channels = guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT');
      const channel = channels.find(({ id }) => currentGuild.channel_id === id) || channels.first();

      const animes = await AnimeModel.find({
        aired_day: today,
        aired_time: now,
        year: +process.env.YEAR,
        season: +process.env.SEASON,
      }).lean();
      let allEmbeds = [];
      for (const { title, link } of animes) {
        const animeEmbed = new MessageEmbed()
          .setColor('PURPLE')
          .setTitle(title)
          .setURL(link)
          .setDescription(`${title} new episode just release you can watch it at ${link}`)
          .setTimestamp();
        allEmbeds.push(animeEmbed);
      }

      if (allEmbeds?.length) {
        channel.send({ embeds: allEmbeds });
      }
    })
    console.log('Cron done');
  }, null, false, 'Asia/Makassar');
  job.start();
  console.log('Cron started');
}

module.exports = initCronJob;