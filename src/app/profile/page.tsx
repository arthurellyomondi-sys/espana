"use client";

import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { rewards } from "@/data/rewards";
import { achievements } from "@/data/achievements";

export default function ProfilePage() {
  const { progress, getAchievementStats } = useProgress();
  const stats = getAchievementStats();

  const avatars = rewards.filter((r) => r.type === "avatar");
  const badges = rewards.filter((r) => r.type === "badge");
  const ownedAvatars = avatars.filter((r) =>
    progress.purchasedRewards.includes(r.id)
  );
  const ownedBadges = badges.filter((r) =>
    progress.purchasedRewards.includes(r.id)
  );

  const levelEmojis = [
    "🌱",
    "🌿",
    "🌳",
    "🏅",
    "⭐",
    "🌟",
    "💫",
    "🏆",
    "👑",
    "💎",
  ];
  const levelEmoji =
    levelEmojis[Math.min(progress.level - 1, levelEmojis.length - 1)];

  const recentAchievements = achievements
    .filter((a) => progress.unlockedAchievements.includes(a.id))
    .slice(-6);

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Home</span>
          </Link>
          <h1 className="text-xl font-bold text-white">👤 Profile</h1>
          <div />
        </div>

        {/* Avatar & Level */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 text-center mb-6">
          <div className="text-6xl mb-3">{levelEmoji}</div>
          <h2 className="text-2xl font-bold text-white">
            Level {progress.level}
          </h2>
          <p className="text-gray-400">{progress.xp} XP Total</p>

          <div className="flex justify-center gap-2 mt-4">
            {ownedAvatars.length > 0 ? (
              ownedAvatars.map((a) => (
                <span key={a.id} className="text-2xl" title={a.name}>
                  {a.emoji}
                </span>
              ))
            ) : (
              <p className="text-xs text-gray-500">
                Visit the shop to get an avatar!
              </p>
            )}
          </div>

          <div className="flex justify-center gap-2 mt-3">
            {ownedBadges.map((b) => (
              <span key={b.id} className="text-lg" title={b.name}>
                {b.emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-amber-500/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">
              {progress.currentStreak}
            </div>
            <div className="text-xs text-gray-400">Day Streak 🔥</div>
          </div>
          <div className="bg-emerald-500/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">
              {progress.learnedWords.length}
            </div>
            <div className="text-xs text-gray-400">Words 📚</div>
          </div>
          <div className="bg-purple-500/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {progress.totalCrowns}
            </div>
            <div className="text-xs text-gray-400">Crowns 👑</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white">🏆 Achievements</h3>
            <Link
              href="/achievements"
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              View all →
            </Link>
          </div>
          {recentAchievements.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No achievements unlocked yet
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {recentAchievements.map((a) => (
                <div
                  key={a.id}
                  className="bg-white/5 rounded-xl p-3 text-center"
                >
                  <span className="text-2xl">{a.emoji}</span>
                  <p className="text-[10px] text-gray-400 mt-1">{a.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Streak Info */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6">
          <h3 className="font-bold text-white mb-3">🔥 Streak</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-gray-400">Current</p>
              <p className="text-xl font-bold text-amber-400">
                {progress.currentStreak} days
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Best Ever</p>
              <p className="text-xl font-bold text-yellow-400">
                {progress.bestStreak} days
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Streak Freezes</p>
              <p className="text-xl font-bold text-sky-400">
                {progress.streakFreezes} 🧊
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Best Combo</p>
              <p className="text-xl font-bold text-orange-400">
                {progress.maxCombo}x
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/stats"
            className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
          >
            <span className="text-2xl block mb-1">📊</span>
            <span className="text-sm font-bold text-white">Statistics</span>
          </Link>
          <Link
            href="/achievements"
            className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
          >
            <span className="text-2xl block mb-1">🏆</span>
            <span className="text-sm font-bold text-white">Achievements</span>
          </Link>
          <Link
            href="/settings"
            className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
          >
            <span className="text-2xl block mb-1">⚙️</span>
            <span className="text-sm font-bold text-white">Settings</span>
          </Link>
          <Link
            href="/rewards"
            className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
          >
            <span className="text-2xl block mb-1">🎁</span>
            <span className="text-sm font-bold text-white">Shop</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
