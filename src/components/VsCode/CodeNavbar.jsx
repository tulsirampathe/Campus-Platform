/* eslint-disable react/prop-types */
import React from "react";
import { FaHome } from "react-icons/fa";
import { FiSettings, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

function CodeNavbar({ handleRun, onSelect, toggleProblemList, challenge }) {

  return (
    <div className="w-full h-[7vh] flex justify-between items-center px-6 bg-white border-b border-gray-200 shadow-md">
      {/* Left Section: Home Link, Divider, Contest Name, and View Problems Button */}
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="flex items-center text-gray-700 hover:text-indigo-700 transition-colors duration-200"
        >
          <FaHome className="mr-2 text-lg" />
          <span className="font-semibold">Home</span>
        </Link>

        {/* Divider */}
        <div className="border-l-2 border-gray-300 h-6 mx-4"></div>

        {/* Contest Name */}
        <h1 className="text-lg font-semibold  bg-gray-100 px-3 py-1 rounded-md shadow-sm">
          {challenge?.title || "Contest Name"}
        </h1>

        {/* View Problems Button */}
        <button
          onClick={toggleProblemList}
          className="bg-blue-500 text-white px-4 py-1 rounded-md shadow hover:bg-blue-600 transition-all duration-200"
        >
          View Problems
        </button>
      </div>

      {/* Middle Section: Run, Submit, and Language Dropdown */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleRun}
          className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-500 transition-transform transform hover:scale-105"
        >
          Run
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500 transition-transform transform hover:scale-105">
          Submit
        </button>

        <select
          onChange={onSelect}
          className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md shadow-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
        </select>
      </div>

      {/* Right Section: Settings and User Icons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-indigo-700 transition-colors duration-200">
          <FiSettings className="text-xl" />
        </button>
        <button className="text-gray-600 hover:text-indigo-700 transition-colors duration-200">
          <FiUser className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default CodeNavbar;
