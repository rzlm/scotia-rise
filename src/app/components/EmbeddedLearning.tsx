import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronRight, BookmarkPlus } from "lucide-react";
import type { ScreenProps } from "../types";

// ─── Priority options ────────────────────────────────────────────────────────

type Priority = "steady" | "risk" | "goal";

const PRIORITIES: { id: Priority; label: string }[] = [
  { id: "steady", label: "Growing steadily" },
  { id: "risk",   label: "Lower risk" },
  { id: "goal",   label: "Saving for a goal" },
];

const PRIORITY_CONTENT: Record<
  Priority,
  { headline: string; body: string; accent: string; bg: string; dot: string }
> = {
  steady: {
    headline: "Patience builds wealth.",
    body: "Your money is spread across stocks and bonds that grow a little every day. Over years, small gains compound into something significant — without you having to do anything extra.",
    accent: "#008060",
    bg: "#EBF7F3",
    dot: "#008060",
  },
  risk: {
    headline: "Steady means protected.",
    body: "A conservative mix keeps your portfolio from swinging too far up or down. Think of it as a seatbelt — you still move forward, just with more stability.",
    accent: "#0066CC",
    bg: "#EFF5FF",
    dot: "#0066CC",
  },
  goal: {
    headline: "Every deposit gets you closer.",
    body: "With your FHSA, each contribution builds toward your first home — tax-free. Your timeline drives your strategy, so your investments are already working toward that specific moment.",
    accent: "#EC0000",
    bg: "#FFF0F0",
    dot: "#EC0000",
  },
};

// ─── Confidence options ───────────────────────────────────────────────────────

type Confidence = "learning" | "understand" | "ready";

const CONFIDENCE_OPTIONS: {
  id: Confidence;
  emoji: string;
  label: string;
  sub: string;
}[] = [
  {
    id: "learning",
    emoji: "🌱",
    label: "Still learning",
    sub: "That's okay — we guide you every step of the way.",
  },
  {
    id: "understand",
    emoji: "💡",
    label: "I understand",
    sub: "Great. You're building a solid foundation.",
  },
  {
    id: "ready",
    emoji: "🚀",
    label: "Ready to go",
    sub: "Let's do it. Your first investment is waiting.",
  },
];

// ─── Money Flow Illustration ──────────────────────────────────────────────────

function MoneyFlowIllustration() {
  return (
    <div className="flex items-center justify-between px-2">
      {/* Step 1 — Deposit */}
      <div className="flex flex-col items-center gap-2" style={{ width: 72 }}>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #EC0000 0%, #C8102E 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(236,0,0,0.22)",
          }}
        >
          {/* Coin icon */}
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
            <text x="13" y="17.5" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="system-ui">$</text>
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.3 }}>You deposit</p>
          <p style={{ fontSize: 10.5, color: "#717182", marginTop: 1 }}>$50/mo</p>
        </div>
      </div>

      {/* Connector arrow */}
      <FlowArrow />

      {/* Step 2 — Diversification */}
      <div className="flex flex-col items-center gap-2" style={{ width: 72 }}>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 16,
            background: "white",
            border: "1.5px solid #E5E5EA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* Stacked bar icon */}
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
            <rect x="0" y="14" width="28" height="8" rx="3" fill="#EC0000" />
            <rect x="0" y="7.5" width="28" height="5.5" rx="2" fill="#FF7A7A" />
            <rect x="0" y="0" width="28" height="6.5" rx="2" fill="#FFADAD" />
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.3 }}>Spread across</p>
          <p style={{ fontSize: 10.5, color: "#717182", marginTop: 1 }}>assets</p>
        </div>
      </div>

      {/* Connector arrow */}
      <FlowArrow />

      {/* Step 3 — Growth */}
      <div className="flex flex-col items-center gap-2" style={{ width: 72 }}>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 16,
            background: "#EBF7F3",
            border: "1.5px solid #C0E8DB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Growth chart */}
          <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
            <path
              d="M2 19 L7 14 L12 15.5 L18 8 L24 5 L28 2"
              stroke="#008060"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="28" cy="2" r="2.5" fill="#008060" />
            <path
              d="M2 19 L7 14 L12 15.5 L18 8 L24 5 L28 2 L28 20 L2 20 Z"
              fill="url(#growthFill)"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#008060" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#008060" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#008060", lineHeight: 1.3 }}>Grows over</p>
          <p style={{ fontSize: 10.5, color: "#717182", marginTop: 1 }}>time</p>
        </div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center" style={{ marginBottom: 22 }}>
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
        <path
          d="M1 6 Q6 6 10 6 Q14 6 18 6"
          stroke="#D0D0D8"
          strokeWidth="1.5"
          strokeDasharray="3 2.5"
          strokeLinecap="round"
        />
        <path
          d="M17 3 L21 6 L17 9"
          stroke="#D0D0D8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── Allocation bar for Section 1 ─────────────────────────────────────────────

