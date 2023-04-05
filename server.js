//--------------------
// Dependencies
//--------------------
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session')
const db = mongoose.connection;
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
//--------------------
// PORT
//--------------------
const PORT = process.env.PORT;
console.log(PORT);

//--------------------
// DATABASE
//--------------------
const MONGODB_URI= process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
// ; MONGODB_URI, '||||', CLOUDINARY_URL
db.on('disconnected', () => console.log('mongo disconnected'));

//--------------------
// Cloudinary
//--------------------
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Server-side Image Uploader //
// cloudinary.uploader.upload("public/_.jpg",
// function(result) { console.log(result) })

//--------------------
// Middleware
//--------------------
// open public folder
app.use(express.static('public'));
//urlencoding false
app.use(express.urlencoded({extended: false}));
// opens method override function
app.use(methodOverride('_method'));
// open session
app.use(session({
    secret: 'O6sLoDV18O',
    resave: false,
    saveUninitialized: false
}));

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

const brewsController = require('./controllers/brews.js');
app.use(brewsController);


//main loading page containing welcome message and links to login / signup
app.get('/', (req, res) => {
    'use strict';
    res.render('home.ejs');
});

app.get('/about', (req, res) => {
    'use strict';
    res.render('about.ejs');
});

// Logout
app.delete('/destroy', (req, res) => {
    'use strict';
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});
//


//--------------------
//Listener
//--------------------
app.listen(PORT, () => {
    'use strict';
    console.log("listening on port: ", PORT);
});
