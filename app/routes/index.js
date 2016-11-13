module.exports = function(app, passport){
  var path = require('path');
  var dir = process.cwd()

  function isLoggedIn(request,response,next){
    if(request.isAuthenticated()){
      return next();
    } else{
      response.redirect('/login');
    }
  }

  app.get('/', function(request, response){
    response.sendFile(path.resolve(dir, 'public', 'index.html'));
  });

  app.get('/newpoll', function(request, response){
    response.sendFile(path.resolve(dir, 'public', 'index.html'));
  });

  app.route('/api/:id')
    .get(function(request, response){
      response.json(request.user.twitter);
    });

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/newpoll',
      failureRedirect: '/login',
      failureFlash: true
    }));
};