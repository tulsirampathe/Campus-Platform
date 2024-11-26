import "animate.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useJoinChallengeMutation } from "../../redux/api/api";
import useMutationToast from "../../hooks/useMutationToast";
import { setChallengeID } from "../../redux/reducers/auth";

const Body = () => {
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  const [activePanel, setActivePanel] = useState("student");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [joinChallenge, joinStatus] = useJoinChallengeMutation();

  useMutationToast({
    ...joinStatus,
    successMessage: joinStatus.data?.message || "Challenge join successfully",
  });

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleSubmitKey = async () => {
    if (!key.trim()) {
      alert("Please enter a valid access key.");
      return;
    }
    try {
      await joinChallenge({ challengeKey: key });
    } catch (error) {
      console.error("Error while joining challenge:", error);
    }
  };

  useEffect(() => {
    if (joinStatus.isSuccess && joinStatus.data?.challengeID) {
      dispatch(setChallengeID(joinStatus.data.challengeID));
      navigate("/challenge-page");
    }
  }, [joinStatus.isSuccess, joinStatus.data, dispatch, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-800 via-gray-900 to-black">
      {/* Codenest Title and Description */}
      <div className="text-center text-white pt-32 mb-12">
        <h1 className="text-5xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to Codenest
        </h1>
        <p className="text-xl font-light mb-6 animate__animated animate__fadeIn animate__delay-1.5s">
          Codenest is a platform where teachers can create coding tests and
          students can take them. Enhance your coding skills with us.
        </p>
      </div>

      {/* Main Content Container */}
      <div className="flex items-center justify-center h-full px-8">
        {/* Tabs */}
        <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
          {/* Panel Content */}
          <div className="p-6 bg-gray-50 rounded-b-lg">
            {activePanel === "admin" && (
              <div className="text-center animate__animated animate__fadeIn">
                <h2 className="text-4xl font-semibold mb-6 text-yellow-400">
                  Admin Dashboard
                </h2>
                <p className="text-xl font-light mb-8">
                  As a teacher, you can create and manage tests for students.
                  Sign up now to start.
                </p>
                <div className="flex justify-center space-x-6">
                  <Link
                    to="/login"
                    className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-10 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}

            {activePanel === "student" && (
              <div className="text-center animate__animated animate__fadeIn">
                <h2 className="text-4xl font-semibold mb-6 text-yellow-400">
                  Student Access
                </h2>
                <p className="text-xl font-light mb-8">
                  Enter the access key to start your test. Please make sure to
                  enter the correct key.
                </p>
                <div className="flex justify-center space-x-4 mb-4">
                  <input
                    type="text"
                    value={key}
                    onChange={handleKeyChange}
                    className="px-4 py-2 rounded-md text-black w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                    placeholder="Enter access key"
                  />
                  <button
                    onClick={handleSubmitKey}
                    className="bg-teal-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
