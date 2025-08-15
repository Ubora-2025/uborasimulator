import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Tailwind ou autre CSS global

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>       {/* ✅ Router global */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
