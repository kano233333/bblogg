var express = require('express');
var router = express.Router();
var db = require('../models/db')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sendEssay',function(req,res){
  let _body = req.body;
  db.insertOne('essay', _body, (static,result) => {
    res.send({static:static})
  })
});

module.exports = router;
