/* eslint-disable react/prop-types */
import React from "react";

function ContestLeftPanel({
  problemDetails,
  setProblemDetails,
  addConstraint,
  addExample,
  addTestCase,
}) {
  return (
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
  );
}

export default ContestLeftPanel;
