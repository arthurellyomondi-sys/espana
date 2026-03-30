"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getLessonById, getNextLesson } from "@/data/lessons";
import { useProgress } from "@/context/ProgressContext";

type GameState = "playing" | "correct" | "wrong" | "finished";

export default function LessonPlayPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  const lesson = getLessonById(lessonId);
  const { completeLesson, addXP, isLessonCompleted } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [wordBankSelected, setWordBankSelected] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [hearts, setHearts] = useState(5);
  const [correctCount, setCorrectCount] = useState(0);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  const exercise = lesson?.exercises[currentIndex];
  const totalExercises = lesson?.exercises.length ?? 0;
  const progress = totalExercises > 0 ? ((currentIndex) / totalExercises) * 100 : 0;
  const nextLesson = lesson ? getNextLesson(lesson.id) : null;
  const alreadyCompleted = lesson ? isLessonCompleted(lesson.id) : false;

  const handleCheck = () => {
    if (!exercise || gameState !== "playing") return;

    let isCorrect = false;

    if (exercise.type === "translate" || exercise.type === "fill_blank" || exercise.type === "listen_choose") {
      isCorrect = selected === exercise.correct;
    } else if (exercise.type === "word_bank") {
      isCorrect = wordBankSelected.join(" ") === exercise.correct;
    }

    if (isCorrect) {
      setGameState("correct");
      setCorrectCount((c) => c + 1);
    } else {
      setGameState("wrong");
      setHearts((h) => h - 1);
    }
  };

  const handleContinue = () => {
    if (hearts <= 0) {
      router.push("/lessons");
      return;
    }

    if (currentIndex + 1 >= totalExercises) {
      if (!alreadyCompleted) {
        completeLesson(lessonId, hearts);
        const xp = lesson?.xpReward ?? 15;
        const perfectBonus = hearts === 5 ? 10 : 0;
        addXP(xp + perfectBonus, "Lesson completed");
      }
      setGameState("finished");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setWordBankSelected([]);
      setGameState("playing");
    }
  };

  const handleOptionClick = (option: string) => {
    if (gameState === "playing") {
      setSelected(option);
    }
  };

  const handleWordBankClick = (word: string) => {
    if (gameState !== "playing") return;
    setWordBankSelected((prev) => [...prev, word]);
  };

  const handleWordBankRemove = (index: number) => {
    if (gameState !== "playing") return;
    setWordBankSelected((prev) => prev.filter((_, i) => i !== index));
  };

  if (!lesson) {
    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Lesson not found</p>
          <Link href="/lessons" className="text-indigo-400 hover:text-indigo-300">
            ← Back to Lessons
          </Link>
        </div>
      </main>
    );
  }

  if (gameState === "finished") {
    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center animate-bounce-in">
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">Lesson Complete!</h2>
            <p className="text-gray-400 mb-6">{lesson.title}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-emerald-500/10 rounded-xl p-3">
                <p className="text-2xl font-bold text-emerald-400">{correctCount}</p>
                <p className="text-xs text-gray-400">Correct</p>
              </div>
              <div className="bg-rose-500/10 rounded-xl p-3">
                <p className="text-2xl font-bold text-rose-400">{totalExercises - correctCount}</p>
                <p className="text-xs text-gray-400">Mistakes</p>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-3">
                <p className="text-2xl font-bold text-amber-400">{hearts}</p>
                <p className="text-xs text-gray-400">Hearts</p>
              </div>
            </div>

            <div className="bg-indigo-500/10 rounded-xl p-4 mb-8">
              <p className="text-sm text-indigo-300">XP Earned</p>
              <p className="text-3xl font-bold text-indigo-400">
                +{lesson.xpReward + (hearts === 5 ? 10 : 0)}
              </p>
              {hearts === 5 && (
                <p className="text-xs text-amber-400 mt-1">Includes +10 Perfect Bonus!</p>
              )}
            </div>

            <div className="space-y-3">
              {nextLesson && (
                <Link
                  href={`/lessons/${nextLesson.id}`}
                  className="block w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold hover:brightness-110 transition-all"
                >
                  Next Lesson → {nextLesson.title}
                </Link>
              )}
              <Link
                href="/lessons"
                className="block w-full py-3 px-6 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all"
              >
                Back to Lessons
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (hearts <= 0) {
    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center animate-fade-in-up">
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-white mb-2">Out of Hearts!</h2>
            <p className="text-gray-400 mb-8">Don&apos;t worry, practice makes perfect.</p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setSelected(null);
                  setWordBankSelected([]);
                  setGameState("playing");
                  setHearts(5);
                  setCorrectCount(0);
                }}
                className="block w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:brightness-110 transition-all"
              >
                Try Again
              </button>
              <Link
                href="/lessons"
                className="block w-full py-3 px-6 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all text-center"
              >
                Back to Lessons
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const canCheck =
    gameState === "playing" &&
    (exercise?.type === "word_bank"
      ? wordBankSelected.length > 0
      : selected !== null);

  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => setShowQuitConfirm(true)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>

          {/* Progress bar */}
          <div className="flex-1 bg-white/10 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-green-400"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-lg transition-all ${
                  i < hearts ? "text-red-500" : "text-white/10"
                }`}
              >
                ♥
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quit confirmation modal */}
      {showQuitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-neutral-800 rounded-2xl p-6 max-w-sm w-full animate-bounce-in">
            <h3 className="text-xl font-bold text-white mb-2">Quit lesson?</h3>
            <p className="text-gray-400 mb-6">Your progress in this lesson will be lost.</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/lessons")}
                className="w-full py-3 rounded-xl bg-rose-500/20 text-rose-400 font-bold hover:bg-rose-500/30 transition-all"
              >
                Quit
              </button>
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all"
              >
                Keep Learning
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exercise content */}
      <div className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        {exercise && (
          <div className="animate-fade-in-up">
            {/* Exercise type badge */}
            <ExerciseTypeBadge type={exercise.type} />

            {/* Prompt */}
            <h2 className="text-xl font-bold text-white mt-4 mb-6">
              {exercise.prompt}
            </h2>

            {/* Spanish text display for fill_blank */}
            {exercise.spanish && exercise.type === "fill_blank" && (
              <div className="bg-indigo-500/10 rounded-xl p-4 mb-6 border border-indigo-500/20">
                <p className="text-indigo-200 text-lg font-medium">
                  {exercise.spanish}
                </p>
              </div>
            )}

            {/* Hint */}
            {exercise.hint && (
              <p className="text-sm text-amber-400/70 mb-4">
                💡 {exercise.hint}
              </p>
            )}

            {/* Options (translate, fill_blank, listen_choose) */}
            {(exercise.type === "translate" || exercise.type === "fill_blank" || exercise.type === "listen_choose") && exercise.options && (
              <div className="space-y-3">
                {exercise.options.map((option) => {
                  let borderStyle = "border-white/10 hover:border-white/30";
                  let bgStyle = "bg-white/5 hover:bg-white/10";

                  if (gameState === "correct" && option === exercise.correct) {
                    borderStyle = "border-emerald-500";
                    bgStyle = "bg-emerald-500/20";
                  } else if (gameState === "wrong") {
                    if (option === exercise.correct) {
                      borderStyle = "border-emerald-500";
                      bgStyle = "bg-emerald-500/20";
                    } else if (option === selected) {
                      borderStyle = "border-rose-500";
                      bgStyle = "bg-rose-500/20";
                    }
                  } else if (selected === option) {
                    borderStyle = "border-indigo-500";
                    bgStyle = "bg-indigo-500/20";
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      disabled={gameState !== "playing"}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${borderStyle} ${bgStyle}`}
                    >
                      <span className={`font-medium ${
                        gameState === "correct" && option === exercise.correct
                          ? "text-emerald-400"
                          : gameState === "wrong" && option === selected
                          ? "text-rose-400"
                          : "text-white"
                      }`}>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Word bank */}
            {exercise.type === "word_bank" && exercise.wordBank && (
              <div className="space-y-4">
                {/* Answer area */}
                <div className="min-h-[56px] bg-white/5 rounded-xl p-3 border-2 border-dashed border-white/10 flex flex-wrap gap-2">
                  {wordBankSelected.length === 0 && (
                    <span className="text-gray-500 text-sm">Tap the words below...</span>
                  )}
                  {wordBankSelected.map((word, i) => {
                    let bgStyle = "bg-indigo-500/20 text-indigo-300";
                    if (gameState === "correct") {
                      bgStyle = "bg-emerald-500/20 text-emerald-300";
                    } else if (gameState === "wrong") {
                      bgStyle = "bg-rose-500/20 text-rose-300";
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleWordBankRemove(i)}
                        disabled={gameState !== "playing"}
                        className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${bgStyle}`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>

                {/* Word bank buttons */}
                <div className="flex flex-wrap gap-2">
                  {exercise.wordBank.map((word, i) => {
                    const usedCount = wordBankSelected.filter(w => w === word).length;
                    const totalCount = exercise.wordBank!.filter(w => w === word).length;
                    const available = totalCount - usedCount;

                    return (
                      <button
                        key={`${word}-${i}`}
                        onClick={() => handleWordBankClick(word)}
                        disabled={gameState !== "playing" || available <= 0}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          available > 0 && gameState === "playing"
                            ? "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                            : "bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed"
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>

                {/* Show correct answer when wrong */}
                {gameState === "wrong" && (
                  <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20">
                    <p className="text-xs text-emerald-400 mb-1">Correct answer:</p>
                    <p className="text-emerald-300 font-medium">{exercise.correct}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div className="sticky bottom-0 z-10 bg-neutral-950/90 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {gameState === "playing" ? (
            <button
              onClick={handleCheck}
              disabled={!canCheck}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                canCheck
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:brightness-110"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }`}
            >
              Check
            </button>
          ) : (
            <div>
              {/* Feedback banner */}
              <div
                className={`rounded-xl p-4 mb-3 ${
                  gameState === "correct"
                    ? "bg-emerald-500/20 border border-emerald-500/30"
                    : "bg-rose-500/20 border border-rose-500/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {gameState === "correct" ? "✓" : "✗"}
                  </span>
                  <div>
                    <p className={`font-bold ${
                      gameState === "correct" ? "text-emerald-400" : "text-rose-400"
                    }`}>
                      {gameState === "correct" ? "Correct!" : "Incorrect"}
                    </p>
                    {gameState === "wrong" && exercise?.type !== "word_bank" && (
                      <p className="text-sm text-gray-400">
                        Correct: <span className="text-white">{exercise?.correct}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                  gameState === "correct"
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:brightness-110"
                    : "bg-gradient-to-r from-rose-500 to-red-500 text-white hover:brightness-110"
                }`}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function ExerciseTypeBadge({ type }: { type: string }) {
  const labels: Record<string, { text: string; emoji: string }> = {
    translate: { text: "Translate", emoji: "🔄" },
    fill_blank: { text: "Fill in the blank", emoji: "✏️" },
    listen_choose: { text: "Listen and choose", emoji: "👂" },
    word_bank: { text: "Build the sentence", emoji: "🏗️" },
    match_pairs: { text: "Match pairs", emoji: "🃏" },
  };

  const info = labels[type] ?? { text: type, emoji: "📝" };

  return (
    <div className="inline-flex items-center gap-2 text-sm text-gray-400">
      <span>{info.emoji}</span>
      <span>{info.text}</span>
    </div>
  );
}
