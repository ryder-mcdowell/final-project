var mongoose = require('mongoose');
var assert = require('assert');


var url = 'mongodb://localhost:27017/';
var options = { promiseLibrary: require('bluebird') };
var db = mongoose.createConnection(url, options);
db.on('open', function() {
   assert.equal(User.collection.findOne().constructor, require('bluebird'));
});


var userSchema = new mongoose.Schema({
   username: {type: String, unique: true},
   password: {type: String},
   name: {type: String},
   age: {type: String},
   location: {type: String},
   phone: {type: String}
});

var User = db.model('myuser', userSchema);
module.exports = User;

// var User = mongoose.model('myuser', userSchema);
// module.exports = User;




// var User = {
//    username: {type: String, unique: true},
//    password: {type: String}
// }
// module.exports = User;