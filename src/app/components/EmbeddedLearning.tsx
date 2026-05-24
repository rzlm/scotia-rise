import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { ScreenProps } from "../types";

type Priority = "steady" | "low-risk" | "goal";
type Confidence = "learning" | "understand" | "ready";

const priorities: { id: Priority; label: string }[] = [
  { id: "steady", label: "Growing steadily" },
  { id: "low-risk", label: "Lower risk" },
  { id: "goal", label: "Saving for a goal" },
];

const explanations: Record<Priority, string> = {
  steady:
    "A balanced mix spreads your money across different investments, aiming for smoother growth over time.",
  "low-risk":
    "A more conservative mix focuses on reducing big ups and downs so your progress feels more stable.",
  goal:
    "Your timeline and goal shape the mix, so each contribution is designed to move you closer to that outcome.",
};

const confidenceOptions: { id: Confidence; label: string; support: string }[] = [
  {
    id: "learning",
    label: "Still learning",
    support: "You are not behind. We will keep guidance simple as you continue.",
  },
  {
    id: "understand",
    label: "I understand",
    support: "Great. You have the basics and can continue with confidence.",
  },
  {
    id: "ready",
    label: "Ready to continue",
    support: "Perfect. Your first investment setup is next.",
  },
];

function QuickConceptFlow() {
  const stepCard = {
    border: "1px solid #F0F1F5",
    background: "#FFFFFF",
    borderRadius: 14,
    padding: "12px 10px",
    minHeight: 104,
  } as const;

  return (
    <div
      style={{
        border: "1px solid #F2F2F4",
        borderRadius: 16,
        background: "linear-gradient(180deg, #FFFFFF 0%, #FCFCFD 100%)",
        padding: 12,
      }}
    >
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        <div style={stepCard}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "#FFF1F2",
              border: "1px solid #FFD9DD",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <span style={{ color: "#C8102E", fontWeight: 700 }}>$</span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#1E1F24", lineHeight: 1.3 }}>
            Money deposited
          </p>
        </div>

        <ChevronRight size={16} color="#D0D3DB" />

        <div style={stepCard}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "#FFF6F0",
              border: "1px solid #FFE4D0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="11" width="6" height="8" rx="2" fill="#C8102E" opacity="0.9" />
              <rect x="9" y="8" width="6" height="11" rx="2" fill="#E95A66" opacity="0.9" />
              <rect x="15" y="5" width="6" height="14" rx="2" fill="#F7A0A8" opacity="0.9" />
            </svg>
          </div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#1E1F24", lineHeight: 1.3 }}>
            Diversified investment
          </p>
        </div>

        <ChevronRight size={16} color="#D0D3DB" />

        <div style={stepCard}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "#F2F9F4",
              border: "1px solid #D6ECDB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 17L8 12L12 14L17 8L21 6"
                stroke="#167A45"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#1E1F24", lineHeight: 1.3 }}>
            Long-term growth
          </p>
        </div>
      </div>
    </div>
  );
}

