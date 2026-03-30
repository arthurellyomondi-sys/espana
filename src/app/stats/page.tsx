"use client";

import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { categories } from "@/data/vocabulary";

export default function StatsPage() {
  const { progress, getTodayGoal } = useProgress();
  const today = getTodayGoal();

  const totalGameplays =
    progress.matchesPlayed +
    progress.listeningExercises +
    progress.typingExercises +
    progress.sentencesBuilt +
    progress.verbsPracticed +
    progress.speechExercises +
    progress.hangmanGames +
    progress.speedRounds;

  const xpHistory = Object.entries(progress.dailyHistory)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14);

  const maxXP = Math.max(1, ...xpHistory.map(([, d]) => d.xpEarned));

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
          <h1 className="text-xl font-bold text-white">📊 Statistics</h1>
          <div />
        </div>

        {/* Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatBox label="Total XP" value={progress.xp} color="text-indigo-400" />
          <StatBox label="Level" value={progress.level} color="text-purple-400" />
          <StatBox
            label="Streak"
            value={`${progress.currentStreak}d`}
            color="text-amber-400"
          />
          <StatBox
            label="Best Streak"
            value={`${progress.bestStreak}d`}
            color="text-yellow-400"
          />
        </div>

        {/* Today */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6">
          <h3 className="font-bold text-white mb-3">📅 Today</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MiniStat label="XP" value={today.xpEarned} />
            <MiniStat label="Words" value={today.wordsLearned} />
            <MiniStat label="Quizzes" value={today.quizzesCompleted} />
            <MiniStat label="Cards" value={today.cardsReviewed} />
          </div>
        </div>

        {/* XP History Chart */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6">
          <h3 className="font-bold text-white mb-4">📈 XP Last 14 Days</h3>
          {xpHistory.length === 0 ? (
            <p className="text-gray-500 text-sm">No data yet</p>
          ) : (
            <div className="flex items-end gap-1 h-32">
              {xpHistory.map(([date, data]) => (
                <div key={date} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-500 to-purple-400 rounded-t-sm transition-all"
                    style={{
                      height: `${Math.max(4, (data.xpEarned / maxXP) * 100)}%`,
                    }}
                  />
                  <span className="text-[9px] text-gray-500">
                    {date.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Game Mode Stats */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6">
          <h3 className="font-bold text-white mb-3">🎮 Game Mode Stats</h3>
          <div className="space-y-3">
            <BarStat label="Matching" value={progress.matchesPlayed} icon="🃏" />
            <BarStat label="Listening" value={progress.listeningExercises} icon="👂" />
            <BarStat label="Typing" value={progress.typingExercises} icon="⌨️" />
            <BarStat label="Sentences" value={progress.sentencesBuilt} icon="🏗️" />
            <BarStat label="Verbs" value={progress.verbsPracticed} icon="🔄" />
            <BarStat label="Speaking" value={progress.speechExercises} icon="🎤" />
            <BarStat label="Hangman" value={progress.hangmanGames} icon="🎯" />
            <BarStat label="Speed Round" value={progress.speedRounds} icon="⚡" />
          </div>
        </div>

        {/* Category Progress */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6">
          <h3 className="font-bold text-white mb-3">📖 Category Mastery</h3>
          <div className="space-y-3">
            {categories.map((cat) => {
              const learned = progress.learnedWords.filter((w) =>
                w.startsWith(`${cat.id}:`)
              ).length;
              const pct = Math.round((learned / cat.words.length) * 100);
              return (
                <div key={cat.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">
                      {cat.emoji} {cat.name}
                    </span>
                    <span className="text-gray-400">
                      {learned}/{cat.words.length}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Other Stats */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6">
          <h3 className="font-bold text-white mb-3">📋 Other Stats</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <StatRow label="Words Learned" value={progress.learnedWords.length} />
            <StatRow label="Lessons Done" value={progress.completedLessons.length} />
            <StatRow label="Quizzes Taken" value={progress.totalQuizzesTaken} />
            <StatRow label="Perfect Quizzes" value={progress.perfectQuizzes} />
            <StatRow label="Cards Reviewed" value={progress.totalCardsReviewed} />
            <StatRow label="Crowns Earned" value={progress.totalCrowns} />
            <StatRow label="Best Combo" value={progress.maxCombo} />
            <StatRow label="Review Sessions" value={progress.reviewSessions} />
            <StatRow
              label="Categories Explored"
              value={progress.categoriesExplored.length}
            />
            <StatRow label="Achievements" value={progress.unlockedAchievements.length} />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}

function BarStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  const max = Math.max(1, value);
  return (
    <div className="flex items-center gap-3">
      <span className="w-5 text-center">{icon}</span>
      <span className="text-sm text-gray-300 w-24">{label}</span>
      <div className="flex-1 bg-white/10 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-400"
          style={{ width: `${Math.min(100, (value / Math.max(1, max * 1.5)) * 100)}%` }}
        />
      </div>
      <span className="text-sm text-gray-400 w-8 text-right">{value}</span>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-bold">{value}</span>
    </div>
  );
}
