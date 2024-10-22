import React, { useRef, useState } from "react";
import { executeCode } from "../../api";
import { CODE_SNIPPETS } from "../../constants";
import CodeEditor from "./CodeEditor";
import CodeNavbar from "./CodeNavbar";
import Output from "./Output";
import ProblemDescription from "./ProblemDescription";

function MainCode() {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [outputVisible, setOutputVisible] = useState(false); // State to control output visibility
  const [output, setOutput] = useState(null); // To store the output result
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log(value);
  

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (event) => {
    setLanguage(event.target.value);
    setValue(CODE_SNIPPETS[event.target.value]);
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

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Navbar */}
      <CodeNavbar handleRun={handleRun} onSelect={onSelect} />

      {/* Main Section: Problem Description, Code Editor, and Output */}
      <div
        className={`w-full h-[93vh] p-4 grid gap-6 ${
          outputVisible ? "grid-cols-12" : "grid-cols-8"
        }`}
      >
        {/* Problem Description */}
        <div
          className={`${
            outputVisible ? "col-span-4" : "col-span-3"
          } h-full bg-white rounded-lg shadow-lg p-4 text-gray-800`}
        >
          <ProblemDescription />
        </div>

        {/* Monaco Editor */}
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
            value={value}
            setValue={setValue}
          />
        </div>

        {/* Output Section (conditionally rendered) */}
        <div
          className={`col-span-3 bg-gray-50 rounded-lg shadow-lg p-4 transition-all ${
            outputVisible ? "block" : "hidden"
          }`}
        >
          <Output
            handleCloseOutput={handleCloseOutput}
            isLoading={isLoading}
            isError={isError}
            output={output}
          />
        </div>
      </div>
    </div>
  );
}

export default MainCode;
