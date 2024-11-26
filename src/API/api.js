import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants/constant";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode, testCases = []) => {
  try {
    const results = [];

    for (const testCase of testCases) {
      // const input = testCase.input.join("\n"); // Join array to create multiline input

      const response = await API.post("/execute", {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
          {
            content: sourceCode,
          },
        ],
        stdin: testCase?.input, // Pass multiline input as stdin
      });

      const { run } = response.data;
      const { output, stderr, code } = run;

      const result = {
        input: testCase?.input,
        expectedOutput: String(testCase?.output).trim(), // Ensure expectedOutput is a string and trim
        actualOutput: output.trim(), // Remove any trailing newlines or spaces from actualOutput
        executionTime: run.time || 0,
        memoryUsed: run.memory || 0,
        status:
          output.trim() === String(testCase?.output).trim() && code === 0
            ? "Pass"
            : "Fail", // Trim both for comparison
        error: stderr?.trim() || null,
      };

      results.push(result);

      if (stderr?.trim() || code !== 0) {
        console.warn("Error detected, stopping further execution.");
        break;
      }
    }

    return results;
  } catch (error) {
    console.error("Code execution failed:", error);
    throw new Error("Error while executing code.");
  }
};
