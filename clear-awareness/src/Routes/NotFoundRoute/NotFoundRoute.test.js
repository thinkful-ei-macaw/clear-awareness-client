import React from 'react';
import ReactDOM from "react-dom";
import NotFoundRoute from './NotFoundRoute';

it("renders without crashing", () => {
    const aDay = "2020-01-01";
    const div = document.createElement("div");
    ReactDOM.render(<NotFoundRoute />, div);
    ReactDOM.unmountComponentAtNode(div);
  });