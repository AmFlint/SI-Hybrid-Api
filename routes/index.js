var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.user.create({email: 'test'})
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

module.exports = router;
