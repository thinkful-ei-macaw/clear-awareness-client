import React, { Component } from 'react'
import './LandingPage.css'

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className="aboutme-container">
          <h1>Welcome to Clear Mind</h1>
            <div className="aboutme-text">
              <p>Clear Mind is an app you may use to express yourself.</p>
              <p>View your past and current thoughts by choosing different dates on the calendar.</p>
              <p>Some of the features you will be able to enjoy below:</p>
              <ul className ="aboutme-list">
                <li>Express yourself with a mindful act</li>
                <li>Express your thoughts while you Bullet Journal</li>
                <li>Express your sleep hrs</li>
                <li>Express your daily to dos</li>
                <li>Express your feelings</li>
              </ul>
            </div>
        </div>
      </div>
    )
  }
}


