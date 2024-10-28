/* eslint-disable react/prop-types */
import React from "react";

function ContestNavbar({
  problemDetails,
  setProblemDetails,
  handleSaveProblem,
  handleSendToBackend,
  selectedLanguage,
  setSelectedLanguage,
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Left Side: Test Name */}
      <div className="font-bold text-lg">
        <input
          type="text"
          placeholder="Test Name"
          className="bg-gray-700 p-2 rounded"
          value={problemDetails.testName}
          onChange={(e) =>
            setProblemDetails({ ...problemDetails, testName: e.target.value })
          }
        />
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
