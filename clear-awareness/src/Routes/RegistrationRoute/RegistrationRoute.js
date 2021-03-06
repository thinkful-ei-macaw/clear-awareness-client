import React, { Component } from "react";
import RegistrationForm from "../../Components/RegistrationForm/RegistrationForm";
import './RegistrationRoute.css'

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <div className="RegistrationRoute">
        <div className="reg-wrapper">
          <section className="registrationroute-container">
            <h2>Sign up</h2>
            <RegistrationForm
              onRegistrationSuccess={this.handleRegistrationSuccess}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default RegistrationRoute;