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

type QuestionsResponse = {
  questions: Question[];
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
            setCurrentQuestion(storedQuestions[0]);
          }
        } else {
          fetch('/canadatestprep/questions.json')
            .then((response) => response.json())
            .then((data: QuestionsResponse) => {
              const shuffledQuestions = shuffleArray(
                data.questions.map((question: Question) => ({
                  ...question,
                  possible_answers: shuffleArray(question.possible_answers),
                }))
              );
              setQuestions(shuffledQuestions);
              saveState('questions', shuffledQuestions);
              setCurrentQuestion(shuffledQuestions[0]);
            });
        }
      };
      initializeState();

      // Register the service worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/canadatestprep/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      }
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
      setQuestions((prev) => {
        const updatedQuestions = prev.slice(1);
        saveState('questions', updatedQuestions);
        return updatedQuestions;
      });
    } else {
      setIncorrectAnswersCount((prev) => prev + 1);
      setQuestions((prev) => {
        const shuffledQuestions = shuffleArray(prev);
        saveState('questions', shuffledQuestions);
        return shuffledQuestions;
      });
    }

    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    setIsSubmitted(false);
    setIsCorrect(null);

    if (questions.length > 0) {
      setCurrentQuestion(questions[0]);
    } else {
      setCurrentQuestion(null);
    }
  };

  const handleReset = async () => {
    const response = await fetch('/canadatestprep/questions.json');
    const data = await response.json();
    const shuffledQuestions = shuffleArray(
      data.questions.map((question: Question) => ({
        ...question,
        possible_answers: shuffleArray(question.possible_answers),
      }))
    );
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

  const totalAnsweredQuestions = correctAnswersCount + incorrectAnswersCount;
  const displayTotalQuestions = totalAnsweredQuestions > 0 ? totalAnsweredQuestions : 1;
  const correctPercentage = ((correctAnswersCount / displayTotalQuestions) * 100).toFixed(0);
  const incorrectPercentage = ((incorrectAnswersCount / displayTotalQuestions) * 100).toFixed(0);

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
            Correct {correctAnswersCount} ({correctPercentage}%) Incorrect {incorrectAnswersCount} ({incorrectPercentage}%) Remains {questions.length}
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