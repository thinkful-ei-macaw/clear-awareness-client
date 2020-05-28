import React, { Component } from "react";
import LoginForm from "../../Components/LoginForm/LoginForm";


class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    console.log("this is a success")
    const { location, history } = this.props;
    const destination = '/dashboard';
    history.push(destination);
  };

  render() {
    return (
      <div className="LoginRoute">
        <div className="login-wrapper">
          <section>
            <h2>Login</h2>
            <LoginForm onLoginSuccess={this.handleLoginSuccess} />
          </section>
        </div>
      </div>
    );
  }
}

export default LoginRoute;