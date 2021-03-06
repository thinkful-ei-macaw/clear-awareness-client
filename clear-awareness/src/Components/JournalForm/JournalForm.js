import React, { Component } from "react";
import PropTypes from "prop-types";
import "./JournalForm.css";
import TokenService from "../../Services/token-service";
import Config from "../../config";
import { format } from "date-fns";

export default class JournalForm extends Component {
  static propTypes = {
    redirectToDashboard: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  };

  state = {
    tasks: [],
    edit: false,
    number: null,
  };

  //will be using this function for submit handler, POST
  createJournal = (e) => {
    e.preventDefault();
    fetch(`${Config.API_ENDPOINT}/api/journal/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entry: e.target.textarea.value,
        mindful: e.target.mindfulAct.value,
        tasks: this.state.tasks,
        sleep_hours: e.target.sleep.value,
        date_created: format(this.props.date, "yyyy-MM-dd"),
        emotions: e.target.mood.value,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((err) => Promise.reject(err)) : res.json()
    );
    this.props.redirectToDashboard();
  };

  addTask = (e) => {
    e.preventDefault();
    let task = document.getElementById("task-input").value;
    let tasks = this.state.tasks;

    if (task.length !== 0) {
      document.getElementById("task-input").value = "";
      tasks.push(task);
      this.setState({ tasks: tasks });
    }
  };

  handleEditTask = (e) => {
    e.preventDefault();

    let task = e.target.parentElement.parentElement.id;

    this.setState({ edit: true, number: task });
    //access value
    //edit value
  };

  handleInputEdit = (e) => {
    e.preventDefault();
    let task = this.state.number;
    let tasks = this.state.tasks;

    if (document.getElementById("edit-text-input").value.length !== 0) {
      tasks[task] = document.getElementById("edit-text-input").value;
      this.setState({ edit: false, number: null, tasks: tasks });
    } else {
      this.setState({ edit: false, number: false });
    }
  };

  handleDeleteTask = (e) => {
    e.preventDefault();

    //delete value from array
    let tasks = this.state.tasks;
    let task = e.target.parentElement.parentElement.id;

    tasks.splice(task, 1);

    this.setState({ tasks: tasks, edit: false, number: false });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({ edit: false, number: null });
  };

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.createJournal} className="journal-form">
          <fieldset className="mood">
            <legend>Mood</legend>
            <div className="emoji">
              <label htmlFor="happy">
                <input
                  type="radio"
                  name="mood"
                  id="happy"
                  value="1"
                  defaultChecked
                />
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
                <input type="radio" name="mood" id="terrible" value="4" />
                <i className="fas fa-sad-tear"></i>
              </label>
            </div>
          </fieldset>

          <div className="sleep-input">
            <label htmlFor="sleep">Sleep</label>
            <input
              type="number"
              id="sleep"
              autoComplete="off"
              name="sleep"
              min="0"
              max="24"
              step="1"
              placeholder="How much did u sleep last night?"
              required
            />
          </div>

          <div className="mindful-input">
            <label htmlFor="mindfulAct">Mindful Act </label>
            <input
              type="text"
              autoComplete="off"
              id="mindfulAct"
              name="mindfulAct"
              placeholder="Mindful Act?"
              maxLength="250"
              required
            />
          </div>

          <div className="task-input">
            <label htmlFor="tasks">Tasks</label>
            <input
              type="text"
              autoComplete="off"
              id="task-input"
              name="tasks"
              placeholder="Enter Tasks Here"
              maxLength="250"
            />
            <button
              type="button"
              className="addTask"
              id="add-task-button"
              onClick={this.addTask}
            >
              Add Task
            </button>
          </div>

          <div className="display-task">
            {this.state.edit ? (
              <div className="edit-input">
                <input
                  type="text"
                  autoComplete="off"
                  id="edit-text-input"
                  name="edit-text-input"
                  placeholder={`Task Title: ${
                    document.getElementById(`task-${this.state.number}`)
                      .textContent
                  }`}
                  required
                />
                <div className="input-cancel">
                  <button
                    type="button"
                    name="confirm-button"
                    id="confirm-button"
                    onClick={this.handleInputEdit}
                  >
                    Confirm Edit
                  </button>
                  <button
                    type="button"
                    name="cancel-button"
                    id="cancel-button"
                    onClick={this.handleCancel}
                  >
                    Cancel Edit
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <ul className="task-list">
              {this.state.tasks.map((task, index) => (
                <li id={index} key={index}>
                  <p className="bullet-tasks" id={`task-${index}`}>
                    {task}
                  </p>
                  <div className="edit-delete">
                    <button
                      type="button"
                      name="edit-button"
                      id="edit-button"
                      onClick={this.handleEditTask}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      name="edit-button"
                      id="delete-button"
                      onClick={this.handleDeleteTask}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="textarea-input">
            <label className="journallabel" htmlFor="textarea">
              Your Thoughts Here
            </label>
            <textarea
              id="textarea"
              name="textarea"
              rows="13"
              col="10"
              placeholder="Please place thoughts here."
              maxLength="500"
            ></textarea>
          </div>

          <div className="button-input">
            <button
              className="button"
              type="submit"
              id="go-back-button"
              onClick={this.props.redirectToDashboard}
            >
              Go Back
            </button>
            <button type="submit" className="button" id="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
