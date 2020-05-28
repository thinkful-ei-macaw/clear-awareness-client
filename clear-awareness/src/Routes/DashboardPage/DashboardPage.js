import React, { Component } from 'react';
import Config from '../../config';

export default class Dashboard extends Component { 

  state = {
    quotes: []
  }  

  
  componentDidMount() {
    this.getQuotes();
  }
  
  getQuotes() {
    return fetch(`${Config.API_ENDPOINT}/api/quotes`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(data => {
        console.log(data.quotations)
        this.setState({quotes: data.quotations});
      })
      .catch((error) => console.error(error));
  }
  
  render() {
    console.log(this.state.quotes);
    let theQuotes = this.state.quotes.map((x, id) => <li key={id}>{x.quotation}</li>)
    
    
    return (
      <div>
        <h1>Dashboard: Mindfulness Center</h1>
        <p>Quote of the day</p>
        <ul>
          {theQuotes}
        </ul>
      </div>
    )
  }
}