export function EmbeddedLearning({ onNext, onBack }: ScreenProps) {
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null);
  const [selectedConfidence, setSelectedConfidence] = useState<Confidence | null>(null);

  const activeSupport = useMemo(
    () => confidenceOptions.find((option) => option.id === selectedConfidence)?.support,
    [selectedConfidence],
  );

  return (
    <div className="flex h-full flex-col bg-white">
      <div
        className="relative overflow-hidden px-5 pb-6 pt-5"
        style={{ background: "linear-gradient(160deg, #C8102E 0%, #EC0000 100%)" }}
      >
        <div
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
            top: -74,
            right: -64,
            pointerEvents: "none",
          }}
        />

        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: 0,
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.8)",
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 18,
          }}
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <div className="flex items-center gap-2 mb-5">
          {[0, 1, 2, 3].map((step) => (
            <div
              key={step}
              style={{
                width: step === 2 ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: step <= 2 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
          <span style={{ color: "rgba(255,255,255,0.72)", fontSize: 11, marginLeft: 4 }}>Step 3 of 4</span>
        </div>

        <div
          className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.05em" }}>
            30 SECONDS
          </span>
        </div>

        <h2
          style={{
            fontSize: 24,
            lineHeight: 1.25,
            letterSpacing: "-0.3px",
            color: "#FFFFFF",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Before you invest
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.78)", maxWidth: 320 }}>
          Take 30 seconds to understand how your money works.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4" style={{ paddingBottom: 12 }}>
        <div className="space-y-4">
          <section
            style={{
              border: "1px solid #F0F1F4",
              borderRadius: 18,
              padding: 14,
              background: "#FFFFFF",
            }}
          >
            <p style={{ color: "#B6273F", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 6 }}>
              QUICK CONCEPT
            </p>
            <h3 style={{ fontSize: 17, lineHeight: 1.3, fontWeight: 700, color: "#1F2127", marginBottom: 10 }}>
              What happens when you invest?
            </h3>
            <QuickConceptFlow />
          </section>

          <section
            style={{
              border: "1px solid #F0F1F4",
              borderRadius: 18,
              padding: 14,
              background: "#FFFFFF",
            }}
          >
            <p style={{ color: "#B6273F", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 6 }}>
              INTERACTIVE EXPLANATION
            </p>
            <h3 style={{ fontSize: 17, lineHeight: 1.3, fontWeight: 700, color: "#1F2127", marginBottom: 10 }}>
              What matters most to you?
            </h3>

            <div className="flex flex-wrap gap-2">
              {priorities.map((option) => {
                const active = selectedPriority === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedPriority(option.id)}
                    style={{
                      border: `1px solid ${active ? "#C8102E" : "#E3E5EA"}`,
                      background: active ? "#FFF4F5" : "#FFFFFF",
                      color: active ? "#B10F2B" : "#4D5160",
                      height: 36,
                      borderRadius: 20,
                      padding: "0 13px",
                      fontSize: 13,
                      fontWeight: active ? 600 : 500,
                      cursor: "pointer",
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {selectedPriority ? (
                <motion.div
                  key={selectedPriority}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{
                    marginTop: 12,
                    border: "1px solid #F2D5D9",
                    borderRadius: 12,
                    background: "#FFFAFA",
                    padding: 12,
                  }}
                >
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#3B3F4B" }}>
                    {explanations[selectedPriority]}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    marginTop: 12,
                    border: "1px dashed #E4E6EC",
                    borderRadius: 12,
                    background: "#FAFBFD",
                    padding: 12,
                  }}
                >
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: "#818594" }}>
                    Select one option to see a short explanation.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section
            style={{
              border: "1px solid #F0F1F4",
              borderRadius: 18,
              padding: 14,
              background: "#FFFFFF",
            }}
          >
            <p style={{ color: "#B6273F", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 6 }}>
              CONFIDENCE CHECK
            </p>
            <h3 style={{ fontSize: 17, lineHeight: 1.3, fontWeight: 700, color: "#1F2127", marginBottom: 10 }}>
              How are you feeling?
            </h3>

            <div className="space-y-2">
              {confidenceOptions.map((option) => {
                const active = selectedConfidence === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedConfidence(option.id)}
                    className="w-full"
                    style={{
                      border: `1px solid ${active ? "#C8102E" : "#ECEEF2"}`,
                      background: active ? "#FFF5F6" : "#FAFBFD",
                      borderRadius: 12,
                      textAlign: "left",
                      height: 44,
                      padding: "0 12px",
                      fontSize: 14,
                      fontWeight: active ? 600 : 500,
                      color: active ? "#A80E28" : "#323645",
                      cursor: "pointer",
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {activeSupport && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "#555B69",
                    borderLeft: "2px solid #F0BBC4",
                    paddingLeft: 10,
                  }}
                >
                  {activeSupport}
                </motion.p>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>

      <div
        className="px-5 pb-5 pt-3"
        style={{
          borderTop: "1px solid #F0F1F4",
          background: "#FFFFFF",
          boxShadow: "0 -8px 18px rgba(13, 20, 33, 0.04)",
        }}
      >
        <button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2"
          style={{
            height: 52,
            borderRadius: 16,
            border: "none",
            background: "linear-gradient(135deg, #EC0000, #C8102E)",
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 8,
            boxShadow: "0 4px 14px rgba(236,0,0,0.3)",
          }}
        >
          Continue to Investment
          <ChevronRight size={18} />
        </button>

        <button
          onClick={onNext}
          className="w-full"
          style={{
            height: 40,
            border: "none",
            background: "transparent",
            color: "#ADADB8",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Save and learn later
        </button>
      </div>
    </div>
  );
}
