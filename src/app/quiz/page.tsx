"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, getAllWords } from "@/data/vocabulary";
import { Quiz } from "@/components/Quiz";

export default function QuizPage() {
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
              <span>Choose category</span>
            </button>
            <h1 className="text-xl font-bold text-white">
              {selectedCategory === "all"
                ? "All Words"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h1>
            <div />
          </div>
          <Quiz
            words={words}
            categoryId={selectedCategory}
            onComplete={() => {}}
          />
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
          <h1 className="text-xl font-bold text-white">Quick Quiz</h1>
          <div />
        </div>

        <p className="text-gray-400 mb-8 text-center">
          Pick a category to test your knowledge, or try all words at once!
        </p>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-[1px] transition-transform hover:scale-[1.02] text-left"
          >
            <div className="bg-neutral-900 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🌍</span>
                <div>
                  <h3 className="text-lg font-bold text-white">All Words</h3>
                  <p className="text-sm text-gray-400">
                    {allWords.length} words from all categories
                  </p>
                </div>
              </div>
            </div>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-2xl bg-gradient-to-br ${category.color} p-[1px] transition-transform hover:scale-[1.02] text-left`}
            >
              <div className="bg-neutral-900 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{category.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {category.words.length} words
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
