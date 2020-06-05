import React from 'react';
import ReactDOM from "react-dom";
import JournalForm from './JournalForm';
import { MemoryRouter } from 'react-router-dom';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<MemoryRouter><JournalForm date={new Date()} redirectToDashboard={e => (e)} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });