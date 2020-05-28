import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../../Routes/LandingPage/LandingPage'
import Header from '../Header/Header'
import RegistrationForm from '../RegistrationForm/RegisrationForm'
import LoginForm from '../LoginForm/LoginForm'
import PublicOnlyRoute from '../../Routes/PublicOnlyRoute/PublicOnlyRoute';
import PrivateRoute from '../../Routes/PrivateRoute/PrivateOnlyRoute';
export default class App extends React.Component{
render() {
  return(
    <section>
    <Router>
     <Header />
      <Switch>
        <PublicOnlyRoute 
        exact 
        path={'/'}
        component={LandingPage}
        />
        <PublicOnlyRoute 
        exact
        path={'/register'}
        component={RegistrationForm}
        />
        <PublicOnlyRoute 
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


