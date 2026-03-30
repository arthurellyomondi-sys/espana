"use client";

import { useState } from "react";
import { Word } from "@/data/vocabulary";
import { useProgress } from "@/context/ProgressContext";

interface FlashcardProps {
  word: Word;
  categoryId: string;
  onKnow: () => void;
}

export function Flashcard({ word, categoryId, onKnow }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const { markWordLearned, isWordLearned } = useProgress();
  const learned = isWordLearned(`${categoryId}:${word.spanish}`);

  function handleFlip() {
    setFlipped(!flipped);
  }

  function handleKnow() {
    markWordLearned(`${categoryId}:${word.spanish}`);
    onKnow();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative w-full max-w-md h-72 cursor-pointer perspective-1000"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 flex flex-col items-center justify-center shadow-2xl border border-white/10">
            <p className="text-sm text-indigo-200 mb-2">
              {flipped ? "" : "tap to flip"}
            </p>
            <h2 className="text-4xl font-bold text-white mb-4">
              {word.spanish}
            </h2>
            <p className="text-indigo-200 text-lg">{word.pronunciation}</p>
            {learned && (
              <span className="absolute top-4 right-4 text-2xl">✅</span>
            )}
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 flex flex-col items-center justify-center shadow-2xl border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-2">
              {word.english}
            </h2>
            <p className="text-emerald-200 text-lg mb-4">{word.spanish}</p>
            <div className="bg-white/10 rounded-xl p-4 w-full">
              <p className="text-white italic text-center">
                &ldquo;{word.example}&rdquo;
              </p>
              <p className="text-emerald-200 text-sm text-center mt-2">
                {word.exampleTranslation}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleFlip}
          className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
        >
          {flipped ? "Show Spanish" : "Reveal"}
        </button>
        <button
          onClick={handleKnow}
          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
            learned
              ? "bg-emerald-500/30 text-emerald-300 cursor-default"
              : "bg-emerald-500 text-white hover:bg-emerald-600"
          }`}
        >
          {learned ? "Learned!" : "Got it!"}
        </button>
      </div>
    </div>
  );
}
