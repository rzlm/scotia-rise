import { useState } from "react";
import { ArrowLeft, ChevronRight, Info, CheckCircle2, TrendingUp, Shield, Zap } from "lucide-react";
import type { ScreenProps } from "../types";

const PATHS = [
  {
    id: "starter",
    icon: Shield,
    label: "Conservative Starter",
    tag: "Recommended for you",
    tagColor: "#EC0000",
    desc: "A stable mix focused on protecting your money while earning steady returns.",
    monthlyMin: 25,
    allocation: [
      { label: "Canadian Bonds", pct: 50, color: "#EC0000" },
      { label: "Canadian Stocks", pct: 30, color: "#FF6B6B" },
      { label: "Global Stocks", pct: 20, color: "#FFADAD" },
    ],
    returns: "+4.5%",
    returnLabel: "avg. annual return",
    highlight: true,
  },
  {
    id: "balanced",
    icon: TrendingUp,
    label: "Balanced Growth",
    tag: "More growth potential",
    tagColor: "#0066CC",
    desc: "A 50/50 mix of stocks and bonds for investors comfortable with some ups and downs.",
    monthlyMin: 50,
    allocation: [
      { label: "Canadian Stocks", pct: 40, color: "#0066CC" },
      { label: "Global Stocks", pct: 25, color: "#4D9EFF" },
      { label: "Bonds", pct: 35, color: "#99C7FF" },
    ],
    returns: "+6.8%",
    returnLabel: "avg. annual return",
    highlight: false,
  },
];

function AllocationBar({ allocation }: { allocation: { label: string; pct: number; color: string }[] }) {
  return (
    <div>
      <div className="flex rounded-lg overflow-hidden h-3 mb-2">
        {allocation.map(({ pct, color }, i) => (
          <div key={i} style={{ width: `${pct}%`, background: color }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {allocation.map(({ label, pct, color }) => (
          <div key={label} className="flex items-center gap-1">
            <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 10.5, color: "#717182" }}>{label} {pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FirstInvestment({ onNext, onBack }: ScreenProps) {
  const [selected, setSelected] = useState("starter");
  const [amount, setAmount] = useState(50);
  const [showInfo, setShowInfo] = useState(false);

  const AMOUNTS = [25, 50, 100, 200];

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
        <div className="flex items-center gap-2 mb-5">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              style={{
                width: 20,
                height: 8,
                borderRadius: 4,
                background: "rgba(255,255,255,0.9)",
              }}
            />
          ))}
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginLeft: 4 }}>Step 4 of 4</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Zap size={14} color="rgba(255,255,255,0.9)" />
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em" }}>
            YOUR RECOMMENDATION
          </span>
        </div>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.3px", marginBottom: 6 }}>
          Your starting point
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13.5, lineHeight: 1.5 }}>
          Based on your goals and profile, here's what we suggest.
        </p>
      </div>

      <div className="px-5 pt-5 pb-6 space-y-4 flex-1">
        {/* Investment paths */}
        {PATHS.map((path) => {
          const Icon = path.icon;
          const isSelected = selected === path.id;
          return (
            <button
              key={path.id}
              onClick={() => setSelected(path.id)}
              className="w-full text-left rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                border: `2px solid ${isSelected ? "#EC0000" : "#E5E5EA"}`,
                boxShadow: isSelected ? "0 4px 16px rgba(236,0,0,0.12)" : "none",
                cursor: "pointer",
                background: "white",
              }}
            >
              <div
                className="px-4 pt-4 pb-3"
                style={{ background: isSelected ? "#FFF8F8" : "#FAFAFA" }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: isSelected ? "#FFF0F0" : "#F0F0F2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color={isSelected ? "#EC0000" : "#717182"} />
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.3 }}>
                        {path.label}
                      </div>
                      <div
                        className="inline-block px-2 py-0.5 rounded-full mt-1"
                        style={{
                          background: `${path.tagColor}14`,
                          color: path.tagColor,
                          fontSize: 10.5,
                          fontWeight: 600,
                          border: `1px solid ${path.tagColor}25`,
                        }}
                      >
                        {path.tag}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#008060" }}>{path.returns}</div>
                    <div style={{ fontSize: 10, color: "#717182" }}>{path.returnLabel}</div>
                  </div>
                </div>
                <p style={{ fontSize: 12.5, color: "#717182", lineHeight: 1.5 }}>{path.desc}</p>
              </div>
              <div className="px-4 pb-4 pt-3 bg-white">
                <p style={{ fontSize: 11, fontWeight: 600, color: "#ADADB8", letterSpacing: "0.05em", marginBottom: 8 }}>
                  PORTFOLIO BREAKDOWN
                </p>
                <AllocationBar allocation={path.allocation} />
                <div className="flex items-center justify-between mt-3">
                  <span style={{ fontSize: 12, color: "#717182" }}>Min. monthly contribution</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A" }}>${path.monthlyMin}/mo</span>
                </div>
              </div>
            </button>
          );
        })}

        {/* Monthly amount selector */}
        <div
          className="p-4 rounded-2xl"
          style={{ background: "#F8F8FA", border: "1px solid #F0F0F2" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>Monthly contribution</span>
            <button
              onClick={() => setShowInfo(!showInfo)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#ADADB8", padding: 0 }}
            >
              <Info size={15} />
            </button>
          </div>
          {showInfo && (
            <p style={{ fontSize: 12, color: "#717182", lineHeight: 1.5, marginBottom: 10, padding: "8px 10px", background: "#FFF8E7", borderRadius: 8 }}>
              Even $25/month invested early grows significantly over time thanks to compound returns.
            </p>
          )}
          <div className="flex gap-2">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                style={{
                  flex: 1,
                  height: 40,
                  borderRadius: 10,
                  border: `2px solid ${amount === a ? "#EC0000" : "transparent"}`,
                  background: amount === a ? "#FFF0F0" : "white",
                  color: amount === a ? "#EC0000" : "#1A1A1A",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                ${a}
              </button>
            ))}
          </div>
          <div
            className="mt-3 flex items-center gap-2 p-2 rounded-lg"
            style={{ background: "rgba(0,128,96,0.08)" }}
          >
            <CheckCircle2 size={14} color="#008060" />
            <span style={{ fontSize: 12, color: "#008060" }}>
              In 5 years, ${amount}/mo could grow to{" "}
              <strong>${(amount * 12 * 5 * 1.068).toFixed(0)}</strong> at 6.8% annually
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-6 pt-2">
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
          Open my iTRADE account
          <ChevronRight size={18} />
        </button>
        <p style={{ textAlign: "center", fontSize: 11.5, color: "#ADADB8", marginTop: 8, lineHeight: 1.5 }}>
          Takes 5 minutes. No commitment. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
