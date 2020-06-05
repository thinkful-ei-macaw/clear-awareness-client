import React from 'react';
import ReactDOM from "react-dom";
import PublicOnlyRoute from './PublicOnlyRoute';
import LoginRoute from '../LoginRoute/LoginRoute';
import { MemoryRouter } from 'react-router-dom';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<MemoryRouter ><PublicOnlyRoute exact path={'/login'} component={LoginRoute} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });