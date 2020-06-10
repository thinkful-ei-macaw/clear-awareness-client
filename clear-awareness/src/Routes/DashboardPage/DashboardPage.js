import React, { Component } from "react";
import Config from "../../config";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import UserContext from "../../Components/Context/UserContext";
import "./DashboardPage.css";
import { format } from "date-fns";
import Graphs from "../../Components/Graphs/graphs";
export default class Dashboard extends Component {
  static contextType = UserContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = {
    quotes: [],
    date: new Date(),
  };

  componentDidMount() {
    this.getQuotes();
  }

  getQuotes() {
    return fetch(`${Config.API_ENDPOINT}/api/quotes`)
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((data) => {
        this.setState({ quotes: data.quotations });
      })
      .catch((error) => console.error(error));
  }
  onChange = (date) => {
    this.setState({ date });
  };

  onClickDay = (date) => {
    this.redirectToJournalDate(date);
    this.context.setDate({ date });
  };
  redirectToJournalDate = (date) => {
    const { history } = this.props;
    const destination = `/journal/${format(date, "yyyy-MM-dd")}`;
    history.push(destination);
  };

  render() {
    const randomIndex = Math.floor(Math.random() * this.state.quotes.length);
    let newquote = this.state.quotes[randomIndex];

    return (
      <div className="dash">
        <div className="centering">
          <div>
            <h2 className="deco">Mindfulness Center</h2>
            <h3>Mindful Quote</h3>
          </div>
          <ul className="no-ul-margin">
            {this.state.quotes.length === 0 ? (
              []
            ) : (
              <p className="quote">
                "{newquote.quotation}" <br />
                --{newquote.author}
              </p>
            )}
          </ul>
          <h3 className="instructions">
            Click on a day within the calendar to begin.
          </h3>
          <div className="calender">
            <Calendar
              className="calendars"
              onChange={this.onChange}
              onClickDay={this.onClickDay}
              value={this.state.date}
            />
          </div>
          <div className="graphs">
            <Graphs />
          </div>
        </div>
      </div>
    );
  }
}
