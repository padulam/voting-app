import React from 'react';

export default class AddPoll extends React.Component {
  render(){
    return(
      <div className="container add-poll-container">
        <div className="add-poll-jumbo jumbotron">
          <h1 className="create-poll-title">Create your poll</h1>
          <form className="add-poll-form" action="">
            <div className="form-group">
              <label htmlFor="poll-name">Name of Poll</label>
              <input className="form-control" type="text" id="poll-name"/>
            </div>
            <div className="form-group">
              <label htmlFor="poll-options">Options</label>
              <textarea className="form-control" id="poll-options" placeholder="Add a new line for each option"/>
            </div>
            <button className="btn btn-primary" type="submit">Create Poll</button>
          </form>
        </div>
      </div>
    );    
  }
}