import React, { useState, useEffect } from "react";

const Settings = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [notify, setNotify] = useState(true);

  useEffect(() => {
    document.title = "Settings - Audit Dashboard";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Admin Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
            className="mr-2"
          />
          <label>Enable email notifications</label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
