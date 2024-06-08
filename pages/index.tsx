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

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/canadatestprep/questions.json')
      .then((response) => response.json())
      .then((data) => {
        const shuffledQuestions = data.map((question: Question) => ({
          ...question,
          possible_answers: shuffleArray(question.possible_answers)
        }));
        setQuestions(shuffledQuestions);
      });
  }, []);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = questions[currentQuestion].possible_answers[selectedAnswer].is_correct;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setIsSubmitted(false);
      setIsCorrect(null);
    } else {
      setShowScore(true);
    }
  };

  const formatQuote = (quote: string) => {
    return quote.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
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
                  disabled={isSubmitted}
                >
                  {answer.answer_text}
                </button>
              ))}
            </div>
            {isSubmitted && (
              <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect!'}
              </div>
            )}
            <button onClick={isSubmitted ? handleNextQuestion : handleSubmit} className="submit-button" disabled={selectedAnswer === null}>
              {isSubmitted ? 'Next Question' : 'Submit'}
            </button>
            <button onClick={() => setShowAnswer(!showAnswer)} className="answer-button">
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            {showAnswer && (
              <div className="answer-section">
                <blockquote dangerouslySetInnerHTML={{ __html: formatQuote(questions[currentQuestion].quote) }}></blockquote>
                <p>
                  Source: <a href={questions[currentQuestion].online_page} target="_blank" rel="noopener noreferrer">{questions[currentQuestion].paragraph}</a>
                </p>
                <p>Discover Canada, Page {questions[currentQuestion].page}, {questions[currentQuestion].paragraph}</p>
              </div>
            )}
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
