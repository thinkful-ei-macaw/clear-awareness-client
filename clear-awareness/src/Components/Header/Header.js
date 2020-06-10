import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import UserContext from "../Context/UserContext";
import TokenService from "../../Services/token-service";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogin() {
    return (
      <nav>
        <Link className="victory" to="/login">
          Login
        </Link>{" "}
        ||{" "}
        <Link className="victory" to="/register">
          Register
        </Link>
      </nav>
    );
  }

  renderLogout() {
    return (
      <nav>
        <Link className="victory" onClick={this.handleLogoutClick} to="/login">
          Logout
        </Link>
      </nav>
    );
  }

  render() {
    return (
      <section className="header">
        <h1 className="title">
          {TokenService.hasAuthToken() ? (
            <Link className="heading" to="/dashboard">
              Clear Mind
            </Link>
          ) : (
            <Link className="heading" to="/">
              Clear Mind
            </Link>
          )}
        </h1>
        <p className="express-yourself">Express yourself & get it all out.</p>
        {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
      </section>
    );
  }
}

export default Header;
