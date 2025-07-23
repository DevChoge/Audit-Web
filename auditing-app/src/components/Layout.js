import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
        {/* Left: Navigation links */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Right: Auth actions */}
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
