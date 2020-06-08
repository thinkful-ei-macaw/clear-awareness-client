import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/Components/App/App';
import './index.css';
import { UserProvider } from './Components/Context/UserContext';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
ReactDOM.render(<ErrorBoundary><UserProvider><App /></UserProvider></ErrorBoundary>, document.getElementById('root'));