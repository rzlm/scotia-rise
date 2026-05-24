import { useState, useEffect } from "react";
import { Home, Plane, Shield, TrendingUp, ChevronRight, ArrowLeft, Check } from "lucide-react";
import type { ScreenProps, Goal } from "../types";

const GOALS: { id: Goal; icon: React.ElementType; label: string; tag: string; desc: string; color: string; bg: string }[] = [
  {
    id: "fhsa",
    icon: Home,
    label: "First Home",
    tag: "FHSA",
    desc: "Save up to $40K tax-free toward your first home purchase.",
    color: "#EC0000",
    bg: "#FFF0F0",
  },
  {
    id: "travel",
    icon: Plane,
    label: "Travel",
    tag: "TFSA",
    desc: "Grow your adventure fund without paying tax on returns.",
    color: "#0066CC",
    bg: "#EFF5FF",
  },
  {
    id: "emergency",
    icon: Shield,
    label: "Emergency Fund",
    tag: "TFSA",
    desc: "Build a safety net of 3–6 months of living expenses.",
    color: "#008060",
    bg: "#EBF7F3",
  },
  {
    id: "wealth",
    icon: TrendingUp,
    label: "Long-Term Wealth",
    tag: "RRSP",
    desc: "Invest for the future and reduce your taxes today.",
    color: "#7B3FD4",
    bg: "#F4EEFF",
  },
];

export function GoalSelection({ onNext, onBack, profile, setProfile }: ScreenProps) {
  const [selected, setSelected] = useState<Goal[]>(profile.goals);

  useEffect(() => {
    setSelected(profile.goals);
  }, [profile.goals]);

  const toggle = (id: Goal) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    setProfile((p) => ({ ...p, goals: selected }));
    onNext();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div
        className="px-5 pt-5 pb-6"
        style={{ background: "linear-gradient(160deg, #C8102E 0%, #EC0000 100%)" }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1 mb-5"
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: 0, fontSize: 14 }}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        {/* Progress steps */}
        <div className="flex items-center gap-2 mb-5">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                style={{
                  width: step === 1 ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: step === 1 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                  transition: "all 0.3s",
                }}
              />
            </div>
          ))}
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginLeft: 4 }}>Step 1 of 4</span>
        </div>
        <h2
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.3px",
            marginBottom: 6,
          }}
        >
          What are you investing for?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13.5, lineHeight: 1.5 }}>
          Select one or more goals. We'll tailor your experience to match.
        </p>
      </div>

      {/* Goal cards */}
      <div className="flex-1 px-5 pt-5 pb-4 overflow-y-auto">
        <div className="space-y-3">
          {GOALS.map(({ id, icon: Icon, label, tag, desc, color, bg }) => {
            const isSelected = selected.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className="w-full text-left flex items-start gap-4 p-4 rounded-2xl transition-all duration-200"
                style={{
                  background: isSelected ? bg : "#F8F8FA",
                  border: `2px solid ${isSelected ? color : "transparent"}`,
                  cursor: "pointer",
                  boxShadow: isSelected ? `0 0 0 1px ${color}22` : "none",
                }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ width: 44, height: 44, background: bg, borderRadius: 14, border: `1.5px solid ${color}33` }}
                >
                  <Icon size={20} color={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>{label}</span>
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{ background: bg, color, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.04em", border: `1px solid ${color}33` }}
                    >
                      {tag}
                    </span>
                  </div>
                  <p style={{ fontSize: 12.5, color: "#717182", lineHeight: 1.5 }}>{desc}</p>
                </div>
                <div
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: isSelected ? color : "transparent",
                    border: `2px solid ${isSelected ? color : "#D0D0D8"}`,
                    marginTop: 2,
                    transition: "all 0.2s",
                  }}
                >
                  {isSelected && <Check size={12} color="white" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Info card */}
        <div
          className="mt-4 p-4 rounded-xl flex gap-3"
          style={{ background: "#FFF8E7", border: "1px solid #FDECC5" }}
        >
          <span style={{ fontSize: 18 }}>💡</span>
          <p style={{ fontSize: 12.5, color: "#7A6000", lineHeight: 1.5 }}>
            <strong>Not sure which account to choose?</strong> Don't worry — we'll help you pick the right one in the next step.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-6 pt-2">
        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="w-full flex items-center justify-center gap-2"
          style={{
            background: selected.length > 0
              ? "linear-gradient(135deg, #EC0000, #C8102E)"
              : "#E5E5EA",
            color: selected.length > 0 ? "#fff" : "#ADADB8",
            height: 52,
            borderRadius: 16,
            fontSize: 16,
            fontWeight: 600,
            border: "none",
            cursor: selected.length > 0 ? "pointer" : "default",
            boxShadow: selected.length > 0 ? "0 4px 14px rgba(236,0,0,0.3)" : "none",
            transition: "all 0.2s",
          }}
        >
          Continue
          <ChevronRight size={18} />
        </button>
        {selected.length === 0 && (
          <p style={{ textAlign: "center", fontSize: 12, color: "#ADADB8", marginTop: 8 }}>
            Select at least one goal to continue
          </p>
        )}
      </div>
    </div>
  );
}
