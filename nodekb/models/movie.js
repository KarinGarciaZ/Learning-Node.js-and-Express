let mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  price:{
    type: String,
    required: true,
  }
});

let Movie = module.exports = mongoose.model('Movie', movieSchema);