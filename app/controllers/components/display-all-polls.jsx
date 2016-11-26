import React from 'react';
import ajaxFunctions from '../../common/ajax-functions';
import {Link} from 'react-router';

export default class AllPolls extends React.Component {
  constructor() {
    super();
  
    this.state = {polls: []};
  }

  componentDidMount() {
    this._fetchAllPolls();
  }

  _fetchAllPolls(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/getallpolls';
    var polls = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      polls.setState({polls: JSON.parse(data)});
    }));
  }

  _getAllPolls(){
    return this.state.polls.map((poll) => {
      return <Poll
                id = {poll._id}
                title = {poll.title}
                options = {poll.options}
                creator = {poll.creator} 
                key = {poll._id} />
    });
  }

  render(){
    let polls = this._getAllPolls();
    let pollDisplay = undefined;
    
    if(polls.length===0){
      pollDisplay = <p className="text-center">There are no active polls</p>;
    }else{
      pollDisplay = <PollTable polls={polls} />
    }

    return(
      <div className="container poll-container">
        <h2 className="text-center">Polls</h2>
        <div className="jumbotron poll-jumbo">
          {pollDisplay}
        </div>
      </div>
    );
  }
}

class PollTable extends React.Component {
  render(){
    return(
      <table className="table table-hover table-bordered poll-table">
        <tbody>
          {this.props.polls}
        </tbody>
      </table>
    )
  }
}

class Poll extends React.Component {
  render(){
    return (
        <tr>
          <td><Link to={"/polls/" + this.props.id}>{this.props.title}</Link></td>
        </tr>
      );
  }
}