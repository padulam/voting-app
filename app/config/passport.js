var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.key,
    consumerSecret: configAuth.twitterAuth.secret,
    callbackURL: configAuth.twitterAuth.callbackURL 
  },
    function(token, tokenSecret, profile, cb) {
      process.nextTick(function(){
        User.findOne({'twitter.id': profile.id}, function(err, user){
          if(err) return cb(err);
          
          if(user){
            return cb(null, user);
          }else{
            var newUser = new User();
            newUser.twitter.id = profile.id;
            newUser.twitter.username = profile.username;
            newUser.twitter.displayName = profile.displayName;
            newUser.created = Date();

            newUser.save(function(err){
              if(err) throw(err);

              return cb(null, newUser);
            });
          }
        });
      });
    }
  ));
};