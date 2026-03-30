"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/data/vocabulary";
import { Flashcard } from "@/components/Flashcard";
import { Quiz } from "@/components/Quiz";
import { useProgress } from "@/context/ProgressContext";

export default function LearnPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryId } = use(params);
  const category = getCategoryById(categoryId);
  const [mode, setMode] = useState<"learn" | "quiz">("learn");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { getCategoryProgress } = useProgress();

  if (!category) {
    notFound();
  }

  // TypeScript doesn't narrow after notFound(), use a local const
  const cat = category;
  const categoryProgress = getCategoryProgress(categoryId, cat.words.length);

  function handleNextCard() {
    setCurrentIndex((i) => (i + 1) % cat.words.length);
  }

  function handlePrevCard() {
    setCurrentIndex((i) => (i - 1 + cat.words.length) % cat.words.length);
  }

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{cat.emoji}</span>
            <h1 className="text-xl font-bold text-white">{cat.name}</h1>
          </div>
          <div className="text-sm text-gray-400">{categoryProgress}%</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-8">
          <div
            className={`bg-gradient-to-r ${cat.color} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${categoryProgress}%` }}
          />
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-8 bg-white/5 rounded-xl p-1">
          <button
            onClick={() => setMode("learn")}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              mode === "learn"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => setMode("quiz")}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              mode === "quiz"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Quiz
          </button>
        </div>

        {mode === "learn" ? (
          <div className="flex flex-col items-center gap-6">
            {/* Card counter */}
            <div className="text-sm text-gray-400">
              Card {currentIndex + 1} of {cat.words.length}
            </div>

            {/* Flashcard */}
            <Flashcard
              word={cat.words[currentIndex]}
              categoryId={categoryId}
              onKnow={handleNextCard}
            />

            {/* Navigation */}
            <div className="flex gap-4 items-center">
              <button
                onClick={handlePrevCard}
                className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Previous card"
              >
                ←
              </button>
              <div className="flex gap-1">
                {cat.words.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentIndex ? "bg-white" : "bg-white/20"
                    }`}
                    aria-label={`Go to card ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNextCard}
                className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Next card"
              >
                →
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Quiz
              words={cat.words}
              categoryId={categoryId}
              onComplete={() => {}}
            />
          </div>
        )}
      </div>
    </main>
  );
}
