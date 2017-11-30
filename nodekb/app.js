const express =  require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB.')
});

//Check errors
db.on('error', error => {
  console.log('error: ', error);
  
});

//init app
const app = express();

//Bring in models
let Article = require('./models/article');

//load view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

//home route
app.get('/', (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) console.log('err: ', err);    
    else {
      res.render('index', {
        title: 'Hello',
        articles: articles
      });
    }    
  });  
});

//add route
app.get('/article/add', (req, res) => {
  res.render('add', {
    title: 'AddArticl'
  });
});


//start server
app.listen(2999, () => {
  console.log('Server started on port 2999');
});