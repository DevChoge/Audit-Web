import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import DashboardHome from "./pages/DashboardHome";
import AuditReports from "./pages/AuditReports";
import Settings from "./pages/Settings";
import ReportDetail from "./pages/ReportDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          } />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard layout */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="reports" element={<AuditReports />} />
          <Route path="reports/:id" element={<ReportDetail />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
