var Polls = require('../../models/polls');

function parseOptions(options){
  var arr = options.split(/\r\n/);

  var opts = {};

  for(var i = 0;i < arr.length;i++){
    opts[arr[i]] = 0;
  }

  return opts;
}

function PollApi(){
  this.createPoll = function(request, response){
    var poll = new Polls();

    poll.title = request.body.pollName;
    poll.options = parseOptions(request.body.pollOptions);
    poll.creator = request.user.twitter.username;

    poll.save(function(err){
      if(err) response.json({error: err});

      response.json({success: 'poll created'});
    });
  };

  this.updatePoll = function(request, response){
    Polls.findById(request.params.poll_id, function(err, poll){
      if(err) response.json({error: err});

      poll.options = poll.body.options;

      poll.save(function(err){
        if(err) response.json({error: err});

        response.json({success: 'poll updated'});
      })
    });
  };

  this.removePoll = function(request, response){
    Polls.remove({
      _id: request.params.poll_id
    }), function(err, poll){
      if(err) response.json({error: err});

      response.json({success: 'poll removed'});
    }
  }

  this.getPoll = function(request, response){

  };

  this.getAllPolls = function(request, response){
    Polls.find(function(err, polls){
      if(err) response.json({error: err});

      response.json(polls);
    });
  };
}

module.exports = PollApi;
