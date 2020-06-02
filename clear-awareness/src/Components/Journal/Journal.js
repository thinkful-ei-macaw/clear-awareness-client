import React from "react";
import Config from "../../config";
import TokenService from "../../Services/token-service";
import "./Journal.css";
import UserContext from "../../Components/Context/UserContext";
import PropTypes from 'prop-types';
import { format } from "date-fns";
export default class Journal extends React.Component {
  static contextType = UserContext;
  
  static propTypes  ={
    date: PropTypes.instanceOf(Date).isRequired
  }
  //fetch request for journal
  componentDidMount() {
    this.getJournalData();
  }

  getJournalData() {

    return Promise.all([
      fetch(`${Config.API_ENDPOINT}/api/journal/${format(this.props.date, 'yyyy-MM-dd')}`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])
      .then(([res]) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        console.log("this is the res", res);
        return Promise.all([res.json()]);
      })
      .then((data) => {
        console.log(data);

        if (data.length === 0) {
          this.setState({ exist: false });
        }
        //set state for the info
      })
      .catch((error) => console.log({ error }));
  }

  render() {
    return (
      <div>
        <h1>Journal</h1>
        <div className="container">
          <div className="day">
            <p>Day 7</p>
          </div>
          <div>
            <div className="paper">
              <div className="lines">
                <div className="text" contentEditable spellCheck="false">
                  You can edit this text! <br />
                  <br />
                  Cupcake ipsum dolor sit amet liquorice fruitcake. Candy canes
                  jelly beans sweet roll cupcake lollipop. Powder carrot cake
                  toffee brownie. Marshmallow sweet roll donut. Chocolate cake
                  apple pie candy canes tiramisu dragée wafer. Croissant cookie
                  lemon drops tiramisu jelly-o donut. Sweet gummi bears ice
                  cream.
                  
                </div>
              </div>
              <div className="holes hole-top"></div>
              <div className="holes hole-middle"></div>
              <div className="holes hole-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
