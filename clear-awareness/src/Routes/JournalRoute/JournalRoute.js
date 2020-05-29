import React from "react";
import Journal from '../../Components/Journal/Journal';

export default class JournalRoute extends React.Component {
    static defaultProps = {
        location: {},
        history: {
          push: () => {},
        },
      };
      redirectToDashboard = () => {
          console.log('we going back to the dashboard')
        const { history } = this.props;
        const destination = '/dashboard';
        history.push(destination);
      };

  render() {
    return (
      <div>
        <p>something here for now</p>
        <Journal redirectToDashboard={this.redirectToDashboard} />
      </div>
    );
  }
}
