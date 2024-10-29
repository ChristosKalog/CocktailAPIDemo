import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

if (typeof window !== 'undefined') {
  window.process = {
    env: {
      NODE_ENV: 'development' // or 'production' based on your environment
    }
  };
}



if (!('process' in window)) {
  // @ts-ignore
  window.process = {}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);