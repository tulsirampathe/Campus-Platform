import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaClipboard,
  FaClipboardCheck,
  FaClock,
  FaEdit,
  FaKey,
  FaPlus,
  FaTasks,
  FaTimes,
  FaTrash,
  FaTrophy,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useChallengeDataQuery,
  useDeleteChallengeMutation,
  useEditChallengeDataMutation,
  useRemoveQuestionMutation,
} from "../../redux/api/api";
import ConfirmationDeleteModal from "../../shared/ConfirmationDeleteModal";
import QuestionList from "../edit question/QuestionList";
import TestCasesPanel from "../edit question/TestCasesPanel";
import LoadingSpinner from "../LoadingSpinner";
import { setQuestionID } from "../../redux/reducers/auth";
import useMutationToast from "../../hooks/useMutationToast";

function ChallengeOverviewPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [showTestCasePanel, setShowTestCasePanel] = useState(false);
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState("");

  const { challengeID } = useSelector((state) => state.auth);

  const { data, isLoading: isChallengeLoading } =
    useChallengeDataQuery(challengeID);
  const challengeData = data?.challenge;

  // Mutation hooks
  const [editChallenge, editStatus] = useEditChallengeDataMutation();
  const [deleteChallenge, deleteStatus] = useDeleteChallengeMutation();
  const [removeQuestion, removeStatus] = useRemoveQuestionMutation();

  // Use the custom useMutationToast hook for each mutation
  useMutationToast({
    ...editStatus,
    successMessage:
      editStatus.data?.message || "Challenge updated successfully",
  });
  useMutationToast({
    ...deleteStatus,
    successMessage:
      deleteStatus.data?.message || "Challenge deleted successfully",
  });
  useMutationToast({
    ...removeStatus,
    successMessage: "Question removed successfully",
  });

  // Close isEditing when edit is successful
  useEffect(() => {
    if (editStatus.isSuccess) {
      setIsEditing(false);
    }
  }, [editStatus.isSuccess]);

  // Close isEditing when edit is successful
  useEffect(() => {
    if (deleteStatus.isSuccess) {
      navigate("/host-dashboard");
    }
  }, [deleteStatus.isSuccess]);

  // Helper function to format date for datetime-local input fields
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(challengeData.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditProblem = (questionID) => {
    dispatch(setQuestionID(questionID));
    navigate("/add-question");
  };

  const handleAddNewProblem = () => {
    setShowQuestionList(true);
  };

  const DeleteProblemConform = (id) => {
    setQuestion(id);
    setIsQuestionModalOpen(true);
  };

  const handleTestCaseToggle = (questionID) => {
    dispatch(setQuestionID(questionID));
    setShowTestCasePanel(!showTestCasePanel);
  };

  const handleEditChallengeData = async (e) => {
    e.preventDefault();
    const updatedChallengeData = {
      title: e.target.title.value,
      description: e.target.description.value,
      startTime: e.target.startTime.value,
      endTime: e.target.endTime.value,
    };
    await editChallenge({ id: challengeID, data: updatedChallengeData });
  };

  const handleDeleteChallenge = async () => {
    await deleteChallenge(challengeID);
    if (deleteStatus.isSuccess) {
      navigate(-1);
    }
  };

  const handleDeleteProblem = async () => {
    const data = { questionID: question };
    await removeQuestion({ id: challengeID, data });
  };

  if (isChallengeLoading || !challengeData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Left Side: Challenge Header */}
      <div className="w-full md:w-1/3 p-4">
        <header className="p-8 rounded-lg bg-white shadow-lg">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
            {challengeData.title}
          </h1>
          {isEditing ? (
            <form onSubmit={handleEditChallengeData} className="mb-4">
              <input
                name="title"
                defaultValue={challengeData.title}
                className="w-full border border-gray-300 rounded-md p-2 mb-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <textarea
                name="description"
                defaultValue={challengeData.description}
                className="w-full border border-gray-300 rounded-md p-2 mb-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="datetime-local"
                name="startTime"
                defaultValue={formatDate(challengeData.startTime)}
                className="w-full border border-gray-300 rounded-md p-2 mb-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="datetime-local"
                name="endTime"
                defaultValue={formatDate(challengeData.endTime)}
                className="w-full border border-gray-300 rounded-md p-2 mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200"
                >
                  Update Challenge Details
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
          ) : (
            <>
              <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed">
                {challengeData.description}
              </p>

              {/* Start and End Date with Improved Design */}
              <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-gray-800 mb-6">
                <div className="flex flex-col items-start bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-800 py-4 px-6 rounded-lg font-semibold shadow-md w-full sm:w-auto max-w-xs transition duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCalendarAlt className="text-indigo-600" />
                    <span className="font-bold text-indigo-700">
                      Start Date:
                    </span>
                  </div>
                  <span className="text-gray-700">
                    {new Date(challengeData.startTime).toLocaleDateString(
                      undefined,
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                  <span className="text-gray-600">
                    {new Date(challengeData.startTime).toLocaleTimeString(
                      undefined,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </span>
                </div>

                <div className="flex flex-col items-start bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-800 py-4 px-6 rounded-lg font-semibold shadow-md w-full sm:w-auto max-w-xs transition duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCalendarAlt className="text-indigo-600" />
                    <span className="font-bold text-indigo-700">End Date:</span>
                  </div>
                  <span className="text-gray-700">
                    {new Date(challengeData.endTime).toLocaleDateString(
                      undefined,
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                  <span className="text-gray-600">
                    {new Date(challengeData.endTime).toLocaleTimeString(
                      undefined,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </span>
                </div>
              </div>

              {/* Key with Copy Option */}
              <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-gray-800 mb-6">
                <div className="flex flex-col items-start bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-800 py-4 px-6 rounded-lg font-semibold shadow-md w-full sm:w-auto max-w-xs transition duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-2 mb-2">
                    <FaKey className="text-indigo-600" />
                    <span className="font-bold text-indigo-700">
                      Challenge Key:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-700 font-semibold underline">
                      {challengeData.key}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-full font-medium shadow-md hover:bg-indigo-700 transition duration-200 transform hover:scale-105"
                    >
                      {copied ? (
                        <>
                          <FaClipboardCheck />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <FaClipboard />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons with Improved Design */}
              <div className="flex justify-center gap-8 mt-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-6 rounded-full font-medium shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-200 transform hover:scale-105 whitespace-nowrap"
                >
                  <FaTasks />
                  Edit Challenge
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-red-600 text-white py-2 px-6 rounded-full font-medium shadow-lg hover:bg-red-700 hover:shadow-xl transition duration-200 transform hover:scale-105 whitespace-nowrap"
                >
                  <FaTrash />
                  Delete Challenge
                </button>
              </div>
            </>
          )}
        </header>
      </div>

      {/* Modal for Delete Confirmation */}
      <ConfirmationDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteChallenge} // Call delete function on confirm
        title="Delete Challenge"
        message="Are you sure you want to delete this challenge? This action cannot be undone."
      />

      {/* Right Side: Problem List */}
      <div className="w-full md:w-2/3 p-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
          {challengeData &&
            challengeData.questions.map((question, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-indigo-500 relative"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                  {question.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-1">
                  {question.problemStatement}
                </p>

                <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-indigo-500" />
                    <span className="font-medium">
                      {question?.timeLimit} min
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-yellow-500" />
                    <span className="font-medium">
                      {question?.maxScore} Points
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleEditProblem(question._id)}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => DeleteProblemConform(question._id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold transition-colors duration-200"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>

                  {/* Modal for Delete Confirmation */}
                  <ConfirmationDeleteModal
                    isOpen={isQuestionModalOpen}
                    onClose={() => setIsQuestionModalOpen(false)}
                    onConfirm={handleDeleteProblem} // Call delete function on confirm
                    title="Delete Problem"
                    message="Are you sure you want to delete this problem? This action cannot be undone."
                  />

                  {/* Updated Test Case Button */}
                  <button
                    onClick={() => handleTestCaseToggle(question._id)}
                    className=" gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
                  >
                    {question.testCases?.length > 0 ? (
                      <>
                        <span className="text-lg font-bold text-indigo-600">
                          {question.testCases.length} Test Case
                          {question.testCases.length > 1 ? "s" : ""}
                        </span>
                      </>
                    ) : (
                      <div className="flex items-center gap-1">
                        <FaPlus className="text-indigo-600" />
                        <span className="text-sm">Add Test Cases</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Floating Add Problem Button */}
      <button
        onClick={handleAddNewProblem}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white py-3 px-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center gap-2"
      >
        <FaPlus />
        Add Question
      </button>

      {/* Conditionally render QuestionList */}
      {showQuestionList && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-3xl p-6 sm:p-8 lg:p-10">
            {/* Close button */}
            <button
              onClick={() => setShowQuestionList(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              aria-label="Close"
            >
              <FaTimes />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b border-gray-200 pb-3">
              Question List
            </h2>

            {/* Content */}
            <div className="overflow-y-auto max-h-[70vh]">
              <QuestionList
                NotShowQuestion={challengeData.questions}
                setShowQuestionList={setShowQuestionList}
              />{" "}
              {/* Display the QuestionList component */}
            </div>
          </div>
        </div>
      )}

      {/* Conditional Rendering of TestCasePanel in Center of Screen */}
      {showTestCasePanel && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-3xl p-6 sm:p-8 lg:p-10">
            {/* Close button */}
            <button
              onClick={handleTestCaseToggle}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b border-gray-200 pb-3">
              Test Cases
            </h2>

            {/* Content */}
            <div className="overflow-y-auto max-h-[70vh]">
              <TestCasesPanel
                testCases={testCases}
                setTestCases={setTestCases}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChallengeOverviewPage;
