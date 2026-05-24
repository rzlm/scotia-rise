import { useState } from "react";
import { ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import type { ScreenProps, RiskLevel, TimeHorizon, Experience } from "../types";

const RISK_OPTIONS: { id: RiskLevel; label: string; desc: string; color: string }[] = [
  { id: "conservative", label: "Play it safe", desc: "Slow and steady growth, minimal ups and downs", color: "#008060" },
  { id: "balanced", label: "Mix it up", desc: "Some growth potential with moderate fluctuations", color: "#0066CC" },
  { id: "growth", label: "Go for growth", desc: "Higher potential returns, more short-term swings", color: "#EC0000" },
];

const TIME_OPTIONS: { id: TimeHorizon; label: string; sub: string }[] = [
  { id: "short", label: "1–3 years", sub: "Near-term goal" },
  { id: "medium", label: "3–10 years", sub: "Mid-term plan" },
  { id: "long", label: "10+ years", sub: "Long-term wealth" },
];

const EXP_OPTIONS: { id: Experience; label: string; emoji: string }[] = [
  { id: "beginner", label: "Brand new", emoji: "🌱" },
  { id: "some", label: "Some basics", emoji: "📚" },
  { id: "experienced", label: "I know my stuff", emoji: "🎯" },
];

export function InvestorProfile({ onNext, onBack, profile, setProfile }: ScreenProps) {
  const [risk, setRisk] = useState<RiskLevel>(profile.risk);
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>(profile.timeHorizon);
  const [experience, setExperience] = useState<Experience>(profile.experience);

  const answered = [risk, timeHorizon, experience].filter(Boolean).length;
  const confidence = Math.round((answered / 3) * 100);

  const handleContinue = () => {
    setProfile((p) => ({ ...p, risk, timeHorizon, experience }));
    onNext();
  };

  return (
    <div className="flex flex-col bg-white" style={{ minHeight: "100%" }}>
      {/* Header */}
      <div
        className="px-5 pt-5 pb-6"
        style={{ background: "linear-gradient(160deg, #C8102E 0%, #EC0000 100%)" }}
      >
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: 0, fontSize: 14, display: "flex", alignItems: "center", gap: 4, marginBottom: 20 }}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        {/* Progress */}
        <div className="flex items-center gap-2 mb-5">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              style={{
                width: step <= 2 ? (step === 2 ? 20 : 8) : 8,
                height: 8,
                borderRadius: 4,
                background: step <= 2 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginLeft: 4 }}>Step 2 of 4</span>
        </div>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.3px", marginBottom: 6 }}>
          Tell us about yourself
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13.5, lineHeight: 1.5 }}>
          3 quick questions — no wrong answers.
        </p>

        {/* Confidence meter */}
        <div className="mt-5 flex items-center gap-3">
          <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${confidence}%`,
                background: "rgba(255,255,255,0.9)",
                borderRadius: 3,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
            {confidence}% complete
          </span>
        </div>
      </div>

      {/* Questions */}
      <div className="px-5 pt-5 pb-6 space-y-7">
        {/* Q1: Risk */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: risk ? "#EC0000" : "#E5E5EA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {risk ? <CheckCircle2 size={14} color="white" /> : <span style={{ color: "#ADADB8", fontSize: 11, fontWeight: 700 }}>1</span>}
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
              How comfortable are you with risk?
            </p>
          </div>
          <div className="space-y-2">
            {RISK_OPTIONS.map(({ id, label, desc, color }) => (
              <button
                key={id}
                onClick={() => setRisk(id)}
                className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-150"
                style={{
                  background: risk === id ? `${color}10` : "#F8F8FA",
                  border: `2px solid ${risk === id ? color : "transparent"}`,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    border: `2.5px solid ${risk === id ? color : "#D0D0D8"}`,
                    background: risk === id ? color : "transparent",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: risk === id ? color : "#1A1A1A" }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#717182", marginTop: 1 }}>{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Q2: Time horizon */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: timeHorizon ? "#EC0000" : "#E5E5EA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {timeHorizon ? <CheckCircle2 size={14} color="white" /> : <span style={{ color: "#ADADB8", fontSize: 11, fontWeight: 700 }}>2</span>}
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
              How long do you plan to invest?
            </p>
          </div>
          <div className="flex gap-2">
            {TIME_OPTIONS.map(({ id, label, sub }) => (
              <button
                key={id}
                onClick={() => setTimeHorizon(id)}
                className="flex-1 flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-150"
                style={{
                  background: timeHorizon === id ? "#FFF0F0" : "#F8F8FA",
                  border: `2px solid ${timeHorizon === id ? "#EC0000" : "transparent"}`,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 13.5, fontWeight: 600, color: timeHorizon === id ? "#EC0000" : "#1A1A1A", textAlign: "center" }}>
                  {label}
                </span>
                <span style={{ fontSize: 11, color: "#717182", marginTop: 2, textAlign: "center" }}>{sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Q3: Experience */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: experience ? "#EC0000" : "#E5E5EA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {experience ? <CheckCircle2 size={14} color="white" /> : <span style={{ color: "#ADADB8", fontSize: 11, fontWeight: 700 }}>3</span>}
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
              How much do you know about investing?
            </p>
          </div>
          <div className="flex gap-2">
            {EXP_OPTIONS.map(({ id, label, emoji }) => (
              <button
                key={id}
                onClick={() => setExperience(id)}
                className="flex-1 flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-150"
                style={{
                  background: experience === id ? "#FFF0F0" : "#F8F8FA",
                  border: `2px solid ${experience === id ? "#EC0000" : "transparent"}`,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 20 }}>{emoji}</span>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: experience === id ? "#EC0000" : "#1A1A1A", marginTop: 4, textAlign: "center" }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={handleContinue}
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
            marginTop: 4,
          }}
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
