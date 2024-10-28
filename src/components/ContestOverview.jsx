import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaTrophy } from "react-icons/fa";

function ContestOverview() {
  const navigate = useNavigate();
  const location = useLocation();
  const contestData = location.state.contestData;

  const handleSolveClick = (problem) => {
    // Navigate to solve page, passing the selected problem and the full contest data
    navigate("/solve", { state: { problem, contestData } });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Contest Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600">Contest Overview</h1>
        <p className="text-gray-500 mt-2">
          Get ready to solve exciting coding challenges!
        </p>
      </div>

      {/* Problems List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contestData.map((problem, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {problem.problemTitle}
            </h2>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {problem.description}
            </p>

            {/* Difficulty Level and Constraints */}
            <div className="flex items-center gap-2 mt-4">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  problem.difficulty === "Easy"
                    ? "bg-green-100 text-green-700"
                    : problem.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {problem.difficulty}
              </span>
              <div className="text-gray-400 text-sm flex items-center gap-1">
                <FaClock /> {problem.timeLimit} min
              </div>
              <div className="text-gray-400 text-sm flex items-center gap-1">
                <FaTrophy /> {problem.points} Points
              </div>
            </div>

            {/* Solve Button */}
            <button
              onClick={() => handleSolveClick(problem)}
              className="w-full mt-6 bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
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
