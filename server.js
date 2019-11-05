//--------------------
// Dependencies
//--------------------
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
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
mongoose.connect( MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//--------------------
// Middleware
//--------------------
app.use(express.static('public'));

app.use(express.urlencoded( {extended: false} ));
app.use(methodOverride('_method'));

//--------------------
//Routes
//--------------------
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(PORT, () => {
  console.log("listening on port: ", PORT);
})