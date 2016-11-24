import React from 'react';
import {render} from 'react-dom';
import Home from './components/home.jsx';
import Layout from './components/layout.jsx';
import CreatePoll from './components/create-poll.jsx';
import AllPolls from './components/display-all-polls.jsx';
import PollDisplay from './components/display-poll.jsx';
import {browserHistory, Router, Route, Redirect, IndexRoute} from 'react-router';

const app = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="/newpoll" component={CreatePoll} />
      <Route path="/polls" component={AllPolls} />
      <Route path="/polls/:id" component={PollDisplay} />
    </Route>
  </Router>
);

render(app, document.getElementById('voting-app'));