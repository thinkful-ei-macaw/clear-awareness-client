import React, { Component } from "react";
import Config from "../../config";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import UserContext from "../../Components/Context/UserContext";
import "./DashboardPage.css";
import { format } from 'date-fns';
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
    date: new Date()
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
        console.log(data.quotations);
        this.setState({ quotes: data.quotations });
      })
      .catch((error) => console.error(error));
  }
  onChange = (date) => {
    this.setState({ date });
    console.log(this.state.date);
  };

  onClickDay = (date) => {
    this.redirectToJournalDate(date);
    this.context.setDate({ date });
  };
  redirectToJournalDate = (date) => {
    const { history } = this.props;
    const destination = `/journal/${format(date, 'yyyy-MM-dd')}`;
    history.push(destination);
  };

  render() {
    
    //put date in URL 
    //parse and figure out date
    //send json in YYYY-MM-DD format 

    const randomIndex = Math.floor(Math.random() * this.state.quotes.length);
    let newquote = this.state.quotes[randomIndex];

    return (
      <div className="centering">
        <div>
          <h1>Dashboard: Mindfulness Center.</h1>
          <p>Quote of the day</p>
        </div>
        <ul>{this.state.quotes.length === 0 ? [] : newquote.quotation}</ul>
        <div className="calender">
          <Calendar
            onChange={this.onChange}
            onClickDay={this.onClickDay}
            value={this.state.date}
          />
        </div>

        <p>Cumulative data on sleep here</p>
        <p>Cumulative data on emotions here</p>
      </div>
    );
  }
}
