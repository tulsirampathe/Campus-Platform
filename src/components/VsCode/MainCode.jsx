import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { executeCode } from "../../API/api";
import { infoNotify } from "../../hooks/useInfoMutaionToast";
import useMutationToast from "../../hooks/useMutationToast";
import {
  useGetProgressQuery,
  useGetTestCasesQuery,
  useSubmitCodeMutation,
} from "../../redux/api/api";
import CodeEditor from "./CodeEditor";
import CodeNavbar from "./CodeNavbar";
import Output from "./Output";
import QuestionDescription from "./QuestionDescription";
import { CODE_SNIPPETS } from "../../constants/constant";

function MainCode() {
  const editorRef = useRef();
  const { challengeID, questionData, challenge } = useSelector(
    (state) => state.auth
  );

  const [language, setLanguage] = useState("cpp");
  const [outputVisible, setOutputVisible] = useState(false);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [question, setQuestion] = useState(questionData);
  const [showQuestionList, setShowQuestionList] = useState(false);

  const [publicTestCases, setPublicTestCases] = useState([]);
  const [publicTestResults, setPublicTestResults] = useState([]);

  const { data, isSuccess } = useGetTestCasesQuery(question._id);

  const { data: progressData } = useGetProgressQuery(challengeID);


  const [submitCode, submitStatus] = useSubmitCodeMutation();

  // Handle API response and update testCases
  useEffect(() => {
    if (isSuccess && Array.isArray(data.publicTestCases)) {
      setPublicTestCases(data.publicTestCases);
    }
  }, [isSuccess, data?.publicTestCases]);

  // Use the custom useMutationToast hook for each mutation
  useMutationToast({
    ...submitStatus,
    loadingMessage: "Submitting the code...",
    successMessage: submitStatus.data?.message,
  });

  // New state to manage the editor content
  const [editorContent, setEditorContent] = useState(
    questionData?.boilerplateCode?.[language] || ""
  );

  useEffect(() => {
    // Update editor content when language or question changes
    setEditorContent(question?.boilerplateCode?.[language] || "");
  }, [language, question]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (event) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
  };

  const handleCloseOutput = () => setOutputVisible(false);

  const runCode = (sourceCode) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setErrorMessage("");

      executeCode(language, sourceCode, publicTestCases)
        .then((results) => {
          setOutput(results);
          const firstSyntaxError = results.find(
            (result) => result.error
          )?.error;
          const allTestCasesPassed = results.every(
            (result) => result.status === "Pass"
          );

          setPublicTestResults(allTestCasesPassed);

          if (firstSyntaxError) {
            setErrorMessage(`Syntax Error: ${firstSyntaxError}`);
          }

          resolve(results);
        })
        .catch((error) => {
          console.error("Unable to run code", error);
          setErrorMessage("An error occurred while executing the code.");
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  const handleRun = () => {
    const sourceCode = editorRef.current.getValue();

    if (!sourceCode) {
      infoNotify(
        "Your code editor is empty. Please write some code to proceed."
      );
      return;
    }

    setOutputVisible(true);
    runCode(sourceCode);
  };

  const handleSubmit = async () => {
    const sourceCode = editorRef.current.getValue();

    if (!sourceCode) {
      infoNotify(
        "Your code editor is empty. Please write some code to proceed."
      );
      return;
    }

    setIsLoading(true);

    try {
      setErrorMessage(""); // Reset error messages

      const submissionData = {
        challenge: challengeID,
        question: question._id,
        code: sourceCode,
        language: language,
      };

      await submitCode(submissionData); // Submit the code after it's successfully run

      // setOutputVisible(false); // Hide the output after submission
    } catch (error) {
      console.error("Error during submission:", error);
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionList = () => {
    setShowQuestionList((prev) => !prev);
  };

  const handleQuestionSelect = (selectedQuestion) => {
    setQuestion(selectedQuestion); // Set the selected question
    setShowQuestionList(false); // Close the question list after selecting
  };

  const handleCloseQuestionList = () => {
    setShowQuestionList(false); // Close the list explicitly
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <CodeNavbar
        handleRun={handleRun}
        handleSubmit={handleSubmit}
        onSelect={onSelect}
        toggleQuestionList={toggleQuestionList}
        challenge={challenge}
      />

      <div
        className={`w-full h-[93vh] p-4 grid gap-6 ${
          outputVisible ? "grid-cols-12" : "grid-cols-8"
        }`}
      >
        {/* Question List */}
        {showQuestionList && (
          <div className="absolute top-0 left-0 w-1/4 h-full bg-white shadow-lg p-4 rounded-r-lg border-r border-gray-300 z-10 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Select Question
              </h2>
              <button
                onClick={handleCloseQuestionList} // Explicitly handle closing
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none transition duration-200"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-3 overflow-y-auto h-full">
              {challenge &&
                challenge.questions.map((ques, index) => {
                  const isSolved = progressData?.progress?.solvedQuestions.some(
                    (solvedQues) => solvedQues._id === ques._id
                  );

                  return (
                    <li
                      key={index}
                      className={`p-4 rounded-lg cursor-pointer transition duration-200 border ${
                        ques._id === question?._id
                          ? "bg-blue-100 text-blue-700 border-blue-500 font-semibold"
                          : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700 border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-medium">{ques.title}</h3>
                          <p className="text-xs text-gray-500">
                            {ques.difficulty} • {ques.maxScore} points
                          </p>
                        </div>
                        <button
                          onClick={() => handleQuestionSelect(ques)} // Close list on selection
                          className={`px-4 py-1 text-sm font-medium rounded-lg transition duration-200 ${
                            isSolved
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {isSolved ? "Solved" : "Solve"}
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}

        {/* Question Description */}
        <div
          className={`${
            outputVisible ? "col-span-4" : "col-span-3"
          } h-full text-gray-900 `}
        >
          <QuestionDescription QuestionData={question} />
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
            value={
              question.boilerplateCode?.[language] || CODE_SNIPPETS[language] // Default to snippet if boilerplate is empty
            }
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
