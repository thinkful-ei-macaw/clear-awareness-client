import React from 'react';
import ReactDOM from "react-dom";
import PrivateOnlyRoute from './PrivateOnlyRoute';
import DashboardPage from '../DashboardPage/DashboardPage';
import { MemoryRouter } from 'react-router-dom';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<MemoryRouter ><PrivateOnlyRoute exact path={'/dashboard'} component={DashboardPage} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });