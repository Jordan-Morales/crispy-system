const express = require('express');
const router = express.Router();
const Tea = require('../models/tea.js');
const User = require('../models/users.js');



//brew pathway
router.get('/brews/', (req, res) => {
  if (req.session.username) {
    User.find({username: req.session.username}, (error, thisUser) => {
      res.render('./brews/index.ejs', {
        brewUser: thisUser
      })
    })
  } else {
    res.redirect('/')
  }
});

router.get('/brews/tea/:id', (req, res) => {
  if (req.session.username) {
    User.findOne({'favs._id' : req.params.id}, (error, foundUser) => {
      let userFavs = foundUser.favs;
      //filter goes through as a for each loop userTea pulls an object out of the array, then userTea._id looks for an element that matches req.params.id
      let userTeaFound = userFavs.filter(userTea => userTea.id === req.params.id);
      res.render('./brews/show.ejs', {
        user: foundUser,
        tea: userTeaFound
      });
    });
  } else {
    res.redirect('/')
  }
});

router.get('/brews/tea/:id/edit', (req, res) => {
  if (req.session.username) {
    User.findOne({'favs._id' : req.params.id}, (error, foundUser) => {
      let userFavs = foundUser.favs;
      let userTeaFound = userFavs.filter(userTea => userTea.id === req.params.id);
      console.log(userTeaFound);
      res.render('brews/edit.ejs', {
        tea: userTeaFound
      });
    });
  } else {
    res.redirect('/')
  }
});

router.put('/brews/tea/:id', (req, res) => {
  User.findOne({'favs._id' : req.params.id}, (error, foundUser) => {
    console.log(err);
  let userTeaFound = userFavs.filter(userTea => userTea.id === req.params.id);
  Tea.findByIdAndUpdate(userTeaFound, req.body, {new:true}, (err, updatedModel) => {
    res.redirect('/brews/tea/' + updatedModel.id);
    });
  });
});


module.exports = router;
