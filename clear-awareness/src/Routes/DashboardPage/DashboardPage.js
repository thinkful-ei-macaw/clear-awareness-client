import React, { Component } from "react";
import Config from "../../config";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
export default class Dashboard extends Component {

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
        console.log(data.quotations);
        this.setState({ quotes: data.quotations });
      })
      .catch((error) => console.error(error));
  }
  onChange = (date => {
    this.setState({ date }) 
    console.log(this.state.date)})

  onClickDay = (date =>{
    this.setState({ date }) 
    this.redirectToJournalDate();
  })
  redirectToJournalDate = () => {
    const { history } = this.props;
    const destination = '/journal';
    history.push(destination);
  };

  render() {
    console.log(this.state.quotes);

    const randomIndex = Math.floor((Math.random() * this.state.quotes.length))
    let newquote = this.state.quotes[randomIndex]
    
  

    return (
      <div>
        <h1>Dashboard: Mindfulness Center</h1>
        <p>Quote of the day</p>
        <ul>{this.state.quotes.length === 0 ? [] : newquote.quotation}</ul>
        <div>
          <Calendar onChange={this.onChange} onClickDay={this.onClickDay} value={this.state.date} />
        </div>
      </div>
    );
  }
}
