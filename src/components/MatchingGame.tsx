"use client";

import { useState, useEffect, useCallback } from "react";
import { Word } from "@/data/vocabulary";
import { useProgress } from "@/context/ProgressContext";
import { playCorrectSound, playWrongSound, playFlipSound } from "@/lib/audio";

interface Card {
  id: string;
  content: string;
  pairId: string;
  flipped: boolean;
  matched: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createCards(words: Word[]): Card[] {
  const selected = shuffleArray(words).slice(0, 6);
  const cards: Card[] = [];
  selected.forEach((word, i) => {
    cards.push({
      id: `es-${i}`,
      content: word.spanish,
      pairId: `pair-${i}`,
      flipped: false,
      matched: false,
    });
    cards.push({
      id: `en-${i}`,
      content: word.english,
      pairId: `pair-${i}`,
      flipped: false,
      matched: false,
    });
  });
  return shuffleArray(cards);
}

interface MatchingGameProps {
  words: Word[];
  onComplete: (score: number, time: number) => void;
}

export function MatchingGame({ words, onComplete }: MatchingGameProps) {
  const { recordMatch } = useProgress();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [complete, setComplete] = useState(false);
  const [checking, setChecking] = useState(false);
  const totalPairs = 6;

  useEffect(() => {
    setCards(createCards(words));
  }, [words]);

  useEffect(() => {
    if (complete) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, complete]);

  const handleCardClick = useCallback(
    (cardId: string) => {
      if (checking) return;
      const card = cards.find((c) => c.id === cardId);
      if (!card || card.flipped || card.matched) return;

      playFlipSound();
      const newFlipped = [...flippedCards, cardId];
      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, flipped: true } : c))
      );
      setFlippedCards(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setChecking(true);
        const [firstId, secondId] = newFlipped;
        const first = cards.find((c) => c.id === firstId)!;
        const second = cards.find((c) => c.id === secondId)!;

        if (first.pairId === second.pairId) {
          playCorrectSound();
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.pairId === first.pairId ? { ...c, matched: true } : c
              )
            );
            const newMatched = matchedPairs + 1;
            setMatchedPairs(newMatched);
            setFlippedCards([]);
            setChecking(false);

            if (newMatched === totalPairs) {
              setComplete(true);
              const timeBonus = Math.max(0, 100 - elapsed);
              const moveBonus = Math.max(0, 100 - moves * 5);
              const score = Math.round((timeBonus + moveBonus) / 2);
              recordMatch();
              onComplete(score, elapsed);
            }
          }, 500);
        } else {
          playWrongSound();
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, flipped: false }
                  : c
              )
            );
            setFlippedCards([]);
            setChecking(false);
          }, 800);
        }
      }
    },
    [
      cards,
      flippedCards,
      matchedPairs,
      moves,
      elapsed,
      checking,
      onComplete,
      recordMatch,
    ]
  );

  function handleRestart() {
    setCards(createCards(words));
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setComplete(false);
    setChecking(false);
  }

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  if (complete) {
    const timeBonus = Math.max(0, 100 - elapsed);
    const moveBonus = Math.max(0, 100 - moves * 5);
    const score = Math.round((timeBonus + moveBonus) / 2);
    return (
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-lg">
        <div className="text-7xl animate-bounce-in">🎉</div>
        <h2 className="text-3xl font-bold text-white">Complete!</h2>
        <div className="bg-white/10 rounded-2xl p-6 w-full grid grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold text-white">{score}</div>
            <div className="text-xs text-gray-400">Score</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{moves}</div>
            <div className="text-xs text-gray-400">Moves</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-400">Time</div>
          </div>
        </div>
        <button
          onClick={handleRestart}
          className="px-8 py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="w-full flex justify-between items-center text-sm text-gray-400">
        <span>Moves: {moves}</span>
        <span>
          Pairs: {matchedPairs}/{totalPairs}
        </span>
        <span>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.matched || card.flipped || checking}
            className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 p-2 ${
              card.matched
                ? "bg-emerald-500/30 border border-emerald-500/50 text-emerald-300"
                : card.flipped
                  ? "bg-indigo-500/30 border border-indigo-500/50 text-white"
                  : "bg-white/10 border border-white/10 text-white hover:bg-white/20 cursor-pointer"
            }`}
          >
            {card.flipped || card.matched ? card.content : "?"}
          </button>
        ))}
      </div>
    </div>
  );
}
