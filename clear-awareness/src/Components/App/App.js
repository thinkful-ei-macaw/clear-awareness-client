import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import RegistrationRoute from "../../Routes/RegistrationRoute/RegistrationRoute";
import LoginRoute from "../../Routes/LoginRoute/LoginRoute";
import PublicOnlyRoute from "../../Routes/PublicOnlyRoute/PublicOnlyRoute";
import PrivateRoute from "../../Routes/PrivateRoute/PrivateOnlyRoute";
import DashboardPage from "../../Routes/DashboardPage/DashboardPage";
import LandingPage from "../../Routes/LandingPage/LandingPage";
import JournalRoute from "../../Routes/JournalRoute/JournalRoute";
import NotFoundRoute from "../../Routes/NotFoundRoute/NotFoundRoute";
import "./App.css";
export default class App extends React.Component {
  render() {
    return (
      <main>
        <section className="mainapp">
          <Router>
            <header>
              <Header />
            </header>

            <Switch>
              <PrivateRoute
                exact
                path={"/dashboard"}
                component={DashboardPage}
              />
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

              <Route component={NotFoundRoute} />
            </Switch>
          </Router>
        </section>
      </main>
    );
  }
}
