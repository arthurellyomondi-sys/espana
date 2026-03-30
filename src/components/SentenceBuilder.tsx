"use client";

import { useState, useMemo, useCallback } from "react";
import { useProgress } from "@/context/ProgressContext";
import { sentenceExercises } from "@/data/verbs";
import { playCorrectSound, playWrongSound } from "@/lib/audio";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface SentenceBuilderProps {
  onComplete: (score: number) => void;
}

export function SentenceBuilder({ onComplete }: SentenceBuilderProps) {
  const { recordSentence } = useProgress();
  const exercises = useMemo(
    () => shuffleArray(sentenceExercises).slice(0, 5),
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentExercise = exercises[currentIndex];
  const availableWords = useMemo(
    () =>
      currentExercise.words.filter((w) => !selectedWords.includes(w)),
    [currentExercise.words, selectedWords]
  );

  const handleWordClick = useCallback(
    (word: string) => {
      if (showFeedback) return;
      setSelectedWords((prev) => [...prev, word]);
    },
    [showFeedback]
  );

  const handleRemoveWord = useCallback(
    (index: number) => {
      if (showFeedback) return;
      setSelectedWords((prev) => prev.filter((_, i) => i !== index));
    },
    [showFeedback]
  );

  const handleCheck = useCallback(() => {
    const built = selectedWords.join(" ");
    const correct =
      built.toLowerCase().replace(/[¿?¡!]/g, "") ===
      currentExercise.spanish.toLowerCase().replace(/[¿?¡!]/g, "");
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((s) => s + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }
  }, [selectedWords, currentExercise]);

  function handleNext() {
    if (currentIndex + 1 >= exercises.length) {
      setFinished(true);
      recordSentence();
      onComplete(Math.round((score / exercises.length) * 100));
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedWords([]);
      setShowFeedback(false);
      setIsCorrect(false);
    }
  }

  // Shuffle display order of available words deterministically per exercise
  const displayAvailable = useMemo(
    () => shuffleArray(availableWords),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentIndex, availableWords.length]
  );

  if (finished) {
    const pct = Math.round((score / exercises.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-lg">
        <div className="text-7xl">{pct >= 75 ? "🏗️" : "💪"}</div>
        <h2 className="text-3xl font-bold text-white">Sentences Complete!</h2>
        <div className="bg-white/10 rounded-2xl p-8 w-full">
          <p className="text-5xl font-bold text-white mb-2">{pct}%</p>
          <p className="text-gray-300">
            {score} out of {exercises.length} correct
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="w-full flex justify-between items-center text-sm text-gray-400">
        <span>
          {currentIndex + 1} of {exercises.length}
        </span>
        <span>
          Score: {score}/{currentIndex}
        </span>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / exercises.length) * 100}%`,
          }}
        />
      </div>

      <div className="bg-white/5 rounded-2xl p-6 w-full text-center border border-white/10">
        <p className="text-sm text-teal-300 mb-2">
          Arrange the words to form this sentence
        </p>
        <p className="text-2xl font-bold text-white">
          {currentExercise.english}
        </p>
      </div>

      {/* Selected words (sentence builder area) */}
      <div className="w-full min-h-16 bg-white/5 rounded-xl border-2 border-dashed border-white/20 p-4 flex flex-wrap gap-2 items-center">
        {selectedWords.length === 0 ? (
          <span className="text-gray-500 text-sm">
            Tap words below to build the sentence...
          </span>
        ) : (
          selectedWords.map((word, i) => (
            <button
              key={`selected-${word}-${i}`}
              onClick={() => handleRemoveWord(i)}
              disabled={showFeedback}
              className="px-4 py-2 rounded-lg bg-teal-500/30 text-teal-200 font-medium border border-teal-500/50 hover:bg-teal-500/40 transition-colors"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-2 w-full">
        {displayAvailable.map((word, i) => (
          <button
            key={`available-${word}-${i}`}
            onClick={() => handleWordClick(word)}
            disabled={showFeedback}
            className="px-4 py-2 rounded-lg bg-white/10 text-white font-medium border border-white/10 hover:bg-white/20 transition-colors"
          >
            {word}
          </button>
        ))}
      </div>

      {!showFeedback && selectedWords.length > 0 && (
        <button
          onClick={handleCheck}
          className="px-8 py-3 rounded-xl bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors"
        >
          Check Sentence
        </button>
      )}

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
              "Perfect sentence!"
            ) : (
              <>
                Not quite. The correct sentence is:{" "}
                <strong>{currentExercise.spanish}</strong>
              </>
            )}
          </div>
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
          >
            {currentIndex + 1 >= exercises.length
              ? "See Results"
              : "Next Sentence"}
          </button>
        </div>
      )}
    </div>
  );
}
