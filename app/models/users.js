var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  twitter:{
    id: String,
    token: String,
    username: String,
    displayname: String
  },
  polls: Array
});

module.exports = mongoose.model('User', User);