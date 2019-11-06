const express = require('express');
const router = express.Router();
const Tea = require('../models/tea.js');

// Seed Data

router.get('/seed', (req, res) => {
  Tea.create(
    [
      {
        name: 'Black',
        type: 'Black',
        origin: 'E'
      } , {
        name: 'Green',
        type: 'Green',
        origin: 'A'
      } , {
        name: 'Red',
        type: 'Red',
        origin: 'A'
      }
    ],
    (err, data) => {
      res.redirect('/tea')
    }
  )
});

// Index Route

router.get('/tea', (req, res) => {
  Tea.find({}, (error, allTeas) => {
    res.render('tea/index.ejs',
    {
      tea: allTeas
    });
  });
});

// New Route

router.get('/tea/new', (req, res) => {
  res.render('tea/new.ejs')
});

router.post('/tea', (req, res) => {
  Tea.create(req.body, (err, newTea) => {
    res.redirect('/tea')
  });
});

// Show Route

router.get('/tea/:id', (req, res) => {
  Tea.findById(req.params.id, (err, foundTea) => {
    res.render('tea/show.ejs' , {
      tea:foundTea
    })
  });
});


// Edit Route

router.get('/tea/:id/edit', (req, res) => {
  Tea.findById(req.params.id, (err, foundTea) => {
    res.render('tea/edit.ejs', {
      tea:foundTea
    });
  });
});

router.put('/tea/:id', (req, res) => {
  Tea.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect('/tea/' + updatedModel.id);
  });
});


// Delte Function
router.delete('/tea/:id', (req, res) => {
  Tea.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/tea')
  });
});


module.exports = router;