function AllocationBar() {
  const segments = [
    { label: "Bonds", pct: 45, color: "#EC0000" },
    { label: "Canadian stocks", pct: 35, color: "#FF8080" },
    { label: "Global stocks", pct: 20, color: "#FFBFBF" },
  ];
  return (
    <div className="mt-4">
      <div className="flex rounded-lg overflow-hidden" style={{ height: 8 }}>
        {segments.map(({ pct, color }, i) => (
          <div key={i} style={{ width: `${pct}%`, background: color }} />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {segments.map(({ label, pct, color }) => (
          <div key={label} className="flex items-center gap-1">
            <div style={{ width: 7, height: 7, borderRadius: 2, background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: "#717182" }}>{label} · {pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function EmbeddedLearning({ onNext, onBack }: ScreenProps) {
  const [priority, setPriority] = useState<Priority | null>(null);
  const [confidence, setConfidence] = useState<Confidence | null>(null);

  const ctaLabel =
    confidence === "ready"
      ? "Continue to Investment →"
      : confidence === "understand"
      ? "I'm ready — Continue"
      : "Continue to Investment";

  const priorityContent = priority ? PRIORITY_CONTENT[priority] : null;

  return (
    <div className="flex flex-col bg-white" style={{ minHeight: "100%" }}>

      {/* ── Header ── */}
      <div
        className="relative overflow-hidden px-5 pt-5 pb-7"
        style={{ background: "linear-gradient(160deg, #C8102E 0%, #EC0000 100%)" }}
      >
        {/* Subtle decorative ring */}
        <div
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
            top: -90,
            right: -70,
            pointerEvents: "none",
          }}
        />

        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.75)",
            cursor: "pointer",
            padding: 0,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 18,
          }}
        >
          <ArrowLeft size={15} />
          Back
        </button>

        {/* Progress pips */}
        <div className="flex items-center gap-2 mb-5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: 5,
                borderRadius: 3,
                width: i === 2 ? 20 : 6,
                background: i <= 2 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)",
                transition: "all 0.3s",
              }}
            />
          ))}
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10.5, marginLeft: 2 }}>
            Step 3 of 4
          </span>
        </div>

        {/* Headline */}
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.9)", fontWeight: 600, letterSpacing: "0.05em" }}>
            30 SECONDS
          </span>
        </div>

        <h2
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.4px",
            marginBottom: 8,
          }}
        >
          Before you invest
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.55 }}>
          Take 30 seconds to understand how your money works.
        </p>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 pt-5 pb-4 space-y-5">

          {/* ─── Section 1: What happens when you invest? ─── */}
          <section>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1.5px solid #F0F0F2", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              {/* Section label */}
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ borderBottom: "1px solid #F8F8FA", background: "#FAFAFA" }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#EC0000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: "white", fontSize: 10.5, fontWeight: 700 }}>1</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#717182", letterSpacing: "0.04em" }}>
                  QUICK CONCEPT
                </span>
              </div>

              <div className="px-4 pt-4 pb-5 bg-white">
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#1A1A1A",
                    lineHeight: 1.35,
                    marginBottom: 4,
                    letterSpacing: "-0.2px",
                  }}
                >
                  What happens when you invest?
                </h3>
                <p style={{ fontSize: 12.5, color: "#717182", lineHeight: 1.6, marginBottom: 20 }}>
                  Your money doesn't just sit there — it gets put to work across different assets.
                </p>

                {/* Flow illustration */}
                <MoneyFlowIllustration />

                {/* Allocation bar */}
                <div
                  className="mt-5 p-3 rounded-xl"
                  style={{ background: "#F8F8FA", border: "1px solid #F0F0F2" }}
                >
                  <p style={{ fontSize: 11, fontWeight: 600, color: "#ADADB8", letterSpacing: "0.05em", marginBottom: 6 }}>
                    HOW IT'S SPREAD (Conservative Starter)
                  </p>
                  <AllocationBar />
                </div>

                {/* One-line reassurance */}
                <p
                  style={{
                    fontSize: 12,
                    color: "#717182",
                    lineHeight: 1.55,
                    marginTop: 12,
                    paddingLeft: 10,
                    borderLeft: "2.5px solid #EC0000",
                  }}
                >
                  Spreading across assets means a dip in one area won't affect everything.
                </p>
              </div>
            </div>
          </section>

          {/* ─── Section 2: What matters most to you? ─── */}
          <section>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1.5px solid #F0F0F2", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ borderBottom: "1px solid #F8F8FA", background: "#FAFAFA" }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: priority ? "#EC0000" : "#E5E5EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  <span style={{ color: priority ? "white" : "#ADADB8", fontSize: 10.5, fontWeight: 700 }}>2</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#717182", letterSpacing: "0.04em" }}>
                  INTERACTIVE
                </span>
              </div>

              <div className="px-4 pt-4 pb-5 bg-white">
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#1A1A1A",
                    lineHeight: 1.35,
                    marginBottom: 4,
                    letterSpacing: "-0.2px",
                  }}
                >
                  What matters most to you?
                </h3>
                <p style={{ fontSize: 12.5, color: "#717182", lineHeight: 1.6, marginBottom: 14 }}>
                  Tap one — we'll explain how your portfolio supports it.
                </p>

                {/* Option pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {PRIORITIES.map(({ id, label }) => {
                    const isActive = priority === id;
                    const content = PRIORITY_CONTENT[id];
                    return (
                      <button
                        key={id}
                        onClick={() => setPriority(id)}
                        style={{
                          height: 36,
                          paddingLeft: 14,
                          paddingRight: 14,
                          borderRadius: 20,
                          border: `1.5px solid ${isActive ? content.accent : "#E5E5EA"}`,
                          background: isActive ? content.bg : "white",
                          color: isActive ? content.accent : "#717182",
                          fontSize: 13,
                          fontWeight: isActive ? 600 : 500,
                          cursor: "pointer",
                          transition: "all 0.18s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Animated explanation */}
                <AnimatePresence mode="wait">
                  {priorityContent ? (
                    <motion.div
                      key={priority}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="rounded-xl p-4"
                      style={{
                        background: priorityContent.bg,
                        border: `1.5px solid ${priorityContent.accent}22`,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 13.5,
                          fontWeight: 700,
                          color: priorityContent.accent,
                          marginBottom: 5,
                          lineHeight: 1.3,
                        }}
                      >
                        {priorityContent.headline}
                      </p>
                      <p style={{ fontSize: 13, color: "#3A3A4A", lineHeight: 1.65 }}>
                        {priorityContent.body}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl p-4 flex items-center justify-center"
                      style={{
                        background: "#F8F8FA",
                        border: "1.5px dashed #E5E5EA",
                        minHeight: 68,
                      }}
                    >
                      <p style={{ fontSize: 12.5, color: "#ADADB8", textAlign: "center" }}>
                        Select an option above to see your personalised explanation
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* ─── Section 3: Confidence Check ─── */}
          <section>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1.5px solid #F0F0F2", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ borderBottom: "1px solid #F8F8FA", background: "#FAFAFA" }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: confidence ? "#EC0000" : "#E5E5EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  <span style={{ color: confidence ? "white" : "#ADADB8", fontSize: 10.5, fontWeight: 700 }}>3</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#717182", letterSpacing: "0.04em" }}>
                  CONFIDENCE CHECK
                </span>
              </div>

              <div className="px-4 pt-4 pb-5 bg-white">
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#1A1A1A",
                    lineHeight: 1.35,
                    marginBottom: 4,
                    letterSpacing: "-0.2px",
                  }}
                >
                  How are you feeling?
                </h3>
                <p style={{ fontSize: 12.5, color: "#717182", lineHeight: 1.6, marginBottom: 14 }}>
                  No wrong answer. Just tell us where you're at.
                </p>

                {/* Confidence buttons */}
                <div className="space-y-2">
                  {CONFIDENCE_OPTIONS.map(({ id, emoji, label }) => {
                    const isActive = confidence === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setConfidence(id)}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-150"
                        style={{
                          background: isActive ? "#FFF0F0" : "#F8F8FA",
                          border: `1.5px solid ${isActive ? "#EC0000" : "transparent"}`,
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? "#EC0000" : "#1A1A1A",
                            transition: "color 0.15s",
                          }}
                        >
                          {label}
                        </span>
                        {isActive && (
                          <div
                            style={{
                              marginLeft: "auto",
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              background: "#EC0000",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                              <path d="M1 3.5L3.2 5.7L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Animated reassurance */}
                <AnimatePresence mode="wait">
                  {confidence && (
                    <motion.div
                      key={confidence}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 px-4 py-3 rounded-xl"
                      style={{ background: "#F8F8FA", border: "1px solid #F0F0F2" }}
                    >
                      <p style={{ fontSize: 13, color: "#3A3A4A", lineHeight: 1.6 }}>
                        {CONFIDENCE_OPTIONS.find((c) => c.id === confidence)?.sub}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Bottom padding for CTAs */}
          <div style={{ height: 4 }} />
        </div>
      </div>

      {/* ── Sticky CTA footer ── */}
      <div
        className="px-5 pt-4 pb-5 space-y-2.5"
        style={{
          background: "white",
          borderTop: "1px solid #F0F0F2",
          boxShadow: "0 -8px 24px rgba(0,0,0,0.05)",
        }}
      >
        {/* Progress indicator for sections completed */}
        <div className="flex items-center gap-2 mb-3">
          {[
            { label: "Concept", done: true },
            { label: "Priority", done: !!priority },
            { label: "Confidence", done: !!confidence },
          ].map(({ label, done }, i) => (
            <div key={label} className="flex items-center gap-1.5" style={{ flex: 1 }}>
              <div
                style={{
                  width: "100%",
                  height: 4,
                  borderRadius: 2,
                  background: done ? "#EC0000" : "#E5E5EA",
                  transition: "background 0.3s",
                }}
              />
            </div>
          ))}
          <span style={{ fontSize: 11, color: "#ADADB8", whiteSpace: "nowrap", marginLeft: 4 }}>
            {[true, !!priority, !!confidence].filter(Boolean).length}/3 done
          </span>
        </div>

        <button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #EC0000 0%, #C8102E 100%)",
            color: "#fff",
            height: 52,
            borderRadius: 16,
            fontSize: 15.5,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(236,0,0,0.3)",
            letterSpacing: "-0.1px",
          }}
        >
          {ctaLabel}
          <ChevronRight size={18} />
        </button>

        <button
          style={{
            width: "100%",
            height: 40,
            background: "transparent",
            border: "none",
            color: "#ADADB8",
            fontSize: 13.5,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <BookmarkPlus size={14} />
          Save and learn later
        </button>
      </div>
    </div>
  );
}
