import React, { Component } from 'react'
import './LandingPage.css'

export default class LandingPage extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="aboutme-container">
          <h1 className="app-title">Welcome to Clear Mind</h1>
            <div className="aboutme-text">
              <p className="desc">Clear Mind is an app you may use to express yourself.</p>
              <p className="desc">View your past and current thoughts by choosing different dates on the calendar.</p>
              <p className="desc">Some of the features you will be able to enjoy below:</p>
              <ul className ="aboutme-list">
                <li className="desc-bullet">Express yourself with a mindful act</li>
                <li className="desc-bullet">Express your thoughts while you Bullet Journal</li>
                <li className="desc-bullet">Express your sleep hrs</li>
                <li className="desc-bullet">Express your daily to dos</li>
                <li className="desc-bullet">Express your feelings</li>
              </ul>
            </div>
        </div>
      </div>
    )
  }
}


