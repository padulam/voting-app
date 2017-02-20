import React from 'react';
import ajaxFunctions from '../common/ajax-functions';
import PollChart from './poll-chart.jsx';
import PollData from './poll-data.jsx';

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
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/polls/' + this.props.params.id;
    let polls = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      polls.setState({poll: JSON.parse(data), authenticated: polls.state.user});
    }));
  }

  _fetchUserData(){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/user/:id';
    let polls = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      let userObject = JSON.parse(data);

      polls.setState({polls: polls.state.polls, user: userObject});
    }));
  }

  _submitVote(voteData){
    let appUrl = window.location.origin;
    let id = this.state.poll._id;
    let apiUrl = appUrl + '/api/polls/' + id;
    let polls = this;

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