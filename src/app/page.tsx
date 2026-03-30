"use client";

import Link from "next/link";
import { categories, getWordOfTheDay, conversationPhrases, culturalNotes } from "@/data/vocabulary";
import { getIdiomOfTheDay, getTongueTwisterOfTheDay } from "@/data/extras";
import { useProgress } from "@/context/ProgressContext";
import { useTheme } from "@/context/ThemeContext";
import { speakSpanish } from "@/lib/audio";
import { useState } from "react";
import { StreakCalendar } from "@/components/StreakCalendar";

export default function Home() {
  const {
    progress,
    getOverallProgress,
    getXPProgress,
    getTodayGoal,
    isGoalComplete,
  } = useProgress();
  const { theme, toggleTheme } = useTheme();
  const overallProgress = getOverallProgress();
  const xpProgress = getXPProgress();
  const todayGoal = getTodayGoal();
  const goalComplete = isGoalComplete();
  const wordOfDay = getWordOfTheDay();
  const idiomOfDay = getIdiomOfTheDay();
  const twisterOfDay = getTongueTwisterOfTheDay();
  const [showCulture, setShowCulture] = useState(false);
  const [dayIndex] = useState(() =>
    Math.floor(Date.now() / 86400000) % culturalNotes.length
  );
  const randomCulture = culturalNotes[dayIndex];

  const levelEmojis = ["🌱", "🌿", "🌳", "🏅", "⭐", "🌟", "💫", "🏆", "👑", "💎"];
  const levelEmoji = levelEmojis[Math.min(progress.level - 1, levelEmojis.length - 1)];

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Ambient Orbs */}
      <div className="ambient-orb w-96 h-96 bg-indigo-500 -top-48 -left-48" />
      <div className="ambient-orb w-80 h-80 bg-purple-500 top-1/3 -right-40" />
      <div className="ambient-orb w-64 h-64 bg-cyan-500 bottom-20 left-1/4" />

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl glass-card text-lg"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <Link href="/settings" className="p-2.5 rounded-xl glass-card text-lg">
              ⚙️
            </Link>
          </div>
          <h1 className="text-6xl font-extrabold mb-2 gradient-text tracking-tight">
            ¡Aprende!
          </h1>
          <p className="text-gray-400 text-sm tracking-wide">
            Learn Spanish, one word at a time
          </p>
        </div>

        {/* XP & Level Bar */}
        <div className="glass-card rounded-2xl p-5 mb-5 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-float">{levelEmoji}</span>
              <div>
                <p className="text-lg font-bold text-white">Level {progress.level}</p>
                <p className="text-xs text-gray-400">{progress.xp} XP total</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold gradient-text-cool">{xpProgress}%</p>
              <p className="text-xs text-gray-500">to next level</p>
            </div>
          </div>
          <div className="progress-bar h-3 xp-glow">
            <div
              className="progress-fill bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>

        {/* Daily Goal */}
        <div
          className={`glass-card rounded-2xl p-5 mb-5 animate-fade-in-up ${
            goalComplete ? "border-emerald-500/30!" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{goalComplete ? "✅" : "🎯"}</span>
              <div>
                <p className="font-bold text-white">Daily Goal</p>
                <p className="text-xs text-gray-400">
                  {todayGoal.xpEarned} / {progress.dailyGoalTarget} XP today
                </p>
              </div>
            </div>
            {goalComplete && (
              <span className="text-emerald-400 text-xs font-medium bg-emerald-500/15 px-3 py-1.5 rounded-full">
                Complete!
              </span>
            )}
          </div>
          <div className="progress-bar h-2.5">
            <div
              className={`progress-fill h-full ${
                goalComplete
                  ? "bg-gradient-to-r from-emerald-500 to-green-400"
                  : "bg-gradient-to-r from-amber-500 to-orange-500"
              }`}
              style={{
                width: `${Math.min(100, (todayGoal.xpEarned / progress.dailyGoalTarget) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 animate-fade-in-up">
          <StatCard label="Streak" value={`${progress.currentStreak}`} emoji="🔥" accent="text-amber-400" glow={progress.currentStreak > 0} />
          <StatCard label="Words" value={`${progress.learnedWords.length}`} emoji="📚" accent="text-emerald-400" />
          <StatCard label="Crowns" value={`${progress.totalCrowns}`} emoji="👑" accent="text-yellow-400" />
          <StatCard label="Lessons" value={`${progress.completedLessons.length}`} emoji="📖" accent="text-purple-400" />
        </div>

        {/* Word of the Day */}
        <div className="glass-card rounded-2xl p-6 mb-5 border-indigo-500/15! animate-fade-in-up"
          style={{ background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(168, 85, 247, 0.05))" }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-indigo-300 flex items-center gap-2">
              ✨ Word of the Day
            </h2>
            <button
              onClick={() => speakSpanish(wordOfDay.spanish)}
              className="text-sky-400 hover:text-sky-300 transition-colors text-lg"
            >
              🔊
            </button>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-3xl font-bold text-white">{wordOfDay.spanish}</h3>
            <span className="text-indigo-300 text-sm">{wordOfDay.pronunciation}</span>
          </div>
          <p className="text-gray-300 mb-1">{wordOfDay.english}</p>
          <p className="text-sm text-gray-400 italic">
            &ldquo;{wordOfDay.example}&rdquo; — {wordOfDay.exampleTranslation}
          </p>
        </div>

        {/* Lessons CTA */}
        <Link
          href="/lessons"
          className="group block mb-6 glass-card rounded-2xl p-5 animate-fade-in-up"
          style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(34, 197, 94, 0.04))" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/25">
              📚
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">Structured Lessons</h3>
              <p className="text-sm text-gray-400">
                {progress.completedLessons.length} of 30 lessons completed
              </p>
            </div>
            <span className="text-emerald-400 text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
          <div className="mt-3 progress-bar h-2">
            <div
              className="progress-fill bg-gradient-to-r from-emerald-500 to-green-400 h-full"
              style={{ width: `${Math.round((progress.completedLessons.length / 30) * 100)}%` }}
            />
          </div>
        </Link>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-white mb-3 animate-fade-in-up">
          ⚡ Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Link href="/review" className="glass-card rounded-xl p-4 text-center">
            <span className="text-2xl block mb-1">🧠</span>
            <h3 className="font-bold text-white text-xs">Review</h3>
            <p className="text-[10px] text-gray-400">Spaced repetition</p>
          </Link>
          <Link href="/daily-challenge" className="glass-card rounded-xl p-4 text-center"
            style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.06), transparent)" }}
          >
            <span className="text-2xl block mb-1">🎯</span>
            <h3 className="font-bold text-white text-xs">Daily</h3>
            <p className="text-[10px] text-amber-400">+50 bonus XP</p>
          </Link>
          <Link href="/profile" className="glass-card rounded-xl p-4 text-center">
            <span className="text-2xl block mb-1">👤</span>
            <h3 className="font-bold text-white text-xs">Profile</h3>
            <p className="text-[10px] text-gray-400">Level {progress.level}</p>
          </Link>
          <Link href="/leaderboard" className="glass-card rounded-xl p-4 text-center">
            <span className="text-2xl block mb-1">🏆</span>
            <h3 className="font-bold text-white text-xs">League</h3>
            <p className="text-[10px] text-gray-400">Compete</p>
          </Link>
        </div>

        {/* Game Modes */}
        <h2 className="text-lg font-semibold text-white mb-3 animate-fade-in-up">
          🎮 Game Modes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <GameCard href="/matching" emoji="🃏" title="Matching" desc="Memory card game" color="from-rose-500 to-pink-600" />
          <GameCard href="/listening" emoji="👂" title="Listening" desc="Hear & identify" color="from-sky-500 to-blue-600" />
          <GameCard href="/speaking" emoji="🎤" title="Speaking" desc="Say it in Spanish" color="from-red-500 to-rose-600" />
          <GameCard href="/typing" emoji="⌨️" title="Typing" desc="Type translations" color="from-fuchsia-500 to-purple-600" />
          <GameCard href="/hangman" emoji="🎯" title="Hangman" desc="Guess the word" color="from-orange-500 to-red-600" />
          <GameCard href="/speed" emoji="⚡" title="Speed Round" desc="60 second rush" color="from-amber-500 to-yellow-600" />
          <GameCard href="/sentences" emoji="🏗️" title="Sentences" desc="Build sentences" color="from-teal-500 to-emerald-600" />
          <GameCard href="/verbs" emoji="🔄" title="Verbs" desc="Conjugation trainer" color="from-lime-500 to-green-600" />
          <GameCard href="/quiz" emoji="🧠" title="Quiz" desc="Multiple choice" color="from-indigo-500 to-violet-600" />
          <GameCard href="/grammar-practice" emoji="📐" title="Grammar" desc="Interactive drills" color="from-cyan-500 to-blue-600" />
          <GameCard href="/dialogues" emoji="💬" title="Dialogues" desc="Practice conversations" color="from-pink-500 to-rose-600" />
          <GameCard href="/listening-comp" emoji="🎧" title="Listen & Learn" desc="Audio comprehension" color="from-sky-500 to-indigo-600" />
          <GameCard href="/reading-comp" emoji="📖" title="Reading" desc="Text comprehension" color="from-emerald-500 to-teal-600" />
          <GameCard href="/practice-mistakes" emoji="❌" title="Mistakes" desc="Practice wrong answers" color="from-amber-500 to-red-600" />
        </div>

        {/* Categories */}
        <h2 className="text-lg font-semibold text-white mb-3 animate-fade-in-up">
          📖 Learn by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/learn/${category.id}`}
              className="group animate-fade-in-up category-card"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div
                className={`rounded-2xl bg-gradient-to-br ${category.color} p-[1px]`}
              >
                <div className="bg-neutral-950/90 rounded-2xl p-4 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{category.emoji}</span>
                    <h3 className="font-bold text-white text-sm">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400">{category.words.length} words</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Conversation Phrases */}
        <h2 className="text-lg font-semibold text-white mb-3 animate-fade-in-up">
          💬 Conversation Phrases
        </h2>
        <div className="space-y-2 mb-6">
          {conversationPhrases.map((conv) => (
            <details
              key={conv.id}
              className="group glass-card-flat rounded-xl overflow-hidden"
            >
              <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-white/5 transition-colors list-none">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{conv.emoji}</span>
                  <span className="font-bold text-white">{conv.name}</span>
                </div>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-4 pb-4 space-y-2">
                {conv.phrases.map((phrase, i) => (
                  <div key={i} className="flex items-start justify-between p-3 rounded-lg bg-white/3 gap-3">
                    <div className="flex-1">
                      <p className="text-white font-medium">{phrase.spanish}</p>
                      <p className="text-sm text-gray-400">{phrase.english}</p>
                    </div>
                    <button
                      onClick={() => speakSpanish(phrase.spanish)}
                      className="text-sky-400 hover:text-sky-300 flex-shrink-0"
                    >
                      🔊
                    </button>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>

        {/* Cultural Note */}
        <div className="glass-card rounded-2xl p-5 mb-5 animate-fade-in-up"
          style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.06), transparent)" }}
        >
          <button onClick={() => setShowCulture(!showCulture)} className="w-full text-left">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-amber-300 flex items-center gap-2">
                🌍 Cultural Note {randomCulture.emoji}
              </h2>
              <span className="text-gray-400">{showCulture ? "▴" : "▾"}</span>
            </div>
          </button>
          {showCulture && (
            <div className="mt-3">
              <h3 className="font-bold text-white mb-1">{randomCulture.country}</h3>
              <p className="text-gray-300 text-sm">{randomCulture.note}</p>
            </div>
          )}
        </div>

        {/* Streak Calendar */}
        <StreakCalendar />

        {/* Idiom of the Day */}
        <div className="mt-5 glass-card rounded-2xl p-5 animate-fade-in-up"
          style={{ background: "linear-gradient(135deg, rgba(168, 85, 247, 0.06), rgba(244, 114, 182, 0.04))" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-purple-300 flex items-center gap-2">🎭 Idiom of the Day</h2>
            <button onClick={() => speakSpanish(idiomOfDay.spanish)} className="text-sky-400 hover:text-sky-300 text-sm">🔊</button>
          </div>
          <h3 className="text-xl font-bold text-white">{idiomOfDay.spanish}</h3>
          <p className="text-purple-300/50 text-xs italic mb-1">Literal: &ldquo;{idiomOfDay.literal}&rdquo;</p>
          <p className="text-gray-300 text-sm">{idiomOfDay.english}</p>
          <Link href="/idioms" className="text-purple-400 text-xs mt-2 inline-block hover:text-purple-300">See all idioms →</Link>
        </div>

        {/* Tongue Twister */}
        <div className="mt-3 glass-card rounded-2xl p-5 animate-fade-in-up"
          style={{ background: "linear-gradient(135deg, rgba(249, 115, 22, 0.06), rgba(239, 68, 68, 0.04))" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-orange-300 flex items-center gap-2">🌀 Tongue Twister</h2>
            <button onClick={() => speakSpanish(twisterOfDay.spanish)} className="text-sky-400 hover:text-sky-300 text-sm">🔊</button>
          </div>
          <h3 className="text-lg font-bold text-white">{twisterOfDay.spanish}</h3>
          <p className="text-gray-400 text-sm">{twisterOfDay.english}</p>
          <Link href="/twisters" className="text-orange-400 text-xs mt-2 inline-block hover:text-orange-300">See all tongue twisters →</Link>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-6 mb-8">
          {[
            { href: "/achievements", emoji: "🏆", label: "Achievements" },
            { href: "/rewards", emoji: "🎁", label: "Shop" },
            { href: "/stats", emoji: "📊", label: "Stats" },
            { href: "/grammar", emoji: "📐", label: "Grammar" },
            { href: "/settings", emoji: "⚙️", label: "Settings" },
            { href: "/onboarding", emoji: "🎓", label: "Test" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="glass-card-flat rounded-xl p-3 text-center hover:bg-white/5 transition-all">
              <span className="text-lg block mb-0.5">{item.emoji}</span>
              <h3 className="font-bold text-white text-[10px]">{item.label}</h3>
            </Link>
          ))}
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
    <div className={`stat-card ${glow ? "streak-glow border-amber-500/20!" : ""}`}>
      <div className="text-xl mb-1">{emoji}</div>
      <div className={`text-xl font-bold ${accent}`}>{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}

function GameCard({
  href,
  emoji,
  title,
  desc,
  color,
}: {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-2xl bg-gradient-to-br ${color} p-[1px] transition-all hover:scale-[1.03] hover:shadow-lg`}
    >
      <div className="bg-neutral-950/90 rounded-2xl p-4 text-center h-full">
        <span className="text-3xl block mb-1 group-hover:scale-110 transition-transform">{emoji}</span>
        <h3 className="font-bold text-white text-sm">{title}</h3>
        <p className="text-[10px] text-gray-400">{desc}</p>
      </div>
    </Link>
  );
}
