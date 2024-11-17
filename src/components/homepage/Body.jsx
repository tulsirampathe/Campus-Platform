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

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [joinChallenge, joinStatus] = useJoinChallengeMutation();

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  useMutationToast({
    ...joinStatus,
    successMessage: joinStatus.data?.message || "Challenge join successfully",
  });

  useEffect(() => {
    if (joinStatus.isSuccess) {

      dispatch(setChallengeID(joinStatus.data?.challengeID));
      navigate("challenge-page");
    }
  }, [joinStatus.isSuccess]);

  const handleSubmitKey = async () => {
    await joinChallenge({ challengeKey: key });
  };

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
        {/* Admin (Teacher) Side */}
        {!user && (
          <>
            <div className="w-1/2 p-8 flex flex-col items-center text-white animate__animated animate__fadeIn animate__delay-2s">
              <h2 className="text-4xl font-semibold mb-6 text-yellow-400">
                Admin Dashboard
              </h2>
              <p className="text-xl font-light mb-8 text-center">
                As a teacher, you can create and manage tests for students. Sign
                up now to start.
              </p>
              <div className="flex space-x-6">
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

            <div className="w-px h-96 bg-gray-500 mx-6"></div>
          </>
        )}

        {/* Student Side */}
        <div className="w-1/2 p-8 flex flex-col items-center text-white animate__animated animate__fadeIn animate__delay-3s">
          <h2 className="text-4xl font-semibold mb-6 text-yellow-400">
            Student Access
          </h2>
          <p className="text-xl font-light mb-8 text-center">
            Enter the access key to start your test. Please make sure to enter
            the correct key.
          </p>

          {/* Key Input and Submit in Horizontal Line */}
          <div className="flex space-x-4 mb-4">
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
      </div>

      {/* Animation Libraries for Dynamic Effects */}
      <style jsx>{`
        .animate__animated {
          animation-duration: 1s;
          animation-fill-mode: both;
        }
        .animate__fadeIn {
          animation-name: fadeIn;
        }
        .animate__delay-0.7s {
          animation-delay: 0.7s;
        }
        .animate__delay-1s {
          animation-delay: 1s;
        }
        .animate__delay-1.5s {
          animation-delay: 1.5s;
        }
        .animate__delay-2s {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Body;
