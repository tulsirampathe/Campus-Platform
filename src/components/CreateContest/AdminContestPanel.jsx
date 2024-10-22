import React, { useState } from "react";
import ContestLeftPanel from "./ContestLeftPanel";
import ContestNavbar from "./ContestNavbar";
import ContestRightPanel from "./ContestRightPanel";

function AdminContestPanel() {
  const [contestData, setContestData] = useState([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp"); // Default language
  const [problemDetails, setProblemDetails] = useState({
    testName: "",
    problemTitle: "",
    description: "",
    constraints: [""],
    examples: [{ input: "", output: "" }],
    testCases: [{ input: "", output: "" }],
    boilerplateCode: { cpp: "", python: "", javascript: "" }, // Store for multiple languages
  });

  const addExample = () => {
    setProblemDetails({
      ...problemDetails,
      examples: [...problemDetails.examples, { input: "", output: "" }],
    });
  };

  const addTestCase = () => {
    setProblemDetails({
      ...problemDetails,
      testCases: [...problemDetails.testCases, { input: "", output: "" }],
    });
  };

  const addConstraint = () => {
    setProblemDetails({
      ...problemDetails,
      constraints: [...problemDetails.constraints, ""],
    });
  };

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
    console.log("Sending contest data to backend:", contestData);
    // Replace with API call
  };

  const resetProblemDetails = () => {
    setProblemDetails({
      testName: "",
      problemTitle: "",
      description: "",
      constraints: [""],
      examples: [{ input: "", output: "" }],
      testCases: [{ input: "", output: "" }],
      boilerplateCode: { cpp: "", python: "", javascript: "" },
    });
    setCurrentProblemIndex(null);
  };

  const handleEditProblem = (index) => {
    setProblemDetails(contestData[index]);
    setCurrentProblemIndex(index);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Navbar */}
      <ContestNavbar
        problemDetails={problemDetails}
        setProblemDetails={setProblemDetails}
        handleSaveProblem={handleSaveProblem}
        handleSendToBackend={handleSendToBackend}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Main Panel */}
      <div className="flex h-full">
        {/* Left Panel */}
        <ContestLeftPanel
          problemDetails={problemDetails}
          setProblemDetails={setProblemDetails}
          addConstraint={addConstraint}
          addExample={addExample}
          addTestCase={addTestCase}
        />

        {/* Right Panel */}
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
