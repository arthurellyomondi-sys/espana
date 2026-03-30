"use client";

import Link from "next/link";
import { grammarTips } from "@/data/extras";
import { speakSpanish } from "@/lib/audio";

export default function GrammarPage() {
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
          <h1 className="text-xl font-bold text-white">📐 Grammar Tips</h1>
          <div />
        </div>
        <p className="text-gray-400 mb-8 text-center">
          Essential Spanish grammar rules explained simply.
        </p>

        <div className="space-y-6">
          {grammarTips.map((tip, i) => (
            <details
              key={i}
              className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
            >
              <summary className="p-5 cursor-pointer list-none hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tip.emoji}</span>
                    <div>
                      <h3 className="font-bold text-white">{tip.title}</h3>
                      <p className="text-sm text-gray-400">{tip.summary}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </div>
              </summary>
              <div className="px-5 pb-5 space-y-4">
                {/* Rules */}
                <div className="space-y-2">
                  {tip.rules.map((rule, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span dangerouslySetInnerHTML={{ __html: rule }} />
                    </div>
                  ))}
                </div>

                {/* Examples */}
                <div className="bg-white/5 rounded-xl p-4 space-y-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Examples
                  </p>
                  {tip.examples.map((ex, j) => (
                    <div
                      key={j}
                      className="flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-white font-medium">{ex.spanish}</p>
                        <p className="text-xs text-gray-400">{ex.english}</p>
                      </div>
                      <button
                        onClick={() => speakSpanish(ex.spanish)}
                        className="text-sky-400 hover:text-sky-300 text-sm flex-shrink-0"
                      >
                        🔊
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
