const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

// login page
router.get('/sessions/new', (req, res) => {
  res.render('sessions/new.ejs')
})

//login function // directs to seed
router.post('/sessions', (req, res) => {
  User.findOne({username:req.body.username}, (error, foundUser) => {
    if(foundUser === null){
      res.redirect('/sessions/new');
    } else {
      const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
      if(doesPasswordMatch){
        req.session.username = foundUser.username;
        res.redirect('/tea');
      } else {
        res.redirect('sessions/new')
      }
    }
  });
});



module.exports = router;
