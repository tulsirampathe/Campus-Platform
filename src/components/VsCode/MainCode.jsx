// here we use Output component see this here I think:
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { executeCode } from "../../API/api";
import CodeEditor from "./CodeEditor";
import CodeNavbar from "./CodeNavbar";
import Output from "./Output";
import ProblemDescription from "./ProblemDescription";

function MainCode() {
  const editorRef = useRef();
  const { questionData, challenge } = useSelector((state) => state.auth);

  const [language, setLanguage] = useState("cpp");
  const [outputVisible, setOutputVisible] = useState(false);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [problem, setProblem] = useState(questionData);
  const [showProblemList, setShowProblemList] = useState(false);

  // New state to manage the editor content
  const [editorContent, setEditorContent] = useState(
    questionData?.boilerplateCode?.[language] || ""
  );

  useEffect(() => {
    // Update editor content when language or problem changes
    setEditorContent(problem.boilerplateCode[language] || "");
  }, [language, problem]);

  const toggleProblemList = () => setShowProblemList(!showProblemList);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (event) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
  };

  const handleCloseOutput = () => setOutputVisible(false);

  const runCode = () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    const testCases = [
      { input: ["5\n1 2 3 4 5"], expectedOutput: "15" },
      { input: ["3\n10 20 30"], expectedOutput: "60" },
      { input: ["4\n-5 5 -10 10"], expectedOutput: "0" },
      // { input: ["2", "7 7"], expectedOutput: "14" },
      // { input: ["3", "1 -1 1"], expectedOutput: "1" },
    ];
    

    // Indicate loading started
    setIsLoading(true);

    // Clear the previous error message before starting the new run
    setErrorMessage("");

    // Execute code
    executeCode(language, sourceCode, testCases)
      .then((results) => {
        setOutput(results); // Directly set the results
        const firstSyntaxError = results.find((result) => result.error)?.error;

        if (firstSyntaxError) {
          setErrorMessage(`Syntax Error: ${firstSyntaxError}`);
        }
      })
      .catch((error) => {
        console.error("Unable to run code", error);
        setErrorMessage("An error occurred while executing the code.");
      })
      .finally(() => {
        setIsLoading(false); // Indicate loading finished
      });
  };

  const handleRun = () => {
    runCode();
    setOutputVisible(true);
  };

  const handleProblemSelect = (selectedProblem) => {
    setProblem(selectedProblem);
    setShowProblemList(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <CodeNavbar
        handleRun={handleRun}
        onSelect={onSelect}
        toggleProblemList={toggleProblemList}
        challenge={challenge}
      />

      <div
        className={`w-full h-[93vh] p-4 grid gap-6 ${
          outputVisible ? "grid-cols-12" : "grid-cols-8"
        }`}
      >
        {/* Problem List */}
        {showProblemList && (
          <div className="absolute top-0 left-0 w-1/4 h-full bg-white shadow-lg p-4 rounded-r-lg border-r border-gray-300 z-10 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Select Problem
              </h2>
              <button
                onClick={toggleProblemList}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none transition duration-200"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2 overflow-y-auto h-full">
              {challenge &&
                challenge.questions.map((prob, index) => (
                  <li
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition duration-200 ${
                      prob.problemTitle === problem.problemTitle
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                    onClick={() => handleProblemSelect(prob)}
                  >
                    {prob.title}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Problem Description */}
        <div
          className={`${
            outputVisible ? "col-span-4" : "col-span-3"
          } h-full text-gray-900 overflow-y-auto`}
        >
          <ProblemDescription problemData={problem} />
        </div>

        {/* Code Editor */}
        <div
          className={`${
            outputVisible ? "col-span-5" : "col-span-5"
          } bg-white rounded-lg shadow-lg p-4 flex flex-col overflow-hidden`}
        >
          <div className="w-full flex justify-start px-4 py-2 text-gray-800">
            <h1 className="text-lg font-semibold">Code Editor</h1>
          </div>
          <CodeEditor
            language={language}
            value={editorContent}
            onChange={setEditorContent}
            onMount={onMount}
          />
        </div>

        {/* Output */}
        {outputVisible && (
          <div className="col-span-3">
            <Output
              handleCloseOutput={handleCloseOutput}
              isLoading={isLoading}
              ErrorMessage={ErrorMessage}
              output={output}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainCode;
