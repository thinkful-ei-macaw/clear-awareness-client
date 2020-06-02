import React from "react";
import Config from "../../config";
import TokenService from "../../Services/token-service";
import "./Journal.css";
import UserContext from "../../Components/Context/UserContext";
import PropTypes from "prop-types";
import { format } from "date-fns";
export default class Journal extends React.Component {
  static contextType = UserContext;

  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  };

  //fetch request for journal
  componentDidMount() {
    this.getJournalData();
  }
  //populate journal
  getJournalData() {
    return Promise.all([
      fetch(
        `${Config.API_ENDPOINT}/api/journal/${format(
          this.props.date,
          "yyyy-MM-dd"
        )}`,
        {
          headers: {
            authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        }
      ),
    ])
      .then(([res]) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        console.log("this is the res", res);
        return Promise.all([res.json()]);
      })
      .then((data) => {
        console.log("this is the data", data);

        //set state for the info
      })
      .catch((error) => console.log({ error }));
  }

  handleDeleteRequest(e, date) {
    e.preventDefault();
    fetch(`${Config.API_ENDPOINT}/journal/${this.props.date}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
      })
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <div>
        <h1>Journal</h1>
        <div className="container">
          <div className="day">
            <p>{this.props.date.toString()}</p>
          </div>
        </div>
      </div>
    );
  }
}
