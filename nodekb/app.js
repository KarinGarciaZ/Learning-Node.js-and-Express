const express =  require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

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
let Movie = require('./models/movie');

//load view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

//parse aplication and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Express messages Middleware
app.use(require('connect-flash')());
app.use( (req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express validator middleware
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    var namespace = param.split('.'),
    root = namespace.shift()
    formParam = root;
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

//home route
app.get('/', (req, res) => { 
  res.render('index');
});

//Route files
let articles = require('./routes/articles');
app.use('/articles', articles);
let movies = require('./routes/movies');
app.use('/movies', movies);
 
//start server
app.listen(2999, () => {
  console.log('Server started on port 2999');
});