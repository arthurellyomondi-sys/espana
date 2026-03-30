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
    <main className="min-h-screen bg-neutral-950 confetti-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 animate-fade-in-up">
          <div />
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-1">
              <span className="bg-gradient-to-r from-amber-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                ¡Aprende!
              </span>
            </h1>
            <p className="text-gray-400 text-sm">
              Learn Spanish one word at a time
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xl"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        {/* XP & Level Bar */}
        <div className="bg-white/5 rounded-2xl p-5 mb-6 border border-white/5 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{levelEmoji}</span>
              <div>
                <p className="text-lg font-bold text-white">Level {progress.level}</p>
                <p className="text-xs text-gray-400">{progress.xp} XP total</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-indigo-400 font-medium">{xpProgress}%</p>
              <p className="text-xs text-gray-500">to next level</p>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 xp-glow">
            <div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-700"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>

        {/* Daily Goal */}
        <div
          className={`rounded-2xl p-5 mb-6 border animate-fade-in-up ${
            goalComplete
              ? "bg-emerald-500/10 border-emerald-500/30"
              : "bg-white/5 border-white/5"
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
              <span className="text-emerald-400 text-sm font-medium bg-emerald-500/20 px-3 py-1 rounded-full">
                Complete!
              </span>
            )}
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-700 ${
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
            label="Words"
            value={`${progress.learnedWords.length}`}
            emoji="📚"
            accent="text-emerald-400"
          />
          <StatCard
            label="Achievements"
            value={`${progress.unlockedAchievements.length}`}
            emoji="🏆"
            accent="text-yellow-400"
          />
          <StatCard
            label="Best Streak"
            value={`${progress.bestStreak}`}
            emoji="⭐"
            accent="text-yellow-400"
          />
        </div>

        {/* Overall Progress */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-gray-400">
              Overall Progress
            </h2>
            <span className="text-sm text-gray-400">{overallProgress}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-amber-500 via-red-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Word of the Day */}
        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-6 mb-8 border border-indigo-500/20 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-indigo-300 flex items-center gap-2">
              ✨ Word of the Day
            </h2>
            <button
              onClick={() => speakSpanish(wordOfDay.spanish)}
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              🔊
            </button>
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-3xl font-bold text-white">
              {wordOfDay.spanish}
            </h3>
            <span className="text-indigo-300">{wordOfDay.pronunciation}</span>
          </div>
          <p className="text-gray-300 mb-1">{wordOfDay.english}</p>
          <p className="text-sm text-gray-400 italic">
            &ldquo;{wordOfDay.example}&rdquo; — {wordOfDay.exampleTranslation}
          </p>
        </div>

        {/* Lessons CTA */}
        <Link
          href="/lessons"
          className="group block mb-8 rounded-2xl bg-gradient-to-r from-emerald-600/20 to-green-600/20 border border-emerald-500/20 p-5 transition-transform hover:scale-[1.01] animate-fade-in-up"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
              📚
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">Structured Lessons</h3>
              <p className="text-sm text-gray-400">
                {progress.completedLessons.length} of 18 lessons completed
              </p>
            </div>
            <span className="text-emerald-400 text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
          <div className="mt-3 w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-green-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.round((progress.completedLessons.length / 18) * 100)}%` }}
            />
          </div>
        </Link>

        {/* Game Modes */}
        <h2 className="text-lg font-semibold text-white mb-4 animate-fade-in-up">
          🎮 Game Modes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <GameCard href="/matching" emoji="🃏" title="Matching" desc="Memory card game" color="from-rose-500 to-pink-600" />
          <GameCard href="/listening" emoji="👂" title="Listening" desc="Hear & identify" color="from-sky-500 to-blue-600" />
          <GameCard href="/speaking" emoji="🎤" title="Speaking" desc="Say it in Spanish" color="from-red-500 to-rose-600" />
          <GameCard href="/typing" emoji="⌨️" title="Typing" desc="Type translations" color="from-fuchsia-500 to-purple-600" />
          <GameCard href="/hangman" emoji="🎯" title="Hangman" desc="Guess the word" color="from-orange-500 to-red-600" />
          <GameCard href="/speed" emoji="⚡" title="Speed Round" desc="60 second rush" color="from-amber-500 to-yellow-600" />
          <GameCard href="/sentences" emoji="🏗️" title="Sentences" desc="Build sentences" color="from-teal-500 to-emerald-600" />
          <GameCard href="/verbs" emoji="🔄" title="Verbs" desc="Conjugation trainer" color="from-lime-500 to-green-600" />
          <GameCard href="/quiz" emoji="🧠" title="Quiz" desc="Multiple choice" color="from-indigo-500 to-violet-600" />
        </div>

        {/* Categories */}
        <h2 className="text-lg font-semibold text-white mb-4 animate-fade-in-up">
          📖 Learn by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/learn/${category.id}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div
                className={`rounded-xl bg-gradient-to-br ${category.color} p-[1px] transition-transform group-hover:scale-[1.02]`}
              >
                <div className="bg-neutral-900 rounded-xl p-4 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{category.emoji}</span>
                    <h3 className="font-bold text-white text-sm">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400">
                    {category.words.length} words
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Conversation Phrases */}
        <h2 className="text-lg font-semibold text-white mb-4 animate-fade-in-up">
          💬 Conversation Phrases
        </h2>
        <div className="space-y-3 mb-8">
          {conversationPhrases.map((conv) => (
            <details
              key={conv.id}
              className="group rounded-xl bg-white/5 border border-white/10 overflow-hidden"
            >
              <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-white/5 transition-colors list-none">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{conv.emoji}</span>
                  <span className="font-bold text-white">{conv.name}</span>
                </div>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">
                  ▾
                </span>
              </summary>
              <div className="px-4 pb-4 space-y-2">
                {conv.phrases.map((phrase, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between p-3 rounded-lg bg-white/5 gap-3"
                  >
                    <div className="flex-1">
                      <p className="text-white font-medium">{phrase.spanish}</p>
                      <p className="text-sm text-gray-400">{phrase.english}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {phrase.pronunciation}
                      </p>
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
        <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/10 rounded-2xl p-6 mb-8 border border-amber-500/20 animate-fade-in-up">
          <button
            onClick={() => setShowCulture(!showCulture)}
            className="w-full text-left"
          >
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
        <div className="mt-6 bg-gradient-to-br from-purple-600/15 to-pink-600/15 rounded-2xl p-5 border border-purple-500/15">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-purple-300 flex items-center gap-2">
              🎭 Idiom of the Day
            </h2>
            <button
              onClick={() => speakSpanish(idiomOfDay.spanish)}
              className="text-sky-400 hover:text-sky-300 text-sm"
            >
              🔊
            </button>
          </div>
          <h3 className="text-xl font-bold text-white">{idiomOfDay.spanish}</h3>
          <p className="text-purple-300/60 text-xs italic mb-1">
            Literal: &ldquo;{idiomOfDay.literal}&rdquo;
          </p>
          <p className="text-gray-300 text-sm">{idiomOfDay.english}</p>
          <Link href="/idioms" className="text-purple-400 text-xs mt-2 inline-block hover:text-purple-300">
            See all idioms →
          </Link>
        </div>

        {/* Tongue Twister of the Day */}
        <div className="mt-4 bg-gradient-to-br from-orange-600/15 to-red-600/15 rounded-2xl p-5 border border-orange-500/15">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-orange-300 flex items-center gap-2">
              🌀 Tongue Twister of the Day
            </h2>
            <button
              onClick={() => speakSpanish(twisterOfDay.spanish)}
              className="text-sky-400 hover:text-sky-300 text-sm"
            >
              🔊
            </button>
          </div>
          <h3 className="text-lg font-bold text-white">{twisterOfDay.spanish}</h3>
          <p className="text-gray-400 text-sm">{twisterOfDay.english}</p>
          <Link href="/twisters" className="text-orange-400 text-xs mt-2 inline-block hover:text-orange-300">
            See all tongue twisters →
          </Link>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-3 gap-3 mt-6 mb-8">
          <Link
            href="/achievements"
            className="group rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/20 p-4 text-center transition-transform hover:scale-[1.02]"
          >
            <span className="text-2xl block mb-1">🏆</span>
            <h3 className="font-bold text-white text-xs">Achievements</h3>
            <p className="text-xs text-gray-400">
              {progress.unlockedAchievements.length} unlocked
            </p>
          </Link>
          <Link
            href="/rewards"
            className="group rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/20 p-4 text-center transition-transform hover:scale-[1.02]"
          >
            <span className="text-2xl block mb-1">🎁</span>
            <h3 className="font-bold text-white text-xs">Shop</h3>
            <p className="text-xs text-gray-400">{progress.xp} XP</p>
          </Link>
          <Link
            href="/grammar"
            className="group rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 p-4 text-center transition-transform hover:scale-[1.02]"
          >
            <span className="text-2xl block mb-1">📐</span>
            <h3 className="font-bold text-white text-xs">Grammar</h3>
            <p className="text-xs text-gray-400">8 lessons</p>
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
      className={`bg-white/5 rounded-xl p-3 text-center border border-white/5 ${
        glow ? "streak-glow border-amber-500/30" : ""
      }`}
    >
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
      className={`group rounded-xl bg-gradient-to-br ${color} p-[1px] transition-transform hover:scale-[1.02]`}
    >
      <div className="bg-neutral-900 rounded-xl p-4 text-center h-full">
        <span className="text-3xl block mb-1">{emoji}</span>
        <h3 className="font-bold text-white text-sm">{title}</h3>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
    </Link>
  );
}
