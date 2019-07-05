var db = require('../../models/db');

function User(user){
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
}

User.prototype.save = function(req,res){
  var user = {
    name:this.name,
    password:this.password,
    email:this.email
  };
  console.log(req)
  console.log(res)
}

exports.User = User;