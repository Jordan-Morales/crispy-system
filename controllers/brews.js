const express = require('express');
const router = express.Router();
const Tea = require('../models/tea.js');
const User = require('../models/users.js');



//brew pathway
router.get('/brews/', (req, res) => {
  if (req.session.username) {
    User.find({username: req.session.username}, (error, thisUser) => {
        res.render('./brews/index.ejs', {
          brewUser: thisUser,
          currentUser: req.session.username
        })
    })
} else {
  res.redirect('/')
}
});


module.exports = router;
