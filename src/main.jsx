import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './scss/styles.scss';
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
