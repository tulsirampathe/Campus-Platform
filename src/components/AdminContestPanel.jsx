import { Editor } from "@monaco-editor/react";
import React, { useState } from "react";
import { CODE_SNIPPETS } from "../constants";

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
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
        {/* Left Side: Test Name */}
        <div className="font-bold text-lg">
          <input
            type="text"
            placeholder="Test Name"
            className="bg-gray-700 p-2 rounded"
            value={problemDetails.testName}
            onChange={(e) =>
              setProblemDetails({ ...problemDetails, testName: e.target.value })
            }
          />
        </div>

        {/* Mid Section: Save Problem and Create Contest Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleSaveProblem}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Save Problem
          </button>
          <button
            onClick={handleSendToBackend}
            className="bg-green-500 text-white p-2 rounded"
          >
            Create Contest
          </button>
        </div>

        {/* Right Side: Language Selection (Dropdown) */}
        <div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-700 p-2 rounded text-white"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex h-full">
        {/* Left Panel */}
        <div className="w-1/2 p-4 flex flex-col space-y-4 border-r overflow-y-auto max-h-[calc(100vh-80px)]">
          {/* Title */}
          <input
            type="text"
            placeholder="Problem Title"
            className="border-2 p-3 rounded-lg shadow-md"
            value={problemDetails.problemTitle}
            onChange={(e) =>
              setProblemDetails({
                ...problemDetails,
                problemTitle: e.target.value,
              })
            }
          />

          {/* Description */}
          <textarea
            placeholder="Problem Description"
            className="border-2 p-3 rounded-lg shadow-md min-h-28"
            value={problemDetails.description}
            onChange={(e) =>
              setProblemDetails({
                ...problemDetails,
                description: e.target.value,
              })
            }
          ></textarea>

          {/* Constraints (Dynamic List) */}
          <div>
            <h2 className="font-bold text-lg">Constraints</h2>
            {problemDetails.constraints.map((constraint, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder={`Constraint ${index + 1}`}
                  className="border-2 p-2 rounded-lg shadow-md w-full"
                  value={constraint}
                  onChange={(e) => {
                    const updatedConstraints = [...problemDetails.constraints];
                    updatedConstraints[index] = e.target.value;
                    setProblemDetails({
                      ...problemDetails,
                      constraints: updatedConstraints,
                    });
                  }}
                />
              </div>
            ))}
            <button
              onClick={addConstraint}
              className="bg-blue-500 text-white p-2 rounded shadow-md"
            >
              Add Constraint
            </button>
          </div>

          {/* Examples */}
          <div>
            <h2 className="font-bold text-lg">Examples</h2>
            {problemDetails.examples.map((example, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  placeholder={`Example ${index + 1} Input`}
                  className="border-2 p-2 rounded-lg shadow-md"
                  value={example.input}
                  onChange={(e) => {
                    const updatedExamples = [...problemDetails.examples];
                    updatedExamples[index].input = e.target.value;
                    setProblemDetails({
                      ...problemDetails,
                      examples: updatedExamples,
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder={`Example ${index + 1} Output`}
                  className="border-2 p-2 rounded-lg shadow-md"
                  value={example.output}
                  onChange={(e) => {
                    const updatedExamples = [...problemDetails.examples];
                    updatedExamples[index].output = e.target.value;
                    setProblemDetails({
                      ...problemDetails,
                      examples: updatedExamples,
                    });
                  }}
                />
              </div>
            ))}
            <button
              onClick={addExample}
              className="bg-blue-500 text-white p-2 rounded shadow-md mt-2"
            >
              Add Example
            </button>
          </div>

          {/* Test Cases */}
          <div>
            <h2 className="font-bold text-lg">Test Cases</h2>
            {problemDetails.testCases.map((testCase, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  placeholder={`Test Case ${index + 1} Input`}
                  className="border-2 p-2 rounded-lg shadow-md"
                  value={testCase.input}
                  onChange={(e) => {
                    const updatedTestCases = [...problemDetails.testCases];
                    updatedTestCases[index].input = e.target.value;
                    setProblemDetails({
                      ...problemDetails,
                      testCases: updatedTestCases,
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder={`Test Case ${index + 1} Output`}
                  className="border-2 p-2 rounded-lg shadow-md"
                  value={testCase.output}
                  onChange={(e) => {
                    const updatedTestCases = [...problemDetails.testCases];
                    updatedTestCases[index].output = e.target.value;
                    setProblemDetails({
                      ...problemDetails,
                      testCases: updatedTestCases,
                    });
                  }}
                />
              </div>
            ))}
            <button
              onClick={addTestCase}
              className="bg-blue-500 text-white p-2 rounded shadow-md mt-2"
            >
              Add Test Case
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-4 flex flex-col space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          <Editor
            height="400px"
            defaultLanguage="cpp"
            value={problemDetails.boilerplateCode[selectedLanguage] || CODE_SNIPPETS[selectedLanguage]}
            onChange={(value) => handleBoilerplateChange(value)}
            className="rounded-lg border border-gray-400"
          />
          <button
            onClick={() =>
              handleBoilerplateChange(
                problemDetails.boilerplateCode[selectedLanguage]
              )
            }
            className="bg-blue-500 w-[20%]  text-white p-2 rounded shadow-md mt-2"
          >
            Save Code
          </button>

          {/* List of Created Problems */}
          <h2 className="font-bold text-lg mb-2">Created Problems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
            {contestData.map((problem, index) => (
              <div key={index}>
                <button
                  onClick={() => handleEditProblem(index)}
                  className="bg-zinc-300 text-gray-800 p-3 rounded-lg shadow-md w-full text-center"
                >
                  {problem.problemTitle}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminContestPanel;
