import React from 'react';

const PollOption = (props) => {
  return(
    <tr><td>{props.name}</td><td>{props.vote}</td></tr>
  );
}

export default PollOption;