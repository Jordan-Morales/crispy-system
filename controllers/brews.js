const express = require('express');
const router = express.Router();
const Tea = require('../models/tea.js');
const User = require('../models/users.js');



//brew pathway showing each users favorite brews, stored within their user model
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

// shows an individual tea
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

//allows edits of the individual tea, currently if the id still matches a global object it will update that too, current solution is a reseed at login.
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

//put route for tea edits
router.put('/brews/tea/:id', (req, res) => {
  User.findOne({'favs._id' : req.params.id}, (error, foundUser) => {
  let userFavs = foundUser.favs;
  let userTeaFound = userFavs.filter(userTea => userTea.id === req.params.id);
  Tea.findOneAndUpdate(userTeaFound, req.body, {new:true}, (err, updatedModel) => {
    userFavs.id(req.params.id).remove();
    userFavs.push(updatedModel);
    foundUser.save((err, data) => {
      res.redirect('/brews/tea/' + updatedModel.id);
    });
    });
  });
});


module.exports = router;
