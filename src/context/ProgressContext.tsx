"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface ProgressData {
  learnedWords: string[];
  quizScores: Record<string, number>;
  currentStreak: number;
  lastPracticeDate: string | null;
  totalQuizzesTaken: number;
  totalCardsReviewed: number;
  bestStreak: number;
}

interface ProgressContextType {
  progress: ProgressData;
  markWordLearned: (word: string) => void;
  isWordLearned: (word: string) => boolean;
  saveQuizScore: (categoryId: string, score: number) => void;
  incrementCardsReviewed: () => void;
  getCategoryProgress: (categoryId: string, totalWords: number) => number;
  getOverallProgress: () => number;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = "aprende-progress";

function getDefaultProgress(): ProgressData {
  return {
    learnedWords: [],
    quizScores: {},
    currentStreak: 0,
    lastPracticeDate: null,
    totalQuizzesTaken: 0,
    totalCardsReviewed: 0,
    bestStreak: 0,
  };
}

function checkAndUpdateStreak(data: ProgressData): ProgressData {
  const today = new Date().toISOString().split("T")[0];
  if (!data.lastPracticeDate) return data;

  const lastDate = new Date(data.lastPracticeDate);
  const todayDate = new Date(today);
  const diffDays = Math.floor(
    (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays > 1) {
    return { ...data, currentStreak: 0 };
  }
  return data;
}

function loadProgress(): ProgressData {
  if (typeof window === "undefined") {
    return getDefaultProgress();
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultProgress();
    const data = JSON.parse(stored) as ProgressData;
    return checkAndUpdateStreak(data);
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(data: ProgressData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, _setProgress] = useState<ProgressData>(loadProgress);

  const setProgress = useCallback(
    (updater: (prev: ProgressData) => ProgressData) => {
      _setProgress((prev) => {
        const next = updater(prev);
        saveProgress(next);
        return next;
      });
    },
    []
  );

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    setProgress((prev) => {
      if (prev.lastPracticeDate === today) return prev;

      const lastDate = prev.lastPracticeDate
        ? new Date(prev.lastPracticeDate)
        : null;
      const todayDate = new Date(today);
      const diffDays = lastDate
        ? Math.floor(
            (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
          )
        : 999;

      const newStreak = diffDays <= 1 ? prev.currentStreak + 1 : 1;
      return {
        ...prev,
        currentStreak: newStreak,
        lastPracticeDate: today,
        bestStreak: Math.max(prev.bestStreak, newStreak),
      };
    });
  }, [setProgress]);

  const markWordLearned = useCallback(
    (word: string) => {
      updateStreak();
      setProgress((prev) => {
        if (prev.learnedWords.includes(word)) return prev;
        return {
          ...prev,
          learnedWords: [...prev.learnedWords, word],
        };
      });
    },
    [updateStreak, setProgress]
  );

  const isWordLearned = useCallback(
    (word: string) => {
      return progress.learnedWords.includes(word);
    },
    [progress.learnedWords]
  );

  const saveQuizScore = useCallback(
    (categoryId: string, score: number) => {
      updateStreak();
      setProgress((prev) => ({
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [categoryId]: Math.max(prev.quizScores[categoryId] ?? 0, score),
        },
        totalQuizzesTaken: prev.totalQuizzesTaken + 1,
      }));
    },
    [updateStreak, setProgress]
  );

  const incrementCardsReviewed = useCallback(() => {
    updateStreak();
    setProgress((prev) => ({
      ...prev,
      totalCardsReviewed: prev.totalCardsReviewed + 1,
    }));
  }, [updateStreak, setProgress]);

  const getCategoryProgress = useCallback(
    (categoryId: string, totalWords: number) => {
      const learned = progress.learnedWords.filter((w) =>
        w.startsWith(`${categoryId}:`)
      ).length;
      return totalWords > 0 ? Math.round((learned / totalWords) * 100) : 0;
    },
    [progress.learnedWords]
  );

  const getOverallProgress = useCallback(() => {
    const totalWords = 48;
    return Math.round((progress.learnedWords.length / totalWords) * 100);
  }, [progress.learnedWords.length]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markWordLearned,
        isWordLearned,
        saveQuizScore,
        incrementCardsReviewed,
        getCategoryProgress,
        getOverallProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
