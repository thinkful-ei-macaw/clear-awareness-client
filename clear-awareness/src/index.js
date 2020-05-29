import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/Components/App/App';
import './index.css';
import { UserProvider } from './Components/Context/UserContext';

ReactDOM.render(<UserProvider><App /></UserProvider>, document.getElementById('root'));