import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddReport from "./pages/AddReport";
import ViewReports from "./pages/ViewReports";
import "./index.css"; // if you have global styles

const App = () => (
  <Router>
    <div className="p-4">
      <nav className="flex gap-4 mb-6">
        <Link to="/" className="text-blue-600 hover:underline">
          Add Report
        </Link>
        <Link to="/view" className="text-blue-600 hover:underline">
          View Reports
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<AddReport />} />
        <Route path="/view" element={<ViewReports />} />
      </Routes>
    </div>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
