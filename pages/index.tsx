import { useState, useEffect } from 'react';
import Head from 'next/head';

type PossibleAnswer = {
  answer_text: string;
  is_correct: boolean;
};

type Question = {
  question: string;
  possible_answers: PossibleAnswer[];
  quote: string;
  page: number;
  paragraph: string;
  online_page: string;
};

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    fetch('/canadatestprep/questions.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    if (questions[currentQuestion].possible_answers[selectedAnswer].is_correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <Head>
        <title>Canada Test Prep Quiz</title>
        <link rel="stylesheet" href="/canadatestprep/styles.css" />
      </Head>
      <header className="quiz-header">
        <h1>Canada Test Prep Quiz</h1>
      </header>
      <main className="quiz-main">
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
              {questions[currentQuestion].possible_answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`answer-button ${selectedAnswer === index ? 'selected' : ''}`}
                >
                  {answer.answer_text}
                </button>
              ))}
            </div>
            <button onClick={handleSubmit} className="submit-button" disabled={selectedAnswer === null}>
              Submit
            </button>
            <div className="quote-section">
              <blockquote>{questions[currentQuestion].quote}</blockquote>
              <p>
                Source: <a href={questions[currentQuestion].online_page} target="_blank" rel="noopener noreferrer">{questions[currentQuestion].paragraph}</a>
              </p>
            </div>
          </>
        )}
      </main>
      <footer className="quiz-footer">
        Canada Test Prep ©2024
      </footer>
    </div>
  );
};

export default Quiz;