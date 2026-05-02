"use client";

import { useState } from "react";
import { questions, calculateScores, getResult } from "@/lib/diagnosis";
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";
import LoadingScreen from "./LoadingScreen";
import type { DiagnosisResult } from "@/types";

type Phase = "quiz" | "loading" | "result";

export default function DiagnosisFlow() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate result
      setPhase("loading");
      setTimeout(() => {
        const scores = calculateScores(newAnswers);
        const diagResult = getResult(scores);
        setResult(diagResult);
        setPhase("result");
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (phase === "loading") {
    return <LoadingScreen />;
  }

  if (phase === "result" && result) {
    return <ResultCard result={result} />;
  }

  return (
    <main className="min-h-dvh flex flex-col px-5 pt-8 pb-10 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="w-full max-w-md mx-auto flex flex-col flex-1">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-body tracking-[0.2em]" style={{ color: "var(--gold-primary)" }}>
              DIAGNOSIS
            </div>
            <div className="text-xs font-body" style={{ color: "var(--text-muted)" }}>
              {currentIndex + 1} / {questions.length}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-px" style={{ background: "var(--border-subtle)" }}>
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <QuestionCard
          key={currentIndex}
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          selectedValue={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
        />

        {/* Back button */}
        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            className="mt-6 text-xs font-body tracking-wide self-start"
            style={{ color: "var(--text-muted)" }}
          >
            ← 前の質問に戻る
          </button>
        )}
      </div>
    </main>
  );
}
