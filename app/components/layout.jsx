import React from 'react';
import {Link} from 'react-router';
import ajaxFunctions from '../common/ajax-functions';
import SignIn from './sign-in.jsx';
import SignOut from './sign-out.jsx';

export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      user: undefined
    }

    this._AuthenticateTwitter = this._AuthenticateTwitter.bind(this);
    this._DeauthenticateTwitter = this._DeauthenticateTwitter.bind(this);
    this._GetProfileData = this._GetProfileData.bind(this);
  }

  _AuthenticateTwitter(){
    window.location = '/auth/twitter'
  }

  _DeauthenticateTwitter(){
    window.location = '/logout';
  }

  _GetProfileData(){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/user/:id';
    let auth = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      let userObject = JSON.parse(data);

      auth.setState({user: userObject});
    }));
  }

  componentWillMount() {
    this._GetProfileData();
  }

  render(){
    if(!this.state.user){
      var signIn = <SignIn AuthenticateTwitter={this._AuthenticateTwitter}/>;
    }else{
      var newPoll = <li><Link to="/newpoll">New Poll</Link></li>;
      var userProfile = (<li className="dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.user.twitter.displayName} <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li><Link to="/profile">Profile</Link></li>
                            <li role="separator" className="divider"></li>
                            <li className="text-center"><SignOut DeauthenticateTwitter={this._DeauthenticateTwitter} /></li>
                          </ul>
                        </li>);
      
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
                {signIn||userProfile}
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}