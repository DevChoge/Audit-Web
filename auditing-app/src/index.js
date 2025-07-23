import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // <- Important: This brings in Tailwind CSS
import { AuthProvider } from './context/AuthContext'; // <- Wrap app with context

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
