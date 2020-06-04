import React from "react";
import Journal from "../../Components/Journal/Journal";
import JournalForm from "../../Components/JournalForm/JournalForm";
import { parse } from "date-fns";
import isValid from "date-fns/isValid";
import Config from '../../config';
import { format } from "date-fns";
import TokenService from '../../Services/token-service';
export default class JournalRoute extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = {
    exist: null,
  };
  componentDidMount(){

    fetch(`${Config.API_ENDPOINT}/api/journal/${this.props.match.params.date}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          this.setState({ exist: false });
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        this.setState({ exist: true });
      })
      .catch((err) => err.message);
  }
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

    if(this.state.exist === null){
      return 'Loading page.'
    }

    return (
      <div>
        {this.state.exist ? (
          <Journal date={date} redirectToDashboard={this.redirectToDashboard}/>
        ) : (
          <JournalForm date={date} redirectToDashboard={this.redirectToDashboard} />
        )}
      </div>
    );
  }
}
