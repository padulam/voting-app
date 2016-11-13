import React from 'react';
import {render} from 'react-dom';
import Home from './components/home.jsx';
import Layout from './components/layout.jsx';
import AddPoll from './components/add-poll.jsx';
import {browserHistory, Router, Route, Redirect} from 'react-router';

const app = (
  <Layout>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/newpoll" component={AddPoll} />
    </Router>
  </Layout>
);

render(app, document.getElementById('voting-app'));