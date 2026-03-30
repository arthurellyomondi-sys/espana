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

interface TypingGameProps {
  words: Word[];
  categoryId: string;
  onComplete: (score: number) => void;
}

export function TypingGame({
  words,
  categoryId,
  onComplete,
}: TypingGameProps) {
  const { recordTyping, markWordLearned, updateWordStrength } = useProgress();
  const questions = useMemo(() => shuffleArray(words).slice(0, 8), [words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentWord = questions[currentIndex];

  const handleCheck = useCallback(() => {
    if (showFeedback) return;
    const normalized = input.trim().toLowerCase();
    const correct = normalized === currentWord.spanish.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);

    const wordKey = `${categoryId}:${currentWord.spanish}`;
    updateWordStrength(wordKey, correct);

    if (correct) {
      setScore((s) => s + 1);
      playCorrectSound();
      markWordLearned(wordKey);
    } else {
      playWrongSound();
    }
  }, [
    input,
    currentWord,
    showFeedback,
    categoryId,
    markWordLearned,
    updateWordStrength,
  ]);

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      recordTyping();
      onComplete(Math.round((score / questions.length) * 100));
    } else {
      setCurrentIndex((i) => i + 1);
      setInput("");
      setShowFeedback(false);
      setIsCorrect(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      if (showFeedback) handleNext();
      else handleCheck();
    }
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-lg">
        <div className="text-7xl">{pct >= 75 ? "⌨️" : "💪"}</div>
        <h2 className="text-3xl font-bold text-white">Typing Complete!</h2>
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
          className="bg-gradient-to-r from-fuchsia-500 to-pink-500 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="bg-white/5 rounded-2xl p-8 w-full text-center border border-white/10">
        <p className="text-sm text-fuchsia-300 mb-2">
          Type this word in Spanish
        </p>
        <h2 className="text-4xl font-bold text-white mb-2">
          {currentWord.english}
        </h2>
        <p className="text-gray-400">
          {currentWord.example}
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={showFeedback}
          placeholder="Type the Spanish word..."
          className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-fuchsia-500 text-lg"
          autoFocus
        />
        {!showFeedback && (
          <button
            onClick={handleCheck}
            className="px-6 py-4 rounded-xl bg-fuchsia-500 text-white font-medium hover:bg-fuchsia-600 transition-colors"
          >
            Check
          </button>
        )}
      </div>

      {showFeedback && (
        <div className="flex flex-col items-center gap-3 w-full">
          <div
            className={`p-4 rounded-xl w-full text-center ${
              isCorrect
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {isCorrect ? (
              "Correct!"
            ) : (
              <>
                Wrong! The answer is: <strong>{currentWord.spanish}</strong>
              </>
            )}
          </div>
          {!isCorrect && (
            <button
              onClick={() => speakSpanish(currentWord.spanish)}
              className="text-sky-400 hover:text-sky-300 text-sm flex items-center gap-2"
            >
              🔊 Listen to pronunciation
            </button>
          )}
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
