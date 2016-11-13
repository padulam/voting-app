import React from 'react';

export default class CreatePoll extends React.Component {
  render(){
    return(
      <div className="container poll-container">
        <div className="poll-jumbo jumbotron">
          <h1 className="create-poll-title">Create your poll</h1>
          <form method="post" encType="application/x-www-form-urlencoded" className="add-poll-form" action="/api/createpoll">
            <div className="form-group">
              <label htmlFor="poll-name">Name of Poll</label>
              <input className="form-control" type="text" name="pollName" id="poll-name"/>
            </div>
            <div className="form-group">
              <label htmlFor="poll-options">Options</label>
              <textarea className="form-control" name="pollOptions" id="poll-options" placeholder="Add a new line for each option"/>
            </div>
            <button className="btn btn-primary" type="submit">Create Poll</button>
          </form>
        </div>
      </div>
    );    
  }
}