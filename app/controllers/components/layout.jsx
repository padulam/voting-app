import React from 'react';
import {Link} from 'react-router';
import ajaxFunctions from '../../common/ajax-functions';

export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      authenticated: false
    }

    this._AuthenticateTwitter = this._AuthenticateTwitter.bind(this);
    this._GetProfileData = this._GetProfileData.bind(this);
  }

  _AuthenticateTwitter(){
    window.location = '/auth/twitter'
  }

  _GetProfileData(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/user/:id';
    var auth = this;
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      var userObject = JSON.parse(data);

      if(userObject){
        auth.setState({authenticated: true});
      } else{
        auth.setState({authenticated: false});
      }
    }));
  }

  cw

  componentWillMount() {
    this._GetProfileData();
  }

  render(){
    if(!this.state.authenticated){
      var signIn = <SignIn AuthenticateTwitter={this._AuthenticateTwitter}/>;
    }else{
      var newPoll = <li><Link to="/newpoll">New Poll</Link></li>;
    }

    return(
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#voting-app-navbar" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">PollSocial</Link>
            </div>
            <div className="collapse navbar-collapse" id="voting-app-navbar">
              <ul className="nav navbar-nav navbar-right">
                {newPoll}
                <li><Link to="/polls">Polls</Link></li>
                {signIn}
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

class SignIn extends React.Component {
  render(){
    return (<li><button onClick={this.props.AuthenticateTwitter}  className="btn btn-twitter ghost-button navbar-btn">
              <span className="fa fa-twitter"></span> Sign in with Twitter
            </button></li>);
  }
}