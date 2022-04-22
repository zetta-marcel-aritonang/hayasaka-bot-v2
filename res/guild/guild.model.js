const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  guild_id: { type: String, default: '', index: true },
  channel_id: { type: String, default: '' },
  is_subscribe: { type: Boolean, default: false },
});

module.exports = mongoose.model('guild', guildSchema);