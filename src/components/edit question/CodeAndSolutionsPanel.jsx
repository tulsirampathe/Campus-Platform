/* eslint-disable react/prop-types */
import React from 'react'
import CodeEditor from '../VsCode/CodeEditor';

function CodeAndSolutionsPanel({ problemDetails, setProblemDetails }) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Code & Solutions
        </h2>
        <CodeEditor
          value={problemDetails.sampleSolution || ""}
        />
      
      </div>
    );
  }
export default CodeAndSolutionsPanel