import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../../services/auth-api-service";
import "./RegistrationForm.css";

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        name.value = "";
        username.value = "";
        password.value = "";
        this.props.onRegistrationSuccess();
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
      <form className="registration-form" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error}</p>}</div>
        <div>
          <label htmlFor="registration-name-input">
            Enter your name

          </label>
          <input
            ref={this.firstInput}
            id="registration-name-input"
            name="name"
            required
          />
        </div>
        <div>
          <label htmlFor="registration-username-input">
            Choose a username
            
          </label>
          <input id="registration-username-input" name="username" required />
        </div>
        <div>
          <label htmlFor="registration-password-input">
            Choose a password
          </label>
          <input
            id="registration-password-input"
            name="password"
            type="password"
            required
          />
        </div>
        <footer>
          <button type="submit">Sign up</button>{" "}
          <Link to="/login">
            <button type="button" id="account">
              Already have an account?
            </button>
          </Link>
        </footer>
      </form>
    );
  }
}

export default RegistrationForm;