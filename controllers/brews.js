const express = require('express');
const router = express.Router();
const Tea = require('../models/tea.js');
const User = require('../models/users.js');


//brew pathway
router.get('/brews', (req, res) => {
  if (req.session.username) {
    res.render('./brews/index.ejs')
  } else {
    res.redirect('/')
}
});


module.exports = router;
