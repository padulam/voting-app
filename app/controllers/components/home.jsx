import React from 'react';

class Jumbotron extends React.Component {
  render(){
    return(
    <div className="jumbotron app-jumbotron">
      <div className="container app-header">
        <h1>PollSocial <i className="fa fa-check-square" aria-hidden="true"></i></h1>
        <p>Create polls and share them with your friends!</p>
      </div>
    </div>
    );
  }
}

class AppHighlights extends React.Component {
  render(){
    return(
    <div className="container app-highlights">
        <div className="col-lg-4">
          <i className="fa fa-building fa-4x" aria-hidden="true"></i>
          <h2>Create</h2>
          <p>You can create your own polls in just minutes.</p>
        </div>
        <div className="col-lg-4">
          <i className="fa fa-share fa-4x" aria-hidden="true"></i>
          <h2>Share</h2>
          <p>Once your done creating your poll, share it with your friends. Our app allows for easy sharing via integration with popular social networks.</p>
        </div>
        <div className="col-lg-4">
          <i className="fa fa-pie-chart fa-4x" aria-hidden="true"></i>
          <h2>Vote</h2>
          <p>Done creating your poll...now vote on your friends polls!</p>
        </div>
      </div>
    );
  }
}

 export default class Home extends React.Component {
  render(){
    return(
    <div>
      <Jumbotron />
      <AppHighlights />
    </div>
    );
  }
}
