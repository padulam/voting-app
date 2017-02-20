import React from 'react';
import RemovePoll from './remove-poll.jsx';
import ShareTwitter from './share-twitter.jsx';

export default class PollData extends React.Component {
  constructor() {
    super();
  
    this.state = {selected: undefined, other: undefined};

    this._changeVote = this._changeVote.bind(this);
    this._submitVote = this._submitVote.bind(this);
  }

  _getOptions(){
    if(this.props.options!==undefined){
      let i = 0;
      let options = this.props.options.map((option) =>{
        i++;
        return <option key={i} value={option.name}>{option.name}</option>;
      });
      
      if(this.props.user){
        options.push(<option key={options.length+1} value='Other'>Other</option>);
      }
      
      return options;
    }
    return undefined;
  }

  _changeVote(){
    this.setState({
      selected: this._vote.value,
      other: this._other.value
    });
  }

  _submitVote(e){
    e.preventDefault();
    this.props.submitVote(this.state);
    this.setState({selected: undefined, other: undefined});
  }

  render(){
    let otherClass;

    if(this.state.selected === 'Other'){
      otherClass = 'other-field';
    }else{
      otherClass = 'no-other-field';
    }

    const options = this._getOptions();

    let shareTweets;
    let removePoll;

    if(this.props.user){
      shareTweets = <ShareTwitter title={this.props.title} />;

      if(this.props.creator === this.props.user.twitter.username){
        removePoll = <RemovePoll id={this.props.id}/>;
      }
    }

    return(
      <div className="col-lg-6">
        <h2>{this.props.title}</h2>
        <form method="post" onSubmit={this._submitVote}>
          <div className="form-group">
            <select onChange={this._changeVote} value={this.state.selected||"Cast your vote"} ref={v => this._vote = v} name="vote" id="vote" className="form-control">
              <option disabled hidden>Cast your vote</option>
              {options}
            </select>
          </div>
          <div className={"form-group " + otherClass}>
            <label htmlFor="other">Other:</label>
            <input type="text" name="other" onChange={this._changeVote} id="other" ref={v => this._other = v} className="form-control"/>
          </div>
          <button className="btn btn-primary submit-vote" type="submit">Submit Vote</button>
        </form>
        {shareTweets}
        {removePoll}
      </div>
    );
  }
}