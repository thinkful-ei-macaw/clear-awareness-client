import React, { Component } from "react";
import AuthApiService from "../../Services/auth-api-service";
import UserContext from "../Context/UserContext";
import "./LoginForm.css"


class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
    
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { username, password } = ev.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
       
        username.value = "";
        password.value = "";
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error}</p>}</div>
        <div className="input-box">
          <label htmlFor="login-username-input">Username</label><br/>
          <input
            ref={this.firstInput}
            id="login-username-input"
            name="username"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="login-password-input">Password</label><br/>
          <input
            id="login-password-input"
            name="password"
            type="password"
            required
          />
        </div>
        <button className="login-btn" type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;