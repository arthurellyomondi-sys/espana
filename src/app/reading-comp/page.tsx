"use client";

import { useState } from "react";
import Link from "next/link";
import { readingPassages } from "@/data/comprehension";
import { useProgress } from "@/context/ProgressContext";

type Mode = "list" | "practice";

export default function ReadingCompPage() {
  const [mode, setMode] = useState<Mode>("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [phase, setPhase] = useState<"read" | "questions" | "complete">("read");
  const { addXP } = useProgress();

  const passage = readingPassages.find((p) => p.id === selectedId);

  function startPractice(id: string) {
    setSelectedId(id);
    setMode("practice");
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setPhase("read");
  }

  function handleAnswer() {
    if (!passage || !selected) return;
    const q = passage.questions[currentQ];
    const correct = selected === q.correct;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    setShowResult(true);
  }

  function handleNext() {
    if (!passage) return;
    if (currentQ < passage.questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setPhase("complete");
      const correctCount = answers.filter(Boolean).length;
      if (correctCount === passage.questions.length) {
        addXP(passage.xpReward);
      } else {
        addXP(Math.floor(passage.xpReward * (correctCount / passage.questions.length)));
      }
    }
  }

  function resetToList() {
    setMode("list");
    setSelectedId(null);
  }

  if (mode === "practice" && passage) {
    const progressPct = phase === "complete"
      ? 100
      : phase === "read"
        ? 0
        : Math.round(((currentQ + (showResult ? 1 : 0)) / passage.questions.length) * 100);

    if (phase === "complete") {
      const correctCount = answers.filter(Boolean).length;
      return (
        <main className="min-h-screen bg-neutral-950">
          <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in-up">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center">
              <div className="text-6xl mb-4">
                {correctCount === passage.questions.length ? "🎉" : "👍"}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {correctCount === passage.questions.length ? "Perfect!" : "Nice Try!"}
              </h2>
              <p className="text-gray-400 mb-4">
                You got {correctCount} out of {passage.questions.length} correct
              </p>
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 mb-6 inline-block">
                <p className="text-emerald-400 font-bold text-lg">
                  +{correctCount === passage.questions.length
                    ? passage.xpReward
                    : Math.floor(passage.xpReward * (correctCount / passage.questions.length))} XP
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => startPractice(passage.id)}
                  className="rounded-xl bg-white/10 hover:bg-white/15 text-white px-6 py-3 font-medium transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={resetToList}
                  className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 font-medium transition-colors"
                >
                  All Passages
                </button>
              </div>
            </div>
          </div>
        </main>
      );
    }

    if (phase === "read") {
      return (
        <main className="min-h-screen bg-neutral-950">
          <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={resetToList}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>←</span>
                <span>Back</span>
              </button>
              <h1 className="text-xl font-bold text-white">{passage.emoji} {passage.title}</h1>
              <div />
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 mb-6">
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                {passage.text}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-6">
              <p className="text-gray-500 text-sm mb-1">English translation:</p>
              <p className="text-gray-400 text-sm leading-relaxed">{passage.english}</p>
            </div>

            <button
              onClick={() => setPhase("questions")}
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white py-3 font-medium transition-colors"
            >
              Continue to Questions →
            </button>
          </div>
        </main>
      );
    }

    const q = passage.questions[currentQ];
    return (
      <main className="min-h-screen bg-neutral-950">
        <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={resetToList}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-white">{passage.emoji} {passage.title}</h1>
            <div />
          </div>

          <div className="w-full bg-white/5 rounded-full h-2 mb-6">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <p className="text-gray-400 text-sm mb-2">
            Question {currentQ + 1} of {passage.questions.length}
          </p>
          <h2 className="text-lg font-bold text-white mb-6">{q.question}</h2>

          <div className="space-y-3 mb-6">
            {q.options.map((opt) => {
              let classes = "rounded-xl border p-4 text-left w-full transition-colors font-medium ";
              if (showResult) {
                if (opt === q.correct) {
                  classes += "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
                } else if (opt === selected) {
                  classes += "bg-red-500/10 border-red-500/30 text-red-400";
                } else {
                  classes += "bg-white/5 border-white/10 text-gray-400";
                }
              } else {
                if (opt === selected) {
                  classes += "bg-blue-500/10 border-blue-500/30 text-blue-400";
                } else {
                  classes += "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20";
                }
              }
              return (
                <button
                  key={opt}
                  onClick={() => !showResult && setSelected(opt)}
                  className={classes}
                  disabled={showResult}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {!showResult ? (
            <button
              onClick={handleAnswer}
              disabled={!selected}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-gray-500 text-white py-3 font-medium transition-colors"
            >
              Check
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white py-3 font-medium transition-colors"
            >
              {currentQ < passage.questions.length - 1 ? "Next Question →" : "See Results"}
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Home</span>
          </Link>
          <h1 className="text-xl font-bold text-white">📖 Reading Comprehension</h1>
          <div />
        </div>

        <p className="text-gray-400 mb-8 text-center">
          Read Spanish passages and test your understanding!
        </p>

        <div className="grid grid-cols-1 gap-4">
          {readingPassages.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 animate-fade-in-up"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{p.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <p className="text-sm text-gray-400">{p.questions.length} questions · +{p.xpReward} XP</p>
                </div>
              </div>
              <button
                onClick={() => startPractice(p.id)}
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-medium transition-colors"
              >
                Start →
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
