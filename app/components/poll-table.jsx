import React from 'react';

const PollTable = (props) => {
  return(
      <table className="table table-hover table-bordered poll-table">
        <tbody>
          {props.polls}
        </tbody>
      </table>
  );
};

export default PollTable;