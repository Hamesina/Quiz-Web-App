"use client";

import React, { useState, useEffect } from "react";

const quizzes = [
  {
    id: 1,
    quizName: "The first ever quiz, do I work?",
    quizDescription: "Describe me however you like it, darling",
    isTimed: true,
    timeInMins: 10,
    questions: [
      {
        question: "The first question",
        options: ["option one", "potadf ", "adfafdf", "afhjdfhaf"],
        correctOption: "potadf ",
      },
      {
        question: "The second one",
        options: ["sdfakdfdaf", "asdfadfa", "sdfaf", "dfadfdf fgafg"],
        correctOption: "sdfakdfdaf",
      },
      {
        question: "dfdfdggsfg ",
        options: ["adfadffa", "sfgsfgsgs", "fgsfgsfg", "sfgsgfgs"],
        correctOption: "fgsfgsfg",
      },
    ],
  },
  {
    id: 2,
    quizName: "The second quiz",
    quizDescription: "Another exciting quiz for you to try!",
    isTimed: false,
    timeInMins: null,
    questions: [
      {
        question: "What is 1 + 1?",
        options: ["1", "2", "3", "4"],
        correctOption: "2",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctOption: "Mars",
      },
    ],
  },
  // Add more quizzes as needed
];

[
  {
    id: "COSC",
    color: "hsl(80, 70%, 50%)",
    data: [
      {
        x: "students",
        y: 96,
      },
      {
        x: "quizes",
        y: 156,
      },
    ],
  },
  {
    id: "BIO",
    color: "hsl(80, 80%, 20%)",
    data: [
      {
        x: "students",
        y: 67,
      },
      {
        x: "quizes",
        y: 45,
      },
    ],
  },
];

export default function QuizList() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleTakeExam = (quizId) => {
    setSelectedQuiz(quizId);
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
  };

  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      {!selectedQuiz ? (
        quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg m-4"
          >
            <h2 className="text-2xl font-bold mb-4">{quiz.quizName}</h2>
            <p className="text-lg mb-4">{quiz.quizDescription}</p>
            <button
              onClick={() => handleTakeExam(quiz.id)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
            >
              Take Exam
            </button>
          </div>
        ))
      ) : (
        <div className="w-full">
          {/* Render the quiz component based on selectedQuiz */}
          {/* For example, if using the Quiz component from the previous example: */}
          <Quiz
            quiz={quizzes.find((quiz) => quiz.id === selectedQuiz)}
            onBack={handleBackToQuizzes}
          />
        </div>
      )}
    </div>
  );
}

function Quiz({ quiz, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(quiz.questions.length).fill(null)
  );
  const [showScore, setShowScore] = useState(false); // Corrected here
  const [isTimed, setIsTimed] = useState(quiz.isTimed);
  const [timeInMins, setTimeInMins] = useState(quiz.timeInMins);
  const [timeLeft, setTimeLeft] = useState(quiz.timeInMins * 60);

  useEffect(() => {
    if (isTimed) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isTimed]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleOptionSelect = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setShowScore(true);
  };

  const calculateScore = () => {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctOption) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(quiz.questions.length).fill(null));
    setShowScore(false);
    setTimeLeft(quiz.timeInMins * 60);
  };

  return (
    <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg">
      {!showScore ? (
        <div className="flex">
          <div className="w-1/4 pr-6">
            <h2 className="text-lg font-bold mb-4">Questions</h2>
            <ul className="space-y-2">
              {quiz.questions.map((_, index) => (
                <li
                  key={index}
                  className={`py-1 px-3 cursor-pointer rounded-lg ${
                    index === currentQuestion
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  Question {index + 1}
                  {selectedAnswers[index] && (
                    <span className="ml-2">&#10003;</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/4">
            <h2 className="text-xl font-bold mb-4">
              {quiz.questions[currentQuestion].question}
            </h2>
            <div className="flex flex-col space-y-4">
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    className="form-radio"
                    checked={selectedAnswers[currentQuestion] === option}
                    onChange={() => handleOptionSelect(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-md ${
                  currentQuestion === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
              >
                Previous
              </button>
              {currentQuestion === quiz.questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
                >
                  Next
                </button>
              )}
            </div>
            {isTimed && (
              <div className="mt-6">
                <p className="text-sm">
                  Time left: {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Your Score</h2>
          <p className="text-xl">
            {calculateScore()} / {quiz.questions.length}
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Correct Answers</h3>
            {quiz.questions.map((question, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-lg font-semibold">Question {index + 1}</h4>
                <p className="mb-2">Your Answer: {selectedAnswers[index]}</p>
                <p className="text-gray-600">
                  Correct Answer: {question.correctOption}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
          >
            Retake Quiz
          </button>
        </div>
      )}
      <button
        onClick={onBack}
        className="mt-6 px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md"
      >
        Back to Quizzes
      </button>
    </div>
  );
}
