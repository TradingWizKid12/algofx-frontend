// Example for src/main.tsx (adjust filename if yours is different)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { HelmetProvider } from 'react-helmet-async'; // <<< 1. ADD THIS IMPORT

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider> {/* <--- 2. ADD THIS OPENING TAG */}
      <App />
    </HelmetProvider> {/* <--- 3. ADD THIS CLOSING TAG */}
  </React.StrictMode>,
);