"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "才能のパターンを分析中...",
  "価値変換力を計測中...",
  "事業設計スコアを算出中...",
  "あなたのタイプを特定中...",
];

export default function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 700);

    const progInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) {
          clearInterval(progInterval);
          return 95;
        }
        return p + 2;
      });
    }, 55);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
    };
  }, []);

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-5">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="text-center relative">
        {/* Rotating ornament */}
        <div className="mb-10 flex items-center justify-center">
          <div
            className="w-16 h-16 relative"
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              animation: "spin 4s linear infinite",
              transform: "rotate(45deg)",
            }}
          >
            <div
              className="absolute inset-2"
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                animation: "spin 2s linear infinite reverse",
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(calc(45deg + 360deg)); }
          }
        `}</style>

        <h2
          className="font-display mb-2"
          style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}
        >
          診断結果を生成中
        </h2>

        <p
          className="text-sm font-body mb-10 h-5 transition-all duration-500"
          style={{ color: "var(--text-secondary)" }}
        >
          {MESSAGES[msgIndex]}
        </p>

        {/* Progress */}
        <div
          className="w-64 h-px mx-auto mb-2"
          style={{ background: "var(--border-subtle)" }}
        >
          <div
            className="h-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--gold-dark), var(--gold-primary), var(--gold-light))",
              boxShadow: "0 0 8px rgba(201,168,76,0.5)",
              transition: "width 0.1s linear",
            }}
          />
        </div>

        <p
          className="text-xs font-body"
          style={{ color: "var(--text-muted)" }}
        >
          {progress}%
        </p>
      </div>
    </main>
  );
}
