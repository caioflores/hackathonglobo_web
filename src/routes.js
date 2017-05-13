import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Containers
import Full from './containers/Full/'
// import Simple from './containers/Simple/'

import Dashboard from './views/Dashboard/'
import Upload from './views/Upload/'

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" name="Dashboard" component={Dashboard}/>
    </Route>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Upload}/>
      <Route path="upload" name="Upload" component={Upload}/>
    </Route>
  </Router>
);
