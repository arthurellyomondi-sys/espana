"use client";

import { useState } from "react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { getAllWords } from "@/data/vocabulary";

export default function PracticeMistakesPage() {
  const { getWrongAnswers, clearWrongAnswers, recordWordAttempt, updateWordStrength, addXP } = useProgress();
  const allWords = getAllWords();
  const wrongKeys = getWrongAnswers();

  const wrongWords = wrongKeys
    .map((key) => {
      const parts = key.split(":");
      const wordText = parts.length > 1 ? parts.slice(1).join(":") : key;
      return allWords.find((w) => w.spanish.toLowerCase() === wordText.toLowerCase());
    })
    .filter(Boolean) as { spanish: string; english: string; pronunciation: string }[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [state, setState] = useState<"question" | "correct" | "wrong">("question");
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const currentWord = wrongWords[currentIndex];

  const options = currentWord
    ? [
        currentWord.english,
        ...allWords
          .filter((w) => w.english !== currentWord.english)
          .sort((a, b) => a.spanish.localeCompare(b.spanish))
          .slice(0, 3)
          .map((w) => w.english),
      ].sort()
    : [];

  const handleCheck = () => {
    if (!selected || !currentWord) return;
    const isCorrect = selected === currentWord.english;
    recordWordAttempt(currentWord.spanish, isCorrect);
    updateWordStrength(currentWord.spanish, isCorrect);

    if (isCorrect) {
      setState("correct");
      setScore((s) => ({ ...s, correct: s.correct + 1 }));
    } else {
      setState("wrong");
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= wrongWords.length) {
      setDone(true);
      addXP(score.correct * 5);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setState("question");
    }
  };

  if (!started) {
    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-2">
              <span>←</span><span>Home</span>
            </Link>
            <h1 className="text-xl font-bold text-white">❌ Practice Mistakes</h1>
            <div />
          </div>
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-white mb-2">Review Your Mistakes</h2>
            <p className="text-gray-400 mb-6">
              {wrongWords.length > 0
                ? `You have ${wrongWords.length} words you got wrong to practice.`
                : "No mistakes recorded yet. Keep learning!"}
            </p>
            {wrongWords.length > 0 ? (
              <button
                onClick={() => setStarted(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:brightness-110 transition-all"
              >
                Practice ({wrongWords.length} words)
              </button>
            ) : (
              <Link href="/lessons" className="block w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold hover:brightness-110 transition-all">
                Go to Lessons
              </Link>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (done) {
    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center animate-bounce-in">
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">Mistakes Reviewed!</h2>
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-emerald-500/10 rounded-xl p-3">
                <p className="text-2xl font-bold text-emerald-400">{score.correct}</p>
                <p className="text-xs text-gray-400">Correct</p>
              </div>
              <div className="bg-rose-500/10 rounded-xl p-3">
                <p className="text-2xl font-bold text-rose-400">{score.wrong}</p>
                <p className="text-xs text-gray-400">Still Wrong</p>
              </div>
            </div>
            <div className="bg-indigo-500/10 rounded-xl p-3 mb-6">
              <p className="text-sm text-indigo-300">+{score.correct * 5} XP earned</p>
            </div>
            <button onClick={() => { clearWrongAnswers(); }} className="block w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all mb-2">
              Clear Mistakes List
            </button>
            <Link href="/" className="block w-full py-3 rounded-xl bg-white/5 text-gray-400 font-bold hover:bg-white/10 transition-all">
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
          <span className="text-sm text-gray-400">Practice Mistakes</span>
          <span className="text-sm text-gray-400">{currentIndex + 1}/{wrongWords.length}</span>
        </div>

        <div className="w-full bg-white/10 rounded-full h-2 mb-8">
          <div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500" style={{ width: `${((currentIndex) / wrongWords.length) * 100}%` }} />
        </div>

        <div className="animate-fade-in-up">
          <p className="text-sm text-gray-400 mb-2">Translate this word</p>
          <h2 className="text-3xl font-bold text-white mb-8">{currentWord.spanish}</h2>

          <div className="space-y-3">
            {options.map((option) => {
              let borderStyle = "border-white/10 hover:border-white/30";
              let bgStyle = "bg-white/5 hover:bg-white/10";
              if (state === "correct" && option === currentWord.english) {
                borderStyle = "border-emerald-500"; bgStyle = "bg-emerald-500/20";
              } else if (state === "wrong") {
                if (option === currentWord.english) { borderStyle = "border-emerald-500"; bgStyle = "bg-emerald-500/20"; }
                else if (option === selected) { borderStyle = "border-rose-500"; bgStyle = "bg-rose-500/20"; }
              } else if (selected === option) {
                borderStyle = "border-indigo-500"; bgStyle = "bg-indigo-500/20";
              }
              return (
                <button key={option} onClick={() => state === "question" && setSelected(option)} disabled={state !== "question"} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${borderStyle} ${bgStyle}`}>
                  <span className="font-medium text-white">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          {state === "question" ? (
            <button onClick={handleCheck} disabled={!selected} className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${selected ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:brightness-110" : "bg-white/10 text-gray-500 cursor-not-allowed"}`}>
              Check
            </button>
          ) : (
            <button onClick={handleNext} className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${state === "correct" ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white" : "bg-gradient-to-r from-rose-500 to-red-500 text-white"}`}>
              Continue
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
