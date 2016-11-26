import React from 'react';
import {browserHistory} from 'react-router';
import ajaxFunctions from '../../common/ajax-functions';

export default class CreatePoll extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {title: undefined, options: undefined};

    this._changePollData = this._changePollData.bind(this);
    this._submitPoll = this._submitPoll.bind(this);
  }

  _submitPoll(e){
    e.preventDefault();
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/createpoll';
    var newPollData = this.state;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', apiUrl, function(data){
      browserHistory.push('/polls')
    }, newPollData));
  }

  _changePollData(){
    this.setState({
      title: this._title.value,
      options: this._options.value
    });
  }

  render(){
    return(
      <div className="container poll-container">
        <div className="poll-jumbo jumbotron">
          <h1 className="create-poll-title">Create your poll</h1>
          <form method="post" className="add-poll-form" onSubmit={this._submitPoll}>
            <div className="form-group">
              <label htmlFor="poll-name">Name of Poll</label>
              <input onChange={this._changePollData} ref={v => this._title = v} className="form-control" type="text" name="pollName" id="poll-name"/>
            </div>
            <div className="form-group">
              <label htmlFor="poll-options">Options</label>
              <textarea onChange={this._changePollData} ref={v => this._options = v} className="form-control" name="pollOptions" id="poll-options" placeholder="Add a new line for each option"/>
            </div>
            <button className="btn btn-primary" type="submit">Create Poll</button>
          </form>
        </div>
      </div>
    );    
  }
}