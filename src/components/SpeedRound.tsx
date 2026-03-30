"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Word } from "@/data/vocabulary";
import { useProgress } from "@/context/ProgressContext";
import { playCorrectSound, playWrongSound } from "@/lib/audio";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface SpeedRoundProps {
  words: Word[];
  categoryId: string;
  onComplete: (score: number, total: number) => void;
}

export function SpeedRound({
  words,
  categoryId,
  onComplete,
}: SpeedRoundProps) {
  const { recordSpeedRound, markWordLearned } = useProgress();
  const allQuestions = useMemo(() => shuffleArray(words), [words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const completedRef = useRef(false);

  const finished = timeLeft <= 0;
  const currentWord = allQuestions[currentIndex % allQuestions.length];

  // Derive options from current word
  const options = useMemo(() => {
    const wrong = shuffleArray(
      allQuestions.filter((w) => w.english !== currentWord.english)
    )
      .slice(0, 3)
      .map((w) => w.english);
    return shuffleArray([currentWord.english, ...wrong]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord.english]);

  // Timer
  useEffect(() => {
    if (!started || finished) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, finished]);

  // Handle completion via ref to avoid setState in effect
  useEffect(() => {
    if (finished && started && !completedRef.current) {
      completedRef.current = true;
      recordSpeedRound();
      onComplete(score, currentIndex);
    }
  }, [finished, started, score, currentIndex, recordSpeedRound, onComplete]);



  const handleAnswer = useCallback(
    (answer: string) => {
      if (showFeedback || finished) return;
      setSelectedAnswer(answer);
      setShowFeedback(true);

      const isCorrect = answer === currentWord.english;
      if (isCorrect) {
        setScore((s) => s + 1);
        playCorrectSound();
        markWordLearned(`${categoryId}:${currentWord.spanish}`);
      } else {
        playWrongSound();
      }

      // Auto-advance after brief feedback
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      }, 400);
    },
    [showFeedback, finished, currentWord, categoryId, markWordLearned]
  );

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-lg">
        <div className="text-7xl">⚡</div>
        <h2 className="text-3xl font-bold text-white">Speed Round</h2>
        <p className="text-gray-400">
          Answer as many questions as you can in 60 seconds!
        </p>
        <div className="bg-white/5 rounded-2xl p-6 w-full border border-white/10">
          <p className="text-4xl font-bold text-amber-400">60s</p>
          <p className="text-sm text-gray-400 mt-1">Timer</p>
        </div>
        <button
          onClick={() => setStarted(true)}
          className="px-10 py-4 rounded-xl bg-amber-500 text-white font-bold text-lg hover:bg-amber-600 transition-colors"
        >
          Start!
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-lg">
        <div className="text-7xl">{score >= 10 ? "⚡" : "💪"}</div>
        <h2 className="text-3xl font-bold text-white">Time&apos;s Up!</h2>
        <div className="bg-white/10 rounded-2xl p-8 w-full">
          <p className="text-5xl font-bold text-amber-400 mb-2">{score}</p>
          <p className="text-gray-300">
            correct out of {currentIndex} attempted
          </p>
        </div>
        {score >= 15 && (
          <p className="text-amber-400 font-medium">Incredible speed!</p>
        )}
        {score >= 10 && score < 15 && (
          <p className="text-emerald-400 font-medium">Great performance!</p>
        )}
      </div>
    );
  }

  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="w-full flex justify-between items-center">
        <span className="text-sm text-gray-400">
          Score: {score}
        </span>
        <span
          className={`text-2xl font-bold ${
            timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-amber-400"
          }`}
        >
          {seconds}s
        </span>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            timeLeft <= 10
              ? "bg-gradient-to-r from-red-500 to-orange-500"
              : "bg-gradient-to-r from-amber-500 to-yellow-500"
          }`}
          style={{ width: `${(timeLeft / 60) * 100}%` }}
        />
      </div>

      <div className="bg-white/5 rounded-2xl p-6 w-full text-center border border-white/10">
        <p className="text-sm text-amber-300 mb-2">What does this mean?</p>
        <h2 className="text-3xl font-bold text-white">{currentWord.spanish}</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {options.map((option) => {
          let cls =
            "w-full p-4 rounded-xl font-medium transition-all border text-center text-sm ";
          if (showFeedback && option === currentWord.english) {
            cls += "bg-emerald-500/30 border-emerald-500 text-emerald-300";
          } else if (
            showFeedback &&
            option === selectedAnswer &&
            option !== currentWord.english
          ) {
            cls += "bg-red-500/30 border-red-500 text-red-300";
          } else {
            cls +=
              "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20";
          }
          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={cls}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
