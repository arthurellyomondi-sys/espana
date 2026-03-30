"use client";

import Link from "next/link";
import { SentenceBuilder } from "@/components/SentenceBuilder";

export default function SentencesPage() {
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
          <h1 className="text-xl font-bold text-white">🏗️ Sentence Builder</h1>
          <div />
        </div>
        <p className="text-gray-400 mb-8 text-center">
          Arrange the words to form correct Spanish sentences!
        </p>
        <SentenceBuilder onComplete={() => {}} />
      </div>
    </main>
  );
}
