"use client";

import { useState, useMemo, useCallback } from "react";
import { Word } from "@/data/vocabulary";
import { useProgress } from "@/context/ProgressContext";
import { speakSpanish, playCorrectSound, playWrongSound } from "@/lib/audio";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface ListeningGameProps {
  words: Word[];
  categoryId: string;
  onComplete: (score: number) => void;
}

export function ListeningGame({
  words,
  categoryId,
  onComplete,
}: ListeningGameProps) {
  const { recordListening, markWordLearned } = useProgress();
  const questions = useMemo(() => shuffleArray(words).slice(0, 8), [words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

  const currentWord = questions[currentIndex];
  const options = useMemo(() => {
    const wrong = shuffleArray(words.filter((w) => w.spanish !== currentWord.spanish))
      .slice(0, 3)
      .map((w) => w.english);
    return shuffleArray([currentWord.english, ...wrong]);
  }, [currentWord, words]);

  const handleSpeak = useCallback(() => {
    speakSpanish(currentWord.spanish);
    setHasSpoken(true);
  }, [currentWord]);

  function handleAnswer(answer: string) {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentWord.english) {
      setScore((s) => s + 1);
      playCorrectSound();
      markWordLearned(`${categoryId}:${currentWord.spanish}`);
    } else {
      playWrongSound();
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      recordListening();
      const finalScore = Math.round(
        ((score +
          (selectedAnswer === currentWord.english ? 0 : 0)) /
          questions.length) *
          100
      );
      onComplete(finalScore);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setHasSpoken(false);
    }
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-lg">
        <div className="text-7xl">{pct >= 75 ? "🎧" : "💪"}</div>
        <h2 className="text-3xl font-bold text-white">Listening Complete!</h2>
        <div className="bg-white/10 rounded-2xl p-8 w-full">
          <p className="text-5xl font-bold text-white mb-2">{pct}%</p>
          <p className="text-gray-300">
            {score} out of {questions.length} correct
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="w-full flex justify-between items-center text-sm text-gray-400">
        <span>
          {currentIndex + 1} of {questions.length}
        </span>
        <span>
          Score: {score}/{currentIndex}
        </span>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-sky-500 to-blue-500 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="bg-white/5 rounded-2xl p-8 w-full text-center border border-white/10">
        <p className="text-sm text-sky-300 mb-4">
          Listen and select the correct translation
        </p>
        <button
          onClick={handleSpeak}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white text-4xl hover:scale-105 transition-transform shadow-lg mx-auto flex items-center justify-center"
        >
          🔊
        </button>
        {hasSpoken && (
          <p className="text-gray-400 text-sm mt-3">
            (Click again to replay)
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 w-full">
        {options.map((option) => {
          let cls = "w-full p-4 rounded-xl text-left font-medium transition-all border ";
          if (showFeedback && option === currentWord.english) {
            cls += "bg-emerald-500/30 border-emerald-500 text-emerald-300";
          } else if (showFeedback && option === selectedAnswer) {
            cls += "bg-red-500/30 border-red-500 text-red-300";
          } else {
            cls += "bg-white/5 border-white/10 text-white hover:bg-white/10";
          }
          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={cls}
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
              selectedAnswer === currentWord.english
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {selectedAnswer === currentWord.english
              ? `Correct! "${currentWord.spanish}" = "${currentWord.english}"`
              : `Wrong! "${currentWord.spanish}" = "${currentWord.english}"`}
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
