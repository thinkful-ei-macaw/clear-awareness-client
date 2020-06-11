import React, { Component } from "react";
import "./LandingPage.css";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="aboutme-container">
          <h1 className="app-title">Welcome to Clear Mind</h1>
          <div className="aboutme-text">
            <p className="desc">
              Clear Mind is an app you may use to express yourself.
            </p>
            <p className="desc">
              View your past and current thoughts by choosing different dates on
              the calendar.
            </p>
            <p className="desc">
              Some of the features you will be able to enjoy below:
            </p>

            <p className="desc-bullet">Express yourself with a mindful act</p>
            <p className="desc-bullet">
              Express your thoughts while you Bullet Journal
            </p>
            <p className="desc-bullet">Express your sleep hrs</p>
            <p className="desc-bullet">Express your daily to dos</p>
            <p className="desc-bullet">Express your feelings</p>

            <div>
              <p>Demo username: demouser</p>
              <p>Demo password: P@ssw0rd</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
