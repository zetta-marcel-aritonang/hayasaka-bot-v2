require('dotenv').config();
const fs = require('fs');
const csv = require('csvtojson');
const mongoose = require('mongoose');
const AnimeModel = require('../res/anime/anime.model');

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);
const db = mongoose.connection;
db.on('open', () => console.log('Connected to mongodb'));

// node scripts/importSchedule
const importSchedule = async () => {
  const csvData = fs.readFileSync('./scripts/anime-23-04-2022-comma.csv');
  let parsedResult = await csv({
    delimiter: ',',
    headers: [
      'title',
      'aired_day',
      'aired_time',
      'season',
      'year',
      'link',
    ]
  }).fromString(csvData.toString());

  for (const anime of parsedResult) {
    await AnimeModel.create(anime);
  }
  console.log('Succesfully import schedules into database');
}

importSchedule();