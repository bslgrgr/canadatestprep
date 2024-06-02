import { useState } from 'react';
import Head from 'next/head';

const questions = [
  {
    question: 'What is the capital of Canada?',
    options: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'],
    answer: 'Ottawa',
  },
  {
    question: 'Which is the largest province in Canada?',
    options: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
    answer: 'Quebec',
  },
  // Add more questions as needed
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (option: string) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz">
      <Head>
        <title>Quiz</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;