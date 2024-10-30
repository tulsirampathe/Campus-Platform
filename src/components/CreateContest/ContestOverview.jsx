import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaTrophy } from "react-icons/fa";

function ContestOverview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { contestData, contestDetails } = location.state; // Assuming contestDetails holds contest-level details

  const handleSolveClick = (problem) => {
    navigate("/solve", { state: { problem, contestData, contestDetails } });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Contest Information */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
          {contestDetails.contestName || "Contest Name"}
        </h1>
        <p className="text-lg text-gray-600">
          {contestDetails.description ||
            "Prepare to take on exciting coding challenges!"}
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <span className="bg-indigo-100 text-indigo-600 py-1 px-3 rounded-full font-semibold">
            Start: {contestDetails.startTime}
          </span>
          <span className="bg-indigo-100 text-indigo-600 py-1 px-3 rounded-full font-semibold">
            End: {contestDetails.endTime}
          </span>
        </div>
      </div>

      {/* Problem List */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contestData.map((problem, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border-t-4 border-indigo-500"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {problem.problemTitle}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {problem.description}
            </p>

            {/* Icons for Time and Points */}
            <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
              <div className="flex items-center gap-1">
                <FaClock className="text-indigo-500" />
                <span>{problem.timeLimit} min</span>
              </div>
              <div className="flex items-center gap-1">
                <FaTrophy className="text-yellow-500" />
                <span>{problem.points} Points</span>
              </div>
            </div>

            {/* Solve Button */}
            <button
              onClick={() => handleSolveClick(problem)}
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Solve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContestOverview;
