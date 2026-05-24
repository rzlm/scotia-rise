import { Shield, TrendingUp, BookOpen, ChevronRight } from "lucide-react";
import type { ScreenProps } from "../types";
import { BrandMark } from "./common/BrandMark";

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Start with $25/month",
    desc: "No minimums, no pressure. Grow at your own pace.",
  },
  {
    icon: BookOpen,
    title: "Learn while you invest",
    desc: "Guidance appears exactly when you need it.",
  },
  {
    icon: Shield,
    title: "Protected & regulated",
    desc: "CDIC insured. Regulated by CIRO. Fully secure.",
  },
];

export function WelcomeScreen({ onNext }: ScreenProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Hero header */}
      <div
        className="relative overflow-hidden px-6 pt-6 pb-10"
        style={{
          background: "linear-gradient(160deg, #C8102E 0%, #EC0000 50%, #FF1A1A 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute"
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.1)",
            top: -80,
            right: -60,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
            top: 40,
            right: 20,
          }}
        />

        <div className="mb-8 relative z-10">
          <BrandMark tone="light" />
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 500, letterSpacing: "0.05em" }}>
              NEW FOR 2025
            </span>
          </div>
          <h1
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
              marginBottom: 12,
            }}
          >
            Investing made simple — for you.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.6 }}>
            No jargon. No overwhelm. Just clear guidance that meets you where you are.
          </p>
        </div>

        {/* Subtle chart illustration */}
        <div className="relative z-10 mt-6">
          <svg width="100%" height="60" viewBox="0 0 320 60" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <path
              d="M0 50 L40 42 L80 38 L120 30 L160 24 L200 18 L240 12 L280 8 L320 4"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0 50 L40 42 L80 38 L120 30 L160 24 L200 18 L240 12 L280 8 L320 4 L320 60 L0 60 Z"
              fill="url(#chartFill)"
            />
            <circle cx="320" cy="4" r="4" fill="white" />
          </svg>
          <div
            className="inline-flex items-center gap-1.5 mt-1"
            style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}
          >
            <TrendingUp size={13} />
            <span>Average growth for balanced portfolios: +7.2% annually</span>
          </div>
        </div>
      </div>

      {/* Feature list */}
      <div className="flex-1 px-5 pt-6 pb-4">
        <div className="space-y-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3.5 p-3.5 rounded-2xl"
              style={{ background: "#F8F8FA", border: "1px solid #F0F0F2" }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 38, height: 38, background: "#FFF0F0", borderRadius: 12 }}
              >
                <Icon size={18} color="#EC0000" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.4 }}>
                  {title}
                </div>
                <div style={{ fontSize: 12.5, color: "#717182", lineHeight: 1.5, marginTop: 2 }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust row */}
        <div
          className="mt-4 flex items-center justify-center gap-3 py-3 px-4 rounded-xl"
          style={{ background: "#F5F5F7" }}
        >
          {["CDIC", "CIRO", "25M+\nClients"].map((t) => (
            <div key={t} className="flex flex-col items-center">
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1A1A", whiteSpace: "pre-line", textAlign: "center" }}>
                {t}
              </span>
            </div>
          ))}
          <div style={{ width: 1, height: 24, background: "#E0E0E8" }} />
          <span style={{ fontSize: 10.5, color: "#717182", textAlign: "center" }}>
            Trusted since 1832
          </span>
        </div>
      </div>

      {/* CTA area */}
      <div className="px-5 pb-6 space-y-3">
        <button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #EC0000, #C8102E)",
            color: "#fff",
            height: 52,
            borderRadius: 16,
            fontSize: 16,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(236,0,0,0.3)",
          }}
        >
          Get Started
          <ChevronRight size={18} />
        </button>
        <button
          style={{
            width: "100%",
            height: 44,
            background: "transparent",
            border: "none",
            color: "#EC0000",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Sign in to existing account
        </button>
      </div>
    </div>
  );
}
