import React, { Component } from "react";
import RegistrationForm from "../../Components/RegistrationForm/RegistrationForm";


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
          <section>
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