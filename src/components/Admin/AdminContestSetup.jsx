import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminContestSetup() {
  const [contestName, setContestName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleStartContest = () => {
    const contestDetails = {
      contestName,
      startTime,
      endTime,
      description,
    };

    // Navigate to AdminContestPanel and pass contestDetails
    navigate("/admin-contest-panel", { state: { contestDetails } });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Set Contest Details</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Contest Name</label>
          <input
            type="text"
            value={contestName}
            onChange={(e) => setContestName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>
        <button
          onClick={handleStartContest}
          className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
        >
          Start Contest
        </button>
      </div>
    </div>
  );
}

export default AdminContestSetup;
