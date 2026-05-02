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
  const progress = (currentIndex / questions.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
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
      <div className="w-full max-w-md mx-auto flex flex-col flex-1">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-body tracking-[0.2em] text-yellow-600">
              DIAGNOSIS
            </div>
            <div className="text-xs font-body text-gray-500">
              {currentIndex + 1} / {questions.length}
            </div>
          </div>

          <div className="w-full h-px bg-gray-200">
            <div
              className="h-px bg-yellow-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <QuestionCard
          key={currentIndex}
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          selectedValue={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
        />

        {currentIndex > 0 && (
          <button
            onClick={handleBack}
            className="mt-6 text-xs font-body tracking-wide self-start text-gray-500"
          >
            ← 前の質問に戻る
          </button>
        )}
      </div>
    </main>
  );
}
