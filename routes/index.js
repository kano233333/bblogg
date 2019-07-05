var express = require('express');
var router = express.Router();
var constData = require('../public/javascripts/const.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog',nav:constData.nav });
});

router.get('/login', function(req,res,next){
  res.render('login', {title:'login'});
});

router.get('/reg', function(req,res,next){
  res.render('reg', {title:'reg'});
});

router.get('/post', function(req,res,next){
  res.render('post', {title:'post'});
});

module.exports = router;
