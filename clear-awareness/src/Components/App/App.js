import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "../Header/Header";
import RegistrationRoute from "../../Routes/RegistrationRoute/RegistrationRoute";
import LoginRoute from "../../Routes/LoginRoute/LoginRoute";
import PublicOnlyRoute from "../../Routes/PublicOnlyRoute/PublicOnlyRoute";
import PrivateRoute from "../../Routes/PrivateRoute/PrivateOnlyRoute";
import DashboardPage from "../../Routes/DashboardPage/DashboardPage";
import LandingPage from "../../Routes/LandingPage/LandingPage";
import JournalRoute from "../../Routes/JournalRoute/JournalRoute";
export default class App extends React.Component {
  render() {
    return (
      <section className="mainapp">
        <Router>
          <Header />
          <Switch>
            <PrivateRoute exact path={"/dashboard"} component={DashboardPage} />
            <PublicOnlyRoute exact path="/" component={LandingPage} />
            <PublicOnlyRoute
              exact
              path={"/register"}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute exact path={"/login"} component={LoginRoute} />
            <PrivateRoute
              exact
              path={"/journal/:date"}
              component={JournalRoute}
            />
          </Switch>
        </Router>
      </section>
    );
  }
}
