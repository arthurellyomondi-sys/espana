"use client";

import Link from "next/link";
import { tongueTwisters } from "@/data/extras";
import { speakSpanish } from "@/lib/audio";

export default function TwistersPage() {
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
          <h1 className="text-xl font-bold text-white">🌀 Tongue Twisters</h1>
          <div />
        </div>
        <p className="text-gray-400 mb-8 text-center">
          Master these tricky Spanish tongue twisters! Click to hear them spoken.
        </p>

        <div className="space-y-4">
          {tongueTwisters.map((twister, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-2xl p-5 border border-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        twister.difficulty === "easy"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : twister.difficulty === "medium"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {twister.difficulty}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white mb-1">
                    {twister.spanish}
                  </p>
                  <p className="text-sm text-gray-400 mb-3">
                    {twister.english}
                  </p>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-indigo-300">
                      💡 {twister.tip}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => speakSpanish(twister.spanish)}
                  className="text-sky-400 hover:text-sky-300 text-2xl flex-shrink-0 p-2 hover:bg-white/5 rounded-lg transition-colors"
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
