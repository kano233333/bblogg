var settings = require('../setting');
var Db = require('mongodb').Db;
var MongoClient = require('mongodb').MongoClient;

function _connectDB(callback) {
  var url = settings.dburl;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(err, db);
  });
}

exports.insertOne = function(collectionName,json,callback){
  _connectDB(function(err,db){
    db.collection(collectionName).insertOne(json,function(err,result){
      var static = !err && result.result.ok==1 ? 1 : -1;
      callback(static,result);
      db.close();
    })
  })
};

exports.insertMany = function(collectionName,json,callback){
  _connectDB(function(err,db){
    db.collection(collectionName).insertMany(json,function(err,result){
      callback(err,result);
      db.close();
    })
  })
};

exports.deleteMany = function(collectionName,json,callback){
  _connectDB(function(err,db){
    db.collection(collectionName).deleteMany(json,function(err,result){
      callback(err,result);
      db.close();
    })
  })
};

exports.find = function(collectionName,json,callback){
  _connectDB(function(err,db){
    db.collection(collectionName).find(json).toArray( (err,value) => {
      callback(err,value);
      db.close();
    });
  })
};