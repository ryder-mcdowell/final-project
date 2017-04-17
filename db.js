var mongo = require('mongodb');
var server = new mongo.Server('localhost',27017,{auto_reconnect:true});
var db=new mongo.Db('ridefinddb',server); //create a new db
var script = require('./client/script.js')
var User = require('./User.js');
var Post = require('./Post.js');
mongoose = require('mongoose');
var session = require('express-session');

exports.register = function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      var name = req.body.name;
      var age = req.body.age;
      var location = req.body.location;
      var phone = req.body.phone;

    User.findOne({username: username}, function (err, user) {
       if(err) {
           console.log(err);
       }
       if (!user) {
            var newuser = new User();
            newuser.username = username;
            newuser.password = password;
            newuser.name = name;
            newuser.age = age;
            newuser.location = location;
            newuser.phone = phone;
            newuser.save(function (err, savedUser) {
            if(err) {
                console.log(err)
                return res.status(500).send();
            }
            return res.status(200).send();
            })
       } else {
           return res.status(500).send();
           console.log("username already exists");
       }
   })

      
}

exports.login = function(req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   console.log("trying to login:"+username+"/"+password);
   User.findOne({username: username, password: password}, function (err, user) {
       if(err) {
           console.log(err);
       }
       if (!user) {
           return res.status(404).send();
           res.end();
       } else {
           req.session.user = user;
           console.log("username exists:"+user.username);
           res.redirect('/dashboard');
       }
   })
}

exports.logout = function(req, res) {
   req.session.destroy();
   return res.status(200).send();
}

exports.dashboard = function(req, res) {
    console.log("in dashboard");
    if (req.session && req.session.user) {
        User.findOne({ username: req.session.user.username }, function (err, user) {
            if(!user) {
                console.log("no session found");
                res.end("Go to main page first?");
            } else {
                console.log("username:"+user.username+" trying to access.");
                res.send("Hey *"+user.username);
                res.end();
            }
        })
    } else {
        console.log("no session user");
        res.send("Hey you are not logged in");
        res.end();
    }
}

exports.userData = function(req,res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.username;
    User.findOne({ username: id }, function (err, user) {
        var username = user.username;
        var name = user.name;
        var age = user.age;
        var location = user.location;
        var phone_number = user.phone;
        resp = "Username: " + username + "\nName: " + name + "\nAge: " + age + "\nLocation: " + location + "\nPhone Number: " + phone_number;
        res.send(resp);
    })

}

exports.post = function(req, res) {
      var post_content = req.body.post_content;
      var post_user = req.body.post_user;

      var newpost = new Post();
      newpost.post_content = post_content;
      newpost.post_user = post_user;
      newpost.save(function (err, savedPost) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    })
}

exports.postData = function(req, res) {
    Post.find(function(err, result) {
        if (err) {
            console.log(err);
        }
        for (i = result.length - 1; i >= 0; --i) {
            //res.write("post:" + i + "\n" + "post_user:" + result[i].post_user + "\n" + "post_content:" + result[i].post_content + "\n");
            res.write(i + "*" + result[i].post_user + "*" + result[i].post_content + "*");
        }
        res.end();
    })
}

exports.myPostData = function(req, res) {
    var post_user = req.session.user.username;
    Post.find({post_user: post_user}, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(post_user);
        console.log(result);
        for (i = result.length - 1; i >= 0; --i) {
            //res.write("post:" + i + "\n" + "post_user:" + result[i].post_user + "\n" + "post_content:" + result[i].post_content + "\n");
            res.write(i + "*" + result[i].post_user + "*" + result[i].post_content + "*");
        }
        res.end();
    })
}