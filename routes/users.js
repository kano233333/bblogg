var express = require('express');
var router = express.Router();
var db = require('../models/db')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/reg',function(req,res){
  let _body = req.body;
  db.insertOne('user', _body, (static,result) => {
    res.send({static:static})
  })
});

router.post('/login',function(req,res){
  let _body = req.body;
  db.find('user',{"username":_body.username},function(err,result) {
    if (err) {
      res.send({static:-1});
      return;
    }
    if(_body.psd == result[0].password){
      res.send({
        static:1,
        email:result[0].email
      });
    }else{
      res.send({static:0});
    }
  })
});

router.post('/post',function(req,res){

});

router.get('/logout',function(req,res){});

module.exports = router;
