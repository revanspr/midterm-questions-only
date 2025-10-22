import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const QuizGame = () => {
  const [gameState, setGameState] = useState('questions'); // 'questions' or 'answers'
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [questionSet, setQuestionSet] = useState(0);

  // Quiz data structure
  const quizData = [
    // First set of questions
    [
      {
        question: "What is the capital of France?",
        answers: [
          { text: "London", correct: false },
          { text: "Paris", correct: true },
          { text: "Berlin", correct: false }
        ]
      },
      {
        question: "What is 5 + 7?",
        answers: [
          { text: "11", correct: false },
          { text: "12", correct: true },
          { text: "13", correct: false }
        ]
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: [
          { text: "Venus", correct: false },
          { text: "Jupiter", correct: false },
          { text: "Mars", correct: true }
        ]
      }
    ],
    // Second set of questions
    [
      {
        question: "What is the largest ocean on Earth?",
        answers: [
          { text: "Atlantic Ocean", correct: false },
          { text: "Pacific Ocean", correct: true },
          { text: "Indian Ocean", correct: false }
        ]
      },
      {
        question: "How many continents are there?",
        answers: [
          { text: "5", correct: false },
          { text: "6", correct: false },
          { text: "7", correct: true }
        ]
      },
      {
        question: "What is the smallest prime number?",
        answers: [
          { text: "1", correct: false },
          { text: "2", correct: true },
          { text: "3", correct: false }
        ]
      }
    ],
    // Third set of questions
    [
      {
        question: "What year did World War II end?",
        answers: [
          { text: "1945", correct: true },
          { text: "1944", correct: false },
          { text: "1946", correct: false }
        ]
      },
      {
        question: "What is the chemical symbol for gold?",
        answers: [
          { text: "Go", correct: false },
          { text: "Au", correct: true },
          { text: "Gd", correct: false }
        ]
      },
      {
        question: "Which animal is the fastest land animal?",
        answers: [
          { text: "Lion", correct: false },
          { text: "Cheetah", correct: true },
          { text: "Leopard", correct: false }
        ]
      }
    ]
  ];

  const currentQuestions = quizData[questionSet] || quizData[0];

  const handleQuestionClick = (index) => {
    setSelectedQuestion(currentQuestions[index]);
    setGameState('answers');
    setFeedback(null);
  };

  const handleAnswerClick = (answer) => {
    if (answer.correct) {
      setScore(score + 1);
      setFeedback('correct');
      setTimeout(() => {
        setGameState('questions');
        setSelectedQuestion(null);
        setFeedback(null);
        setQuestionSet((questionSet + 1) % quizData.length);
      }, 1500);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  };

  const resetGame = () => {
    setGameState('questions');
    setSelectedQuestion(null);
    setScore(0);
    setFeedback(null);
    setQuestionSet(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Game</h1>
          <div className="flex justify-center items-center gap-4">
            <p className="text-xl text-gray-600">Score: <span className="font-bold text-purple-600">{score}</span></p>
            <button 
              onClick={resetGame}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
            >
              Reset Game
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`mb-6 p-4 rounded-lg flex items-center justify-center gap-2 ${
            feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {feedback === 'correct' ? (
              <>
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold text-lg">Correct! Well done!</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6" />
                <span className="font-semibold text-lg">Incorrect! Try again!</span>
              </>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {gameState === 'questions' ? (
            // Display questions
            currentQuestions.map((item, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(index)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <p className="text-xl font-semibold">{item.question}</p>
              </button>
            ))
          ) : (
            // Display answers
            <>
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl mb-4 border-2 border-purple-300">
                <p className="text-2xl font-bold text-gray-800 text-center">
                  {selectedQuestion?.question}
                </p>
              </div>
              {selectedQuestion?.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={feedback !== null}
                  className={`p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl ${
                    feedback === null 
                      ? 'bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <p className="text-xl font-semibold">{answer.text}</p>
                </button>
              ))}
            </>
          )}
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm">
          {gameState === 'questions' ? 'Click on a question to begin!' : 'Select the correct answer!'}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
