import { useState, useEffect } from 'react';
import Head from 'next/head';
import { saveState, loadState, clearState } from '../lib/indexedDB';

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
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initializeState = async () => {
        const storedQuestions = await loadState('questions');
        const storedCorrectAnswersCount = await loadState('correctAnswersCount');
        const storedIncorrectAnswersCount = await loadState('incorrectAnswersCount');
        if (storedQuestions) {
          setQuestions(storedQuestions);
          setCorrectAnswersCount(storedCorrectAnswersCount || 0);
          setIncorrectAnswersCount(storedIncorrectAnswersCount || 0);
          if (storedQuestions.length > 0) {
            const nextQuestion = storedQuestions[Math.floor(Math.random() * storedQuestions.length)];
            setCurrentQuestion(nextQuestion);
          }
        } else {
          fetch('/canadatestprep/questions.json')
            .then((response) => response.json())
            .then((data) => {
              const shuffledQuestions = data.map((question: Question) => ({
                ...question,
                possible_answers: shuffleArray(question.possible_answers),
              }));
              setQuestions(shuffledQuestions);
              saveState('questions', shuffledQuestions);
            });
        }
      };
      initializeState();
    }
  }, []);

  useEffect(() => {
    const saveQuizState = async () => {
      await saveState('questions', questions);
      await saveState('correctAnswersCount', correctAnswersCount);
      await saveState('incorrectAnswersCount', incorrectAnswersCount);
    };
    if (typeof window !== 'undefined') {
      saveQuizState();
    }
  }, [questions, correctAnswersCount, incorrectAnswersCount]);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = currentQuestion!.possible_answers[selectedAnswer].is_correct;
    setIsCorrect(correct);

    if (correct) {
      setCorrectAnswersCount((prev) => prev + 1);
      setQuestions((prev) => prev.filter((q) => q !== currentQuestion));
    } else {
      setIncorrectAnswersCount((prev) => prev + 1);
    }

    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    setIsSubmitted(false);
    setIsCorrect(null);

    if (questions.length > 0) {
      const nextQuestion = questions[Math.floor(Math.random() * questions.length)];
      setCurrentQuestion(nextQuestion);
    } else {
      setCurrentQuestion(null);
    }
  };

  const handleReset = async () => {
    const response = await fetch('/canadatestprep/questions.json');
    const data = await response.json();
    const shuffledQuestions = data.map((question: Question) => ({
      ...question,
      possible_answers: shuffleArray(question.possible_answers),
    }));
    setQuestions(shuffledQuestions);
    setCorrectAnswersCount(0);
    setIncorrectAnswersCount(0);
    setCurrentQuestion(shuffledQuestions[0]);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setIsSubmitted(false);
    setIsCorrect(null);
    await clearState();
    await saveState('questions', shuffledQuestions);
  };

  const formatQuote = (quote: string) => {
    return quote.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const totalQuestions = correctAnswersCount + incorrectAnswersCount + questions.length;
  const correctCount = correctAnswersCount;
  const incorrectCount = incorrectAnswersCount;
  const remainingCount = questions.length;

  return (
    <div className="quiz-container">
      <Head>
        <title>Canada Test Prep Quiz</title>
        <link rel="stylesheet" href="/canadatestprep/styles.css" />
      </Head>
      <header className="quiz-header">
        <h1>Canada Test Prep Quiz</h1>
        <div className="stats-reset">
          <div className="stats">
            Correct {correctCount} ({((correctCount / totalQuestions) * 100).toFixed(0)}%) Incorrect {incorrectCount} ({((incorrectCount / totalQuestions) * 100).toFixed(0)}%) Remains {remainingCount}
          </div>
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </header>
      <main className="quiz-main">
        {currentQuestion ? (
          <>
            <div className="question-section">
              <div className="question-text">{currentQuestion.question}</div>
            </div>
            <div className="answer-section">
              {currentQuestion.possible_answers.map((answer, index) => (
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
            <button
              onClick={isSubmitted ? handleNextQuestion : handleSubmit}
              className="submit-button"
              disabled={selectedAnswer === null}
            >
              {isSubmitted ? 'Next Question' : 'Submit'}
            </button>
            <button onClick={() => setShowAnswer(!showAnswer)} className="answer-button">
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            {showAnswer && (
              <div className="answer-section">
                <blockquote dangerouslySetInnerHTML={{ __html: formatQuote(currentQuestion.quote) }}></blockquote>
                <p>
                  Source: <a href={currentQuestion.online_page} target="_blank" rel="noopener noreferrer">{currentQuestion.paragraph}</a>
                </p>
                <p>Discover Canada, Page {currentQuestion.page}, {currentQuestion.paragraph}</p>
              </div>
            )}
          </>
        ) : (
          <p>No questions available.</p>
        )}
      </main>
      <footer className="quiz-footer">
        Canada Test Prep ©2024
      </footer>
    </div>
  );
};

export default Quiz;