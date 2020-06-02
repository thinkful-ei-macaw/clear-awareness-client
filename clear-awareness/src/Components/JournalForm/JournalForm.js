import React, { Component } from "react";
import PropTypes from 'prop-types'
import './JournalForm.css';
import TokenService from '../../Services/token-service';
import Config from '../../config';
import { format } from "date-fns";
export default class JournalForm extends Component {
  static propTypes = {
    redirectToDashboard: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired
  }

  state = {
    
  }
  
  //will be using this function for submit handler, POST
  createJournal = e => {
    fetch(`${Config.API_ENDPOINT}/api/journal/`, {
      method:'POST',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        entry: e.target.textarea.value,
        mindful: e.target.mindfulAct.value,
        tasks: e.target.tasks.value,
        sleep_hours: e.target.sleep.value,
        date_created: format(this.props.date, 'yyyy-MM-dd'),
        emotions: e.target.mood.value,
      })
    }).then((res) => 
      !res.ok ? res.json().then((err) => Promise.reject(err)) : res.json() 
    );
  }
  
  render() {

    console.log('this is the date', this.props.date)

    return (
     

        <form onSubmit={this.createJournal} className="planning-block">
          <div className="planning-block">
            <div className="mood">
              <label htmlFor="mood">Mood</label>
              <label htmlFor="happy">Happy</label>
              <input type="radio" id="mood" name="mood" value="1" />
              <label htmlFor="ok">Ok</label>
              <input type="radio" id="mood" name="mood" value="2" />
              <label htmlFor="fine">Fine</label>
              <input type="radio" id="mood" name="mood" value="3" />
              <label htmlFor="terrible">Terrible</label>
              <input type="radio" id="mood" name="mood" value="4" />
            </div>

            <label htmlFor="sleep">Sleep</label>
            <input
              type="text"
              id="sleep"
              name="sleep"
              placeholder="How much did u sleep last night?"
            />

            <label htmlFor="mindfulAct">Mindful Act </label>
            <input
              type="text"
              id="mindfulAct"
              name="mindfulAct"
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

            <label htmlFor="textarea">Your Thoughts Here</label>
            <textarea id="textarea" name="textarea" rows="4" col="10" placeholder="Please place thoughts here."></textarea>
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
