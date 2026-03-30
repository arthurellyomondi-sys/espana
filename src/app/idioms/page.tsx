"use client";

import Link from "next/link";
import { idioms, getIdiomOfTheDay } from "@/data/extras";
import { speakSpanish } from "@/lib/audio";

export default function IdiomsPage() {
  const idiomOfDay = getIdiomOfTheDay();

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
          <h1 className="text-xl font-bold text-white">🎭 Spanish Idioms</h1>
          <div />
        </div>

        {/* Idiom of the Day */}
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-6 mb-8 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-purple-300">
              ✨ Idiom of the Day
            </h2>
            <button
              onClick={() => speakSpanish(idiomOfDay.spanish)}
              className="text-sky-400 hover:text-sky-300"
            >
              🔊
            </button>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            {idiomOfDay.spanish}
          </h3>
          <p className="text-purple-300 text-sm italic mb-2">
            Literal: &ldquo;{idiomOfDay.literal}&rdquo;
          </p>
          <p className="text-gray-300 mb-3">{idiomOfDay.english}</p>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-white italic text-sm">
              &ldquo;{idiomOfDay.example}&rdquo;
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {idiomOfDay.exampleTranslation}
            </p>
          </div>
        </div>

        {/* All Idioms */}
        <h2 className="text-lg font-bold text-white mb-4">All Idioms</h2>
        <div className="space-y-4">
          {idioms.map((idiom, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-2xl p-5 border border-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {idiom.spanish}
                  </h3>
                  <p className="text-xs text-gray-500 italic mb-2">
                    Literal: &ldquo;{idiom.literal}&rdquo;
                  </p>
                  <p className="text-gray-300 mb-3">{idiom.english}</p>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-white italic text-sm">
                      &ldquo;{idiom.example}&rdquo;
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {idiom.exampleTranslation}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => speakSpanish(idiom.spanish)}
                  className="text-sky-400 hover:text-sky-300 text-xl flex-shrink-0 p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  🔊
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
