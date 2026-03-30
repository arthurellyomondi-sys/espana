"use client";

import Link from "next/link";
import { rewards } from "@/data/rewards";
import { useProgress } from "@/context/ProgressContext";

export default function RewardsPage() {
  const { progress, purchaseReward, hasPurchased } = useProgress();

  const themes = rewards.filter((r) => r.type === "theme");
  const avatars = rewards.filter((r) => r.type === "avatar");
  const badges = rewards.filter((r) => r.type === "badge");

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Home</span>
          </Link>
          <h1 className="text-xl font-bold text-white">🎁 Rewards Shop</h1>
          <div />
        </div>

        {/* XP Balance */}
        <div className="bg-gradient-to-br from-amber-600/20 to-yellow-600/20 rounded-2xl p-6 mb-8 border border-amber-500/20 text-center">
          <p className="text-amber-300 text-sm mb-1">Your Balance</p>
          <p className="text-4xl font-bold text-amber-400">{progress.xp} XP</p>
        </div>

        <RewardSection title="🎨 Themes" items={themes} progress={progress} hasPurchased={hasPurchased} purchaseReward={purchaseReward} />
        <RewardSection title="👤 Avatars" items={avatars} progress={progress} hasPurchased={hasPurchased} purchaseReward={purchaseReward} />
        <RewardSection title="🏅 Badges" items={badges} progress={progress} hasPurchased={hasPurchased} purchaseReward={purchaseReward} />
      </div>
    </main>
  );
}

function RewardSection({
  title,
  items,
  progress,
  hasPurchased,
  purchaseReward,
}: {
  title: string;
  items: typeof rewards;
  progress: { xp: number };
  hasPurchased: (id: string) => boolean;
  purchaseReward: (id: string, cost: number) => boolean;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((reward) => {
          const owned = hasPurchased(reward.id);
          const canAfford = progress.xp >= reward.cost;

          return (
            <div
              key={reward.id}
              className={`rounded-xl border p-4 ${
                owned
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="text-center">
                <span className={`text-4xl block mb-2 ${owned ? "" : "grayscale opacity-60"}`}>
                  {reward.emoji}
                </span>
                <h3 className="font-bold text-white text-sm mb-1">
                  {reward.name}
                </h3>
                <p className="text-xs text-gray-400 mb-3">
                  {reward.description}
                </p>
                {owned ? (
                  <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-3 py-1 rounded-full">
                    Owned
                  </span>
                ) : (
                  <button
                    onClick={() => purchaseReward(reward.id, reward.cost)}
                    disabled={!canAfford}
                    className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                      canAfford
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-white/5 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {reward.cost} XP
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
