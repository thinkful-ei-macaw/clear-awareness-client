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
    tasks: []
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
        tasks: this.state.tasks,
        sleep_hours: e.target.sleep.value,
        date_created: format(this.props.date, 'yyyy-MM-dd'),
        emotions: e.target.mood.value,
      })
    }).then((res) => 
      !res.ok ? res.json().then((err) => Promise.reject(err)) : res.json() 
    );
  }

  addTask = e => {
    e.preventDefault();
    let task = document.getElementById("task-input").value;
    let tasks = this.state.tasks;

    if (task.length !== 0) {
      document.getElementById("task-input").value = "";
      tasks.push(task);
      this.setState({tasks: tasks});
    }

  }
  
  render() {

    console.log('this is the date', this.props.date)
    //happy, ok, fine, terrible
    return (
      <div className="journal-form">
        <form onSubmit={this.createJournal}>
            <fieldset className="mood">
              <legend>Mood</legend>
              <div className="emoji">
                <label htmlFor="happy">
                  <input type="radio" name="mood" id="happy" value="1" />
                  <i className="fas fa-grin"></i>
                </label>
                <label htmlFor="ok">
                  <input type="radio" name="mood" id="ok" value="2" />
                  <i className="fas fa-smile"></i>
                </label>
                <label htmlFor="fine">
                  <input type="radio" name="mood" id="fine" value="3" />
                  <i className="fas fa-frown"></i>
                </label>
                <label htmlFor="terrible">
                  <input type="radio" name="mood" id="terrible" value="4"/>
                  <i className="fas fa-sad-tear"></i>
                </label>
              </div>
            </fieldset>

            <div className="sleep-input">
              <label htmlFor="sleep">Sleep</label>
              <input
                type="text"
                id="sleep"
                name="sleep"
                placeholder="How much did u sleep last night?"
              />
            </div>

            <div className="mindful-input">
              <label htmlFor="mindfulAct">Mindful Act </label>
              <input
                type="text"
                id="mindfulAct"
                name="mindfulAct"
                placeholder="Mindful Act?"
              />
            </div>

            <div className="task-input">
              <label htmlFor="tasks">Tasks</label>
              <input
                type="text"
                id="task-input"
                name="tasks"
                placeholder="Enter Tasks Here"
                required
              />
              <button className="addTask" onClick={this.addTask} >Add Task</button>
            </div>
            
            <div className="textarea-input">
              <label htmlFor="textarea">Your Thoughts Here</label>
              <textarea id="textarea" name="textarea" rows="4" col="10" placeholder="Please place thoughts here."></textarea>
            </div>

            <div className="button-input">
            <button
                className="buton"
                type="submit"
                onClick={this.props.redirectToDashboard}
              >
                Go Back
              </button>
              <button className="buton">Submit</button>
            </div>
        </form>

        <div className="display-task">
          {(this.state.tasks.length === 0) ? <h1></h1> : <h2>Tasks</h2>}
          <ul className="task-list">
            {this.state.tasks.map((task, index) => <li key={index}>{task}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}
