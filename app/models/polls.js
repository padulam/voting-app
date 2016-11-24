var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
  title: String,
  options: Array,
  creator: String
});

module.exports = mongoose.model('Poll', Poll);