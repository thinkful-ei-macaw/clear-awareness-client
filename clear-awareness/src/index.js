import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/Components/App/App';
import './index.css';
import { UserProvider } from './Components/Context/UserContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<BrowserRouter><UserProvider><App /></UserProvider></BrowserRouter>, document.getElementById('root'));