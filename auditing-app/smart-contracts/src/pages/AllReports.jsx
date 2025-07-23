import { useEffect, useState } from "react";
import { getContract } from "../utils/contract";

export default function AllReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const contract = await getContract();
      const nextId = await contract.nextReportId();

      const reportPromises = [];
      for (let i = 0; i < nextId; i++) {
        reportPromises.push(contract.getReport(i));
      }

      const fetchedReports = await Promise.all(reportPromises);
      setReports(fetchedReports);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Audit Reports</h2>
      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((report, index) => (
            <li key={index} className="border p-4 rounded">
              <p className="font-bold text-lg">{report.name}</p>
              <p>{report.details}</p>
              <p className="text-sm text-gray-500">
                Status: {["Pending", "Approved", "Flagged"][report.status]}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
