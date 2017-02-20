import React from 'react';
import PollOption from './poll-option.jsx';
import RemoveUserPoll from './remove-user-poll.jsx';

const UserPoll = (props) => {
  const _getOptions = () => {
    let i = -1;
    return props.options.map((option)=>{
      i++;
      return <PollOption key={i} name={option.name} vote={option.votes}/>;
    })
  };

  const _handleRemoval = () => {
    props.removePoll(props.id);
  };

  const options = _getOptions();

  return(
    <div className="panel panel-default" key = {props.id}>
      <div className="panel-heading poll-title" role="tab" id={`heading${props.id}`}>
        <h4 className="panel-title poll-name">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#collapse${props.id}`} aria-expanded="false" aria-controls={`collapse${props.id}`}>
            {props.name}
          </a>
        </h4>
        <RemoveUserPoll removePoll={_handleRemoval}/>
      </div>
      <div id={`collapse${props.id}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${props.id}`}>
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

export default UserPoll;