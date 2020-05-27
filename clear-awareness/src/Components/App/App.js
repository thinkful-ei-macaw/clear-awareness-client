import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from '../../Routes/LandingPage/LandingPage'
import Header from '../Header/Header'
import RegistrationForm from '../RegistrationForm/RegisrationForm'
import LoginForm from '../LoginForm/LoginForm'
export default class App extends React.Component{
render() {
  return(
    <section>
    <Router>
     <Header />
      <Switch>
        <Route 
        exact 
        path={'/'}
        component={LandingPage}
        />
        <Route 
        exact
        path={'/register'}
        component={RegistrationForm}
        />
        <Route 
        exact
        path={'/login'}
        component={LoginForm} 
        />
      </Switch>
    </Router>
    </section>
  )
}
}


