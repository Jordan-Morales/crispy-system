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

router.get('/brews/tea/new', (req, res) => {
  if (req.session.username) {
    User.find({username: req.session.username}, (error, foundUser) => {
      res.render('./brews/new.ejs', {
        brewUser: foundUser
      })
    })
  } else {
    res.redirect('/')
  }
});
//individual create new page
router.post('/brews/tea/new', (req, res) => {
  if (req.session.username) {
    User.find({username: req.session.username}, (error, thisUser) => {
      console.log(thisUser);
      let userFavs = thisUser[0].favs;
      userFavs.push(req.body);
      thisUser[0].save((err, data) => {
        res.redirect('/brews/');
      });
    });
  } else {
    res.redirect('/')
  }
})


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

//allows edits of the individual tea
router.get('/brews/tea/:id/edit', (req, res) => {
  if (req.session.username) {
    User.findOne({'favs._id' : req.params.id}, (error, foundUser) => {
      let userFavs = foundUser.favs;
      let userTeaFound = userFavs.filter(userTea => userTea.id === req.params.id);
      // console.log(userTeaFound);
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
    // console.log(foundUser);
  let userFavs = foundUser.favs;
  let userTeaFound = userFavs.findIndex(userTea => userTea.id === req.params.id);
  // console.log(userTeaFound);
  userFavs.splice(userTeaFound, 1);
  userFavs.push(req.body);
  foundUser.save((err, data) => {
      res.redirect('/brews/');
    });
    });
});




router.delete('/brews/tea/:id', (req, res) => {
  User.findOne({'favs._id' : req.params.id}, (error, foundUser) => {
    // console.log(foundUser);
  let userFavs = foundUser.favs;
  let userTeaFound = userFavs.findIndex(userTea => userTea.id === req.params.id);
  // console.log(userTeaFound);
  userFavs.splice(userTeaFound, 1);
    foundUser.save((err, data) => {
      res.redirect('/brews/');
    });
    });
});
//didn't work
// router.delete('/brews/tea/:id', (req, res) => {
//   Tea.deleteOne(req.params.id, (err, data) => {
//     res.redirect('/brews/tea')
//   });
// });
//didn't work
// router.delete('/brews/tea/:id', (req, res) => {
//   User.findOne({'favs._id' : req.params.id}, (error, foundUser) => {
//     let userFavs = foundUser.favs;
//     let userTeaFound = userFavs.filter(userTea => userTea.id === req.params.id);
//     userFavs.shift(userTeaFound).join;
//     // User.deleteOne(userTeaFound);
//     res.redirect('/brews')
//   });
// });

module.exports = router;
