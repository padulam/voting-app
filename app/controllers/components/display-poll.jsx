import React from 'react';
import ajaxFunctions from '../../common/ajax-functions';
import {browserHistory} from 'react-router';
import {Doughnut} from 'react-chartjs-2';
import randomColor from 'randomcolor';

export default class PollDisplay extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {poll:{}, user: undefined};
  }

  componentWillMount() {
    this._fetchPollData();
    this._fetchUserData();
  }

  _fetchPollData(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/polls/' + this.props.params.id;
    var polls = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      polls.setState({poll: JSON.parse(data), authenticated: polls.state.user});
    }));
  }

  _fetchUserData(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/user/:id';
    var polls = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      let userObject = JSON.parse(data);

      polls.setState({polls: polls.state.polls, user: userObject});
    }));
  }

  _submitVote(voteData){
    var appUrl = window.location.origin;
    var id = this.state.poll._id;
    var apiUrl = appUrl + '/api/polls/' + id;
    var polls = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('PUT', apiUrl, function(data){
      polls.setState({poll: JSON.parse(data)});
    }, voteData));
  }

  render(){
    let pollChart = undefined

    if(this.state.poll.__v===0){
      pollChart = <div className="col-lg-6"><p className="no-poll-data text-center">No one has voted on this poll</p></div>;
    }else{
      pollChart = <PollChart options={this.state.poll.options} />;
    }

    return(
      <div className="container poll-container">
        <div className="jumbotron poll-jumbo">
          <div className="container">
            <PollData user={this.state.user} creator={this.state.poll.creator} submitVote={this._submitVote.bind(this)} title={this.state.poll.title} id={this.state.poll._id} options={this.state.poll.options} />
            {pollChart}
          </div>
        </div>
      </div>
    );
  }
}

class PollChart extends React.Component {
  _formatOptions(){
    if(this.props.options!==undefined){
      let names = [];
      let votes = [];

      for(let i = 0; i<this.props.options.length;i++){
        names.push(this.props.options[i].name);
        votes.push(this.props.options[i].votes);
      }

      return {names: names, votes: votes};
    }

    return undefined;
  }

  _getRandomColors(count){
    //Uses base colors from angular-chart.js
    const BASE_COLORS = ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
    let colors = BASE_COLORS;

    if(count>colors.length){
      let needColors = count - colors.length;
      var temp = randomColor({count: needColors});
      colors = colors.concat(temp);
    }

    return colors;
  }

  render(){
    let opts = this._formatOptions();
    let doughnut;
    if(opts){

      var data = {
        labels: opts.names,
        datasets: [
            {
                data: opts.votes,
                backgroundColor: this._getRandomColors(opts.names.length)
            }]
      };

      var options = {
        legend: {
          position: "bottom"
        }
      };

      doughnut = <Doughnut data={data} options={options} width={500} height={500}/>;
    }
  
    return(
      <div className="col-lg-6">
        {doughnut}
      </div>
    );
  }
}

class PollData extends React.Component {
  constructor() {
    super();
  
    this.state = {selected: undefined, other: undefined};

    this._changeVote = this._changeVote.bind(this);
    this._submitVote = this._submitVote.bind(this);
  }

  _getOptions(){
    if(this.props.options!==undefined){
      let i = 0;
      let options = this.props.options.map((option) =>{
        i++;
        return <option key={i} value={option.name}>{option.name}</option>;
      });
  
      options.push(<option key={options.length+1} value='Other'>Other</option>)
      return options;
    }
    return undefined;
  }

  _changeVote(){
    this.setState({
      selected: this._vote.value,
      other: this._other.value
    });
  }

  _submitVote(e){
    e.preventDefault();
    this.props.submitVote(this.state);
    this.setState({selected: undefined, other: undefined});
  }

  render(){
    let otherClass;

    if(this.state.selected === 'Other'){
      otherClass = 'other-field';
    }else{
      otherClass = 'no-other-field';
    }

    const options = this._getOptions();

    let shareTweets;
    let removePoll;

    if(this.props.user){
      shareTweets = <ShareTwitter title={this.props.title} />;

      if(this.props.creator === this.props.user.twitter.username){
        removePoll = <RemovePoll id={this.props.id}/>;
      }
    }

    return(
      <div className="col-lg-6">
        <h2>{this.props.title}</h2>
        <form method="post" onSubmit={this._submitVote}>
          <div className="form-group">
            <select onChange={this._changeVote} value={this.state.selected||"Cast your vote"} ref={v => this._vote = v} name="vote" id="vote" className="form-control">
              <option disabled hidden>Cast your vote</option>
              {options}
            </select>
          </div>
          <div className={"form-group " + otherClass}>
            <label htmlFor="other">Other:</label>
            <input type="text" name="other" onChange={this._changeVote} id="other" ref={v => this._other = v} className="form-control"/>
          </div>
          <button className="btn btn-primary submit-vote" type="submit">Submit Vote</button>
        </form>
        {shareTweets}
        {removePoll}
      </div>
    );
  }
}

class ShareTwitter extends React.Component {
  constructor() {
    super();
  
    this._tweetPoll = this._tweetPoll.bind(this);
  }

  _tweetPoll(){
    let url = 'https://twitter.com/intent/tweet?text=';
    let text = this.props.title + ' | PollSocial ' + window.location.href;

    window.open(url + encodeURI(text), '_blank')
  }

  render(){
    return (<button onClick={this._tweetPoll} className="btn btn-twitter share-twitter">
              <span className="fa fa-twitter"></span>Share with Twitter
            </button>);
  }
}

class RemovePoll extends React.Component {
  constructor() {
    super();
  
    this._deletePoll = this._deletePoll.bind(this);
  }

  _deletePoll(){
    var appUrl = window.location.origin;
    var id = this.props.id;
    var apiUrl = appUrl + '/api/polls/' + id;
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('DELETE', apiUrl, function(data){
      browserHistory.push('/polls')
    }));
  }

  render(){
    return(<button className="btn btn-danger remove-poll" onClick={this._deletePoll}>Remove Poll</button>);
  }
}