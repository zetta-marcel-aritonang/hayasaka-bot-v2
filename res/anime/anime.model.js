const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  aired_time: { type: String, default: '' },
  aired_day: { type: Number, default: 0 },
  season: { type: Number, default: 0 },
  year: { type: Number, default: 0 },
  link: { type: String, default: '' },
});

module.exports = mongoose.model('anime', animeSchema);