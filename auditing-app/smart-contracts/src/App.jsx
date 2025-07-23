// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddReport from "./pages/AddReport";
// Import other pages when created, e.g., ViewReports

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<AddReport />} />
          {/* <Route path="/reports" element={<ViewReports />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
