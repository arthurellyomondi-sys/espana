"use client";

import { useState, useMemo } from "react";
import { Word } from "@/data/vocabulary";
import { useProgress } from "@/context/ProgressContext";

interface QuizProps {
  words: Word[];
  categoryId: string;
  onComplete: (score: number) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateQuestions(words: Word[]) {
  return shuffleArray(words).map((word) => {
    const wrongAnswers = shuffleArray(
      words.filter((w) => w.english !== word.english)
    )
      .slice(0, 3)
      .map((w) => w.english);
    const options = shuffleArray([word.english, ...wrongAnswers]);
    return { word, options, correctAnswer: word.english };
  });
}

export function Quiz({ words, categoryId, onComplete }: QuizProps) {
  const { markWordLearned, saveQuizScore } = useProgress();
  const questions = useMemo(() => generateQuestions(words), [words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentIndex];

  function handleAnswer(answer: string) {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
      markWordLearned(`${categoryId}:${currentQuestion.word.spanish}`);
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 0 : 0);
      const percentage = Math.round((score / questions.length) * 100);
      saveQuizScore(categoryId, percentage);
      setFinished(true);
      onComplete(percentage);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    const emoji =
      percentage === 100
        ? "🏆"
        : percentage >= 75
          ? "🌟"
          : percentage >= 50
            ? "👍"
            : "💪";
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="text-7xl">{emoji}</div>
        <h2 className="text-3xl font-bold text-white">Quiz Complete!</h2>
        <div className="bg-white/10 rounded-2xl p-8 w-full max-w-sm">
          <p className="text-6xl font-bold text-white mb-2">{percentage}%</p>
          <p className="text-gray-300">
            {score} out of {questions.length} correct
          </p>
        </div>
        {percentage === 100 && (
          <p className="text-emerald-400 font-medium text-lg">
            Perfect score! You&apos;re a natural!
          </p>
        )}
        {percentage >= 75 && percentage < 100 && (
          <p className="text-emerald-400 font-medium">
            Great job! Almost perfect!
          </p>
        )}
        {percentage < 75 && percentage >= 50 && (
          <p className="text-yellow-400 font-medium">
            Good effort! Keep practicing!
          </p>
        )}
        {percentage < 50 && (
          <p className="text-orange-400 font-medium">
            Keep studying! You&apos;ll get there!
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="w-full flex justify-between items-center text-sm text-gray-400">
        <span>
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span>
          Score: {score}/{currentIndex}
        </span>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="bg-white/5 rounded-2xl p-8 w-full text-center border border-white/10">
        <p className="text-sm text-indigo-300 mb-2">
          What does this mean in English?
        </p>
        <h2 className="text-4xl font-bold text-white">
          {currentQuestion.word.spanish}
        </h2>
        <p className="text-gray-400 mt-2">
          {currentQuestion.word.pronunciation}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 w-full">
        {currentQuestion.options.map((option) => {
          let buttonClass =
            "w-full p-4 rounded-xl text-left font-medium transition-all duration-200 border ";

          if (showFeedback && option === currentQuestion.correctAnswer) {
            buttonClass +=
              "bg-emerald-500/30 border-emerald-500 text-emerald-300";
          } else if (
            showFeedback &&
            option === selectedAnswer &&
            option !== currentQuestion.correctAnswer
          ) {
            buttonClass += "bg-red-500/30 border-red-500 text-red-300";
          } else {
            buttonClass +=
              "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20";
          }

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={buttonClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="flex flex-col items-center gap-3 w-full">
          <div
            className={`p-4 rounded-xl w-full text-center ${
              selectedAnswer === currentQuestion.correctAnswer
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {selectedAnswer === currentQuestion.correctAnswer
              ? "Correct!"
              : `Wrong! The answer is: ${currentQuestion.correctAnswer}`}
          </div>
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
          >
            {currentIndex + 1 >= questions.length ? "See Results" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
