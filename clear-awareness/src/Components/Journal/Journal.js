import React from "react";
import './Journal.css';

export default class Journal extends React.Component {
  //need proptypes

  render() {
    return (
      <div>
        <h1>Journal</h1>
        <div class="container">
          <div class="day">
            <p>Day 7</p>
          </div>

          <form className="planning-block">
            <div className="planning-block">
              <div class="mood">
                <label for="mood">Mood</label>
                <label for="happy">Happy</label>
                <input type="radio" id="mood" name="mood" value="happy" />
                <label for="ok">Ok</label>
                <input type="radio" id="mood" name="mood" value="Ok" />
                <label for="fine">Fine</label>
                <input type="radio" id="mood" name="mood" value="Fine" />
                <label for="terrible">Terrible</label>
                <input type="radio" id="mood" name="mood" value="Terrible" />
              </div>

              <label for="sleep">Sleep</label>
              <input
                type="text"
                id="sleep"
                name="sleep"
                placeholder="How much did u sleep last night?"
              />

              <label for="mindful-act">Mindful Act </label>
              <input
                type="text"
                id="mindful-act"
                name="mindful-act"
                placeholder="mindful act?"
              />

              <label for="tasks">Tasks</label>
              <input
                type="text"
                id="task-input"
                name="tasks"
                placeholder="Enter tasks" 
                />
              <button className='addTask'>add task</button>
              <label for="journal-field">Your Thoughts Here</label>
              <input
                type='text'
                id="journal"
                name="journal-field"
                placeholder="enter thoughts"
              />
              <button className="buton">submit</button>

        <button className="buton" type="submit" onClick={this.props.redirectToDashboard}>
          Go back
        </button>
            </div>
            
              
            
          </form>
        </div>
        
      </div>
    );
  }
}
