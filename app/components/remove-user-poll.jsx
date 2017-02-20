import React from 'react';

const RemoveUserPoll = (props) => {
  const _handleClick = () => {
    props.removePoll();
  };

  return(
    <button className="remove-button" onClick={_handleClick}>
      <span className="remove-icon glyphicon glyphicon-trash"></span><span className="sr-only">Remove</span>
    </button>
  );
};

export default RemoveUserPoll;