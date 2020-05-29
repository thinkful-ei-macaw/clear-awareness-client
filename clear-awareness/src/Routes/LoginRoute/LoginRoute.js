import React, { Component } from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";
import './LoginRoute.css'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    console.log("this is a success")
    const { history } = this.props;
    const destination = '/dashboard';
    history.push(destination);
  };

  render() {
    return (
      <div className="LoginRoute">
        <div className="login-wrapper">
          <section className="loginroute-container">
            <h2>Login</h2>
            <LoginForm onLoginSuccess={this.handleLoginSuccess} />
          </section>
        </div>
      </div>
    );
  }
}

export default LoginRoute;