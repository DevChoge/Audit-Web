import { useState } from "react";
import { getContract } from "../utils/contract";

export default function AddReport() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const contract = await getContract();
      const tx = await contract.addReport(name, details);
      await tx.wait();
      setStatus("Report added successfully!");
      setName("");
      setDetails("");
    } catch (error) {
      console.error(error);
      setStatus("Failed to add report");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Audit Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded p-2"
          placeholder="Report name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="w-full border rounded p-2"
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
