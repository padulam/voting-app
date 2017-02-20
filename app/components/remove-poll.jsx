import React from 'react';
import ajaxFunctions from '../common/ajax-functions';

const RemovePoll = (props) => {
  const _deletePoll = () => {
    let appUrl = window.location.origin;
    let id = props.id;
    let apiUrl = appUrl + '/api/polls/' + id;
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('DELETE', apiUrl, function(data){
      browserHistory.push('/polls')
    }));
  };

  return(<button className="btn btn-danger remove-poll" onClick={_deletePoll}>Remove Poll</button>);
};

export default RemovePoll;