"use client";

import { useState, useMemo } from "react";
import { verbs } from "@/data/verbs";
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

interface VerbPracticeProps {
  onComplete: (score: number) => void;
}

interface VerbQuestion {
  verb: string;
  english: string;
  person: string;
  correctAnswer: string;
  options: string[];
}

function generateQuestions(): VerbQuestion[] {
  const questions: VerbQuestion[] = [];
  const shuffledVerbs = shuffleArray(verbs).slice(0, 5);

  for (const verb of shuffledVerbs) {
    const conjugations = shuffleArray(verb.conjugations).slice(0, 2);
    for (const conj of conjugations) {
      const wrongAnswers = shuffleArray(
        verb.conjugations
          .filter((c) => c.spanish !== conj.spanish)
          .map((c) => c.spanish)
      ).slice(0, 3);

      const allOptions = shuffleArray([conj.spanish, ...wrongAnswers]);

      questions.push({
        verb: verb.infinitive,
        english: verb.english,
        person: conj.person,
        correctAnswer: conj.spanish,
        options: allOptions,
      });
    }
  }

  return shuffleArray(questions).slice(0, 10);
}

export function VerbPractice({ onComplete }: VerbPracticeProps) {
  const { recordVerbPractice } = useProgress();
  const questions = useMemo(() => generateQuestions(), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQ = questions[currentIndex];

  function handleAnswer(answer: string) {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentQ.correctAnswer) {
      setScore((s) => s + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      recordVerbPractice();
      onComplete(Math.round((score / questions.length) * 100));
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-lg">
        <div className="text-7xl">{pct >= 75 ? "🔄" : "💪"}</div>
        <h2 className="text-3xl font-bold text-white">Practice Complete!</h2>
        <div className="bg-white/10 rounded-2xl p-8 w-full">
          <p className="text-5xl font-bold text-white mb-2">{pct}%</p>
          <p className="text-gray-300">
            {score} out of {questions.length} correct
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
          className="bg-gradient-to-r from-lime-500 to-green-500 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="bg-white/5 rounded-2xl p-8 w-full text-center border border-white/10">
        <p className="text-sm text-lime-300 mb-2">Conjugate the verb</p>
        <h2 className="text-3xl font-bold text-white mb-1">
          {currentQ.verb}
        </h2>
        <p className="text-gray-400 mb-4">{currentQ.english}</p>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-xl text-white">
            <span className="text-lime-400">{currentQ.person}</span> → ?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {currentQ.options.map((option) => {
          let cls =
            "w-full p-4 rounded-xl font-medium transition-all border text-center ";
          if (showFeedback && option === currentQ.correctAnswer) {
            cls += "bg-emerald-500/30 border-emerald-500 text-emerald-300";
          } else if (
            showFeedback &&
            option === selectedAnswer &&
            option !== currentQ.correctAnswer
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

      {showFeedback && (
        <div className="flex flex-col items-center gap-3 w-full">
          <div
            className={`p-4 rounded-xl w-full text-center ${
              selectedAnswer === currentQ.correctAnswer
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {selectedAnswer === currentQ.correctAnswer
              ? `${currentQ.person} ${currentQ.correctAnswer} is correct!`
              : `Wrong! ${currentQ.person} ${currentQ.correctAnswer}`}
          </div>
          <button
            onClick={() => speakSpanish(`${currentQ.person} ${currentQ.correctAnswer}`)}
            className="text-sky-400 hover:text-sky-300 text-sm flex items-center gap-2"
          >
            🔊 Listen
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
