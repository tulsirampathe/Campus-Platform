/* eslint-disable react/prop-types */
import React from "react";
import { FiSettings, FiUser, FiX } from "react-icons/fi"; // Added FiX for close button

function CodeNavbar({handleRun, onSelect}) {
  return (
    <>
       <div className="w-full h-[7vh] flex justify-between items-center px-4 border-b border-gray-300">
        {/* Left Section: Test Name */}
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">Basic Logic Building 🤔</span>
        </div>

        {/* Middle Section: Run, Submit and Language Dropdown */}
        <div className="flex items-center space-x-6">
          <button
            onClick={handleRun}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-500 transition"
          >
            Run
          </button>
          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-500 transition">
            Submit
          </button>

          {/* Language Dropdown */}
          <select
            onChange={onSelect}
            className="bg-gray-200 px-3 py-2 rounded outline-none"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
          </select>
        </div>

        {/* Right Section: Settings and Profile */}
        <div className="flex items-center space-x-4">
          <button>
            <FiSettings className="text-xl" />
          </button>
          <button>
            <FiUser className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default CodeNavbar;
