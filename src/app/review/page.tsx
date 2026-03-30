"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { getAllWords } from "@/data/vocabulary";
import { speakSpanish } from "@/lib/audio";

type ReviewState = "question" | "correct" | "wrong" | "done";

export default function ReviewPage() {
  const {
    getWordsForReview,
    updateWordStrength,
    incrementReviewSessions,
    progress,
  } = useProgress();

  const allWords = getAllWords();
  const reviewWordKeys = getWordsForReview();

  const reviewWords = reviewWordKeys
    .map((key) => {
      const [catId, wordIdx] = key.split(":");
      const cat = allWords.find((w) => w.spanish === key.split(":").slice(1).join(":"));
      if (cat) return cat;
      // Try finding by category + index
      const categoryWords = allWords.filter((_, i) => {
        const categories = [
          "greetings", "food", "numbers", "colors", "animals", "travel",
          "body", "weather", "family", "clothing", "directions", "emergency",
          "professions", "home", "emotions", "school", "sports", "transport",
        ];
        return true; // just search all words
      });
      return allWords.find(
        (w) => `${catId}:${wordIdx}` === key || w.spanish.toLowerCase() === key.split(":").pop()?.toLowerCase()
      );
    })
    .filter(Boolean) as { spanish: string; english: string; pronunciation: string }[];

  // Fallback: if no review words due to key format mismatch, get words with low strength
  const fallbackWords = Object.values(progress.wordProgress)
    .filter((w) => w.strength < 5)
    .map((wp) => allWords.find((w) => w.spanish === wp.wordKey.split(":").pop()))
    .filter(Boolean) as { spanish: string; english: string; pronunciation: string }[];

  const wordsToReview = reviewWords.length > 0 ? reviewWords : fallbackWords;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<ReviewState>("question");
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [options, setOptions] = useState<string[]>([]);
  const [started, setStarted] = useState(false);

  const currentWord = wordsToReview[currentIndex];

  const generateOptions = useCallback(
    (correct: string) => {
      const others = allWords
        .filter((w) => w.english !== correct)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.english);
      return [...others, correct].sort(() => Math.random() - 0.5);
    },
    [allWords]
  );

  const startReview = () => {
    setStarted(true);
    setCurrentIndex(0);
    setState("question");
    setSelected(null);
    setScore({ correct: 0, wrong: 0 });
    if (wordsToReview[0]) {
      setOptions(generateOptions(wordsToReview[0].english));
    }
  };

  const handleCheck = () => {
    if (!selected || !currentWord) return;
    const isCorrect = selected === currentWord.english;
    const wordKey = currentWord.spanish;
    updateWordStrength(wordKey, isCorrect);

    if (isCorrect) {
      setState("correct");
      setScore((s) => ({ ...s, correct: s.correct + 1 }));
    } else {
      setState("wrong");
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= wordsToReview.length) {
      setState("done");
      incrementReviewSessions();
    } else {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setState("question");
      setSelected(null);
      setOptions(generateOptions(wordsToReview[nextIdx].english));
    }
  };

  if (!started) {
    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span>Home</span>
            </Link>
            <h1 className="text-xl font-bold text-white">🧠 Review</h1>
            <div />
          </div>
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="text-5xl mb-4">🧠</div>
            <h2 className="text-2xl font-bold text-white mb-2">Spaced Repetition Review</h2>
            <p className="text-gray-400 mb-6">
              {wordsToReview.length > 0
                ? `You have ${wordsToReview.length} words to review today!`
                : "No words need reviewing right now. Keep learning to build your review queue!"}
            </p>
            {wordsToReview.length > 0 ? (
              <button
                onClick={startReview}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold hover:brightness-110 transition-all"
              >
                Start Review ({wordsToReview.length} words)
              </button>
            ) : (
              <Link
                href="/lessons"
                className="block w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold hover:brightness-110 transition-all"
              >
                Go to Lessons
              </Link>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (state === "done") {
    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center animate-bounce-in">
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">Review Complete!</h2>
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-emerald-500/10 rounded-xl p-3">
                <p className="text-2xl font-bold text-emerald-400">{score.correct}</p>
                <p className="text-xs text-gray-400">Correct</p>
              </div>
              <div className="bg-rose-500/10 rounded-xl p-3">
                <p className="text-2xl font-bold text-rose-400">{score.wrong}</p>
                <p className="text-xs text-gray-400">Wrong</p>
              </div>
            </div>
            <div className="bg-indigo-500/10 rounded-xl p-3 mb-6">
              <p className="text-sm text-indigo-300">+20 XP earned</p>
            </div>
            <Link
              href="/"
              className="block w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!currentWord) return null;

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setStarted(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
          <div className="flex-1 mx-4 bg-white/10 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{
                width: `${((currentIndex) / wordsToReview.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-sm text-gray-400">
            {currentIndex + 1}/{wordsToReview.length}
          </span>
        </div>

        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Translate this word</p>
            <button
              onClick={() => speakSpanish(currentWord.spanish)}
              className="text-sky-400 hover:text-sky-300"
            >
              🔊
            </button>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">
            {currentWord.spanish}
          </h2>
          <p className="text-gray-400 mb-8">{currentWord.pronunciation}</p>

          <div className="space-y-3">
            {options.map((option) => {
              let borderStyle = "border-white/10 hover:border-white/30";
              let bgStyle = "bg-white/5 hover:bg-white/10";

              if (state === "correct" && option === currentWord.english) {
                borderStyle = "border-emerald-500";
                bgStyle = "bg-emerald-500/20";
              } else if (state === "wrong") {
                if (option === currentWord.english) {
                  borderStyle = "border-emerald-500";
                  bgStyle = "bg-emerald-500/20";
                } else if (option === selected) {
                  borderStyle = "border-rose-500";
                  bgStyle = "bg-rose-500/20";
                }
              } else if (selected === option) {
                borderStyle = "border-indigo-500";
                bgStyle = "bg-indigo-500/20";
              }

              return (
                <button
                  key={option}
                  onClick={() => state === "question" && setSelected(option)}
                  disabled={state !== "question"}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${borderStyle} ${bgStyle}`}
                >
                  <span className="font-medium text-white">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          {state === "question" ? (
            <button
              onClick={handleCheck}
              disabled={!selected}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                selected
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:brightness-110"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }`}
            >
              Check
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                state === "correct"
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                  : "bg-gradient-to-r from-rose-500 to-red-500 text-white"
              }`}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
