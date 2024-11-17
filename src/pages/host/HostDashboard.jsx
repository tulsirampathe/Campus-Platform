import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaPlus,
  FaTasks,
  FaUserCircle,
  FaUsers
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import useMutationToast from "../../hooks/useMutationToast";
import {
  useMyChallengesQuery,
  useUpdateHostMutation,
} from "../../redux/api/api";
import {
  hostExists,
  setChallengeID,
  setQuestionID,
} from "../../redux/reducers/auth";
import ContestSetup from "./ChallengeSetup";

function HostDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [showContestSetup, setShowContestSetup] = useState(false);

  const { host } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setQuestionID(null));
  }, [dispatch]);

  const { isLoading: challengeLoading, data: myChallengesData } =
    useMyChallengesQuery("");

  const [updateHost, { isLoading, isSuccess, data, isError, error }] =
    useUpdateHostMutation();

  const handleChallenge = (challengeID) => {
    dispatch(setChallengeID(challengeID));
    navigate("/overview");
  };

  const handleCreateContest = () => {
    setShowContestSetup(true);
  };

  const handleCloseContestSetup = () => {
    setShowContestSetup(false);
  };

  const handleEditDetails = async (e) => {
    e.preventDefault();

    const updatedDetails = {
      username: e.target.username.value,
    };

    await updateHost(updatedDetails);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(hostExists(data?.host));
      setIsEditing(false);
    }
  }, [isSuccess]);

  // Call the custom hook to handle toast notifications
  useMutationToast({
    isLoading,
    isSuccess,
    data,
    isError,
    error,
    successMessage: "Host updated successfully",
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen relative">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-1/4 p-6">
          {isEditing ? (
            <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-200 z-10 relative">
              <form onSubmit={handleEditDetails} className="mb-4">
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">
                  Edit Host Details
                </h3>
                <input
                  name="username"
                  defaultValue={host.username}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter new username"
                  required
                />
                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200"
                  >
                    Update Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="ml-2 bg-gray-400 text-white py-2 px-4 rounded-md shadow hover:bg-gray-500 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-200 z-10 relative">
                <div className="flex items-center mb-6">
                  <FaUserCircle className="text-indigo-600 text-6xl" />
                  <div className="ml-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                      {host.username}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-center gap-8 mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-6 rounded-full font-medium shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-200 transform hover:scale-105 whitespace-nowrap"
                  >
                    <FaTasks />
                    Edit Details
                  </button>
                </div>
              </div>
            </>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Dashboard Overview */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
              Dashboard Overview
            </h2>
            <p className="text-gray-600">
              Welcome, {host.username}. Manage contests, create events, and view
              insights from your recent contests.
            </p>
          </section>

          {/* Previous Contests Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">
              Recent Contests
            </h3>
            {challengeLoading ? (
              <LoadingSpinner />
            ) : myChallengesData?.challenges?.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {myChallengesData.challenges.map((challenge) => (
                  <div
                    key={challenge._id}
                    className="bg-gray-50 border border-indigo-200 rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300"
                  >
                    <button onClick={() => handleChallenge(challenge._id)}>
                      <h4 className="text-lg font-semibold text-indigo-700">
                        {challenge.title}
                      </h4>
                      <p className="flex items-center text-gray-500 mt-2">
                        <FaCalendarAlt className="mr-2 text-indigo-600" />
                        Start:{" "}
                        {new Date(challenge.startTime).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="flex items-center text-gray-500">
                        <FaCalendarAlt className="mr-2 text-indigo-600" />
                        End:{" "}
                        {new Date(challenge.endTime).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <div className="flex items-center justify-between mt-4 text-gray-600">
                        <p className="flex items-center">
                          <FaTasks className="mr-2 text-blue-500" />{" "}
                          {challenge.questions.length} Problems
                        </p>
                        <p className="flex items-center">
                          <FaUsers className="mr-2 text-green-500" />{" "}
                          {challenge.participants.length} Participants
                        </p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No contests created yet.</p>
            )}
          </section>
        </main>
      </div>

      {/* Floating Add Problem Button */}
      <button
        onClick={handleCreateContest}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white py-3 px-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center gap-2"
      >
        <FaPlus />
        Create New Contest
      </button>

      {/* ContestSetup Panel */}
      {showContestSetup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
          <ContestSetup onClose={handleCloseContestSetup} />
        </div>
      )}
    </div>
  );
}

export default HostDashboard;
