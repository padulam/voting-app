var mongoose = require('mongoose');
var Schema = mongoose.schema;

var Poll = new Schema({
  title: String,
  votes: Object
});

module.exports = mongoose.model('Poll', Poll);