import React from "react";
import Config from "../../config";
import "./graphs.css";
import TokenService from "../../Services/token-service";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
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
    emotions: [],
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
          let newDate = x.date_created.slice(5);
          return { name: newDate, value: x.sleep_hours };
        });
        const emotions = data.map((x) => x.emotions);
        this.setState({ sleep: sleep, emotions: emotions });
      })
      .catch((error) => console.error(error));
  }

  findEmotionData() {
    const base = this.state.emotions.length;
    const happy = this.state.emotions.filter((x) => x === "1");
    console.log(happy);
    const okay = this.state.emotions.filter((x) => x === "2");
    console.log(okay);
    const notGreat = this.state.emotions.filter((x) => x === "3");
    console.log(notGreat);
    const sad = this.state.emotions.filter((x) => x === "4");
    console.log(sad);
    const data = [
      {
        subject: "Happiness",
        A: happy.length,
        fullMark: base,
      },
      {
        subject: "Okay",
        A: okay.length,
        fullMark: base,
      },
      {
        subject: "Not Great",
        A: notGreat.length,
        fullMark: base,
      },
      {
        subject: "Sad",
        A: sad.length,
        fullMark: base,
      },
    ];
    return data;
  }

  render() {
    console.log(this.state);
    return (
      <div className="main-graph">
        <div
          className="linegraph"
          style={{ width: "calc(90vw - 20px)", height: 200 }}
        >
          <h3 className="sleep">Sleep patterns (Past week)</h3>
          <ResponsiveContainer>
            <LineChart className="Graph" data={this.state.sleep}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                fontSize="15px"
                dataKey="name"
                // padding={{ left: 30, right: 30 }}
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
        <h3>Emotion Mapping</h3>
        <RadarChart
          outerRadius={90}
          width={350}
          height={250}
          data={this.findEmotionData()}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis
            angle={30}
            domain={[0, this.state.emotions.length + 1]}
          />
          <Radar
            name="Emotions"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
        {/* insert pie chart here */}
      </div>
    );
  }
}
