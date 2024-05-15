import React from "react";

const StudentCard = ({ student }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src="https://via.placeholder.com/150"
            alt="Student"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {student.role}
          </div>
          <h2 className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
            {student.name}
          </h2>
          <p className="mt-2 text-gray-600">{`Department: ${student.department_id}`}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Quizzes Taken:</h3>
            <ul className="list-disc pl-5">
              {student.quizes_taken.map((quiz, index) => (
                <li key={index}>
                  <p>{`Quiz ID: ${quiz.quiz_id}`}</p>
                  <p>{`Status: ${quiz.status}`}</p>
                  <p>{`Score: ${quiz.score}`}</p>
                  <h4 className="font-semibold">Questions:</h4>
                  <ul className="list-disc pl-5">
                    {quiz.questions.map((question, idx) => (
                      <li key={idx}>
                        <p>{`Question ${idx + 1}: ${question.question}`}</p>
                        <p>{`Answer: ${question.answer}`}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // Sample student data
  const studentData = {
    id: "1",
    name: "John Doe",
    role: "Student",
    department_id: "CS101",
    quizes_taken: [
      {
        quiz_id: "1",
        status: "completed",
        score: 3,
        questions: [
          {
            question: "What is 2 + 2?",
            answer: "4",
          },
          {
            question: "What is the capital of France?",
            answer: "Paris",
          },
          {
            question: "Who wrote 'Hamlet'?",
            answer: "William Shakespeare",
          },
        ],
      },
      {
        quiz_id: "2",
        status: "completed",
        score: 2,
        questions: [
          {
            question: "What is 5 * 5?",
            answer: "25",
          },
          {
            question: "What is the largest planet in our solar system?",
            answer: "Jupiter",
          },
        ],
      },
    ],
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <StudentCard student={studentData} />
    </div>
  );
};

export default App;
