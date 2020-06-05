import React from 'react';
import ReactDOM from "react-dom";
import JournalRoute from './JournalRoute';
import { parse } from 'date-fns';
import { MemoryRouter } from 'react-router-dom';

it("renders without crashing", () => {
    const aDay = "2020-01-01";
    const div = document.createElement("div");
    ReactDOM.render(<MemoryRouter ><JournalRoute match={{params: {date: aDay}}} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });