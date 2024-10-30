import React, { useRef, useState, useEffect } from "react";
import { executeCode } from "../../API/api";
import CodeEditor from "./CodeEditor";
import CodeNavbar from "./CodeNavbar";
import Output from "./Output";
import ProblemDescription from "./ProblemDescription";
import { useLocation } from "react-router-dom";

function MainCode() {
  const editorRef = useRef();
  const location = useLocation();
  const initialProblem = location.state?.problem || {};
  const allProblems = location.state?.contestData || [];

  const [language, setLanguage] = useState("cpp");
  const [outputVisible, setOutputVisible] = useState(false);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [problem, setProblem] = useState(initialProblem);
  const [showProblemList, setShowProblemList] = useState(false); // To toggle the problem list panel

  // Set initial boilerplate code for the editor whenever the problem or language changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(problem.boilerplateCode[language] || "");
    }
  }, [language, problem]);

  const toggleProblemList = () => setShowProblemList(!showProblemList);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    editor.setValue(problem.boilerplateCode[language] || "");
  };

  const onSelect = (event) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
    if (editorRef.current) {
      editorRef.current.setValue(problem.boilerplateCode[selectedLang] || "");
    }
  };

  const handleCloseOutput = () => {
    setOutputVisible(false);
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      console.log(result);
      
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error("Unable to run code", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRun = () => {
    runCode();
    setOutputVisible(true);
  };

  const handleProblemSelect = (selectedProblem) => {
    setProblem(selectedProblem);
    setShowProblemList(false); // Close problem list after selecting a problem
  
    // Set the editor content based on the selected problem's boilerplate code
    if (editorRef.current) {
      editorRef.current.setValue(selectedProblem.boilerplateCode[language] || "");
    }
  };
  

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center">
      <CodeNavbar
        handleRun={handleRun}
        onSelect={onSelect}
        toggleProblemList={toggleProblemList}
      />
      <div
        className={`w-full h-[93vh] p-4 grid gap-6 ${
          outputVisible ? "grid-cols-12" : "grid-cols-8"
        }`}
      >
        {showProblemList && (
          <div className="absolute top-0 left-0 w-1/4 h-full bg-white shadow-lg p-4 rounded-r-lg border-r border-gray-300 z-10">
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
            <ul className="space-y-2">
              {allProblems.map((prob, index) => (
                <li
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition duration-200 ${
                    prob.problemTitle === problem.problemTitle
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                  onClick={() => handleProblemSelect(prob)}
                >
                  {prob.problemTitle}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className={`${
            outputVisible ? "col-span-4" : "col-span-3"
          } h-full bg-white rounded-lg shadow-lg p-4 text-gray-800`}
        >
          <ProblemDescription problemData={problem} />
        </div>

        <div
          className={`${
            outputVisible ? "col-span-5" : "col-span-5"
          } bg-white rounded-lg shadow-lg p-4 flex flex-col`}
        >
          <div className="w-full flex justify-start px-4 py-2 text-gray-800">
            <h1 className="text-lg font-semibold">Code Editor</h1>
          </div>
          <CodeEditor
            language={language}
            onMount={onMount}
            value={problem.boilerplateCode[language]}
          />
        </div>

        {outputVisible && (
          <div className="col-span-3 bg-gray-50 rounded-lg shadow-lg p-4">
            <Output
              handleCloseOutput={handleCloseOutput}
              isLoading={isLoading}
              isError={isError}
              output={output}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainCode;
