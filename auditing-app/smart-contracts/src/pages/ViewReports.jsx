import { useEffect, useState } from "react";
import { getContract } from "../utils/contract";

export default function ViewReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      const contract = await getContract();
      const nextId = await contract.nextReportId();
      const fetched = [];

      for (let i = 0; i < nextId; i++) {
        try {
          const report = await contract.getReport(i);
          fetched.push({ ...report, id: i });
        } catch {
          // Skip deleted reports
        }
      }

      setReports(fetched);
    } catch (err) {
      console.error(err);
      setError("Failed to load reports");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const formatStatus = (status) => {
    return ["Pending", "Approved", "Flagged"][status];
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Audit Reports</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((r) => (
            <li key={r.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{r.name}</h3>
              <p className="text-gray-700 mb-1">{r.details}</p>
              <p className="text-sm text-gray-500">
                By: {r.reporter} | Status: {formatStatus(r.status)} |{" "}
                {new Date(Number(r.timestamp) * 1000).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
