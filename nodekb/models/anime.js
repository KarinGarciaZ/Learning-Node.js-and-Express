let mongoose = require('mongoose');

let animeSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  caps:{
    type: Number,
    required: true
  }
});

let Anime = module.exports = mongoose.model('Anime', animeSchema);