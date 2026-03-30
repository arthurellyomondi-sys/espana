"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Word } from "@/data/vocabulary";
import { useProgress } from "@/context/ProgressContext";
import { speakSpanish, playCorrectSound, playWrongSound } from "@/lib/audio";

interface SpeechRecognitionProps {
  words: Word[];
  categoryId: string;
  onComplete: (score: number) => void;
}

// Web Speech API type declarations
interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  0: SpeechRecognitionResultItem;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function normalizeSpanish(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .trim();
}

function similarity(a: string, b: string): number {
  const normA = normalizeSpanish(a);
  const normB = normalizeSpanish(b);

  if (normA === normB) return 100;

  // Levenshtein-based similarity
  const matrix: number[][] = [];
  for (let i = 0; i <= normA.length; i++) {
    matrix[i] = [i];
    for (let j = 1; j <= normB.length; j++) {
      if (i === 0) {
        matrix[i][j] = j;
      } else {
        const cost = normA[i - 1] === normB[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
  }

  const distance = matrix[normA.length][normB.length];
  const maxLen = Math.max(normA.length, normB.length);
  return maxLen === 0 ? 100 : Math.round(((maxLen - distance) / maxLen) * 100);
}

export function SpeechRecognitionGame({
  words,
  categoryId,
  onComplete,
}: SpeechRecognitionProps) {
  const { recordSpeech, markWordLearned } = useProgress();
  const questions = useState(() => shuffleArray(words).slice(0, 6))[0];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const [speechSupported] = useState(() => {
    if (typeof window === "undefined") return true;
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance })
        .webkitSpeechRecognition;
    return !!SpeechRecognition;
  });

  const currentWord = questions[currentIndex];

  const startListening = useCallback(() => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance })
        .webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      const score = similarity(result, currentWord.spanish);
      setMatchScore(score);
      setShowFeedback(true);
      setIsListening(false);

      if (score >= 70) {
        setScore((s) => s + 1);
        playCorrectSound();
        markWordLearned(`${categoryId}:${currentWord.spanish}`);
      } else {
        playWrongSound();
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [currentWord, categoryId, markWordLearned]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      recordSpeech();
      onComplete(Math.round((score / questions.length) * 100));
    } else {
      setCurrentIndex((i) => i + 1);
      setTranscript("");
      setShowFeedback(false);
      setMatchScore(0);
    }
  }

  if (!speechSupported) {
    return (
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-lg">
        <div className="text-7xl">🎤</div>
        <h2 className="text-2xl font-bold text-white">Speech Not Supported</h2>
        <p className="text-gray-400">
          Speech recognition requires a modern browser (Chrome, Edge, or Safari).
          Try the Listening or Typing mode instead!
        </p>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-lg">
        <div className="text-7xl">{pct >= 70 ? "🎤" : "💪"}</div>
        <h2 className="text-3xl font-bold text-white">Speaking Complete!</h2>
        <div className="bg-white/10 rounded-2xl p-8 w-full">
          <p className="text-5xl font-bold text-white mb-2">{pct}%</p>
          <p className="text-gray-300">
            {score} out of {questions.length} correctly spoken
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="w-full flex justify-between items-center text-sm text-gray-400">
        <span>
          {currentIndex + 1} of {questions.length}
        </span>
        <span>
          Score: {score}/{currentIndex}
        </span>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-rose-500 to-red-500 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="bg-white/5 rounded-2xl p-8 w-full text-center border border-white/10">
        <p className="text-sm text-rose-300 mb-2">
          Say this word in Spanish
        </p>
        <h2 className="text-4xl font-bold text-white mb-2">
          {currentWord.english}
        </h2>
        <p className="text-gray-400">
          {currentWord.pronunciation}
        </p>
      </div>

      <button
        onClick={isListening ? stopListening : startListening}
        disabled={showFeedback}
        className={`w-24 h-24 rounded-full text-4xl transition-all shadow-lg ${
          isListening
            ? "bg-red-500 animate-pulse scale-110"
            : "bg-gradient-to-br from-rose-500 to-red-600 hover:scale-105"
        }`}
      >
        {isListening ? "⏹️" : "🎤"}
      </button>

      {isListening && (
        <p className="text-rose-400 animate-pulse">Listening...</p>
      )}

      {showFeedback && (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="bg-white/5 rounded-xl p-4 w-full text-center">
            <p className="text-sm text-gray-400 mb-1">You said:</p>
            <p className="text-lg text-white italic">
              &ldquo;{transcript || "(no speech detected)"}&rdquo;
            </p>
          </div>
          <div
            className={`p-4 rounded-xl w-full text-center ${
              matchScore >= 70
                ? "bg-emerald-500/20 text-emerald-300"
                : matchScore >= 40
                  ? "bg-amber-500/20 text-amber-300"
                  : "bg-red-500/20 text-red-300"
            }`}
          >
            <p className="text-2xl font-bold mb-1">{matchScore}% match</p>
            <p className="text-sm">
              {matchScore >= 70
                ? "Great pronunciation!"
                : matchScore >= 40
                  ? "Almost there, keep practicing!"
                  : `Try again! Say: "${currentWord.spanish}"`}
            </p>
          </div>
          <button
            onClick={() => speakSpanish(currentWord.spanish)}
            className="text-sky-400 hover:text-sky-300 text-sm flex items-center gap-2"
          >
            🔊 Hear correct pronunciation
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
          >
            {currentIndex + 1 >= questions.length ? "See Results" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
