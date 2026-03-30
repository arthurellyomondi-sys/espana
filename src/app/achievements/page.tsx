"use client";

import Link from "next/link";
import { achievements } from "@/data/achievements";
import { useProgress } from "@/context/ProgressContext";

export default function AchievementsPage() {
  const { progress, getAchievementStats } = useProgress();
  const stats = getAchievementStats();
  const unlocked = progress.unlockedAchievements;

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
          <h1 className="text-xl font-bold text-white">🏆 Achievements</h1>
          <div />
        </div>

        <div className="text-center mb-8">
          <p className="text-4xl font-bold text-white mb-1">
            {unlocked.length} / {achievements.length}
          </p>
          <p className="text-gray-400">achievements unlocked</p>
          <div className="w-full bg-white/10 rounded-full h-3 mt-4">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(unlocked.length / achievements.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {achievements.map((a) => {
            const isUnlocked = unlocked.includes(a.id);
            const meetsRequirement = a.check(stats);

            return (
              <div
                key={a.id}
                className={`rounded-xl border p-4 transition-colors ${
                  isUnlocked
                    ? "bg-amber-500/10 border-amber-500/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-3xl ${isUnlocked ? "" : "grayscale opacity-40"}`}
                  >
                    {a.emoji}
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`font-bold ${
                        isUnlocked ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {a.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        isUnlocked ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {a.description}
                    </p>
                  </div>
                  {isUnlocked && (
                    <span className="text-emerald-400 text-xl">✅</span>
                  )}
                  {!isUnlocked && meetsRequirement && (
                    <span className="text-amber-400 text-xs bg-amber-500/20 px-2 py-1 rounded-full">
                      Ready!
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4">📊 Your Stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Stat label="Words Learned" value={stats.learnedWords} />
            <Stat label="Quizzes Taken" value={stats.totalQuizzesTaken} />
            <Stat label="Perfect Quizzes" value={stats.perfectQuizzes} />
            <Stat label="Current Streak" value={stats.currentStreak} />
            <Stat label="Best Streak" value={stats.bestStreak} />
            <Stat label="Total XP" value={stats.totalXP} />
            <Stat label="Level" value={stats.level} />
            <Stat label="Cards Reviewed" value={stats.totalCardsReviewed} />
            <Stat label="Matches Played" value={stats.matchesPlayed} />
            <Stat label="Listening" value={stats.listeningExercises} />
            <Stat label="Typing" value={stats.typingExercises} />
            <Stat label="Sentences Built" value={stats.sentencesBuilt} />
          </div>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}
