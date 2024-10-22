/* eslint-disable react/prop-types */
import React from "react";
import { FiX } from "react-icons/fi";

function Output({ handleCloseOutput, isLoading, isError, output }) {
  return (
    <>
      <div className="w-full flex justify-between items-center border-b border-gray-300">
        <h1 className="text-lg font-semibold text-gray-800">Output</h1>
        <button onClick={handleCloseOutput}>
          <FiX className="text-xl" />
        </button>
      </div>
      <div className="h-full overflow-auto text-gray-700 pt-2 ">
        {isLoading ? (
          <div className="text-gray-400">Running...</div>
        ) : (
          <div
            className={`p-4 border ${
              isError ? "border-red-500 text-red-400" : "border-gray-800"
            } rounded`}
          >
            {output
              ? output.map((line, i) => <p key={i}>{line}</p>)
              : 'Click "Run Code" to see the output here'}
          </div>
        )}
      </div>
    </>
  );
}

export default Output;
