export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  check: (stats: AchievementStats) => boolean;
}

export interface AchievementStats {
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
}

export const achievements: Achievement[] = [
  {
    id: "first-word",
    name: "First Steps",
    description: "Learn your first word",
    emoji: "👶",
    check: (s) => s.learnedWords >= 1,
  },
  {
    id: "ten-words",
    name: "Getting Started",
    description: "Learn 10 words",
    emoji: "📖",
    check: (s) => s.learnedWords >= 10,
  },
  {
    id: "fifty-words",
    name: "Word Collector",
    description: "Learn 50 words",
    emoji: "📚",
    check: (s) => s.learnedWords >= 50,
  },
  {
    id: "hundred-words",
    name: "Vocabulary Master",
    description: "Learn 100 words",
    emoji: "🎓",
    check: (s) => s.learnedWords >= 100,
  },
  {
    id: "first-quiz",
    name: "Quiz Taker",
    description: "Complete your first quiz",
    emoji: "📝",
    check: (s) => s.totalQuizzesTaken >= 1,
  },
  {
    id: "ten-quizzes",
    name: "Quiz Enthusiast",
    description: "Complete 10 quizzes",
    emoji: "🧠",
    check: (s) => s.totalQuizzesTaken >= 10,
  },
  {
    id: "perfect-quiz",
    name: "Perfectionist",
    description: "Get a 100% on a quiz",
    emoji: "🏆",
    check: (s) => s.perfectQuizzes >= 1,
  },
  {
    id: "streak-3",
    name: "On a Roll",
    description: "Maintain a 3-day streak",
    emoji: "🔥",
    check: (s) => s.bestStreak >= 3,
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    emoji: "⚡",
    check: (s) => s.bestStreak >= 7,
  },
  {
    id: "streak-30",
    name: "Unstoppable",
    description: "Maintain a 30-day streak",
    emoji: "💎",
    check: (s) => s.bestStreak >= 30,
  },
  {
    id: "level-5",
    name: "Rising Star",
    description: "Reach level 5",
    emoji: "⭐",
    check: (s) => s.level >= 5,
  },
  {
    id: "level-10",
    name: "Dedicated Learner",
    description: "Reach level 10",
    emoji: "🌟",
    check: (s) => s.level >= 10,
  },
  {
    id: "xp-1000",
    name: "XP Hunter",
    description: "Earn 1000 XP",
    emoji: "💰",
    check: (s) => s.totalXP >= 1000,
  },
  {
    id: "all-categories",
    name: "Explorer",
    description: "Try all 12 categories",
    emoji: "🌍",
    check: (s) => s.categoriesExplored >= 12,
  },
  {
    id: "matching-master",
    name: "Match Maker",
    description: "Play 5 matching games",
    emoji: "🃏",
    check: (s) => s.matchesPlayed >= 5,
  },
  {
    id: "listener",
    name: "Good Listener",
    description: "Complete 10 listening exercises",
    emoji: "👂",
    check: (s) => s.listeningExercises >= 10,
  },
  {
    id: "typist",
    name: "Speed Typer",
    description: "Complete 10 typing exercises",
    emoji: "⌨️",
    check: (s) => s.typingExercises >= 10,
  },
  {
    id: "sentence-builder",
    name: "Sentence Architect",
    description: "Build 10 sentences",
    emoji: "🏗️",
    check: (s) => s.sentencesBuilt >= 10,
  },
  {
    id: "verb-master",
    name: "Conjugation Pro",
    description: "Practice all verbs",
    emoji: "🔄",
    check: (s) => s.verbsPracticed >= 10,
  },
];

export function checkNewAchievements(
  unlockedIds: string[],
  stats: AchievementStats
): Achievement[] {
  return achievements.filter(
    (a) => !unlockedIds.includes(a.id) && a.check(stats)
  );
}
