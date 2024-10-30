import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Správná cesta k App.tsx
import './index.css';  // Pokud používáš styly

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);