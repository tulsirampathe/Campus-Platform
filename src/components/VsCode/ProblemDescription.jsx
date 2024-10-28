/* eslint-disable react/prop-types */
import React from "react";

function ProblemDescription({ problemData }) {
  return (
    <>
      <div className="w-full flex justify-start space-x-6 pb-2 border-b border-gray-300">
        <button className="bg-transparent px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200 shadow">
          Description
        </button>
        <button className="bg-transparent px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200 shadow">
          Solution
        </button>
        <button className="bg-transparent px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200 shadow">
          Submission
        </button>
      </div>

      <div className="py-4">
        <h1 className="text-2xl font-bold">{problemData.problemTitle}</h1>
        <p className="mt-4 leading-relaxed">{problemData.description}</p>
      </div>

      <div className="mt-4">
        {problemData.examples.map((example, i) => (
          <div key={i} className="mb-2">
            <h2 className="text-lg font-semibold">Example {i + 1}</h2>
            <p>
              <span className="font-semibold">Input:</span> {example.input}
            </p>
            <p>
              <span className="font-semibold">Output:</span> {example.output}
            </p>
            {example.explanation && (
              <p>
                <span className="font-semibold">Explanation:</span>{" "}
                {example.explanation}
              </p>
            )}
          </div>
        ))}
      </div>

      {problemData.constraints && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Constraint</h2>
          <ul className="list-disc pl-4">
            {problemData.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default ProblemDescription;
