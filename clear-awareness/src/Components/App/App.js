import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from '../../Routes/LandingPage/LandingPage'
import Header from '../Header/Header'
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
      </Switch>
    </Router>
    </section>
  )
}
}


