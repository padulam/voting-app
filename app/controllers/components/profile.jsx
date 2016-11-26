import React from 'react';
import ajaxFunctions from '../../common/ajax-functions';
import UserPolls from './display-user-polls.jsx';

export default class Profile extends React.Component {
  constructor() {
    super();
  
    this.state = {user: undefined, userpolls: []};
  }

  componentWillMount() {
    this._fetchUserData();
  }

  _fetchUserData(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/user/:id';
    var userState = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      let userObject = JSON.parse(data);

      userState.setState({user: userObject, userpolls: userState});
      userState._fetchUserPolls(userObject.twitter.username);
    }));
  }

  _fetchUserPolls(username){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/mypolls/' + username;
    var userState = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      let userPolls = JSON.parse(data);
      userState.setState({user: userState.state.user, userpolls: userPolls});
    }));
  }

  _deletePoll(id){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/polls/' + id;
    var userState = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('DELETE', apiUrl, function(data){
      userState._fetchUserPolls(userState.state.user.twitter.username);
    }));
  }

  render(){
    let user = undefined;
    let myPolls = undefined;
    let userSince = undefined;
    let userPolls = undefined;

    if(this.state.user){
      user = this.state.user.twitter.displayName;
      myPolls = this.state.userpolls.length;
      let d = new Date(this.state.user.created)
      userSince = d.getFullYear();
    }
  
    if(this.state.userpolls.length>0){
      userPolls = <UserPolls polls={this.state.userpolls} removePoll={this._deletePoll.bind(this)} />
    } else{
      userPolls = (
        <div className="my-polls">
          <p>My Polls</p>
          <p><strong>You have no active polls</strong></p>
        </div>
        )
    }

    return(
      <div className="container poll-container">
        <div className="jumbotron poll-jumbo">
          <div className="container">
          <h2 className="text-center">Welcome {user}!</h2>
            <div className="col-lg-6 poll-dashboard">
              <p>Poll Count</p>
              <p><strong>{myPolls}</strong></p>
            </div>
            <div className="col-lg-6 poll-dashboard">
              <p>User Since</p>
              <p><strong>{userSince}</strong></p>
            </div>
          </div>
          {userPolls}
        </div>
      </div>
    );
  }
}