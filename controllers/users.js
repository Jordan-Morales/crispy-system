const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js')

router.get('/users/new', (req, res) => {
  res.render('users/new.ejs');
});

router.post('/users', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (error, createdUser) => {
    req.session.username = createdUser.username
    res.redirect('/tea')
  })
})

module.exports = router;
