import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import quizQuestionsData from '../Q&A.json';

const QuizGame = () => {
  const [gameState, setGameState] = useState('questions'); // 'questions' or 'answers'
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [questionSet, setQuestionSet] = useState(0);

  // Split questions into sets of 3
  const questionsPerSet = 3;
  const quizData = [];
  for (let i = 0; i < quizQuestionsData.length; i += questionsPerSet) {
    quizData.push(quizQuestionsData.slice(i, i + questionsPerSet));
  }

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
