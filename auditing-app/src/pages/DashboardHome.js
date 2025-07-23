import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem("auditReports");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Audit Dashboard";
  }, []);

  useEffect(() => {
    localStorage.setItem("auditReports", JSON.stringify(reports));
  }, [reports]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newId = reports.length ? Math.max(...reports.map(r => r.id)) + 1 : 1;
    const newReport = { id: newId, title: newTitle, status: newStatus };
    setReports([...reports, newReport]);
    setNewTitle("");
    setNewStatus("Pending");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this report?")) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  const handleEdit = (report) => {
    const newTitle = prompt("Update report title:", report.title);
    if (newTitle === null) return;
    const newStatus = prompt("Update status (Pending, In Progress, Completed):", report.status);
    if (newStatus === null) return;
    if (!newTitle.trim()) return alert("Title cannot be empty.");
    setReports(reports.map(r =>
      r.id === report.id ? { ...r, title: newTitle, status: newStatus } : r
    ));
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(reports, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-reports.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredReports = reports.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Audit Dashboard</h1>

      <form onSubmit={handleAdd} className="mb-4 space-y-2 md:flex md:space-y-0 md:space-x-2">
        <input
          type="text"
          placeholder="Report title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Report
        </button>
      </form>

      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full md:w-1/3"
        />
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Export Reports
        </button>
      </div>

      {filteredReports.length ? (
        <ul className="space-y-2">
          {filteredReports.map((r) => (
            <li
              key={r.id}
              className="border rounded p-3 flex justify-between items-center hover:shadow-md transition-shadow"
            >
              <Link
                to={`/dashboard/reports/${r.id}`}
                className="hover:underline font-semibold"
              >
                {r.title}
              </Link>
              <div className="flex items-center space-x-2">
                <span className={`text-sm px-2 py-0.5 rounded ${statusColor(r.status)}`}>
                  {r.status}
                </span>
                <button
                  onClick={() => handleEdit(r)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reports found.</p>
      )}
    </div>
  );
};

export default DashboardHome;
