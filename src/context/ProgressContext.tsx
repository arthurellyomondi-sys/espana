"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { getAllLessons } from "@/data/lessons";
import { showToast } from "@/components/Toast";

interface WordProgress {
  wordKey: string;
  strength: number; // 0-5, 0 = new, 5 = mastered
  lastReviewed: string;
  nextReview: string;
}

interface DailyGoalData {
  date: string;
  wordsLearned: number;
  quizzesCompleted: number;
  cardsReviewed: number;
  xpEarned: number;
}

interface ProgressData {
  learnedWords: string[];
  quizScores: Record<string, number>;
  currentStreak: number;
  lastPracticeDate: string | null;
  totalQuizzesTaken: number;
  totalCardsReviewed: number;
  bestStreak: number;
  xp: number;
  level: number;
  dailyGoalTarget: number;
  dailyHistory: Record<string, DailyGoalData>;
  wordProgress: Record<string, WordProgress>;
  unlockedAchievements: string[];
  perfectQuizzes: number;
  categoriesExplored: string[];
  matchesPlayed: number;
  listeningExercises: number;
  typingExercises: number;
  sentencesBuilt: number;
  verbsPracticed: number;
  speechExercises: number;
  hangmanGames: number;
  speedRounds: number;
  purchasedRewards: string[];
  completedLessons: string[];
  // New features
  soundEnabled: boolean;
  streakFreezes: number;
  lessonCrowns: Record<string, number>; // lessonId -> crown level (0-5)
  totalCrowns: number;
  maxCombo: number;
  currentCombo: number;
  reviewSessions: number;
  dailyChallengeDate: string | null;
  dailyChallengeCompleted: boolean;
}

interface AchievementStatsResult {
  learnedWords: number;
  totalQuizzesTaken: number;
  totalCardsReviewed: number;
  currentStreak: number;
  bestStreak: number;
  perfectQuizzes: number;
  categoriesExplored: number;
  totalXP: number;
  level: number;
  matchesPlayed: number;
  listeningExercises: number;
  typingExercises: number;
  sentencesBuilt: number;
  verbsPracticed: number;
  speechExercises: number;
  hangmanGames: number;
  speedRounds: number;
  lessonsCompleted: number;
  crownsEarned: number;
  maxCombo: number;
  reviewSessions: number;
}

