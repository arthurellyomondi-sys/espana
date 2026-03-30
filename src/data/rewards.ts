export interface Reward {
  id: string;
  name: string;
  description: string;
  emoji: string;
  cost: number;
  type: "theme" | "badge" | "avatar" | "consumable";
  unlocked: boolean;
}

export const rewards: Reward[] = [
  {
    id: "theme-sunset",
    name: "Sunset Theme",
    description: "Warm sunset gradient background",
    emoji: "🌅",
    cost: 200,
    type: "theme",
    unlocked: false,
  },
  {
    id: "theme-ocean",
    name: "Ocean Theme",
    description: "Cool ocean blue gradient",
    emoji: "🌊",
    cost: 200,
    type: "theme",
    unlocked: false,
  },
  {
    id: "theme-forest",
    name: "Forest Theme",
    description: "Lush green forest vibes",
    emoji: "🌲",
    cost: 200,
    type: "theme",
    unlocked: false,
  },
  {
    id: "theme-galaxy",
    name: "Galaxy Theme",
    description: "Deep space purple gradient",
    emoji: "🌌",
    cost: 500,
    type: "theme",
    unlocked: false,
  },
  {
    id: "avatar-cat",
    name: "Cat Avatar",
    description: "A cute cat for your profile",
    emoji: "🐱",
    cost: 100,
    type: "avatar",
    unlocked: false,
  },
  {
    id: "avatar-owl",
    name: "Owl Avatar",
    description: "A wise owl for the studious",
    emoji: "🦉",
    cost: 100,
    type: "avatar",
    unlocked: false,
  },
  {
    id: "avatar-fox",
    name: "Fox Avatar",
    description: "A clever fox avatar",
    emoji: "🦊",
    cost: 100,
    type: "avatar",
    unlocked: false,
  },
  {
    id: "avatar-dragon",
    name: "Dragon Avatar",
    description: "A mighty dragon for champions",
    emoji: "🐉",
    cost: 300,
    type: "avatar",
    unlocked: false,
  },
  {
    id: "badge-star",
    name: "Star Badge",
    description: "A shiny star next to your name",
    emoji: "⭐",
    cost: 150,
    type: "badge",
    unlocked: false,
  },
  {
    id: "badge-crown",
    name: "Crown Badge",
    description: "Royal crown for dedicated learners",
    emoji: "👑",
    cost: 500,
    type: "badge",
    unlocked: false,
  },
  {
    id: "badge-diamond",
    name: "Diamond Badge",
    description: "Rare diamond badge",
    emoji: "💎",
    cost: 1000,
    type: "badge",
    unlocked: false,
  },
  {
    id: "badge-rocket",
    name: "Rocket Badge",
    description: "For fast learners",
    emoji: "🚀",
    cost: 300,
    type: "badge",
    unlocked: false,
  },
  {
    id: "streak-freeze",
    name: "Streak Freeze",
    description: "Protects your streak for one missed day",
    emoji: "🧊",
    cost: 100,
    type: "consumable",
    unlocked: false,
  },
];
