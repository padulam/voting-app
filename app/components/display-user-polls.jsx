import React from 'react';
import UserPoll from './user-poll.jsx';

const UserPolls = (props) => {
  const _getPolls = () => {
    return props.polls.map((poll)=>{
      return <UserPoll
        id= {poll._id}
        name={poll.title}
        options={poll.options}
        removePoll = {_removePoll.bind(this)}
        key= {poll._id} />;
    });
  };

  const _removePoll = (id) =>{
    props.removePoll(id);
  };

  const polls = _getPolls();

  return(
    <div className="my-polls">
      <p>My Polls</p>
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        {polls}
      </div>
    </div>
  );
};

export default UserPolls;