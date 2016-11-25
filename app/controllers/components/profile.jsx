import React from 'react';
import ajaxFunctions from '../../common/ajax-functions';

export default class Profile extends React.Component {
  constructor() {
    super();
  
    this.state = {user: undefined};
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

      userState.setState({user: userObject});
    }));
  }

  render(){
    let user = undefined;
    console.log(this.state.user)
    if(this.state.user){
      user = this.state.user.twitter.displayName;
    }

    return(
      <h1 className="text-center">Welcome {user}!</h1>
    );
  }
}