import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AllReports from './pages/AllReports';
import AddReport from './pages/AddReport';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<AllReports />} />
          <Route path="/add" element={<AddReport />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);
