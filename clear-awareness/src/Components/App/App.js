import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../Header/Header'
import RegistrationForm from '../RegistrationForm/RegisrationForm'
import LoginForm from '../LoginForm/LoginForm'
import PublicOnlyRoute from '../../Routes/PublicOnlyRoute/PublicOnlyRoute';
import PrivateRoute from '../../Routes/PrivateRoute/PrivateOnlyRoute';
import DashboardPage from '../../Routes/DashboardPage/DashboardPage';
export default class App extends React.Component{
render() {
  return(
    <section>
    <Router>
     <Header />
      <Switch>
        <PrivateRoute 
        exact 
        path={'/'}
        component={DashboardPage}
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
        <PrivateRoute exact path={'/dashboard'} component={DashboardPage}/>
      </Switch>
    </Router>
    </section>
  )
}
}


