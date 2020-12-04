import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

// everything except landing page will have container so that we can push everything in the middle
const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      {/* we need to put everything inside router to make this work. we just tell what page we want to load */}
      <Route exact path='/' component={Landing} />
      {/* switch statement is used to move between pages */}
      <section className='container'>
        {/* every page except landing page in the theme comes within a container to push everything to the middle */}
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
