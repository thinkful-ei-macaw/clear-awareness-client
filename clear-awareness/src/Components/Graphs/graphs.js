import React from "react";
import Config from "../../config";
import TokenService from "../../Services/token-service";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default class Graphs extends React.Component {
  state = {
    sleep: [],
    emtions: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    return fetch(`${Config.API_ENDPOINT}/api/journal`, {
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((data) => {
        const sleep = data.map((x) => {
          return { name: x.date_created, value: x.sleep_hours };
        });
        const emotions = data.map((x) => x.emotions);
        this.setState({ sleep: sleep, emotions: emotions });
      })
      .catch((error) => console.error(error));
  }

  render() {
    console.log(this.state.sleep);
    return (
      <div className="main-graph">
        <div style={{ width: "calc(100vw - 20px)", height: 300 }}>
          <ResponsiveContainer>
            <LineChart className="Graph" data={this.state.sleep}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                fontSize="20px"
                dataKey="name"
                padding={{ left: 30, right: 30 }}
              />
              <YAxis
                name="Hours"
                dataKey="value"
                fontSize="20px"
                domain={[0, 24]}
              />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* insert pie chart here */}
      </div>
    );
  }
}
