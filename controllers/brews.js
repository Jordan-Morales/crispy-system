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

router.get('/brews/tea/:id', (req, res) => {
    if (req.session.username) {
      User.findOne({'favs._id' : req.params.id}, (error, thisUserFavs) => {
        console.log(thisUserFavs);
        let thisFavs = thisUserFavs.favs;
        console.log(thisFavs);
        console.log(req.params.id);
        let index = thisFavs.indexOf(req.params.id);
        console.log(index);
          res.render('./brews/show.ejs', {
            tea: thisUserFavs,
            index: index
          })
      })
    } else {
      res.redirect('/')
    }
});


module.exports = router;
