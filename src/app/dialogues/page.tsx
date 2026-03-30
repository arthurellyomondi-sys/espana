"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { dialogues, getDialogueById } from "@/data/dialogues";
import type { Dialogue, DialogueStep, DialogueLine } from "@/data/dialogues";
import { useProgress } from "@/context/ProgressContext";
import { speakSpanish, playCorrectSound, playWrongSound, playSuccessSound } from "@/lib/audio";

type Mode = "list" | "playing";

interface ChatMessage {
  speaker: "npc" | "user";
  text: string;
  english: string;
  type: "line" | "correct" | "wrong";
}

export default function DialoguesPage() {
  const { addXP } = useProgress();
  const [mode, setMode] = useState<Mode>("list");
  const [activeDialogue, setActiveDialogue] = useState<Dialogue | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [showChoices, setShowChoices] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showingWrong, setShowingWrong] = useState(false);
  const [completed, setCompleted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, showChoices]);

  function startDialogue(id: string) {
    const d = getDialogueById(id);
    if (!d) return;
    setActiveDialogue(d);
    setCurrentStep(0);
    setChat([]);
    setShowChoices(false);
    setSelectedChoice(null);
    setShowingWrong(false);
    setCompleted(false);
    setMode("playing");

    const firstStep = d.steps[0];
    if (firstStep.line) {
      setChat([{
        speaker: firstStep.line.speaker,
        text: firstStep.line.text,
        english: firstStep.line.english,
        type: "line",
      }]);
      setShowChoices(false);
    } else if (firstStep.choices) {
      setShowChoices(true);
    }
  }

  function advanceStep() {
    if (!activeDialogue) return;
    const nextIdx = currentStep + 1;
    if (nextIdx >= activeDialogue.steps.length) {
      setCompleted(true);
      addXP(activeDialogue.xpReward);
      playSuccessSound();
      return;
    }
    setCurrentStep(nextIdx);
    setShowChoices(false);
    setSelectedChoice(null);
    setShowingWrong(false);

    const step = activeDialogue.steps[nextIdx];
    if (step.line) {
      setChat((prev) => [...prev, {
        speaker: step.line!.speaker,
        text: step.line!.text,
        english: step.line!.english,
        type: "line",
      }]);
      setTimeout(() => advanceStep(), 400);
    } else if (step.choices) {
      setShowChoices(true);
    }
  }

  function handleChoice(choiceIdx: number) {
    if (selectedChoice !== null || showingWrong || !activeDialogue) return;
    const step = activeDialogue.steps[currentStep];
    if (!step.choices) return;

    const choice = step.choices[choiceIdx];
    setSelectedChoice(choiceIdx);

    setChat((prev) => [...prev, {
      speaker: "user",
      text: choice.text,
      english: choice.english,
      type: "line",
    }]);

    if (choice.correct) {
      playCorrectSound();
      if (step.correctResponse) {
        setTimeout(() => {
          setChat((prev) => [...prev, {
            speaker: step.correctResponse!.speaker,
            text: step.correctResponse!.text,
            english: step.correctResponse!.english,
            type: "correct",
          }]);
          setTimeout(() => advanceStep(), 600);
        }, 300);
      } else {
        setTimeout(() => advanceStep(), 300);
      }
    } else {
      playWrongSound();
      if (step.wrongResponse) {
        setShowingWrong(true);
        setChat((prev) => [...prev, {
          speaker: step.wrongResponse!.speaker,
          text: step.wrongResponse!.text,
          english: step.wrongResponse!.english,
          type: "wrong",
        }]);
        setTimeout(() => {
          setChat((prev) => {
            const filtered = prev.filter((m) => m.type !== "wrong");
            if (step.correctResponse) {
              return [...filtered, {
                speaker: step.correctResponse!.speaker,
                text: step.correctResponse!.text,
                english: step.correctResponse!.english,
                type: "correct",
              }];
            }
            return filtered;
          });
          setShowingWrong(false);
          setSelectedChoice(null);
          setTimeout(() => advanceStep(), 400);
        }, 1200);
      } else {
        setTimeout(() => advanceStep(), 300);
      }
    }
  }

  function goBack() {
    setMode("list");
    setActiveDialogue(null);
    setChat([]);
    setCurrentStep(0);
    setCompleted(false);
    setShowChoices(false);
    setSelectedChoice(null);
    setShowingWrong(false);
  }

  if (mode === "list") {
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
            <h1 className="text-xl font-bold text-white">💬 Dialogues</h1>
            <div />
          </div>
          <p className="text-gray-400 mb-8 text-center">
            Practice real-world Spanish conversations.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {dialogues.map((d) => (
              <button
                key={d.id}
                onClick={() => startDialogue(d.id)}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 text-left hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{d.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{d.title}</h3>
                    <p className="text-sm text-gray-400">{d.scenario}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-emerald-400 font-medium">+{d.xpReward} XP</span>
                      <span className="text-xs text-gray-500">{d.steps.length} steps</span>
                    </div>
                  </div>
                  <span className="text-gray-500">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const currentStepData = activeDialogue?.steps[currentStep];
  const totalSteps = activeDialogue?.steps.length ?? 0;
  const choiceSteps = activeDialogue?.steps.filter((s) => s.choices).length ?? 0;
  const answeredChoices = activeDialogue?.steps
    .slice(0, currentStep)
    .filter((s) => s.choices).length ?? 0;

  return (
    <main className="min-h-screen bg-neutral-950">
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col h-screen max-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <button
            onClick={goBack}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            {activeDialogue?.emoji} {activeDialogue?.title}
          </h1>
          <div />
        </div>

        {/* Progress */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
            <span>Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}</span>
            {choiceSteps > 0 && <span>{answeredChoices}/{choiceSteps} responses</span>}
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Completion screen */}
        {completed && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">Dialogue Complete!</h2>
              <p className="text-emerald-400 text-lg font-bold mb-1">+{activeDialogue?.xpReward} XP</p>
              <p className="text-gray-400 mb-6">You completed the conversation.</p>
              <button
                onClick={goBack}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors"
              >
                Back to Dialogues
              </button>
            </div>
          </div>
        )}

        {/* Chat area */}
        {!completed && (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.speaker === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.speaker === "user" ? "flex-row-reverse" : ""}`}>
                    <span className="text-lg flex-shrink-0 mt-1">
                      {msg.speaker === "npc" ? "🤖" : "🧑"}
                    </span>
                    <div
                      className={`rounded-2xl px-4 py-2.5 ${
                        msg.speaker === "npc"
                          ? msg.type === "correct"
                            ? "bg-emerald-500/20 border border-emerald-500/30"
                            : msg.type === "wrong"
                            ? "bg-red-500/20 border border-red-500/30"
                            : "bg-white/5 border border-white/10"
                          : "bg-blue-600/30 border border-blue-500/30"
                      }`}
                    >
                      <p className="text-white text-sm font-medium">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.type === "correct"
                          ? "text-emerald-400"
                          : msg.type === "wrong"
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}>
                        {msg.english}
                        {msg.type === "correct" && " ✓"}
                        {msg.type === "wrong" && " ✗"}
                      </p>
                    </div>
                    <button
                      onClick={() => speakSpanish(msg.text)}
                      className="text-gray-500 hover:text-white transition-colors flex-shrink-0 mt-1"
                      title="Listen"
                    >
                      🔊
                    </button>
                  </div>
                </div>
              ))}

              {/* Choice buttons */}
              {showChoices && !selectedChoice && !showingWrong && currentStepData?.choices && (
                <div className="space-y-2 mt-2">
                  {currentStepData.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(idx)}
                      className="w-full text-left rounded-xl bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10 transition-colors group"
                    >
                      <p className="text-white text-sm font-medium">{choice.text}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{choice.english}</p>
                    </button>
                  ))}
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
