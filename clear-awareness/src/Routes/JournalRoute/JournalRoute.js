import React from "react";
import Journal from "../../Components/Journal/Journal";
import JournalForm from "../../Components/JournalForm/JournalForm";
import { parse } from "date-fns";
import isValid from "date-fns/isValid";

export default class JournalRoute extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = {
    exist: true,
  };

  redirectToDashboard = () => {
    console.log("we going back to the dashboard");
    const { history } = this.props;
    const destination = "/dashboard";
    history.push(destination);
    console.log("redrected...");
  };

  render() {
    const date = parse(this.props.match.params.date, "yyyy-MM-dd", new Date());
    console.log(date);
    if (!isValid(date)) {
      return <h1>Invalid date</h1>;
    }
    return (
      <div>
        {this.state.exist ? (
          <Journal date={date}/>
        ) : (
          <JournalForm date={date} redirectToDashboard={this.redirectToDashboard} />
        )}
      </div>
    );
  }
}
