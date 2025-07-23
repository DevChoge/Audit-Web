import React from "react";
import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Audit Dashboard</h2>
        <nav className="space-y-2">
          <Link to="/dashboard" className="block hover:underline">Home</Link>
          <Link to="/dashboard/reports" className="block hover:underline">Audit Reports</Link>
          <Link to="/dashboard/settings" className="block hover:underline">Settings</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
