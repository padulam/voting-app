var Polls = require('../../models/polls');

function parseOptions(options){
  var arr = options.split(/\n/);

  var opts = [];

  for(var i = 0;i < arr.length;i++){
    opts.push({name: arr[i], votes: 0});
  }

  return opts;
}

function PollApi(){
  this.createPoll = function(request, response){
    var poll = new Polls();

    poll.title = request.body.title;
    poll.options = parseOptions(request.body.options);
    poll.creator = request.user.twitter.username;

    poll.save(function(err){
      if(err) response.json({error: err});

      response.json(poll);
    });
  };

  this.updatePoll = function(request, response){
    Polls.findById(request.params.poll_id, function(err, poll){
      if(err) response.json({error: err});
      
      var voted = false;
      var i = 0;

      do{
        if(poll.options[i].name===request.body.selected||poll.options[i].name===request.body.other){
          poll.options[i].votes++;
          voted = true;
        }

        i++;

        if(voted===false && i===poll.options.length){
          poll.options.push({name: request.body.other, votes: 1});
          voted = true;
        }
      } while(voted===false&&i<poll.options.length);
      
      poll.markModified('options');

      poll.save(function(err){
        if(err) response.json({error: err});

        response.json(poll);
      })
    });
  };

  this.removePoll = function(request, response){
    Polls.remove({
      _id: request.params.poll_id
    }, function(err, poll){
      if(err) response.json({error: err});

      response.json(poll);
    });
  }

  this.getPoll = function(request, response){
    Polls.findById(request.params.poll_id, function(err, poll){
      if(err) response.json({error: err});

      response.json(poll);
    });
  };

  this.getAllPolls = function(request, response){
    Polls.find(function(err, polls){
      if(err) response.json({error: err});

      response.json(polls);
    });
  };

  this.getUserPolls = function(request, response){
    Polls.find({creator: request.params.username}, function(err, polls){
      if(err) response.json({error: err});

      response.json(polls);
    });
  };
}

module.exports = PollApi;
