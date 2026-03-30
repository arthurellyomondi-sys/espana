"use client";

import Link from "next/link";
import { categories } from "@/data/vocabulary";
import { useProgress } from "@/context/ProgressContext";

export default function Home() {
  const { progress, getOverallProgress } = useProgress();
  const overallProgress = getOverallProgress();

  return (
    <main className="min-h-screen bg-neutral-950 confetti-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-amber-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              ¡Aprende!
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Learn Spanish one word at a time
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 animate-fade-in-up">
          <StatCard
            label="Streak"
            value={`${progress.currentStreak}`}
            emoji="🔥"
            accent={
              progress.currentStreak > 0 ? "text-amber-400" : "text-gray-500"
            }
            glow={progress.currentStreak > 0}
          />
          <StatCard
            label="Words Learned"
            value={`${progress.learnedWords.length}`}
            emoji="📚"
            accent="text-emerald-400"
          />
          <StatCard
            label="Quizzes"
            value={`${progress.totalQuizzesTaken}`}
            emoji="🧠"
            accent="text-indigo-400"
          />
          <StatCard
            label="Best Streak"
            value={`${progress.bestStreak}`}
            emoji="⭐"
            accent="text-yellow-400"
          />
        </div>

        {/* Overall Progress */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-white">
              Overall Progress
            </h2>
            <span className="text-sm text-gray-400">{overallProgress}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-amber-500 via-red-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Categories */}
        <h2 className="text-xl font-semibold text-white mb-4">
          Choose a Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/learn/${category.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className={`rounded-2xl bg-gradient-to-br ${category.color} p-[1px] transition-transform group-hover:scale-[1.02] group-hover:shadow-lg`}
              >
                <div className="bg-neutral-900 rounded-2xl p-6 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{category.emoji}</span>
                    <span className="text-xs text-gray-400 bg-white/10 rounded-full px-3 py-1">
                      {category.words.length} words
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {category.words
                      .slice(0, 3)
                      .map((w) => w.spanish)
                      .join(", ")}
                    ...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/quiz"
            className="group rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px] transition-transform hover:scale-[1.02]"
          >
            <div className="bg-neutral-900 rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center">
              <span className="text-4xl mb-2">🧠</span>
              <h3 className="text-lg font-bold text-white">Quick Quiz</h3>
              <p className="text-sm text-gray-400 mt-1">
                Test all categories
              </p>
            </div>
          </Link>
          <Link
            href="/learn/greetings"
            className="group rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-[1px] transition-transform hover:scale-[1.02]"
          >
            <div className="bg-neutral-900 rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center">
              <span className="text-4xl mb-2">📖</span>
              <h3 className="text-lg font-bold text-white">Start Learning</h3>
              <p className="text-sm text-gray-400 mt-1">Begin with greetings</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  emoji,
  accent,
  glow,
}: {
  label: string;
  value: string;
  emoji: string;
  accent: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`bg-white/5 rounded-xl p-4 text-center border border-white/5 ${
        glow ? "streak-glow border-amber-500/30" : ""
      }`}
    >
      <div className="text-2xl mb-1">{emoji}</div>
      <div className={`text-2xl font-bold ${accent}`}>{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}
