"use client";

import { useState } from "react";
import type { Question } from "@/types";

const AXIS_LABELS: Record<string, string> = {
  talent: "才能認知",
  value: "価値変換力",
  business: "事業設計力",
  execution: "実行継続力",
};

const SCALE_LABELS = [
  { value: 1, label: "全くそう思わない" },
  { value: 2, label: "あまり思わない" },
  { value: 3, label: "どちらでもない" },
  { value: 4, label: "そう思う" },
  { value: 5, label: "強くそう思う" },
];

interface Props {
  question: Question;
  questionNumber: number;
  selectedValue?: number;
  onAnswer: (value: number) => void;
}

export default function QuestionCard({ question, questionNumber, selectedValue, onAnswer }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="animate-fade-in-up flex-1">
      {/* Axis label */}
      <div className="flex items-center gap-2 mb-5">
        <div
          className="text-xs font-body tracking-[0.2em]"
          style={{ color: "var(--gold-primary)" }}
        >
          {AXIS_LABELS[question.axis]}
        </div>
        <div className="h-px flex-1 opacity-20" style={{ background: "var(--gold-primary)" }} />
      </div>

      {/* Question text */}
      <div className="card-luxury p-6 mb-8" style={{ borderRadius: "2px" }}>
        <p
          className="font-display leading-relaxed"
          style={{
            fontSize: "clamp(1rem, 4vw, 1.2rem)",
            color: "var(--text-primary)",
            lineHeight: "1.8",
          }}
        >
          {question.text}
        </p>
      </div>

      {/* Scale options */}
      <div className="space-y-2.5">
        {SCALE_LABELS.map(({ value, label }) => {
          const isSelected = selectedValue === value;
          const isHovered = hovered === value;

          return (
            <button
              key={value}
              onClick={() => onAnswer(value)}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(null)}
              className={`answer-option w-full px-4 py-3.5 flex items-center gap-4 text-left ${
                isSelected ? "selected" : ""
              }`}
              style={{ borderRadius: "2px" }}
            >
              {/* Number indicator */}
              <div
                className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-xs font-body transition-all duration-200"
                style={{
                  border: `1px solid ${isSelected || isHovered ? "var(--gold-primary)" : "var(--border-subtle)"}`,
                  color: isSelected || isHovered ? "var(--gold-primary)" : "var(--text-muted)",
                  background: isSelected ? "rgba(201,168,76,0.12)" : "transparent",
                }}
              >
                {value}
              </div>

              {/* Label */}
              <span
                className="text-sm font-body tracking-wide transition-colors duration-200"
                style={{
                  color: isSelected
                    ? "var(--text-primary)"
                    : isHovered
                    ? "var(--text-secondary)"
                    : "var(--text-secondary)",
                }}
              >
                {label}
              </span>

              {/* Selected checkmark */}
              {isSelected && (
                <div className="ml-auto" style={{ color: "var(--gold-primary)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7L5.5 10.5L12 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Scale hint */}
      <div className="flex justify-between mt-3 px-1">
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>← 当てはまらない</span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>当てはまる →</span>
      </div>
    </div>
  );
}
