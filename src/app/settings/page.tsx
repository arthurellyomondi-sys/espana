"use client";

import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

export default function SettingsPage() {
  const {
    progress,
    toggleSound,
    setDailyGoalTarget,
    exportProgress,
    importProgress,
  } = useProgress();
  const { theme, toggleTheme } = useTheme();
  const [importText, setImportText] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [importMsg, setImportMsg] = useState("");

  const dailyGoals = [10, 20, 30, 50, 100];

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
          <h1 className="text-xl font-bold text-white">⚙️ Settings</h1>
          <div />
        </div>

        <div className="space-y-4">
          {/* Sound */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <h3 className="font-bold text-white mb-3">🔊 Sound</h3>
            <button
              onClick={toggleSound}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="text-gray-300">Sound Effects</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  progress.soundEnabled
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-white/10 text-gray-500"
                }`}
              >
                {progress.soundEnabled ? "ON" : "OFF"}
              </span>
            </button>
          </div>

          {/* Theme */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <h3 className="font-bold text-white mb-3">🎨 Theme</h3>
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="text-gray-300">Dark / Light Mode</span>
              <span className="text-xl">{theme === "dark" ? "🌙" : "☀️"}</span>
            </button>
          </div>

          {/* Daily Goal */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <h3 className="font-bold text-white mb-3">🎯 Daily Goal (XP)</h3>
            <div className="grid grid-cols-5 gap-2">
              {dailyGoals.map((g) => (
                <button
                  key={g}
                  onClick={() => setDailyGoalTarget(g)}
                  className={`py-2 rounded-xl text-sm font-bold transition-all ${
                    progress.dailyGoalTarget === g
                      ? "bg-indigo-500 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Streak Freeze */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <h3 className="font-bold text-white mb-3">🧊 Streak Freezes</h3>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧊</span>
              <div>
                <p className="text-2xl font-bold text-sky-400">
                  {progress.streakFreezes}
                </p>
                <p className="text-xs text-gray-400">
                  Auto-used when you miss a day
                </p>
              </div>
            </div>
          </div>

          {/* Data */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <h3 className="font-bold text-white mb-3">💾 Data</h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowExport(!showExport);
                }}
                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left text-gray-300"
              >
                📤 Export Progress
              </button>
              {showExport && (
                <textarea
                  readOnly
                  value={exportProgress()}
                  className="w-full h-24 bg-neutral-800 text-xs text-gray-400 rounded-xl p-3 border border-white/10 font-mono"
                />
              )}
              <div className="p-3 rounded-xl bg-white/5">
                <p className="text-gray-300 mb-2">📥 Import Progress</p>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste exported JSON here..."
                  className="w-full h-20 bg-neutral-800 text-xs text-gray-400 rounded-lg p-2 border border-white/10 font-mono mb-2"
                />
                <button
                  onClick={() => {
                    if (importProgress(importText)) {
                      setImportMsg("Import successful!");
                      setImportText("");
                    } else {
                      setImportMsg("Invalid data format");
                    }
                    setTimeout(() => setImportMsg(""), 3000);
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-medium hover:bg-indigo-500/30 transition-colors"
                >
                  Import
                </button>
                {importMsg && (
                  <p className="text-xs text-gray-400 mt-2">{importMsg}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <h3 className="font-bold text-white mb-3">📊 Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Level</span>
                <span className="text-white font-bold">{progress.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">XP</span>
                <span className="text-white font-bold">{progress.xp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Streak</span>
                <span className="text-amber-400 font-bold">
                  {progress.currentStreak}d
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Words</span>
                <span className="text-emerald-400 font-bold">
                  {progress.learnedWords.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Lessons</span>
                <span className="text-purple-400 font-bold">
                  {progress.completedLessons.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Crowns</span>
                <span className="text-amber-400 font-bold">
                  {progress.totalCrowns}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
