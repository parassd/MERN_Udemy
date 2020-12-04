import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

// Just like router we need to wrap everything in provider so that we can access the app level state
// everything except landing page will have container so that we can push everything in the middle
const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        {/* we need to put everything inside router to make this work. we just tell what page we want to load */}
        <Route exact path='/' component={Landing} />
        {/* switch statement is used to move between pages */}
        <section className='container'>
          {/* every page except landing page in the theme comes within a container to push everything to the middle */}
          <Alert />
          {/* Switch can only have routes in it so we put alert outside it but within the container */}
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
