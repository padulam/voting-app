var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
  title: String,
  options: Object,
  creator: String
});

module.exports = mongoose.model('Poll', Poll);