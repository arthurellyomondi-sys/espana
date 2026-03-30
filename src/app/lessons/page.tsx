"use client";

import Link from "next/link";
import { units } from "@/data/lessons";
import { useProgress } from "@/context/ProgressContext";

export default function LessonsPage() {
  const { isLessonCompleted, isLessonUnlocked, progress } = useProgress();

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
          <h1 className="text-xl font-bold text-white">📚 Lessons</h1>
          <div className="text-sm text-gray-400">
            {progress.completedLessons.length}/{units.reduce((sum, u) => sum + u.lessons.length, 0)}
          </div>
        </div>

        <div className="relative">
          {units.map((unit, unitIdx) => (
            <div key={unit.id} className="mb-10">
              {/* Unit header */}
              <div className={`rounded-2xl bg-gradient-to-r ${unit.color} p-[1px] mb-6`}>
                <div className="bg-neutral-900 rounded-2xl p-4 flex items-center gap-3">
                  <span className="text-3xl">{unit.emoji}</span>
                  <div>
                    <h2 className="font-bold text-white">{unit.title}</h2>
                    <p className="text-xs text-gray-400">
                      {unit.lessons.filter((l) => isLessonCompleted(l.id)).length}/{unit.lessons.length} complete
                    </p>
                  </div>
                </div>
              </div>

              {/* Lesson path */}
              <div className="relative flex flex-col items-center">
                {unit.lessons.map((lesson, lessonIdx) => {
                  const completed = isLessonCompleted(lesson.id);
                  const unlocked = isLessonUnlocked(lesson.id);
                  const isFirst = unitIdx === 0 && lessonIdx === 0;
                  const showConnector = lessonIdx < unit.lessons.length - 1;
                  const offset = lessonIdx % 2 === 0 ? 0 : (lessonIdx % 4 === 1 ? 40 : -40);

                  return (
                    <div key={lesson.id} className="flex flex-col items-center">
                      {/* Connector line */}
                      {lessonIdx > 0 && (
                        <div className="w-1 h-10 relative">
                          <div
                            className={`absolute inset-0 rounded-full ${
                              isLessonCompleted(unit.lessons[lessonIdx - 1].id)
                                ? "bg-gradient-to-b from-emerald-500 to-emerald-400"
                                : "bg-white/10"
                            }`}
                          />
                        </div>
                      )}

                      {/* Lesson node */}
                      <div
                        className="relative"
                        style={{ transform: `translateX(${offset}px)` }}
                      >
                        {completed ? (
                          <Link href={`/lessons/${lesson.id}`}>
                            <LessonNode
                              emoji={lesson.emoji}
                              status="completed"
                              title={lesson.title}
                            />
                          </Link>
                        ) : unlocked ? (
                          <Link href={`/lessons/${lesson.id}`}>
                            <LessonNode
                              emoji={lesson.emoji}
                              status={isFirst ? "active" : "unlocked"}
                              title={lesson.title}
                            />
                          </Link>
                        ) : (
                          <LessonNode
                            emoji={lesson.emoji}
                            status="locked"
                            title={lesson.title}
                          />
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
}: {
  emoji: string;
  status: "completed" | "active" | "unlocked" | "locked";
  title: string;
}) {
  const styles = {
    completed:
      "bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-400 shadow-lg shadow-emerald-500/30",
    active:
      "bg-gradient-to-br from-amber-500 to-orange-500 border-amber-400 shadow-lg shadow-amber-500/40 animate-bounce-in",
    unlocked:
      "bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 shadow-lg shadow-indigo-500/20",
    locked: "bg-white/5 border-white/10 opacity-50",
  };

  const icons = {
    completed: "✓",
    active: "",
    unlocked: "",
    locked: "🔒",
  };

  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div
        className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl transition-transform group-hover:scale-110 ${styles[status]}`}
      >
        {status === "locked" ? (
          <span className="text-sm">🔒</span>
        ) : (
          emoji
        )}
      </div>
      <p
        className={`mt-2 text-xs font-medium text-center ${
          status === "completed"
            ? "text-emerald-400"
            : status === "active" || status === "unlocked"
            ? "text-white"
            : "text-gray-500"
        }`}
      >
        {title}
      </p>
      {status === "completed" && (
        <div className="flex gap-0.5 mt-1">
          {[1, 2, 3].map((s) => (
            <span key={s} className="text-amber-400 text-[8px]">★</span>
          ))}
        </div>
      )}
    </div>
  );
}
