var express = require('express');
var router = express.Router();
var constData = require('../public/javascripts/const.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/essayTimeList', function(req, res, next) {
  res.render('essayTimeList');
});

router.get('/essayTagList', function(req, res, next) {
  res.render('essayTagList');
});

router.get('/essayDetail', function(req, res, next) {
  res.render('essayDetail');
});

router.get('/wordsTagList', function(req, res, next) {
  res.render('wordsTagList');
});

router.get('/wordsTimeList', function(req, res, next) {
  res.render('wordsTimeList');
});

module.exports = router;
