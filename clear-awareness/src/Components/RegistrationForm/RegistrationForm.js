import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../../Services/auth-api-service";
import "./RegistrationForm.css";

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null, password: "", passwurd: "" };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, password, passwurd } = ev.target;
    this.setState({
      password: password,
      passwurd: passwurd,
    });
    if (this.state.passwurd !== this.state.password) {
      this.setState({ error: "Passwords do not match" });
    }

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
        <div className="input-box">
          <label htmlFor="registration-name-input">Enter your name</label>
          <br />
          <input
            ref={this.firstInput}
            id="registration-name-input"
            name="name"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="registration-username-input">Choose a username</label>
          <br />
          <input id="registration-username-input" name="username" required />
        </div>
        <div className="input-box">
          <label htmlFor="registration-password-input">Choose a password</label>
          <br />
          <input
            id="registration-password-input"
            name="password"
            type="password"
            required
          />
          <label htmlFor="validate-password">Confirm your password</label>
          <br />
          <input
            id="validate-password"
            name="passwurd"
            type="password"
            required
          />
        </div>
        <div className="center">
          <button className="registration-btn" type="submit">
            Sign up
          </button>{" "}
          <Link to="/login">
            <button type="button" className="registration-btn" id="account">
              Already have an account?
            </button>
          </Link>
        </div>
      </form>
    );
  }
}

export default RegistrationForm;
