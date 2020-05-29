import React, { Component } from 'react'
import './Header.css'
import { Link} from "react-router-dom";
import UserContext from '../Context/UserContext';
import TokenService from '../../Services/token-service';

class Header extends Component {

  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogin() {
    return (
      <nav>
        <Link to="/login">Login</Link> ||
        <Link to="/register">Register</Link>
      </nav>
    );
  }

  renderLogout() {
    return (
      <nav>
        <Link onClick={this.handleLogoutClick} to="/login">
          Logout
        </Link>
      </nav>
    )
  }

  render() {
    return (
      <section>
          <h1>Clear Mind</h1>
            {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
      </section>
    )
  }
}

export default Header
