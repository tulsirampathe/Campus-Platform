// src/components/AdminProfile.js

import React from "react";
import { adminProfile, previousContests } from "../../constants/data";
import {
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaTasks,
  FaUsers,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminProfile() {
  const navigate = useNavigate();

  const handleCreateContestClick = () => {
    navigate("/admin-contest-setup");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-lg p-6">
        <div className="flex items-center mb-8">
          <FaUserCircle className="text-indigo-500 text-5xl" />
          <div className="ml-4">
            <h1 className="text-xl font-semibold text-gray-700">
              {adminProfile.name}
            </h1>
            <p className="text-gray-500">{adminProfile.role}</p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleCreateContestClick}
            className="w-full flex items-center justify-center text-white bg-indigo-500 rounded-lg py-3 hover:bg-indigo-600 transition-colors duration-200"
          >
            <FaPlus className="mr-2" /> Create New Contest
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-gray-700 text-lg font-semibold">Admin Details</h2>
          <p className="flex items-center mt-4 text-gray-600">
            <FaEnvelope className="mr-2" /> {adminProfile.email}
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="w-3/4 p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <p className="text-gray-600 mt-2">
            Manage contests and view insights on participation.
          </p>
        </div>

        {/* Previous Contests Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">
            Previous Contests Created
          </h3>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {previousContests.map((contest) => (
              <div
                key={contest.id}
                className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-lg font-semibold text-indigo-700">
                  {contest.title}
                </h4>
                <p className="flex items-center text-gray-500 mt-2">
                  <FaCalendarAlt className="mr-2 text-indigo-500" /> Start:{" "}
                  {contest.startTime}
                </p>
                <p className="flex items-center text-gray-500">
                  <FaCalendarAlt className="mr-2 text-indigo-500" /> End:{" "}
                  {contest.endTime}
                </p>
                <div className="flex items-center justify-between mt-4 text-gray-600">
                  <p className="flex items-center">
                    <FaTasks className="mr-2 text-blue-500" />{" "}
                    {contest.totalProblems} Problems
                  </p>
                  <p className="flex items-center">
                    <FaUsers className="mr-2 text-green-500" />{" "}
                    {contest.participants} Participants
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminProfile;
