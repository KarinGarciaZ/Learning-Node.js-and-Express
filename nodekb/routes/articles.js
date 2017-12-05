const express = require('express');
const router = express.Router();

//Bring in models
let Article = require('../models/article');

//add route
router.get('/all', (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) console.log('errs: ', err);    
    else {
      res.render('allArticles', {
        titleA: 'Articles',
        articles: articles
      });
    }    
  });   
});

//add route
router.get('/add', (req, res) => {
  res.render('add', {
    title: 'Add Article'
  });
});

//Add submit Post route
router.post('/add', (req, res) => {
  
  req.checkBody('title', 'Title is required.').notEmpty();
  req.checkBody('author', 'Author is required.').notEmpty();
  req.checkBody('body', 'Body is required.').notEmpty();

  //Get errors
  let errors = req.validationErrors();
  if (errors) {
    res.render('add', {
      title: 'Add Article',
      errors: errors
    });
  } else {    
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save( err => {
      if(err) console.log('errf: ', err);
      else {
        req.flash('success', 'Article Added');
        res.redirect('/');
      }
    });
  }
});

//Update submit Post route
router.post('/edit/:id', (req, res) => {
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {_id:req.params.id}

  Article.update(query, article, err => {
    if(err) console.log('errf: ', err);
    else {
      req.flash('success', 'Article Updated');
      res.redirect('/');
    }
  });
});

//Load edit article
router.get('/edit/:id', (req, res) => {
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

//Get single article
router.get('/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (err) console.log('errd: ', err);
    else {
      res.render('article', {
        article: article
      });
    }
  });
});

//Delete
router.delete('/:id', (req, res) => {
  let query = {_id:req.params.id}

  Article.remove(query, err => {
    if (err) console.log('err: ', err);    
    res.send('success');
  });
});

module.exports = router;