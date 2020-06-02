import React, { Component } from "react";
import PropTypes from 'prop-types'
import './JournalForm.css';
export default class JournalForm extends Component {
  static propTypes = {
    redirectToDashboard: PropTypes.func.isRequired
  }

  render() {
    return (
     

        <form className="planning-block">
          <div className="planning-block">
            <div class="mood">
              <label htmlFor="mood">Mood</label>
              <label htmlFor="happy">Happy</label>
              <input type="radio" id="mood" name="mood" value="happy" />
              <label htmlFor="ok">Ok</label>
              <input type="radio" id="mood" name="mood" value="Ok" />
              <label htmlFor="fine">Fine</label>
              <input type="radio" id="mood" name="mood" value="Fine" />
              <label htmlFor="terrible">Terrible</label>
              <input type="radio" id="mood" name="mood" value="Terrible" />
            </div>

            <label htmlFor="sleep">Sleep</label>
            <input
              type="text"
              id="sleep"
              name="sleep"
              placeholder="How much did u sleep last night?"
            />

            <label htmlFor="mindful-act">Mindful Act </label>
            <input
              type="text"
              id="mindful-act"
              name="mindful-act"
              placeholder="mindful act?"
            />

            <label htmlFor="tasks">Tasks</label>
            <input
              type="text"
              id="task-input"
              name="tasks"
              placeholder="Enter tasks"
            />
            <button className="addTask">add task</button>
            <label htmlFor="journal-field">Your Thoughts Here</label>
            <input
              type="text"
              id="journal"
              name="journal-field"
              placeholder="enter thoughts"
            />
            <button className="buton">submit</button>

            <button
              className="buton"
              type="submit"
              onClick={this.props.redirectToDashboard}
            >
              Go back
            </button>
          </div>
        </form>
    );
  }
}
