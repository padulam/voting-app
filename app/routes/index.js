module.exports = function(app, passport){
  var path = require('path');
  var dir = process.cwd();
  var bodyParser = require('body-parser');
  var PollApi = require('../controllers/api/pollapi');

  var jsonParser = bodyParser.json();
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  var pollApi = new PollApi();

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

  app.get('/polls', function(request, response){
    response.sendFile(path.resolve(dir, 'public', 'index.html'));
  });

  app.get('/polls/:poll_id', function(request, response){
    response.sendFile(path.resolve(dir, 'public', 'index.html'));
  });

  app.route('/api/user/:id')
    .get(function(request, response){
      response.json(request.user||null);
    });

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/newpoll',
      failureRedirect: '/login',
      failureFlash: true
    }));

  app.post('/api/createpoll', urlencodedParser, pollApi.createPoll);

  app.get('/api/getallpolls', pollApi.getAllPolls);

  app.put('/api/polls/:poll_id', jsonParser, pollApi.updatePoll);

  app.route('/api/polls/:poll_id')
    .delete(pollApi.removePoll)
    .get(pollApi.getPoll)
    // .put(urlencodedParser, pollApi.updatePoll);
};