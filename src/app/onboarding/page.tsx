"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";
import { getAllWords } from "@/data/vocabulary";

const placementQuestions = [
  { spanish: "Hola", correct: "Hello", options: ["Hello", "Goodbye", "Thank you", "Please"] },
  { spanish: "Buenos días", correct: "Good morning", options: ["Good night", "Good morning", "Goodbye", "Hello"] },
  { spanish: "Gracias", correct: "Thank you", options: ["Please", "Sorry", "Thank you", "Hello"] },
  { spanish: "Agua", correct: "Water", options: ["Water", "Milk", "Coffee", "Bread"] },
  { spanish: "Perro", correct: "Dog", options: ["Cat", "Dog", "Bird", "Fish"] },
  { spanish: "Rojo", correct: "Red", options: ["Blue", "Green", "Red", "Yellow"] },
  { spanish: "Madre", correct: "Mother", options: ["Father", "Mother", "Sister", "Brother"] },
  { spanish: "Feliz", correct: "Happy", options: ["Happy", "Sad", "Angry", "Tired"] },
  { spanish: "Izquierda", correct: "Left", options: ["Right", "Left", "Straight", "Far"] },
  { spanish: "Libro", correct: "Book", options: ["Book", "Paper", "Pencil", "School"] },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { addXP } = useProgress();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [state, setState] = useState<"question" | "correct" | "wrong">("question");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Step 0: Welcome
  // Step 1-10: Placement questions
  // Step 11: Results

  if (step === 0) {
    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              ¡Bienvenido!
            </span>
          </h1>
          <p className="text-2xl mb-2">Welcome to ¡Aprende!</p>
          <p className="text-gray-400 mb-8">
            Your journey to learning Spanish starts here.
          </p>
          <button
            onClick={() => setStep(1)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg hover:brightness-110 transition-all"
          >
            Start Learning →
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 mt-3 rounded-xl bg-white/5 text-gray-400 font-medium hover:bg-white/10 transition-all"
          >
            Skip to Dashboard
          </button>
        </div>
      </main>
    );
  }

  if (step >= 1 && step <= 10 && !showResult) {
    const q = placementQuestions[step - 1];
    const shuffledOptions = q.options;

    const handleCheck = () => {
      if (!selected) return;
      if (selected === q.correct) {
        setState("correct");
        setScore((s) => s + 1);
      } else {
        setState("wrong");
      }
    };

    const handleNext = () => {
      if (step >= 10) {
        setShowResult(true);
      } else {
        setStep((s) => s + 1);
        setSelected(null);
        setState("question");
      }
    };

    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 w-full">
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm text-gray-400">Placement Test</span>
            <span className="text-sm text-gray-400">{step}/10</span>
          </div>

          <div className="w-full bg-white/10 rounded-full h-2 mb-8">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${(step / 10) * 100}%` }}
            />
          </div>

          <div className="animate-fade-in-up">
            <p className="text-sm text-gray-400 mb-2">Translate this word</p>
            <h2 className="text-3xl font-bold text-white mb-8">{q.spanish}</h2>

            <div className="space-y-3">
              {shuffledOptions.map((option) => {
                let borderStyle = "border-white/10 hover:border-white/30";
                let bgStyle = "bg-white/5 hover:bg-white/10";

                if (state === "correct" && option === q.correct) {
                  borderStyle = "border-emerald-500";
                  bgStyle = "bg-emerald-500/20";
                } else if (state === "wrong") {
                  if (option === q.correct) {
                    borderStyle = "border-emerald-500";
                    bgStyle = "bg-emerald-500/20";
                  } else if (option === selected) {
                    borderStyle = "border-rose-500";
                    bgStyle = "bg-rose-500/20";
                  }
                } else if (selected === option) {
                  borderStyle = "border-indigo-500";
                  bgStyle = "bg-indigo-500/20";
                }

                return (
                  <button
                    key={option}
                    onClick={() => state === "question" && setSelected(option)}
                    disabled={state !== "question"}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${borderStyle} ${bgStyle}`}
                  >
                    <span className="font-medium text-white">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            {state === "question" ? (
              <button
                onClick={handleCheck}
                disabled={!selected}
                className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                  selected
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:brightness-110"
                    : "bg-white/10 text-gray-500 cursor-not-allowed"
                }`}
              >
                Check
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                  state === "correct"
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                    : "bg-gradient-to-r from-rose-500 to-red-500 text-white"
                }`}
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Results
  const level =
    score <= 2
      ? "Beginner"
      : score <= 5
      ? "Elementary"
      : score <= 8
      ? "Intermediate"
      : "Advanced";

  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center animate-bounce-in">
        <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
          <div className="text-5xl mb-4">
            {score >= 8 ? "🌟" : score >= 5 ? "👍" : "🌱"}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Placement Complete!
          </h2>
          <p className="text-gray-400 mb-4">
            You scored {score}/10. Your level:{" "}
            <span className="text-indigo-400 font-bold">{level}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {score <= 2
              ? "Start with the basics — you'll pick it up fast!"
              : score <= 5
              ? "You know some words! Let's build your foundation."
              : score <= 8
              ? "Great foundation! Let's take you further."
              : "Impressive! You're ready for advanced content."}
          </p>
          <button
            onClick={() => {
              addXP(score * 5);
              router.push("/");
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold hover:brightness-110 transition-all"
          >
            Start Learning!
          </button>
        </div>
      </div>
    </main>
  );
}
