const express = require('express');
const router = express.Router();

//Bring in models
let Anime = require('../models/anime');

router.get('/all', (req, res) => {
  Anime.find({}, (err, animes) => {
    if (err) console.log('errs: ', err);    
    else {
      res.render('allAnimes', {
        animes: animes
      });
    }    
  });  
});

router.get('/add', (req, res) => {
  res.render('addAnime');
});

router.post('/add', (req, res) => {
  let anime = new Anime();
  anime.name = req.body.name;
  anime.caps = req.body.caps;

  anime.save();
})

module.exports = router;