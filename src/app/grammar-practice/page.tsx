"use client";

import { useState } from "react";
import Link from "next/link";
import { grammarPracticeSets } from "@/data/grammarPractice";
import type { GrammarPracticeSet } from "@/data/grammarPractice";
import { useProgress } from "@/context/ProgressContext";

export default function GrammarPracticePage() {
  const { addXP } = useProgress();
  const [currentSet, setCurrentSet] = useState<GrammarPracticeSet | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [gameState, setGameState] = useState<
    "playing" | "correct" | "wrong" | "done"
  >("playing");
  const [correctCount, setCorrectCount] = useState(0);

  if (!currentSet) {
    return (
      <main className="min-h-screen bg-neutral-950">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span>Home</span>
            </Link>
            <h1 className="text-xl font-bold text-white">
              📝 Grammar Practice
            </h1>
            <div />
          </div>
          <p className="text-gray-400 mb-8 text-center">
            Test your grammar knowledge with interactive exercises.
          </p>

          <div className="space-y-4">
            {grammarPracticeSets.map((set) => (
              <button
                key={set.id}
                onClick={() => {
                  setCurrentSet(set);
                  setCurrentIndex(0);
                  setSelected(null);
                  setGameState("playing");
                  setCorrectCount(0);
                }}
                className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all animate-fade-in-up group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{set.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {set.title}
                    </h3>
                    <p className="text-sm text-gray-400">{set.description}</p>
                  </div>
                  <span className="text-gray-500 group-hover:text-gray-300 transition-colors">
                    {set.questions.length} Qs →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (gameState === "done") {
    const total = currentSet.questions.length;
    const pct = Math.round((correctCount / total) * 100);

    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center animate-bounce-in">
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="text-6xl mb-4">
              {pct === 100 ? "🏆" : pct >= 75 ? "⭐" : "📝"}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Practice Complete!
            </h2>
            <p className="text-gray-400 mb-6">{currentSet.title}</p>
            <div className="bg-indigo-500/10 rounded-xl p-4 mb-6">
              <p className="text-sm text-indigo-300">
                Score: {correctCount}/{total}
              </p>
              <p className="text-2xl font-bold text-indigo-400 mt-1">+15 XP</p>
            </div>
            <button
              onClick={() => {
                setCurrentSet(null);
                setCurrentIndex(0);
                setSelected(null);
                setGameState("playing");
                setCorrectCount(0);
              }}
              className="block w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all"
            >
              Back to List
            </button>
          </div>
        </div>
      </main>
    );
  }

  const question = currentSet.questions[currentIndex];
  const total = currentSet.questions.length;
  const progressPct = ((currentIndex + 1) / total) * 100;

  const handleCheck = () => {
    if (!selected) return;
    if (selected === question.correct) {
      setGameState("correct");
      setCorrectCount((c) => c + 1);
    } else {
      setGameState("wrong");
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= total) {
      setGameState("done");
      addXP(15);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setGameState("playing");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              setCurrentSet(null);
              setCurrentIndex(0);
              setSelected(null);
              setGameState("playing");
              setCorrectCount(0);
            }}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <h1 className="text-lg font-bold text-white">
            {currentSet.emoji} {currentSet.title}
          </h1>
          <span className="text-sm text-gray-400">
            {currentIndex + 1}/{total}
          </span>
        </div>

        <div className="w-full bg-white/10 rounded-full h-2 mb-8">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="animate-fade-in-up">
          <p className="text-sm text-gray-400 mb-2">
            {question.type === "multiple_choice"
              ? "Choose the correct answer"
              : "Fill in the blank"}
          </p>
          <h2 className="text-2xl font-bold text-white mb-6">
            {question.prompt}
          </h2>

          <div className="space-y-3">
            {(question.options ?? []).map((option) => {
              let borderStyle = "border-white/10 hover:border-white/30";
              let bgStyle = "bg-white/5 hover:bg-white/10";

              if (
                (gameState === "correct" || gameState === "wrong") &&
                option === question.correct
              ) {
                borderStyle = "border-emerald-500";
                bgStyle = "bg-emerald-500/20";
              } else if (
                gameState === "wrong" &&
                option === selected
              ) {
                borderStyle = "border-rose-500";
                bgStyle = "bg-rose-500/20";
              } else if (selected === option && gameState === "playing") {
                borderStyle = "border-indigo-500";
                bgStyle = "bg-indigo-500/20";
              }

              return (
                <button
                  key={option}
                  onClick={() =>
                    gameState === "playing" && setSelected(option)
                  }
                  disabled={gameState !== "playing"}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${borderStyle} ${bgStyle}`}
                >
                  <span className="font-medium text-white">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {(gameState === "correct" || gameState === "wrong") && (
          <div
            className={`mt-4 p-4 rounded-xl border animate-fade-in-up ${
              gameState === "correct"
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-rose-500/10 border-rose-500/30"
            }`}
          >
            <p
              className={`font-bold mb-1 ${
                gameState === "correct" ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {gameState === "correct" ? "✓ Correct!" : "✗ Incorrect"}
            </p>
            <p className="text-sm text-gray-300">{question.explanation}</p>
          </div>
        )}

        <div className="mt-6">
          {gameState === "playing" ? (
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
                gameState === "correct"
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
