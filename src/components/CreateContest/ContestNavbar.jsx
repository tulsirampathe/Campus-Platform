/* eslint-disable react/prop-types */
import React from "react";
import { useLocation } from "react-router-dom";

function ContestNavbar({
  handleSaveProblem,
  handleSendToBackend,
  selectedLanguage,
  setSelectedLanguage,
}) {
  const location = useLocation();
  const { contestDetails } = location.state || {};
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Left Side: Test Name */}
      <div className="font-bold text-lg">
        <h1 className="text-lg font-semibold">{contestDetails.contestName}</h1>
      </div>

      {/* Mid Section: Save Problem and Create Contest Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleSaveProblem}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Save Problem
        </button>
        <button
          onClick={handleSendToBackend}
          className="bg-green-500 text-white p-2 rounded"
        >
          Create Contest
        </button>
      </div>

      {/* Right Side: Language Selection (Dropdown) */}
      <div>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-gray-700 p-2 rounded text-white"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>
    </div>
  );
}

export default ContestNavbar;
