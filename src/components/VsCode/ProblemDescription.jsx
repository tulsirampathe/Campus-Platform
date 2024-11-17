/* eslint-disable react/prop-types */
import React, { useState } from "react";

function ProblemDescription({ problemData }) {
  const [activeTab, setActiveTab] = useState("Description");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-y-auto">
    {/* Header Navigation */}
    <div className="sticky top-0 bg-white z-5">
      <div className="flex border-b border-gray-200 pb-3 mb-5">
        {["Description", "Solution", "Submission"].map((tab) => (
          <button
            key={tab}
            className={`text-gray-700 font-semibold px-4 py-2 rounded-t-md ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  
    {/* Content Container with Scrolling */}
    <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
      {/* Content based on Active Tab */}
      {activeTab === "Description" && (
        <div>
          {/* Problem Title and Meta Information */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {problemData.title}
            </h1>
            <div className="text-sm text-gray-500 flex items-center space-x-4">
              <span
                className={`font-medium ${getDifficultyColor(problemData.difficulty)}`}
              >
                {problemData.difficulty}
              </span>
              <span>{problemData.maxScore} points</span>
            </div>
          </div>
  
          {/* Problem Statement */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Problem Statement</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {problemData.problemStatement}
            </p>
          </div>
  
          {/* Input and Output Format */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Input Format</h2>
            <p className="text-gray-700">{problemData.inputFormat}</p>
  
            <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Output Format</h2>
            <p className="text-gray-700">{problemData.outputFormat}</p>
          </div>
  
          {/* Examples Section */}
          {problemData.examples && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Examples</h2>
              {problemData.examples.map((example, i) => (
                <div
                  key={i}
                  className="p-4 mb-4 bg-gray-50 rounded-md border border-gray-200"
                >
                  <h3 className="text-md font-semibold text-gray-800 mb-2">
                    Example {i + 1}
                  </h3>
                  <p className="text-gray-700">
                    <span className="font-semibold">Input:</span> {example.input}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Output:</span> {example.output}
                  </p>
                  {example.explanation && (
                    <p className="text-gray-700 mt-1">
                      <span className="font-semibold">Explanation:</span> {example.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
  
          {/* Constraints Section */}
          {problemData.constraints && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Constraints</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {problemData.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          )}
  
          {/* Additional Info: Tags */}
          {problemData.tags && problemData.tags.length > 0 && (
            <div className="mb-4">
              <span className="font-semibold text-gray-800">Tags:</span>
              <div className="flex flex-wrap mt-2">
                {problemData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
  
      {activeTab === "Solution" && (
        <div className="text-gray-700">
          {/* Solution content */}
          <p>This section will contain solution-related information.</p>
        </div>
      )}
  
      {activeTab === "Submission" && (
        <div className="text-gray-700">
          {/* Submission content */}
          <p>This section will contain submission-related information.</p>
        </div>
      )}
    </div>
  </div>
  
  );
}

// Helper function to style the difficulty label
function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case "Easy":
      return "text-green-600";
    case "Medium":
      return "text-yellow-600";
    case "Hard":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

export default ProblemDescription;
