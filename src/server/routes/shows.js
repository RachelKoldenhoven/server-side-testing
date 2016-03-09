var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

function Shows() {
    return knex('shows');
};

router.get('/shows', function(req, res, next) {
  Shows().select().then(function(result) {
    res.status(200).json(result);
  })
});

router.get('/shows/:id', function(req, res, next) {
  Shows().select().where('id', req.params.id).then(function(result) {
    res.status(200).json(result);
  })
});


router.post('/shows', function(req, res, next) {
  var newShow = req.body;
  Shows().insert({ name: newShow.name, channel: newShow.channel, genre: newShow.genre, rating: newShow.rating, explicit: newShow.explicit}).returning('id').then(function(result) {
    res.status(200).json(result);
  })
});


router.put('/shows/:id', function(req, res, next) {
  Shows().where('id', req.params.id).update(req.body).returning('id').then(function(result) {
    res.status(200).json(result);
  })
});


router.delete('/shows/:id', function(req, res, next) {
  Shows().where('id', req.params.id).del().then(function(result) {
    res.status(200).json(result);
  })
});

module.exports = router;
