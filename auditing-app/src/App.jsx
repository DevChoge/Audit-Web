import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddReport from "./pages/AddReport";
// Add other pages as you build them

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddReport />} />
        {/* More routes can be added here */}
      </Routes>
    </Router>
  );
}
