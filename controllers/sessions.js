const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs')
})





module.exports = router;
