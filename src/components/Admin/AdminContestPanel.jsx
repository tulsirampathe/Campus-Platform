import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ContestLeftPanel from "../CreateContest/ContestLeftPanel";
import ContestNavbar from "../CreateContest/ContestNavbar";
import ContestRightPanel from "../CreateContest/ContestRightPanel";

function AdminContestPanel() {
  const location = useLocation();
  const { contestDetails } = location.state || {};

  const [contestData, setContestData] = useState([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [problemDetails, setProblemDetails] = useState({
    problemTitle: "",
    description: "",
    constraints: [""],
    examples: [{ input: "", output: "" }],
    testCases: [{ input: "", output: "" }],
    boilerplateCode: { cpp: "", python: "", javascript: "", java: "" },
  });

  const navigate = useNavigate();

  const addExample = () =>
    setProblemDetails({
      ...problemDetails,
      examples: [...problemDetails.examples, { input: "", output: "" }],
    });
  const addTestCase = () =>
    setProblemDetails({
      ...problemDetails,
      testCases: [...problemDetails.testCases, { input: "", output: "" }],
    });
  const addConstraint = () =>
    setProblemDetails({
      ...problemDetails,
      constraints: [...problemDetails.constraints, ""],
    });

  const handleBoilerplateChange = (value) => {
    setProblemDetails({
      ...problemDetails,
      boilerplateCode: {
        ...problemDetails.boilerplateCode,
        [selectedLanguage]: value,
      },
    });
  };

  const handleSaveProblem = () => {
    if (currentProblemIndex !== null) {
      const updatedContestData = [...contestData];
      updatedContestData[currentProblemIndex] = problemDetails;
      setContestData(updatedContestData);
    } else {
      setContestData([...contestData, problemDetails]);
    }

    resetProblemDetails();
  };

  const handleSendToBackend = () => {
    console.log(
      "Sending contest data to backend:",
      contestData,
      contestDetails
    );
    navigate("/contest-overview", { state: { contestData, contestDetails } });
  };

  const resetProblemDetails = () => {
    setProblemDetails({
      testName: "",
      problemTitle: "",
      description: "",
      constraints: [""],
      examples: [{ input: "", output: "" }],
      testCases: [{ input: "", output: "" }],
      boilerplateCode: { cpp: "", python: "", javascript: "", java: "" },
    });
    setCurrentProblemIndex(null);
  };

  const handleEditProblem = (index) => {
    setProblemDetails(contestData[index]);
    setCurrentProblemIndex(index);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <ContestNavbar
        problemDetails={problemDetails}
        setProblemDetails={setProblemDetails}
        handleSaveProblem={handleSaveProblem}
        handleSendToBackend={handleSendToBackend}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      <div className="flex h-full">
        <ContestLeftPanel
          contestDetails={contestDetails}
          problemDetails={problemDetails}
          setProblemDetails={setProblemDetails}
          addConstraint={addConstraint}
          addExample={addExample}
          addTestCase={addTestCase}
        />

        <ContestRightPanel
          problemDetails={problemDetails}
          selectedLanguage={selectedLanguage}
          handleBoilerplateChange={handleBoilerplateChange}
          contestData={contestData}
          handleEditProblem={handleEditProblem}
        />
      </div>
    </div>
  );
}

export default AdminContestPanel;
