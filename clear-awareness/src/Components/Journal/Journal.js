import React from 'react';


export default class Journal extends React.Component {
    //need proptypes

  render() {
    return (
      <div>
        <button type="submit" onClick={this.props.redirectToDashboard}>Go back</button>
      </div>
    );
  }
}