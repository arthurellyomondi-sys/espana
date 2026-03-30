"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { verbs } from "@/data/verbs";
import { VerbPractice } from "@/components/VerbPractice";
import { speakSpanish } from "@/lib/audio";

export default function VerbsPage() {
  const [mode, setMode] = useState<"browse" | "practice">("browse");
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [selectedTense, setSelectedTense] = useState<"present" | "preterite" | "imperfect" | "future">("present");
  const verb = useMemo(
    () => verbs.find((v) => v.infinitive === selectedVerb),
    [selectedVerb]
  );

  const tenses: { key: "present" | "preterite" | "imperfect" | "future"; label: string }[] = [
    { key: "present", label: "Present" },
    { key: "preterite", label: "Preterite" },
    { key: "imperfect", label: "Imperfect" },
    { key: "future", label: "Future" },
  ];

  if (mode === "practice") {
    return (
      <main className="min-h-screen bg-neutral-950">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setMode("browse")}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span>Browse</span>
            </button>
            <h1 className="text-xl font-bold text-white">🔄 Verb Practice</h1>
            <div />
          </div>
          <VerbPractice onComplete={() => {}} />
        </div>
      </main>
    );
  }

  if (verb) {
    return (
      <main className="min-h-screen bg-neutral-950">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedVerb(null)}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span>All verbs</span>
            </button>
            <h1 className="text-xl font-bold text-white">{verb.infinitive}</h1>
            <div />
          </div>

          <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {verb.infinitive}
                </h2>
                <p className="text-gray-400">{verb.english}</p>
              </div>
              <div className="flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    verb.type === "regular"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {verb.type}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300">
                  -{verb.group}
                </span>
              </div>
            </div>

          <div className="flex gap-2 mb-4 flex-wrap">
                {tenses.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setSelectedTense(t.key)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedTense === t.key
                        ? "bg-indigo-500 text-white"
                        : "bg-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

            <div className="space-y-2">
              {verb.conjugations[selectedTense].map((conj) => (
                <div
                  key={conj.person}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <span className="text-gray-400 w-24">{conj.person}</span>
                  <button
                    onClick={() => speakSpanish(conj.spanish)}
                    className="text-white font-medium hover:text-lime-400 transition-colors flex items-center gap-2"
                  >
                    {conj.spanish}
                    <span className="text-sm">🔊</span>
                  </button>
                  <span className="text-gray-500 text-sm w-24 text-right">
                    {conj.english}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-3">Examples</h3>
            {verb.examples.map((ex, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 mb-2 last:mb-0"
              >
                <p className="text-white italic">{ex}</p>
                <button
                  onClick={() => speakSpanish(ex)}
                  className="text-sky-400 hover:text-sky-300 text-lg ml-3 flex-shrink-0"
                >
                  🔊
                </button>
              </div>
            ))}
          </div>
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
          <h1 className="text-xl font-bold text-white">🔄 Verb Trainer</h1>
          <div />
        </div>

        <div className="flex gap-3 mb-8">
          <button
            className="flex-1 py-3 rounded-xl font-medium bg-white/10 text-white"
          >
            📖 Browse
          </button>
          <button
            onClick={() => setMode("practice")}
            className="flex-1 py-3 rounded-xl font-medium bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            🎯 Practice
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {verbs.map((v) => (
            <button
              key={v.infinitive}
              onClick={() => setSelectedVerb(v.infinitive)}
              className="rounded-xl bg-white/5 border border-white/10 p-4 text-left hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {v.infinitive}
                  </h3>
                  <p className="text-sm text-gray-400">{v.english}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      v.type === "regular"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {v.type}
                  </span>
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
