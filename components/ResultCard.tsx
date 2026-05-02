"use client";

import { useEffect, useState } from "react";
import type { DiagnosisResult } from "@/types";

const AXIS_LABELS: Record<string, string> = {
  talent: "才能認知",
  value: "価値変換力",
  business: "事業設計力",
  execution: "実行継続力",
};

// Replace with your actual LINE URL
const LINE_URL = "https://lin.ee/XXgX9O7";

interface Props {
  result: DiagnosisResult;
}

export default function ResultCard({ result }: Props) {
  const [scoresVisible, setScoresVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScoresVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const scoreEntries = Object.entries(result.scores) as [string, number][];

  return (
    <main className="min-h-dvh flex flex-col pb-16 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${result.color}18 0%, transparent 60%)`,
        }}
      />

      <div className="w-full max-w-md mx-auto px-5 pt-10">
        {/* Header */}
        <div className="animate-fade-in-up text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 opacity-30" style={{ background: "var(--gold-primary)" }} />
            <span className="text-xs font-body tracking-[0.25em]" style={{ color: "var(--gold-primary)" }}>
              DIAGNOSIS RESULT
            </span>
            <div className="h-px w-8 opacity-30" style={{ background: "var(--gold-primary)" }} />
          </div>

          {/* Emoji */}
          <div className="text-5xl mb-4">{result.emoji}</div>

          {/* Type title */}
          <h1
            className="font-display mb-1"
            style={{ fontSize: "clamp(1.8rem, 7vw, 2.5rem)", color: "var(--text-primary)" }}
          >
            {result.title}
          </h1>
          <p
            className="font-display italic text-sm tracking-widest"
            style={{ color: result.color }}
          >
            {result.subtitle}
          </p>
        </div>

        <div className="divider-gold mb-8" />

        {/* Score radar */}
        <div className="animate-fade-in-up animate-delay-2 mb-8">
          <h2
            className="text-xs font-body tracking-[0.2em] mb-4"
            style={{ color: "var(--gold-primary)" }}
          >
            4軸スコア
          </h2>
          <div className="space-y-3">
            {scoreEntries.map(([axis, score], i) => (
              <div key={axis}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-body" style={{ color: "var(--text-secondary)" }}>
                    {AXIS_LABELS[axis]}
                  </span>
                  <span
                    className="text-xs font-body font-medium"
                    style={{ color: "var(--gold-primary)" }}
                  >
                    {score}
                  </span>
                </div>
                <div
                  className="w-full h-1"
                  style={{ background: "var(--border-subtle)" }}
                >
                  <div
                    className="score-bar-fill h-full"
                    style={{
                      width: scoresVisible ? `${score}%` : "0%",
                      transitionDelay: `${i * 0.15}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="divider-gold mb-8" />

        {/* Description */}
        <div className="animate-fade-in-up animate-delay-3 mb-6">
          <div className="card-luxury p-5" style={{ borderRadius: "2px" }}>
            <h2
              className="text-xs font-body tracking-[0.2em] mb-3"
              style={{ color: "var(--gold-primary)" }}
            >
              タイプの特徴
            </h2>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)", lineHeight: "1.9" }}
            >
              {result.description}
            </p>
          </div>
        </div>

        {/* Challenge */}
        <div className="animate-fade-in-up animate-delay-4 mb-6">
          <div className="card-luxury p-5" style={{ borderRadius: "2px", borderLeft: "2px solid rgba(201,168,76,0.4)" }}>
            <h2
              className="text-xs font-body tracking-[0.2em] mb-3"
              style={{ color: "var(--gold-primary)" }}
            >
              今の課題
            </h2>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)", lineHeight: "1.9" }}
            >
              {result.challenge}
            </p>
          </div>
        </div>

        {/* Next step */}
        <div className="animate-fade-in-up animate-delay-5 mb-10">
          <div
            className="p-5"
            style={{
              background: `linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.04) 100%)`,
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "2px",
            }}
          >
            <h2
              className="text-xs font-body tracking-[0.2em] mb-3"
              style={{ color: "var(--gold-primary)" }}
            >
              才能を事業に変えるための次の一歩
            </h2>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "var(--text-primary)", lineHeight: "1.9" }}
            >
              {result.nextStep}
            </p>
          </div>
        </div>

        <div className="divider-gold mb-10" />

        {/* LINE CTA */}
        <div className="animate-fade-in-up animate-delay-6 text-center">
          <p
            className="font-display text-lg mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            次のステップを、一緒に。
          </p>
          <p
            className="text-xs font-body leading-relaxed mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            公式LINEでは、あなたのタイプに合わせた
            <br />
            才能事業化のヒントをお届けしています。
          </p>

          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex items-center justify-center gap-3 w-full py-4 tracking-[0.1em] text-sm font-body font-medium mb-3"
            style={{ borderRadius: "2px" }}
          >
            <span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </span>
            <span>公式LINEに登録する（無料）</span>
          </a>

          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            登録無料・いつでも退会可能
          </p>
        </div>

        {/* Bottom spacer */}
        <div className="h-10" />
      </div>
    </main>
  );
}
