"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { getAllWords } from "@/data/vocabulary";

export default function DailyChallengePage() {
  const { isDailyChallengeDone, completeDailyChallenge } = useProgress();
  const allWords = getAllWords();
  const done = isDailyChallengeDone();

  // Generate a deterministic daily challenge based on date
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const challengeWords = Array.from({ length: 5 }, (_, i) => {
    const idx = (dayOfYear * 7 + i * 13) % allWords.length;
    return allWords[idx];
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [state, setState] = useState<"question" | "correct" | "wrong">(
    "question"
  );
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentWord = challengeWords[currentIdx];

  const options = useMemo(() => {
    if (!currentWord) return [];
    // Use seed based on currentIdx to generate deterministic shuffle
    const seed = dayOfYear + currentIdx;
    const seededRandom = (i: number) => {
      const x = Math.sin(seed + i) * 10000;
      return x - Math.floor(x);
    };
    const shuffled = [...allWords.filter((w) => w.english !== currentWord.english)]
      .sort((a, b) => seededRandom(a.english.length) - seededRandom(b.english.length))
      .slice(0, 3)
      .map((w) => w.english);
    return [currentWord.english, ...shuffled]
      .sort((a, b) => seededRandom(a.length + b.length) - seededRandom(b.length));
  }, [currentWord, allWords, dayOfYear, currentIdx]);

  const handleCheck = () => {
    if (!selected || !currentWord) return;
    if (selected === currentWord.english) {
      setState("correct");
      setCorrectCount((c) => c + 1);
    } else {
      setState("wrong");
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 >= 5) {
      setFinished(true);
      if (!done) {
        completeDailyChallenge();
      }
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setState("question");
    }
  };

  if (done || finished) {
    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center animate-bounce-in">
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Daily Challenge
            </h2>
            <p className="text-gray-400 mb-6">
              {done
                ? "You've already completed today's challenge!"
                : "Challenge complete!"}
            </p>
            {!done && finished && (
              <div className="bg-indigo-500/10 rounded-xl p-4 mb-6">
                <p className="text-sm text-indigo-300">
                  Score: {correctCount}/5
                </p>
                <p className="text-2xl font-bold text-indigo-400 mt-1">
                  +50 Bonus XP
                </p>
              </div>
            )}
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
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Home</span>
          </Link>
          <h1 className="text-xl font-bold text-white">🎯 Daily Challenge</h1>
          <span className="text-sm text-gray-400">
            {currentIdx + 1}/5
          </span>
        </div>

        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-400 text-sm font-medium">
              🔥 +50 Bonus XP
            </span>
          </div>

          <p className="text-sm text-gray-400 mb-2">Translate this word</p>
          <h2 className="text-3xl font-bold text-white mb-8">
            {currentWord.spanish}
          </h2>

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
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:brightness-110"
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
