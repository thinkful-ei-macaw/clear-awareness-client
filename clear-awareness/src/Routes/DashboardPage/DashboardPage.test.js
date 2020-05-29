import React from 'react';
import ReactDOM from "react-dom";
import DashboardPage from './DashboardPage';
import { BrowserRouter } from 'react-router-dom';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><DashboardPage /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });