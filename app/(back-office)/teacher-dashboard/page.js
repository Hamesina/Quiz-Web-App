// QuizForm.js
"use client";
import React, { useState } from "react";

const QuizForm = () => {
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: [""], correctOption: "" },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isTimed, setIsTimed] = useState(true);
  const [timeValue, setTimeValue] = useState("");
  const [timeUnit, setTimeUnit] = useState("minutes");

  const handleSubmit = () => {
    console.log({ quizName, quizDescription, questions });
    if (isTimed) {
      console.log(`Quiz will be timed for ${timeValue} ${timeUnit}`);
    }
  };

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = event.target.value;
    setQuestions(
      updatedQuestions.map((q, index) => ({
        ...q,
        correctOption:
          index === questionIndex ? event.target.value : q.correctOption,
      }))
    );
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: [""], correctOption: "" },
    ]);
    setCurrentPage(questions.length);
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleGoToQuestion = (index) => {
    setCurrentPage(index);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleBackToEdit = () => {
    setShowPreview(false);
  };

  const handleTimedQuizChange = () => {
    setIsTimed(true);
  };

  const handleUntimedQuizChange = () => {
    setIsTimed(false);
  };

  const handleTimeValueChange = (event) => {
    setTimeValue(event.target.value);
  };

  const handleTimeUnitChange = (event) => {
    setTimeUnit(event.target.value);
  };

  return (
    <div>
      {/* Quiz Name and Description Section */}
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Quiz Name</h1>
        <input
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
        />
        <h1 className="text-3xl font-bold mb-4">Quiz Description</h1>
        <textarea
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full h-32"
        ></textarea>
      </div>

      {/* Quiz Questions Section */}
      <div className="flex">
        {/* Create Quiz or Question Section */}
        <div className="w-3/4 p-4">
          {!showPreview ? (
            <div>
              <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>
              <form>
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="timedQuiz"
                    checked={isTimed}
                    onChange={handleTimedQuizChange}
                    className="mr-2"
                  />
                  <label htmlFor="timedQuiz" className="text-lg">
                    Timed Quiz
                  </label>
                  {isTimed && (
                    <div className="ml-4">
                      <input
                        type="number"
                        value={timeValue}
                        onChange={handleTimeValueChange}
                        className="border border-gray-300 rounded px-4 py-2 w-20 mr-2"
                      />
                      <select
                        value={timeUnit}
                        onChange={handleTimeUnitChange}
                        className="border border-gray-300 rounded px-4 py-2"
                      >
                        <option value="minutes">Minutes</option>
                        <option value="hours">Hours</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="untimedQuiz"
                    checked={!isTimed}
                    onChange={handleUntimedQuizChange}
                    className="mr-2"
                  />
                  <label htmlFor="untimedQuiz" className="text-lg">
                    Untimed
                  </label>
                </div>
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${index !== currentPage ? "hidden" : ""}`}
                  >
                    <div className="bg-white shadow-lg rounded-lg p-6">
                      <label
                        htmlFor={`question${index + 1}`}
                        className="block mb-2 text-lg"
                      >{`Question ${index + 1}`}</label>
                      <input
                        type="text"
                        id={`question${index + 1}`}
                        value={question.question || ""}
                        onChange={(e) => handleQuestionChange(index, e)}
                        className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
                        required
                      />
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex mb-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(index, optionIndex, e)
                            }
                            className="border border-gray-300 rounded px-4 py-2 mr-2 w-full"
                            required
                          />
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`correctOption${index}`}
                              value={option}
                              checked={question.correctOption === option}
                              onChange={(e) =>
                                handleCorrectOptionChange(index, e)
                              }
                              className="form-radio h-5 w-5 text-blue-600"
                            />
                          </label>
                          {optionIndex === 0 && (
                            <span className="ml-2">Correct</span>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveOption(index, optionIndex)
                            }
                            className="px-2 py-1 ml-2 bg-red-500 text-white rounded"
                          >
                            Remove Option
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddOption(index)}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                      >
                        Add Option
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handlePreviousQuestion}
                      disabled={currentPage === 0}
                      className={`px-4 py-2 mt-4 bg-blue-500 text-white rounded ${
                        currentPage === 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      disabled={currentPage === questions.length - 1}
                      className={`px-4 py-2 mt-4 ml-2 bg-blue-500 text-white rounded ${
                        currentPage === questions.length - 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                    >
                      Next
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(index)}
                      className="px-4 py-2 mt-4 ml-2 bg-red-500 text-white rounded"
                    >
                      Remove Question
                    </button>
                  </div>
                ))}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Add Question
                  </button>
                  <button
                    type="button"
                    onClick={handlePreview}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Preview
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-4">Preview Quiz</h1>
              <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg">
                {questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                      <h2 className="text-lg font-bold mb-4">{`Question ${
                        index + 1
                      }`}</h2>
                      <p className="text-gray-700 mb-4">{question.question}</p>
                      <ul className="list-disc list-inside">
                        {question.options.map((option, optionIndex) => (
                          <li key={optionIndex}>{option}</li>
                        ))}
                      </ul>
                      <p className="text-blue-500 mt-4">{`Correct Answer: ${question.correctOption}`}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentPage(index)}
                      className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
                    >
                      Go to Question {index + 1}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(index)}
                      className="px-4 py-2 mt-4 ml-2 bg-red-500 text-white rounded"
                    >
                      Remove Question
                    </button>
                  </div>
                ))}
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handleBackToEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Back to Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Create Quiz
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Section */}
        <div className="w-1/4 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Question Index</h2>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <button
                  className={`${
                    index === currentPage ? "font-bold" : ""
                  } block mb-2`}
                  onClick={() => handleGoToQuestion(index)}
                >
                  {`Question ${index + 1}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
