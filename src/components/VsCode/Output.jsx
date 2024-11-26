/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { FiX } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

function Output({ handleCloseOutput, isLoading, ErrorMessage, output }) {
  // Refs for the scrollable sections
  const inputsRef = useRef(null);
  const outputsRef = useRef(null);
  const expectedRef = useRef(null);
  
  // Synchronize scrolling across sections
  const handleScroll = (e, refs) => {
    const scrollTop = e.target.scrollTop;
    refs.forEach((ref) => {
      if (ref.current && ref.current !== e.target) {
        ref.current.scrollTop = scrollTop;
      }
    });
  };

  // Check if any test case failed
  const hasFailedTestCase = output?.some((result) => result.status === "Fail");

  // Check if all test cases passed
  const allTestCasesPassed = output?.every(
    (result) => result.status === "Pass"
  );

  return (
    <div className="w-full h-full bg-white text-gray-800 rounded-lg shadow p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-300">
        <h1 className="text-xl font-semibold">Execution Results</h1>
        <button
          onClick={handleCloseOutput}
          className="text-gray-500 hover:text-red-500"
        >
          <FiX className="text-xl" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-20 text-gray-600">
            <FaSpinner className="animate-spin text-3xl mr-2" />
            <span className="text-base">Running your code...</span>
          </div>
        ) : ErrorMessage ? (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded whitespace-pre-wrap">
            {ErrorMessage}
          </div>
        ) : (
          <div>
            {output?.length > 0 ? (
              <div className="space-y-4">
                {/* Display "All test cases did not pass" if any test case failed */}
                {hasFailedTestCase && (
                  <div className="text-red-600 text-base font-semibold bg-red-50 p-3 rounded mb-4">
                    All test cases did not pass
                  </div>
                )}

                {/* Display success message if all test cases passed */}
                {allTestCasesPassed && (
                  <div className="text-green-600 text-base font-semibold bg-green-50 p-3 rounded mb-4">
                    All test cases passed
                  </div>
                )}

                <Section
                  title="Input"
                  ref={inputsRef}
                  onScroll={(e) => handleScroll(e, [outputsRef, expectedRef])}
                >
                  {output.map((result, index) => (
                    <Row key={index} index={index + 1} content={result.input} />
                  ))}
                </Section>
                <Section
                  title="Output"
                  ref={outputsRef}
                  onScroll={(e) => handleScroll(e, [inputsRef, expectedRef])}
                >
                  {output.map((result, index) => (
                    <Row
                      key={index}
                      index={index + 1}
                      content={result.actualOutput}
                      status={result.status}
                    />
                  ))}
                </Section>
                <Section
                  title="Desired output"
                  ref={expectedRef}
                  onScroll={(e) => handleScroll(e, [inputsRef, outputsRef])}
                >
                  {output.map((result, index) => (
                    <Row
                      key={index}
                      index={index + 1}
                      content={result.expectedOutput}
                    />
                  ))}
                </Section>
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center">
                No output generated.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* Row Component */
const Row = ({ index, content, status }) => (
  <div className="flex items-start">
    {/* Index Circle */}
    <div
      className={`w-6 h-6 text-sm text-center  ${
        status === "Fail" ? " bg-red-200" : " bg-gray-200"
      } text-gray-600 rounded-full flex items-center justify-center font-semibold`}
    >
      {index}
    </div>
    {/* Content */}
    <div
      className={`ml-3 text-sm font-mono ${
        status === "Fail" ? "text-red-600" : "text-gray-600"
      }`}
    >
      {content}
    </div>
  </div>
);

/* Section Component */
const Section = React.forwardRef(({ title, children, onScroll }, ref) => (
  <div className="bg-gray-50 p-4 rounded border border-gray-200">
    <div className="flex items-center justify-between mb-3">
      <h4 className="text-base font-semibold text-gray-800">{title}</h4>
    </div>
    <div
      ref={ref}
      className="space-y-2 max-h-24 overflow-auto"
      onScroll={onScroll}
    >
      {children}
    </div>
  </div>
));

export default Output;
