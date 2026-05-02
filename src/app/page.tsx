"use client";

import { useState } from "react";
import DiagnosisFlow from "@/components/DiagnosisFlow";

export default function Home() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <DiagnosisFlow />;
  }

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-5 py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }}
      />

      {/* Corner ornaments */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l opacity-30"
        style={{ borderColor: "var(--gold-primary)" }} />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r opacity-30"
        style={{ borderColor: "var(--gold-primary)" }} />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l opacity-30"
        style={{ borderColor: "var(--gold-primary)" }} />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r opacity-30"
        style={{ borderColor: "var(--gold-primary)" }} />

      <div className="w-full max-w-md text-center relative">
        {/* Label */}
        <div className="animate-fade-in-up animate-delay-1 flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-10 opacity-40" style={{ background: "var(--gold-primary)" }} />
          <span
            className="text-xs font-body tracking-[0.25em] uppercase"
            style={{ color: "var(--gold-primary)" }}
          >
            Free Diagnosis
          </span>
          <div className="h-px w-10 opacity-40" style={{ background: "var(--gold-primary)" }} />
        </div>

        {/* Main title */}
        <h1
          className="animate-fade-in-up animate-delay-2 font-display leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 8vw, 3rem)", color: "var(--text-primary)" }}
        >
          才能を
          <br />
          <span className="gold-text">事業に変える</span>
          <br />
          無料診断
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up animate-delay-3 font-body text-sm leading-relaxed mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          あなたの中に眠る才能は、
          <br />
          事業になる可能性を秘めています。
          <br />
          4つの軸・全20問の診断で
          <br />
          今のステージと次の一歩を明らかにします。
        </p>

        {/* 4 axes */}
        <div className="animate-fade-in-up animate-delay-4 grid grid-cols-2 gap-2 mb-10">
          {[
            { label: "才能認知", desc: "自己の強みの把握" },
            { label: "価値変換力", desc: "才能を価値に変える力" },
            { label: "事業設計力", desc: "収益化の設計力" },
            { label: "実行継続力", desc: "行動し続ける力" },
          ].map((axis) => (
            <div
              key={axis.label}
              className="card-luxury px-3 py-3 text-left"
              style={{ borderRadius: "2px" }}
            >
              <div
                className="text-xs font-body tracking-wide mb-0.5"
                style={{ color: "var(--gold-primary)" }}
              >
                {axis.label}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {axis.desc}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up animate-delay-5 space-y-4">
          <button
            onClick={() => setStarted(true)}
            className="btn-gold w-full py-4 tracking-[0.15em] text-sm font-body font-medium"
            style={{ borderRadius: "2px" }}
          >
            <span>診断をはじめる（無料）</span>
          </button>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            所要時間：約3〜5分 ／ 全20問
          </p>
        </div>

        {/* Footer note */}
        <div className="animate-fade-in-up animate-delay-6 mt-12 divider-gold" />
        <p className="animate-fade-in-up animate-delay-6 mt-6 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          個人起業家・フリーランス・副業起業を考えるすべての方へ
        </p>
      </div>
    </main>
  );
}
