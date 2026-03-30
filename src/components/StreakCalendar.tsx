"use client";

import { useProgress } from "@/context/ProgressContext";

export function StreakCalendar() {
  const { getStreakDays, progress } = useProgress();
  const practiceDays = new Set(getStreakDays());

  // Generate last 28 days
  const days: { date: string; day: number; practiced: boolean }[] = [];
  const today = new Date();
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    days.push({
      date: dateStr,
      day: d.getDate(),
      practiced: practiceDays.has(dateStr),
    });
  }

  const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // Align to start of week
  const firstDayOfWeek = new Date(days[0].date).getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  return (
    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          📅 Practice Calendar
        </h3>
        <span className="text-sm text-gray-400">
          {practiceDays.size} days practiced
        </span>
      </div>

      {/* Week labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekLabels.map((label) => (
          <div
            key={label}
            className="text-center text-xs text-gray-500 font-medium"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Offset for first week */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`offset-${i}`} />
        ))}
        {days.map((day) => (
          <div
            key={day.date}
            className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-colors ${
              day.practiced
                ? "bg-emerald-500/40 text-emerald-200"
                : "bg-white/5 text-gray-600"
            }`}
            title={day.date}
          >
            {day.day}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-white/5" />
          <span className="text-xs text-gray-500">No practice</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-emerald-500/40" />
          <span className="text-xs text-gray-500">Practiced</span>
        </div>
      </div>

      {/* Streak info */}
      <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <div className="text-xl font-bold text-amber-400">
            {progress.currentStreak}
          </div>
          <div className="text-xs text-gray-400">Current</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-yellow-400">
            {progress.bestStreak}
          </div>
          <div className="text-xs text-gray-400">Best</div>
        </div>
      </div>
    </div>
  );
}
