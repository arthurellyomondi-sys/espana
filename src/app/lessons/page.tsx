"use client";

import Link from "next/link";
import { units } from "@/data/lessons";
import { useProgress } from "@/context/ProgressContext";

export default function LessonsPage() {
  const { isLessonCompleted, isLessonUnlocked, getLessonCrown, progress } = useProgress();

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="ambient-orb w-72 h-72 bg-emerald-500 -top-36 left-1/2 -translate-x-1/2" />
      <div className="ambient-orb w-48 h-48 bg-indigo-500 bottom-40 -right-24" />

      <div className="relative max-w-lg mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <span>←</span>
            <span>Home</span>
          </Link>
          <h1 className="text-xl font-bold gradient-text-success">📚 Lessons</h1>
          <div className="text-sm text-gray-400">
            {progress.completedLessons.length}/{units.reduce((sum, u) => sum + u.lessons.length, 0)}
          </div>
        </div>

        <div className="relative">
          {units.map((unit, unitIdx) => (
            <div key={unit.id} className="mb-12">
              {/* Unit header */}
              <div className={`rounded-2xl bg-gradient-to-r ${unit.color} p-[1px] mb-8`}>
                <div className="bg-neutral-950/90 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                    {unit.emoji}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-white">{unit.title}</h2>
                    <p className="text-xs text-gray-400">
                      {unit.lessons.filter((l) => isLessonCompleted(l.id)).length}/{unit.lessons.length} complete
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    Unit {unitIdx + 1}
                  </div>
                </div>
              </div>

              {/* Lesson path */}
              <div className="relative flex flex-col items-center">
                {unit.lessons.map((lesson, lessonIdx) => {
                  const completed = isLessonCompleted(lesson.id);
                  const unlocked = isLessonUnlocked(lesson.id);
                  const isFirst = unitIdx === 0 && lessonIdx === 0;
                  const crown = getLessonCrown(lesson.id);
                  const offset = lessonIdx % 3 === 0 ? 0 : lessonIdx % 3 === 1 ? 50 : -50;

                  return (
                    <div key={lesson.id} className="flex flex-col items-center">
                      {/* Connector line */}
                      {lessonIdx > 0 && (
                        <div className="w-1.5 h-12 relative">
                          <div
                            className={`absolute inset-0 rounded-full ${
                              isLessonCompleted(unit.lessons[lessonIdx - 1].id)
                                ? "bg-gradient-to-b from-emerald-500 to-emerald-400 shadow-sm shadow-emerald-500/50"
                                : "bg-white/5"
                            }`}
                          />
                        </div>
                      )}

                      {/* Lesson node */}
                      <div className="relative" style={{ transform: `translateX(${offset}px)` }}>
                        {completed ? (
                          <Link href={`/lessons/${lesson.id}`}>
                            <LessonNode emoji={lesson.emoji} status="completed" title={lesson.title} crown={crown} />
                          </Link>
                        ) : unlocked ? (
                          <Link href={`/lessons/${lesson.id}`}>
                            <LessonNode emoji={lesson.emoji} status={isFirst ? "active" : "unlocked"} title={lesson.title} crown={0} />
                          </Link>
                        ) : (
                          <LessonNode emoji={lesson.emoji} status="locked" title={lesson.title} crown={0} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function LessonNode({
  emoji,
  status,
  title,
  crown,
}: {
  emoji: string;
  status: "completed" | "active" | "unlocked" | "locked";
  title: string;
  crown: number;
}) {
  const styles = {
    completed:
      "bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-400/50 shadow-lg shadow-emerald-500/30",
    active:
      "bg-gradient-to-br from-amber-500 to-orange-500 border-amber-400/50 shadow-lg shadow-amber-500/40 animate-bounce-in",
    unlocked:
      "bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400/50 shadow-lg shadow-indigo-500/25",
    locked: "bg-white/3 border-white/5 opacity-40",
  };

  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div
        className={`w-[72px] h-[72px] rounded-full border-2 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 ${styles[status]}`}
      >
        {status === "locked" ? (
          <span className="text-sm opacity-50">🔒</span>
        ) : (
          emoji
        )}
      </div>
      <p
        className={`mt-2 text-xs font-medium text-center max-w-[100px] ${
          status === "completed"
            ? "text-emerald-400"
            : status === "active" || status === "unlocked"
            ? "text-white"
            : "text-gray-600"
        }`}
      >
        {title}
      </p>
      {crown > 0 && (
        <div className="flex gap-0.5 mt-1">
          {Array.from({ length: crown }).map((_, i) => (
            <span key={i} className="text-amber-400 text-[10px]">⭐</span>
          ))}
        </div>
      )}
      {status === "completed" && crown === 0 && (
        <div className="flex gap-0.5 mt-1">
          {[1, 2, 3].map((s) => (
            <span key={s} className="text-amber-400/50 text-[8px]">★</span>
          ))}
        </div>
      )}
    </div>
  );
}