interface ProgressContextType {
  progress: ProgressData;
  markWordLearned: (word: string) => void;
  isWordLearned: (word: string) => boolean;
  saveQuizScore: (categoryId: string, score: number) => void;
  incrementCardsReviewed: () => void;
  getCategoryProgress: (categoryId: string, totalWords: number) => number;
  getOverallProgress: () => number;
  addXP: (amount: number, reason?: string) => void;
  getXPForNextLevel: () => number;
  getXPProgress: () => number;
  getTodayGoal: () => DailyGoalData;
  isGoalComplete: () => boolean;
  setDailyGoalTarget: (target: number) => void;
  updateWordStrength: (wordKey: string, correct: boolean) => void;
  getWordsForReview: () => string[];
  unlockAchievement: (id: string) => void;
  getAchievementStats: () => AchievementStatsResult;
  recordMatch: () => void;
  recordListening: () => void;
  recordTyping: () => void;
  recordSentence: () => void;
  recordVerbPractice: () => void;
  recordSpeech: () => void;
  recordHangman: () => void;
  recordSpeedRound: () => void;
  exploreCategory: (id: string) => void;
  purchaseReward: (id: string, cost: number) => boolean;
  hasPurchased: (id: string) => boolean;
  getStreakDays: () => string[];
  completeLesson: (lessonId: string, heartsRemaining: number) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isLessonUnlocked: (lessonId: string) => boolean;
  getLessonCrown: (lessonId: string) => number;
  toggleSound: () => void;
  useStreakFreeze: () => boolean;
  recordCombo: (correct: boolean) => void;
  incrementReviewSessions: () => void;
  completeDailyChallenge: () => void;
  isDailyChallengeDone: () => boolean;
  exportProgress: () => string;
  importProgress: (data: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = "aprende-progress-v3";

function getDefaultProgress(): ProgressData {
  return {
    learnedWords: [],
    quizScores: {},
    currentStreak: 0,
    lastPracticeDate: null,
    totalQuizzesTaken: 0,
    totalCardsReviewed: 0,
    bestStreak: 0,
    xp: 0,
    level: 1,
    dailyGoalTarget: 20,
    dailyHistory: {},
    wordProgress: {},
    unlockedAchievements: [],
    perfectQuizzes: 0,
    categoriesExplored: [],
    matchesPlayed: 0,
    listeningExercises: 0,
    typingExercises: 0,
    sentencesBuilt: 0,
    verbsPracticed: 0,
    speechExercises: 0,
    hangmanGames: 0,
    speedRounds: 0,
    purchasedRewards: [],
    completedLessons: [],
    soundEnabled: true,
    streakFreezes: 0,
    lessonCrowns: {},
    totalCrowns: 0,
    maxCombo: 0,
    currentCombo: 0,
    reviewSessions: 0,
    dailyChallengeDate: null,
    dailyChallengeCompleted: false,
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
    // Auto-use streak freeze if available
    if (data.streakFreezes > 0) {
      return {
        ...data,
        streakFreezes: data.streakFreezes - 1,
        lastPracticeDate: today,
      };
    }
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
    const defaults = getDefaultProgress();
    const merged = {
      ...defaults,
      ...data,
    };
    merged.soundEnabled = data.soundEnabled ?? true;
    merged.streakFreezes = data.streakFreezes ?? 0;
    merged.lessonCrowns = data.lessonCrowns ?? {};
    merged.totalCrowns = data.totalCrowns ?? 0;
    merged.maxCombo = data.maxCombo ?? 0;
    merged.currentCombo = data.currentCombo ?? 0;
    merged.reviewSessions = data.reviewSessions ?? 0;
    merged.dailyChallengeDate = data.dailyChallengeDate ?? null;
    merged.dailyChallengeCompleted = data.dailyChallengeCompleted ?? false;
    return checkAndUpdateStreak(merged);
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(data: ProgressData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getLevelFromXP(xp: number): number {
  let level = 1;
  let required = 100;
  let total = 0;
  while (total + required <= xp) {
    total += required;
    level++;
    required = Math.floor(required * 1.2);
  }
  return level;
}

function getXPForLevel(level: number): number {
  let total = 0;
  let required = 100;
  for (let i = 1; i < level; i++) {
    total += required;
    required = Math.floor(required * 1.2);
  }
  return total;
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
      if (newStreak > 0 && newStreak % 7 === 0) {
        showToast({
          type: "streak",
          title: `${newStreak}-Day Streak!`,
          message: "You're on fire! Keep it up!",
          emoji: "🔥",
        });
      }
      return {
        ...prev,
        currentStreak: newStreak,
        lastPracticeDate: today,
        bestStreak: Math.max(prev.bestStreak, newStreak),
      };
    });
  }, [setProgress]);

  const addXP = useCallback(
    (amount: number, _reason?: string) => {
      setProgress((prev) => {
        const newXP = prev.xp + amount;
        const oldLevel = prev.level;
        const newLevel = getLevelFromXP(newXP);
        if (newLevel > oldLevel) {
          showToast({
            type: "level-up",
            title: `Level ${newLevel}!`,
            message: `You've reached level ${newLevel}!`,
            emoji: "⭐",
          });
        }
        return { ...prev, xp: newXP, level: newLevel };
      });
    },
    [setProgress]
  );

  const markWordLearned = useCallback(
    (word: string) => {
      updateStreak();
      setProgress((prev) => {
        if (prev.learnedWords.includes(word)) return prev;
        const today = new Date().toISOString().split("T")[0];
        const todayData = prev.dailyHistory[today] ?? {
          date: today,
          wordsLearned: 0,
          quizzesCompleted: 0,
          cardsReviewed: 0,
          xpEarned: 0,
        };
        return {
          ...prev,
          learnedWords: [...prev.learnedWords, word],
          dailyHistory: {
            ...prev.dailyHistory,
            [today]: {
              ...todayData,
              wordsLearned: todayData.wordsLearned + 1,
              xpEarned: todayData.xpEarned + 10,
            },
          },
        };
      });
      addXP(10);
    },
    [updateStreak, setProgress, addXP]
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
      const isPerfect = score === 100;
      setProgress((prev) => {
        const today = new Date().toISOString().split("T")[0];
        const todayData = prev.dailyHistory[today] ?? {
          date: today,
          wordsLearned: 0,
          quizzesCompleted: 0,
          cardsReviewed: 0,
          xpEarned: 0,
        };
        return {
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [categoryId]: Math.max(prev.quizScores[categoryId] ?? 0, score),
          },
          totalQuizzesTaken: prev.totalQuizzesTaken + 1,
          perfectQuizzes: isPerfect
            ? prev.perfectQuizzes + 1
            : prev.perfectQuizzes,
          dailyHistory: {
            ...prev.dailyHistory,
            [today]: {
              ...todayData,
              quizzesCompleted: todayData.quizzesCompleted + 1,
              xpEarned: todayData.xpEarned + Math.floor(score / 10) * 5,
            },
          },
        };
      });
      addXP(Math.floor(score / 10) * 5);
    },
    [updateStreak, setProgress, addXP]
  );

  const incrementCardsReviewed = useCallback(() => {
    updateStreak();
    setProgress((prev) => {
      const today = new Date().toISOString().split("T")[0];
      const todayData = prev.dailyHistory[today] ?? {
        date: today,
        wordsLearned: 0,
        quizzesCompleted: 0,
        cardsReviewed: 0,
        xpEarned: 0,
      };
      return {
        ...prev,
        totalCardsReviewed: prev.totalCardsReviewed + 1,
        dailyHistory: {
          ...prev.dailyHistory,
          [today]: {
            ...todayData,
            cardsReviewed: todayData.cardsReviewed + 1,
            xpEarned: todayData.xpEarned + 5,
          },
        },
      };
    });
    addXP(5);
  }, [updateStreak, setProgress, addXP]);

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
    const totalWords = 152;
    return Math.min(
      100,
      Math.round((progress.learnedWords.length / totalWords) * 100)
    );
  }, [progress.learnedWords.length]);

  const getXPForNextLevel = useCallback(() => {
    return getXPForLevel(progress.level + 1);
  }, [progress.level]);

  const getXPProgress = useCallback(() => {
    const currentLevelXP = getXPForLevel(progress.level);
    const nextLevelXP = getXPForLevel(progress.level + 1);
    const progressInLevel = progress.xp - currentLevelXP;
    const needed = nextLevelXP - currentLevelXP;
    return needed > 0 ? Math.round((progressInLevel / needed) * 100) : 100;
  }, [progress.xp, progress.level]);

  const getTodayGoal = useCallback((): DailyGoalData => {
    const today = new Date().toISOString().split("T")[0];
    return (
      progress.dailyHistory[today] ?? {
        date: today,
        wordsLearned: 0,
        quizzesCompleted: 0,
        cardsReviewed: 0,
        xpEarned: 0,
      }
    );
  }, [progress.dailyHistory]);

  const isGoalComplete = useCallback(() => {
    const today = getTodayGoal();
    return today.xpEarned >= progress.dailyGoalTarget;
  }, [getTodayGoal, progress.dailyGoalTarget]);

  const setDailyGoalTarget = useCallback(
    (target: number) => {
      setProgress((prev) => ({ ...prev, dailyGoalTarget: target }));
    },
    [setProgress]
  );

  const updateWordStrength = useCallback(
    (wordKey: string, correct: boolean) => {
      setProgress((prev) => {
        const existing = prev.wordProgress[wordKey] ?? {
          wordKey,
          strength: 0,
          lastReviewed: "",
          nextReview: "",
        };
        const newStrength = correct
          ? Math.min(5, existing.strength + 1)
          : Math.max(0, existing.strength - 1);
        const today = new Date();
        const daysUntilReview = [1, 2, 4, 7, 14, 30][newStrength];
        const nextReview = new Date(today);
        nextReview.setDate(nextReview.getDate() + daysUntilReview);
        return {
          ...prev,
          wordProgress: {
            ...prev.wordProgress,
            [wordKey]: {
              wordKey,
              strength: newStrength,
              lastReviewed: today.toISOString().split("T")[0],
              nextReview: nextReview.toISOString().split("T")[0],
            },
          },
        };
      });
    },
    [setProgress]
  );

  const getWordsForReview = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    return Object.values(progress.wordProgress)
      .filter((w) => w.nextReview <= today && w.strength < 5)
      .map((w) => w.wordKey);
  }, [progress.wordProgress]);

  const unlockAchievement = useCallback(
    (id: string) => {
      setProgress((prev) => {
        if (prev.unlockedAchievements.includes(id)) return prev;
        return {
          ...prev,
          unlockedAchievements: [...prev.unlockedAchievements, id],
        };
      });
      addXP(50);
    },
    [setProgress, addXP]
  );

  const getAchievementStats = useCallback((): AchievementStatsResult => {
    return {
      learnedWords: progress.learnedWords.length,
      totalQuizzesTaken: progress.totalQuizzesTaken,
      totalCardsReviewed: progress.totalCardsReviewed,
      currentStreak: progress.currentStreak,
      bestStreak: progress.bestStreak,
      perfectQuizzes: progress.perfectQuizzes,
      categoriesExplored: progress.categoriesExplored.length,
      totalXP: progress.xp,
      level: progress.level,
      matchesPlayed: progress.matchesPlayed,
      listeningExercises: progress.listeningExercises,
      typingExercises: progress.typingExercises,
      sentencesBuilt: progress.sentencesBuilt,
      verbsPracticed: progress.verbsPracticed,
      speechExercises: progress.speechExercises,
      hangmanGames: progress.hangmanGames,
      speedRounds: progress.speedRounds,
      lessonsCompleted: progress.completedLessons.length,
      crownsEarned: progress.totalCrowns,
      maxCombo: progress.maxCombo,
      reviewSessions: progress.reviewSessions,
    };
  }, [progress]);

  const recordMatch = useCallback(() => {
    updateStreak();
    setProgress((prev) => ({ ...prev, matchesPlayed: prev.matchesPlayed + 1 }));
    addXP(15);
  }, [updateStreak, setProgress, addXP]);

  const recordListening = useCallback(() => {
    updateStreak();
    setProgress((prev) => ({
      ...prev,
      listeningExercises: prev.listeningExercises + 1,
    }));
    addXP(15);
  }, [updateStreak, setProgress, addXP]);

  const recordTyping = useCallback(() => {
    updateStreak();
    setProgress((prev) => ({
      ...prev,
      typingExercises: prev.typingExercises + 1,
    }));
    addXP(15);
  }, [updateStreak, setProgress, addXP]);

  const recordSentence = useCallback(() => {
    updateStreak();
    setProgress((prev) => ({
      ...prev,
      sentencesBuilt: prev.sentencesBuilt + 1,
    }));
    addXP(20);
  }, [updateStreak, setProgress, addXP]);

  const recordVerbPractice = useCallback(() => {
    updateStreak();
    setProgress((prev) => ({
      ...prev,
      verbsPracticed: prev.verbsPracticed + 1,
    }));
    addXP(15);
  }, [updateStreak, setProgress, addXP]);

  const exploreCategory = useCallback(
    (id: string) => {
      setProgress((prev) => {
        if (prev.categoriesExplored.includes(id)) return prev;
        return {
          ...prev,
          categoriesExplored: [...prev.categoriesExplored, id],
        };
      });
    },
    [setProgress]
  );

  const recordSpeech = useCallback(() => {
    updateStreak();
    setProgress((prev) => ({
      ...prev,
      speechExercises: prev.speechExercises + 1,
    }));
    addXP(20);
  }, [updateStreak, setProgress, addXP]);

  const recordHangman = useCallback(() => {
    updateStreak();
    setProgress((prev) => ({
      ...prev,
      hangmanGames: prev.hangmanGames + 1,
    }));
    addXP(15);
  }, [updateStreak, setProgress, addXP]);

  const recordSpeedRound = useCallback(() => {
    updateStreak();
    setProgress((prev) => ({
      ...prev,
      speedRounds: prev.speedRounds + 1,
    }));
    addXP(15);
  }, [updateStreak, setProgress, addXP]);

  const purchaseReward = useCallback(
    (id: string, cost: number) => {
      if (progress.xp < cost) return false;
      if (progress.purchasedRewards.includes(id)) return false;
      const reward = { id };
      setProgress((prev) => ({
        ...prev,
        xp: prev.xp - cost,
        purchasedRewards: [...prev.purchasedRewards, reward.id],
        streakFreezes:
          id === "streak-freeze"
            ? prev.streakFreezes + 1
            : prev.streakFreezes,
      }));
      return true;
    },
    [progress.xp, progress.purchasedRewards, setProgress]
  );

  const hasPurchased = useCallback(
    (id: string) => {
      return progress.purchasedRewards.includes(id);
    },
    [progress.purchasedRewards]
  );

  const getStreakDays = useCallback(() => {
    return Object.keys(progress.dailyHistory).sort();
  }, [progress.dailyHistory]);

  const completeLesson = useCallback(
    (lessonId: string, heartsRemaining: number) => {
      updateStreak();
      setProgress((prev) => {
        const isNew = !prev.completedLessons.includes(lessonId);
        const currentCrown = prev.lessonCrowns[lessonId] ?? 0;
        const newCrown = Math.min(5, currentCrown + 1);
        const crownGained = newCrown > currentCrown;
        const isPerfect = heartsRemaining === 5;

        if (isNew && isPerfect) {
          showToast({
            type: "xp",
            title: "Perfect Lesson!",
            message: "+10 bonus XP for no mistakes!",
            emoji: "💯",
          });
        }

        if (crownGained && newCrown >= 3) {
          showToast({
            type: "achievement",
            title: `${newCrown} Crowns!`,
            message: `Mastery level ${newCrown} achieved!`,
            emoji: "👑",
          });
        }

        return {
          ...prev,
          completedLessons: isNew
            ? [...prev.completedLessons, lessonId]
            : prev.completedLessons,
          lessonCrowns: { ...prev.lessonCrowns, [lessonId]: newCrown },
          totalCrowns: crownGained ? prev.totalCrowns + 1 : prev.totalCrowns,
        };
      });
    },
    [updateStreak, setProgress]
  );

  const isLessonCompleted = useCallback(
    (lessonId: string) => {
      return progress.completedLessons.includes(lessonId);
    },
    [progress.completedLessons]
  );

  const isLessonUnlocked = useCallback(
    (lessonId: string) => {
      const allLessons = getAllLessons();
      const idx = allLessons.findIndex((l) => l.id === lessonId);
      if (idx === 0) return true;
      if (idx < 0) return false;
      return progress.completedLessons.includes(allLessons[idx - 1].id);
    },
    [progress.completedLessons]
  );

  const getLessonCrown = useCallback(
    (lessonId: string) => {
      return progress.lessonCrowns[lessonId] ?? 0;
    },
    [progress.lessonCrowns]
  );

  const toggleSound = useCallback(() => {
    setProgress((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, [setProgress]);

  const useStreakFreeze = useCallback(() => {
    if (progress.streakFreezes <= 0) return false;
    setProgress((prev) => ({
      ...prev,
      streakFreezes: prev.streakFreezes - 1,
    }));
    return true;
  }, [progress.streakFreezes, setProgress]);

  const recordCombo = useCallback(
    (correct: boolean) => {
      if (correct) {
        setProgress((prev) => {
          const newCombo = prev.currentCombo + 1;
          return {
            ...prev,
            currentCombo: newCombo,
            maxCombo: Math.max(prev.maxCombo, newCombo),
          };
        });
      } else {
        setProgress((prev) => ({ ...prev, currentCombo: 0 }));
      }
    },
    [setProgress]
  );

  const incrementReviewSessions = useCallback(() => {
    updateStreak();
    setProgress((prev) => ({
      ...prev,
      reviewSessions: prev.reviewSessions + 1,
    }));
    addXP(20);
  }, [updateStreak, setProgress, addXP]);

  const completeDailyChallenge = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    setProgress((prev) => ({
      ...prev,
      dailyChallengeDate: today,
      dailyChallengeCompleted: true,
    }));
    addXP(50);
    showToast({
      type: "xp",
      title: "Daily Challenge Complete!",
      message: "+50 bonus XP!",
      emoji: "🎯",
    });
  }, [setProgress, addXP]);

  const isDailyChallengeDone = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    return (
      progress.dailyChallengeDate === today && progress.dailyChallengeCompleted
    );
  }, [progress.dailyChallengeDate, progress.dailyChallengeCompleted]);

  const exportProgress = useCallback(() => {
    return JSON.stringify(progress);
  }, [progress]);

  const importProgress = useCallback(
    (data: string) => {
      try {
        const parsed = JSON.parse(data) as ProgressData;
        setProgress(() => ({
          ...getDefaultProgress(),
          ...parsed,
        }));
        return true;
      } catch {
        return false;
      }
    },
    [setProgress]
  );

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
        addXP,
        getXPForNextLevel,
        getXPProgress,
        getTodayGoal,
        isGoalComplete,
        setDailyGoalTarget,
        updateWordStrength,
        getWordsForReview,
        unlockAchievement,
        getAchievementStats,
        recordMatch,
        recordListening,
        recordTyping,
        recordSentence,
        recordVerbPractice,
        recordSpeech,
        recordHangman,
        recordSpeedRound,
        exploreCategory,
        purchaseReward,
        hasPurchased,
        getStreakDays,
        completeLesson,
        isLessonCompleted,
        isLessonUnlocked,
        getLessonCrown,
        toggleSound,
        useStreakFreeze,
        recordCombo,
        incrementReviewSessions,
        completeDailyChallenge,
        isDailyChallengeDone,
        exportProgress,
        importProgress,
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
