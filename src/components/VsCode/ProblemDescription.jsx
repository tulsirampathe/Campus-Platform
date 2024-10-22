import React from "react";

function ProblemDescription() {
  return (
    <>
      {/* Tabs for Description */}
      <div className="w-full flex justify-start space-x-6 pb-2  border-b border-gray-300">
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

      {/* Problem Statement */}
      <div className="py-4">
        <h1 className="text-2xl font-bold">Print Numbers from 1 to N</h1>
        <p className="mt-4 leading-relaxed">
          Write a program to print the numbers from 1 to N.
        </p>
        <p className="mt-4 leading-relaxed">
          Given a positive integer N, write a program that prints all the
          integers from 1 to N, each on a new line.
        </p>
      </div>

      {/* Examples */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Example 1</h2>
        <p>Input: N = 5</p>
        <p>Output: 1 2 3 4 5</p>

        <h2 className="text-lg font-semibold mt-4">Example 2</h2>
        <p>Input: N = 3</p>
        <p>Output: 1 2 3</p>
      </div>

      {/* Constraints */}
      <div className="mt-4">
        <ul className="list-disc pl-4">
          <li>1 ≤ N ≤ 1000</li>
          <li>N is a positive integer.</li>
        </ul>
      </div>
    </>
  );
}

export default ProblemDescription;
