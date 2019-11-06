//--------------------
// Dependencies
//--------------------
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session')
const db = mongoose.connection;
require('dotenv').config();
//--------------------
// PORT
//--------------------
const PORT = process.env.PORT
console.log(PORT);

//--------------------
// DATABASE
//--------------------
const MONGODB_URI= process.env.MONGODB_URI
mongoose.connect( MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//--------------------
// Middleware
//--------------------
// open public folder
app.use(express.static('public'));
//urlencoding false
app.use(express.urlencoded( {extended: false} ));
// opens method override function
app.use(methodOverride('_method'));
// open session
app.use(session({
  secret:'O6sLoDV18O',
  resave: false,
  saveUninitialized: false
}))

//--------------------
//Routes
//--------------------

//controllers
const teaController = require('./controllers/tea.js');
app.use(teaController);

const usersController = require('./controllers/users.js');
app.use(usersController);

const sessionsController = require('./controllers/sessions.js');
app.use(sessionsController);


//main loading page containing welcome message and links to login / signup
app.get('/', (req, res) => {
  res.render('home.ejs')
})

// Logout
app.delete('/destroy', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/')
    }
  })
})

//--------------------
//Listener
//--------------------
app.listen(PORT, () => {
  console.log("listening on port: ", PORT);
})
