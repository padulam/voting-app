import React from 'react';

const ShareTwitter = (props) => {
  const _tweetPoll = () => {
    let url = 'https://twitter.com/intent/tweet?text=';
    let text = props.title + ' | PollSocial ' + window.location.href;

    window.open(url + encodeURI(text), '_blank')
  };

  return (
    <button onClick={_tweetPoll} className="btn btn-twitter share-twitter">
      <span className="fa fa-twitter"></span>Share with Twitter
    </button>
  );
};

export default ShareTwitter;