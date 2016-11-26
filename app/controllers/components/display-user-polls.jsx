import React from 'react';

export default class UserPolls extends React.Component{
  _getPolls(){
    return this.props.polls.map((poll)=>{
      return <UserPoll
        id= {poll._id}
        name={poll.title}
        options={poll.options}
        removePoll = {this._removePoll.bind(this)}
        key= {poll._id} />;
    });
  }

  _removePoll(id){
    this.props.removePoll(id);
  }

  render(){
    const polls = this._getPolls();
    return(
      <div className="my-polls">
        <p>My Polls</p>
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          {polls}
        </div>
      </div>
    );
  }
}

class UserPoll extends React.Component{
  constructor() {
    super();

    this._handleRemoval = this._handleRemoval.bind(this);
  }

  _getOptions(){
    let i = -1;
    return this.props.options.map((option)=>{
      i++;
      return <Option key={i} name={option.name} vote={option.votes}/>;
    })
  }

  _handleRemoval(){
    this.props.removePoll(this.props.id);
  }

  render(){ 
    const options = this._getOptions();
    return(
      <div className="panel panel-default" key = {this.props.id}>
        <div className="panel-heading poll-title" role="tab" id={`heading${this.props.id}`}>
          <h4 className="panel-title poll-name">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#collapse${this.props.id}`} aria-expanded="false" aria-controls={`collapse${this.props.id}`}>
              {this.props.name}
            </a>
          </h4>
          <RemovePoll removePoll={this._handleRemoval}/>
        </div>
        <div id={`collapse${this.props.id}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${this.props.id}`}>
          <div className="panel-body">
            <table className="table table-bordered results-table">
              <caption>Poll Results</caption>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                {options}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
}

class RemovePoll extends React.Component {
  constructor() {
    super();

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(){
    this.props.removePoll();
  }

  render(){
    return(
      <button className="remove-button" onClick={this._handleClick}>
        <span className="remove-icon glyphicon glyphicon-trash"></span><span className="sr-only">Remove</span>
      </button>
    );
  }
}

function Option(props){
  return(
    <tr><td>{props.name}</td><td>{props.vote}</td></tr>
  );
}