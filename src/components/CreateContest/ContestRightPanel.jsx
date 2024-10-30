/* eslint-disable react/prop-types */
import { Editor } from "@monaco-editor/react";
import React from "react";
import { CODE_SNIPPETS } from "../../constants/constant";

function ContestRightPanel({
  problemDetails,
  selectedLanguage,
  handleBoilerplateChange,
  contestData,
  handleEditProblem,
}) {
  return (
    <div className="w-1/2 p-4 flex flex-col space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
      <Editor
        height="400px"
        defaultLanguage="cpp"
        value={
          problemDetails.boilerplateCode[selectedLanguage] ||
          CODE_SNIPPETS[selectedLanguage]
        }
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
  );
}

export default ContestRightPanel;
