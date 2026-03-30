"use client";

import { useState, useMemo, useCallback } from "react";
import { Word } from "@/data/vocabulary";
import { useProgress } from "@/context/ProgressContext";
import { speakSpanish, playCorrectSound, playWrongSound } from "@/lib/audio";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const HANGMAN_PARTS = [
  // Head
  <circle key="head" cx="150" cy="70" r="15" stroke="white" strokeWidth="3" fill="none" />,
  // Body
  <line key="body" x1="150" y1="85" x2="150" y2="130" stroke="white" strokeWidth="3" />,
  // Left arm
  <line key="larm" x1="150" y1="100" x2="125" y2="120" stroke="white" strokeWidth="3" />,
  // Right arm
  <line key="rarm" x1="150" y1="100" x2="175" y2="120" stroke="white" strokeWidth="3" />,
  // Left leg
  <line key="lleg" x1="150" y1="130" x2="130" y2="160" stroke="white" strokeWidth="3" />,
  // Right leg
  <line key="rleg" x1="150" y1="130" x2="170" y2="160" stroke="white" strokeWidth="3" />,
];

const GALLOW = (
  <>
    <line x1="20" y1="180" x2="180" y2="180" stroke="#555" strokeWidth="3" />
    <line x1="60" y1="180" x2="60" y2="20" stroke="#555" strokeWidth="3" />
    <line x1="60" y1="20" x2="150" y2="20" stroke="#555" strokeWidth="3" />
    <line x1="150" y1="20" x2="150" y2="55" stroke="#555" strokeWidth="3" />
  </>
);

interface HangmanGameProps {
  words: Word[];
  categoryId: string;
  onComplete: (score: number) => void;
}

export function HangmanGame({
  words,
  categoryId,
  onComplete,
}: HangmanGameProps) {
  const { recordHangman, markWordLearned } = useProgress();
  const questions = useMemo(() => shuffleArray(words).slice(0, 5), [words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [won, setWon] = useState<boolean | null>(null);

  const currentWord = questions[currentIndex];
  const wordLetters = useMemo(
    () =>
      new Set(
        currentWord.spanish.toLowerCase().replace(/[^a-záéíóúñü]/g, "").split("")
      ),
    [currentWord.spanish]
  );

  const displayWord = currentWord.spanish
    .split("")
    .map((char) => {
      if (char === " ") return " ";
      if (/[¿?¡!.,]/.test(char)) return char;
      return guessedLetters.has(char.toLowerCase()) ? char : "_";
    })
    .join("");

  const isWon = currentWord.spanish
    .toLowerCase()
    .replace(/[^a-záéíóúñü]/g, "")
    .split("")
    .every((l) => guessedLetters.has(l));

  const isLost = wrongGuesses >= 6;

  const handleGuess = useCallback(
    (letter: string) => {
      if (guessedLetters.has(letter) || isWon || isLost) return;

      const newGuessed = new Set(guessedLetters);
      newGuessed.add(letter);
      setGuessedLetters(newGuessed);

      if (wordLetters.has(letter)) {
        playCorrectSound();
        // Check if won after this guess
        const allFound = currentWord.spanish
          .toLowerCase()
          .replace(/[^a-záéíóúñü]/g, "")
          .split("")
          .every((l) => newGuessed.has(l) || l === letter);
        if (allFound) {
          setScore((s) => s + 1);
          markWordLearned(`${categoryId}:${currentWord.spanish}`);
          setWon(true);
        }
      } else {
        playWrongSound();
        const newWrong = wrongGuesses + 1;
        setWrongGuesses(newWrong);
        if (newWrong >= 6) {
          setWon(false);
        }
      }
    },
    [guessedLetters, wordLetters, currentWord, wrongGuesses, isWon, isLost, categoryId, markWordLearned]
  );

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      recordHangman();
      onComplete(Math.round((score / questions.length) * 100));
    } else {
      setCurrentIndex((i) => i + 1);
      setGuessedLetters(new Set());
      setWrongGuesses(0);
      setWon(null);
    }
  }

  const alphabet = "abcdefghijklmnñopqrstuvwxyz".split("");

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-lg">
        <div className="text-7xl">{pct >= 60 ? "🎯" : "💪"}</div>
        <h2 className="text-3xl font-bold text-white">Hangman Complete!</h2>
        <div className="bg-white/10 rounded-2xl p-8 w-full">
          <p className="text-5xl font-bold text-white mb-2">{pct}%</p>
          <p className="text-gray-300">
            {score} out of {questions.length} words guessed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="w-full flex justify-between items-center text-sm text-gray-400">
        <span>
          Word {currentIndex + 1} of {questions.length}
        </span>
        <span>
          Score: {score}/{currentIndex}
        </span>
      </div>

      {/* Hint */}
      <div className="bg-white/5 rounded-xl p-3 w-full text-center border border-white/10">
        <p className="text-sm text-gray-400">Hint: {currentWord.english}</p>
      </div>

      {/* Hangman drawing */}
      <svg viewBox="0 0 200 200" className="w-48 h-48">
        {GALLOW}
        {HANGMAN_PARTS.slice(0, wrongGuesses)}
      </svg>

      {/* Word display */}
      <div className="text-3xl font-mono font-bold tracking-[0.3em] text-white text-center">
        {displayWord}
      </div>

      {/* Keyboard */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {alphabet.map((letter) => {
          const wasGuessed = guessedLetters.has(letter);
          const isCorrect = wasGuessed && wordLetters.has(letter);
          const isWrong = wasGuessed && !wordLetters.has(letter);

          return (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={wasGuessed || isWon !== null}
              className={`w-9 h-9 rounded-lg text-sm font-bold uppercase transition-colors ${
                isCorrect
                  ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500"
                  : isWrong
                    ? "bg-red-500/20 text-red-400/50 border border-red-500/30"
                    : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {(won !== null || isLost) && (
        <div className="flex flex-col items-center gap-3 w-full">
          <div
            className={`p-4 rounded-xl w-full text-center ${
              won
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {won
              ? `You got it! "${currentWord.spanish}"`
              : `The word was: "${currentWord.spanish}"`}
          </div>
          <button
            onClick={() => speakSpanish(currentWord.spanish)}
            className="text-sky-400 hover:text-sky-300 text-sm flex items-center gap-2"
          >
            🔊 Hear it
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
          >
            {currentIndex + 1 >= questions.length ? "See Results" : "Next Word"}
          </button>
        </div>
      )}
    </div>
  );
}
