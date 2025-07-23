import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddReport from "./pages/AddReport";
import Navbar from "./components/Navbar";
import "./index.css"; // if you're using Tailwind

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<AddReport />} />
      {/* You can add more routes later */}
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
