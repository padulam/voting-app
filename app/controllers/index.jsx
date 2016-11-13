import React from 'react';
import {render} from 'react-dom';
import Home from './components/home.jsx';
import Layout from './components/layout.jsx';
import CreatePoll from './components/create-poll.jsx';
import AllPolls from './components/display-all-polls.jsx';
import {browserHistory, Router, Route, Redirect} from 'react-router';

const app = (
  <Layout>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/newpoll" component={CreatePoll} />
      <Route path="/polls" component={AllPolls} />
    </Router>
  </Layout>
);

render(app, document.getElementById('voting-app'));