import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let rootDiv = document.getElementById('root');

if (!rootDiv) {
  rootDiv = document.body
}

const root = ReactDOM.createRoot(rootDiv);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


