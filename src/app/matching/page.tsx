"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, getAllWords } from "@/data/vocabulary";
import { MatchingGame } from "@/components/MatchingGame";

export default function MatchingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const allWords = getAllWords();

  if (selectedCategory) {
    const words =
      selectedCategory === "all"
        ? allWords
        : categories.find((c) => c.id === selectedCategory)?.words ?? [];

    return (
      <main className="min-h-screen bg-neutral-950">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              🃏 Matching Game
            </h1>
            <div />
          </div>
          <MatchingGame words={words} onComplete={() => {}} />
        </div>
      </main>
    );
  }

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
          <h1 className="text-xl font-bold text-white">🃏 Matching Game</h1>
          <div />
        </div>
        <p className="text-gray-400 mb-8 text-center">
          Match Spanish words with their English translations!
        </p>
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-[1px] transition-transform hover:scale-[1.02] text-left"
          >
            <div className="bg-neutral-900 rounded-2xl p-6 flex items-center gap-4">
              <span className="text-4xl">🌍</span>
              <div>
                <h3 className="text-lg font-bold text-white">Random Mix</h3>
                <p className="text-sm text-gray-400">Words from all categories</p>
              </div>
            </div>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-2xl bg-gradient-to-br ${cat.color} p-[1px] transition-transform hover:scale-[1.02] text-left`}
            >
              <div className="bg-neutral-900 rounded-2xl p-6 flex items-center gap-4">
                <span className="text-4xl">{cat.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                  <p className="text-sm text-gray-400">{cat.words.length} words</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
