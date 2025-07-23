import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const reports = JSON.parse(localStorage.getItem("auditReports")) || [];
  const report = reports.find(r => r.id === Number(id));

  useEffect(() => {
    document.title = report ? `Report ${report.id} Detail` : "Report Not Found";
  }, [report]);

  if (!report) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Report Not Found</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Report {report.id} Detail</h1>
      <p><strong>Title:</strong> {report.title}</p>
      <p><strong>Status:</strong> {report.status}</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ReportDetail;
