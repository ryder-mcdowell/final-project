var mongoose = require('mongoose');
var assert = require('assert');

var url = 'mongodb://localhost:27017/';
var options = { promiseLibrary: require('bluebird') };
var db = mongoose.createConnection(url, options);
db.on('open', function() {
   assert.equal(Post.collection.findOne().constructor, require('bluebird'));
});

var postSchema = new mongoose.Schema({
   post_content: {type: String},
   post_user: {type: String}
});

var Post = db.model('post', postSchema);
module.exports = Post;