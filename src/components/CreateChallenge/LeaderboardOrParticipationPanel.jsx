/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  useCalculateLeaderboardMutation,
  useGetLeaderboardQuery,
} from "../../redux/api/api";
import useMutationToast from "../../hooks/useMutationToast";

const LeaderboardOrParticipationPanel = ({
  isChallengeLoading,
  challengeData,
}) => {
  const { challengeID } = useSelector((state) => state.auth);
  const [activePanel, setActivePanel] = useState("leaderboard");
  const [leaderboard, setLeaderboard] = useState(null);

  const { data: leaderboardData, isLoading: isLeaderboardLoading } =
    useGetLeaderboardQuery(challengeID);

  useEffect(() => {
    if (leaderboardData?.leaderboard) {
      setLeaderboard(leaderboardData.leaderboard);
    }
  }, [leaderboardData]);

  const [calculateLeaderboard, calculateLeaderboardStatus] =
    useCalculateLeaderboardMutation();

  useMutationToast({
    ...calculateLeaderboardStatus,
    loadingMessage: "Leaderboard is being calculated, please wait...",
    successMessage: calculateLeaderboardStatus.data?.message,
  });

  const onRefresh = async () => {
    try {
      const response = await calculateLeaderboard(challengeID);
      if (response?.data?.leaderboard) {
        setLeaderboard(response.data.leaderboard);
      }
    } catch (error) {
      console.error("Error refreshing leaderboard:", error);
    }
  };

  return (
    <section className="w-full p-6 bg-gray-50 rounded-lg shadow-xl relative">
      {/* Refresh Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={onRefresh}
          disabled={calculateLeaderboardStatus.isLoading}
          className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition transform hover:scale-110 focus:outline-none"
          title={
            calculateLeaderboardStatus.isLoading
              ? "Refreshing..."
              : "Refresh Leaderboard"
          }
        >
          <FaSyncAlt
            className={`w-5 h-5 ${
              calculateLeaderboardStatus.isLoading ? "animate-spin" : ""
            }`}
          />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b mb-6">
        {["leaderboard", "participation"].map((panel) => (
          <button
            key={panel}
            onClick={() => setActivePanel(panel)}
            className={`w-1/2 py-3 text-lg font-semibold text-gray-600 transition duration-300 hover:text-${
              panel === "leaderboard" ? "indigo" : "green"
            }-600 border-b-4 border-${
              panel === "leaderboard" ? "indigo" : "green"
            }-600 focus:outline-none ${
              activePanel === panel
                ? `text-${
                    panel === "leaderboard" ? "indigo" : "green"
                  }-600 border-b-4 border-${
                    panel === "leaderboard" ? "indigo" : "green"
                  }-600`
                : "border-b-4 border-transparent"
            }`}
          >
            {panel.charAt(0).toUpperCase() + panel.slice(1)}
          </button>
        ))}
      </div>

      {/* Panel Content */}
      <div className="p-4 bg-white rounded-lg shadow-lg overflow-hidden">
        {activePanel === "leaderboard" && (
          <div>
            {isLeaderboardLoading ? (
              <div className="text-center text-indigo-600">Loading...</div>
            ) : leaderboard && leaderboard.participants.length > 0 ? (
              <div className="overflow-auto max-h-[400px]">
                <table className="w-full table-auto text-sm rounded-lg shadow-lg">
                  <thead className="bg-indigo-600 text-white text-left sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3">Rank</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaderboard.participants.map((participant, idx) => (
                      <tr
                        key={idx}
                        className={`${
                          idx % 2 === 0 ? "bg-indigo-50" : "bg-white"
                        } hover:bg-indigo-100 transition`}
                      >
                        <td className="px-6 py-3">{idx + 1}</td>
                        <td className="px-6 py-3">
                          {participant.user.username}
                        </td>
                        <td className="px-6 py-3 text-right">
                          {participant.totalScore} pts
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-indigo-600">
                No leaderboard data available.
              </div>
            )}
          </div>
        )}

        {activePanel === "participation" && (
          <div>
            {isChallengeLoading ? (
              <div className="text-center text-green-600">Loading...</div>
            ) : challengeData?.participants &&
              challengeData.participants.length > 0 ? (
              <div className="overflow-auto max-h-[400px]">
                <table className="w-full table-auto text-sm rounded-lg shadow-lg">
                  <thead className="bg-green-600 text-white text-left sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3">Rank</th>
                      <th className="px-6 py-3">Username</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {challengeData.participants.map((participant, idx) => (
                      <tr
                        key={idx}
                        className={`${
                          idx % 2 === 0 ? "bg-green-50" : "bg-white"
                        } hover:bg-green-100 transition`}
                      >
                        <td className="px-6 py-3">{idx + 1}</td>
                        <td className="px-6 py-3">{participant.username}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-green-600">
                No participants found for this challenge.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LeaderboardOrParticipationPanel;
