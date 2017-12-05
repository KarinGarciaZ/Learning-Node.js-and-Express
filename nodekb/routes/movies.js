const express = require('express');
const router = express.Router();

//Bring in models
let Movie = require('../models/movie');

//add route
router.get('/all', (req, res) => {
  Movie.find({}, (err, movies) => {
    if (err) console.log('errs: ', err);    
    else {
      res.render('allMovies', {
        titleM: 'Movies',
        movies: movies
      });
    }    
  });  
});

router.get('/add', (req, res) => {
  res.render('addMovie');
});

router.post('/add', (req, res) => {
  // req.checkBody('title', 'The title is required.').notEmpty();
  // req.checkBody('type', 'The type is required').notEmpty();
  // req.checkBody('price', 'The price is required').notEmpty();

  let movie = new Movie();
  movie.title = req.body.title;
  movie.type = req.body.type;
  movie.price = req.body.price;

  movie.save( () => {
    res.redirect('/');
  })

})

module.exports = router;