const express =  require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB.')
});

//Check errors
db.on('error', error => {
  console.log('errora: ', error);
  
});

//init app
const app = express();

//Bring in models
let Article = require('./models/article');

//load view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

//parse aplication and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//home route
app.get('/', (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) console.log('errs: ', err);    
    else {
      res.render('index', {
        title: 'Hello',
        articles: articles
      });
    }    
  });  
});

//Get single article
app.get('/article/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (err) console.log('errd: ', err);
    else {
      res.render('article', {
        article: article
      });
    }
  });
});

//add route
app.get('/articles/add', (req, res) => {
  res.render('add', {
    title: 'Add Article'
  });
});

//Add submit Post route
app.post('/articles/add', (req, res) => {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save( err => {
    if(err) console.log('errf: ', err);
    else res.redirect('/');
  });
});

//Update submit Post route
app.post('/articles/edit/:id', (req, res) => {
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {_id:req.params.id}

  Article.update(query, article, err => {
    if(err) console.log('errf: ', err);
    else res.redirect('/');
  });
});

//Load edit article
app.get('/article/edit/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (err) console.log('errg: ', err);
    else {
      res.render('edit_article', {
        title: 'Edit Article',
        article: article
      });
    }
  });
});


//start server
app.listen(2999, () => {
  console.log('Server started on port 2999');
});