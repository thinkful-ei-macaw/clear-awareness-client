import React from "react";
import Config from "../../config";
import TokenService from "../../Services/token-service";
import "./Journal.css";
import UserContext from "../../Components/Context/UserContext";
import PropTypes from "prop-types";
import { format } from "date-fns";

export default class Journal extends React.Component {
  static contextType = UserContext;

  static propTypes = {
    redirectToDashboard: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  };

  state = {
    id: null,
    date: "",
    emotions: "",
    mindful: "",
    sleep_hours: 0,
    tasks: [],
    entry: "",
    error: null,
    editFields: false,
  };

  //fetch request for journal
  componentDidMount() {
    this.getJournalData();
  }
  //populate journal
  getJournalData() {
    return Promise.all([
      fetch(
        `${Config.API_ENDPOINT}/api/journal/${format(
          this.props.date,
          "yyyy-MM-dd"
        )}`,
        {
          headers: {
            authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        }
      ),
    ])
      .then(([res]) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        console.log("this is the res", res);
        return Promise.all([res.json()]);
      })
      .then((data) => {
        console.log("this is the data", data);
        this.setState({
          id: data[0].id,
          date: data[0].date_created,
          emotions: data[0].emotions,
          entry: data[0].entry,
          mindful: data[0].mindful,
          sleep_hours: data[0].sleep_hours,
          tasks: data[0].tasks,
        });
      })
      .catch((error) => console.log({ error }));
  }

  handleDeleteJournal(e) {
    e.preventDefault();
    fetch(`${Config.API_ENDPOINT}/api/journal/${this.state.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
      })
      .then(() => {
        console.log("deleted success");
        this.props.redirectToDashboard();
      })
      .catch((res) => this.setState({ error: res.error }));
  }

  handleUpdateJournal(e) {
    this.setState({ editFields: true });
  }

  updateJournal() {
    fetch(`${Config.API_ENDPOINT}/api/journal/${this.state.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        entry: this.state.entry,
        mindful: this.state.mindful,
        sleep_hours: this.state.sleep_hours,
        emotions: this.state.emotions,
        tasks: this.state.tasks,
        id: this.state.id,
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
      })
      .then(() => {
        this.getJournalData();
        this.setState({ editFields: false });
      })
      .catch((res) => this.setState({ error: res.error }));
  }

  updateSleepHrs(value) {
    this.setState({
      sleep_hours: value,
    });
  }
  updateMindful(value) {
    this.setState({ mindful: value });
  }

  updateEntry(value) {
    this.setState({ entry: value });
  }
  updateTasks(value) {
    this.setState({ tasks: value });
  }
  updateEmotions(value) {
    this.setState({ emotions: value });
  }
  displayEmotions() {
    console.log(this.state.emotions, typeof this.state.emotions);
    if (this.state.emotions === "1") {
      return <i className="fas fa-grin"></i>;
    } else if (this.state.emotions === "2") {
      return <i className="fas fa-smile"></i>;
    } else if (this.state.emotions === "3") {
      return <i className="fas fa-frown"></i>;
    } else if (this.state.emotions === "4") {
      return <i className="fas fa-sad-tear"></i>;
    }
  }
  render() {
    console.log(this.state.emotions);
    return (
      <div className="journal-wrapper">
        <div className="journal-container">
          <div className="day">
            <h1>Journal</h1>

            <p>
              <span className="text-style">Today's date</span> {this.state.date}
            </p>

            <p className="text-style">How I felt</p>

            {this.state.editFields ? (
              <div className="emoji">
                <i
                  onClick={() => this.updateEmotions("1")}
                  className={
                    "fas fa-grin face-style " +
                    (Number(this.state.emotions) === 1
                      ? "face-style--visited"
                      : "")
                  }
                ></i>
                <i
                  onClick={() => this.updateEmotions("2")}
                  className={
                    "fas fa-smile face-style " +
                    (Number(this.state.emotions) === 2
                      ? "face-style--visited"
                      : "")
                  }
                ></i>
                <i
                  onClick={() => this.updateEmotions("3")}
                  className={
                    "fas fa-frown face-style " +
                    (Number(this.state.emotions) === 3
                      ? "face-style--visited"
                      : "")
                  }
                ></i>
                <i
                  onClick={() => this.updateEmotions("4")}
                  className={
                    "fas fa-sad-tear face-style " +
                    (Number(this.state.emotions) === 4
                      ? "face-style--visited"
                      : "")
                  }
                ></i>
              </div>
            ) : (
              <p>{this.displayEmotions(this.state.emotions)} </p>
            )}

            <p className="text-style">My mindful practice</p>
            {this.state.editFields ? (
              <input
                type="text"
                maxlength="100"
                value={this.state.mindful}
                id="mindful"
                name="mindful"
                onChange={(e) => this.updateMindful(e.target.value)}
                required
              />
            ) : (
              <p>{this.state.mindful}</p>
            )}
            <p className="text-style"> My beauty sleep was</p>
            {this.state.editFields ? (
              <input
                type="number"
                onChange={(e) => this.updateSleepHrs(e.target.value)}
                value={this.state.sleep_hours}
                id="sleep-hrs"
                name="sleep-hrs"
                min="0"
                max="24"
                required
              />
            ) : (
              <p>{this.state.sleep_hours} hours</p>
            )}
            <p className="text-style">Things I got done</p>
            {this.state.editFields ? (
              <input
                type="text"
                onChange={(e) => this.updateTasks(e.target.value.split(","))}
                value={this.state.tasks}
                id="tasks"
                name="tasks"
                maxlength="200"
              />
            ) : (
              <p>
                {this.state.tasks.map((x, id) => {
                  return (
                    <li className="listing" key={id}>
                      {x}
                    </li>
                  );
                })}
              </p>
            )}
            <p className="text-style">My Thoughts</p>
            {this.state.editFields ? (
              <textarea
                id="textarea-style"
                name="textarea-style"
                row="5"
                col="15"
                maxlength="500"
                value={this.state.entry}
                onChange={(e) => this.updateEntry(e.target.value)}
              >
                {this.state.entry}
              </textarea>
            ) : (
              <p>{this.state.entry}</p>
            )}
          </div>
          <div className="btn-nav">
            {this.state.editFields  ? (
              this.state.sleep_hours>=0 && this.state.sleep_hours<=24
              ?
              <button
                className="journal-btn"
                onClick={this.updateJournal.bind(this)}
              >
                Save
              </button> : <button
                className="journal-btn"
                type="submit"
                disabled
                onClick={(e) => this.handleUpdateJournal(e)}
              >
                Edit journal entry
              </button>
            ) : (
              
              <button
                className="journal-btn"
                type="submit"
                
                onClick={(e) => this.handleUpdateJournal(e)}
              >
                Edit journal entry
              </button>
            )}
            <button
              className="journal-btn"
              type="submit"
              onClick={(e) => this.handleDeleteJournal(e)}
            >
              Delete Journal Entry
            </button>
            <button
              className="journal-btn"
              type="submit"
              onClick={this.props.redirectToDashboard}
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }
}
