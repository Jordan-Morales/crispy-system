const express = require('express');
const router = express.Router();
const Tea = require('../models/tea.js');
const User = require('../models/users.js');

// Seed Data

router.get('/seed', (req, res) => {
  Tea.create(
    [
      {
        name: 'Assam',
        type: 'Black',
        origin: 'India'
      } , {
        name: 'Genmaicha',
        type: 'Green',
        origin: 'Japan'
      } , {
        name: 'Green Jade',
        type: 'Oolong',
        origin: 'Taiwan'
      } , {
        name: 'Emerald Oolong',
        type: 'Oolong',
        origin: 'Taiwan'
      } , {
        name: 'Dancing Dragon',
        type: 'Puerh',
        origin: 'Custom'
      } , {
        name: 'Dream Blend',
        type: 'Herbal',
        origin: 'Custom'
      } , {
        name: 'Dark Forest',
        type: 'Herbal',
        origin: 'Custom'
      }
    ],
    (err, data) => {
      res.redirect('/tea')
    }
  )
});

// Index Route

router.get('/tea', (req, res) => {
  if (req.session.username) {
    Tea.find({}, (error, allTeas) => {
      res.render('tea/index.ejs',
      {
        tea: allTeas
      });
    });
  } else {
    res.redirect('/')
}
});

// New Route

router.get('/tea/new', (req, res) => {
  if (req.session.username) {
    res.render('tea/new.ejs')
  } else {
    res.redirect('/')
}
});

router.post('/tea', (req, res) => {
  Tea.create(req.body, (err, newTea) => {
    res.redirect('/tea')
  });
});

//saving a tea to a user's profile
router.post('/addFav/:id', (req, res) => {
  User.find({username: req.session.username}, (err, foundUser) => {
    Tea.findById(req.params.id, (err, thisTea) => {
      Tea.create(thisTea, (err, userFavTea) => {
        console.log(foundUser);
        foundUser[0].favs.push(userFavTea);
        foundUser[0].save((err, data) => {
          res.redirect('/tea/')
        });
      });
    });
  });
});

// Show Route

router.get('/tea/:id', (req, res) => {
  if (req.session.username) {
    Tea.findById(req.params.id, (err, foundTea) => {
      res.render('tea/show.ejs' , {
        tea:foundTea
      })
    });
  } else {
    res.redirect('/')
}
});


// Edit Route

router.get('/tea/:id/edit', (req, res) => {
  if (req.session.username) {
    Tea.findById(req.params.id, (err, foundTea) => {
      res.render('tea/edit.ejs', {
        tea:foundTea
      });
    });
} else {
  res.redirect('/')
}
});

router.put('/tea/:id', (req, res) => {
  Tea.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect('/tea/' + updatedModel.id);
  });
});


// Delete Function
router.delete('/tea/:id', (req, res) => {
  Tea.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/tea')
  });
});



module.exports = router;
