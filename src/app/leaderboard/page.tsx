"use client";

import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";

const LEAGUES = [
  { name: "Bronze", emoji: "🥉", minXP: 0, color: "text-amber-600" },
  { name: "Silver", emoji: "🥈", minXP: 500, color: "text-gray-300" },
  { name: "Gold", emoji: "🥇", minXP: 1500, color: "text-yellow-400" },
  { name: "Platinum", emoji: "💎", minXP: 3000, color: "text-cyan-400" },
  { name: "Diamond", emoji: "💠", minXP: 5000, color: "text-indigo-400" },
  { name: "Emerald", emoji: "🟩", minXP: 8000, color: "text-emerald-400" },
];

const FAKE_USERS = [
  { name: "María García", xp: 2340, streak: 45 },
  { name: "Carlos López", xp: 1890, streak: 32 },
  { name: "Ana Martínez", xp: 1650, streak: 28 },
  { name: "Diego Hernández", xp: 1420, streak: 21 },
  { name: "Sofía Rodríguez", xp: 1200, streak: 18 },
  { name: "Luis Fernández", xp: 980, streak: 14 },
  { name: "Elena Sánchez", xp: 850, streak: 12 },
  { name: "Pablo Torres", xp: 720, streak: 9 },
  { name: "Isabel Díaz", xp: 540, streak: 7 },
  { name: "Miguel Ruiz", xp: 380, streak: 5 },
];

function getCurrentLeague(xp: number) {
  let league = LEAGUES[0];
  for (const l of LEAGUES) {
    if (xp >= l.minXP) league = l;
  }
  return league;
}

export default function LeaderboardPage() {
  const { progress } = useProgress();
  const league = getCurrentLeague(progress.xp);

  // Insert user into fake leaderboard
  const allPlayers = [
    ...FAKE_USERS,
    { name: "You", xp: progress.xp, streak: progress.currentStreak },
  ].sort((a, b) => b.xp - a.xp);

  const userRank = allPlayers.findIndex((p) => p.name === "You") + 1;

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
          <h1 className="text-xl font-bold text-white">🏆 Leaderboard</h1>
          <div />
        </div>

        {/* Current League */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6 text-center">
          <span className="text-4xl">{league.emoji}</span>
          <h2 className={`text-xl font-bold mt-2 ${league.color}`}>
            {league.name} League
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Your rank: #{userRank}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {progress.xp} XP this week
          </p>
        </div>

        {/* League Progression */}
        <div className="flex justify-between mb-6 px-2">
          {LEAGUES.map((l) => (
            <div
              key={l.name}
              className={`text-center ${
                progress.xp >= l.minXP ? "opacity-100" : "opacity-30"
              }`}
            >
              <span className="text-lg">{l.emoji}</span>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="space-y-2">
          {allPlayers.map((player, i) => {
            const isUser = player.name === "You";
            const rank = i + 1;
            return (
              <div
                key={player.name}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  isUser
                    ? "bg-indigo-500/20 border border-indigo-500/30"
                    : "bg-white/5"
                }`}
              >
                <div
                  className={`w-8 text-center font-bold ${
                    rank === 1
                      ? "text-yellow-400"
                      : rank === 2
                      ? "text-gray-300"
                      : rank === 3
                      ? "text-amber-600"
                      : "text-gray-500"
                  }`}
                >
                  {rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : `#${rank}`}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      isUser ? "text-indigo-300" : "text-white"
                    }`}
                  >
                    {player.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    🔥 {player.streak} day streak
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-indigo-400">{player.xp}</p>
                  <p className="text-xs text-gray-500">XP</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Leagues reset weekly. Compete for the top spot!
        </p>
      </div>
    </main>
  );
}
