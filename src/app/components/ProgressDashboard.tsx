import { TrendingUp, BookOpen, Target, Bell, ChevronRight, Award, MoreHorizontal } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { ScreenProps } from "../types";
import { BrandMark } from "./common/BrandMark";

const chartData = [
  { month: "Nov", value: 525 },
  { month: "Dec", value: 560 },
  { month: "Jan", value: 545 },
  { month: "Feb", value: 612 },
  { month: "Mar", value: 640 },
  { month: "Apr", value: 680 },
  { month: "May", value: 724 },
];

const MILESTONES = [
  { id: 1, label: "Account opened", done: true },
  { id: 2, label: "First deposit made", done: true },
  { id: 3, label: "Set up auto-invest", done: true },
  { id: 4, label: "Read 3 learning cards", done: false },
  { id: 5, label: "Reach $1,000 invested", done: false },
];

const NEXT_ACTIONS = [
  { icon: BookOpen, label: "Complete 2 more learning modules", color: "#7B3FD4", bg: "#F4EEFF" },
  { icon: Target, label: "Set a savings target for your FHSA", color: "#0066CC", bg: "#EFF5FF" },
  { icon: Bell, label: "Enable deposit alerts", color: "#EC0000", bg: "#FFF0F0" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#1A1A2E", borderRadius: 10, padding: "8px 12px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginBottom: 2 }}>{label}</p>
        <p style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>${payload[0].value}</p>
      </div>
    );
  }
  return null;
}

export function ProgressDashboard({ onNext, onBack }: ScreenProps) {
  const doneMilestones = MILESTONES.filter((m) => m.done).length;
  const confidenceScore = 72;

  return (
    <div className="flex flex-col bg-white" style={{ minHeight: "100%" }}>
      {/* Top nav bar */}
      <div
        className="px-5 pt-4 pb-4 flex items-center justify-between"
        style={{ background: "#fff", borderBottom: "1px solid #F0F0F2" }}
      >
        <BrandMark compact subtitle="iTRADE · Dashboard" />
        <div className="flex items-center gap-3">
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#717182", padding: 0, position: "relative" }}>
            <Bell size={20} />
            <div style={{ position: "absolute", top: 0, right: 0, width: 7, height: 7, borderRadius: "50%", background: "#EC0000", border: "1.5px solid white" }} />
          </button>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #EC0000, #C8102E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            A
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Portfolio value card */}
        <div
          className="mx-4 mt-4 rounded-2xl p-5 overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)",
          }}
        >
          <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", top: -60, right: -40 }} />
          <div className="flex items-start justify-between mb-1">
            <div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11.5, letterSpacing: "0.05em", marginBottom: 4 }}>
                TOTAL PORTFOLIO VALUE
              </p>
              <div className="flex items-end gap-2">
                <span style={{ color: "#fff", fontSize: 32, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.5px" }}>
                  $724.18
                </span>
              </div>
            </div>
            <div
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full"
              style={{ background: "rgba(0,200,120,0.15)", border: "1px solid rgba(0,200,120,0.25)" }}
            >
              <TrendingUp size={12} color="#00C878" />
              <span style={{ color: "#00C878", fontSize: 12, fontWeight: 600 }}>+$37.85</span>
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginBottom: 4 }}>
            +5.5% all time · started Jan 2025
          </p>

          {/* Mini chart */}
          <div style={{ height: 80, marginLeft: -12, marginRight: -12, marginTop: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 12, bottom: 0, left: 12 }}>
                <defs>
                  <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EC0000" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#EC0000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#FF4444"
                  strokeWidth={2}
                  fill="url(#portfolioGrad)"
                  dot={false}
                />
                <Tooltip content={<CustomTooltip />} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mx-4 mt-3">
          {[
            { label: "Invested", value: "$600.00", sub: "6 months" },
            { label: "Returns", value: "+$124.18", sub: "total earned", color: "#008060" },
            { label: "Confidence", value: `${confidenceScore}%`, sub: "score", color: "#EC0000" },
          ].map(({ label, value, sub, color }) => (
            <div
              key={label}
              className="flex-1 rounded-xl p-3"
              style={{ background: "#F8F8FA", border: "1px solid #F0F0F2" }}
            >
              <p style={{ fontSize: 10.5, color: "#ADADB8", letterSpacing: "0.04em", marginBottom: 4 }}>{label.toUpperCase()}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: color || "#1A1A1A", lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: 10.5, color: "#717182", marginTop: 2 }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Learning milestones */}
        <div className="mx-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award size={15} color="#7B3FD4" />
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Learning Milestones</span>
            </div>
            <span style={{ fontSize: 12, color: "#717182" }}>
              {doneMilestones}/{MILESTONES.length} done
            </span>
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #F0F0F2" }}
          >
            {/* Progress bar */}
            <div style={{ height: 4, background: "#F0F0F2" }}>
              <div
                style={{
                  height: "100%",
                  width: `${(doneMilestones / MILESTONES.length) * 100}%`,
                  background: "linear-gradient(90deg, #EC0000, #C8102E)",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
            {MILESTONES.map((m, i) => (
              <div
                key={m.id}
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: i < MILESTONES.length - 1 ? "1px solid #F8F8FA" : "none" }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: m.done ? "#EC0000" : "#F0F0F2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {m.done ? (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D0D0D8" }} />
                  )}
                </div>
                <span style={{ fontSize: 13, color: m.done ? "#1A1A1A" : "#ADADB8", fontWeight: m.done ? 500 : 400 }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next actions */}
        <div className="mx-4 mt-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Next Actions</span>
          </div>
          <div className="space-y-2">
            {NEXT_ACTIONS.map(({ icon: Icon, label, color, bg }) => (
              <button
                key={label}
                onClick={onNext}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl"
                style={{
                  background: "#F8F8FA",
                  border: "1px solid #F0F0F2",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  <Icon size={16} color={color} />
                </div>
                <span style={{ flex: 1, fontSize: 13, color: "#1A1A1A", lineHeight: 1.4 }}>{label}</span>
                <ChevronRight size={15} color="#ADADB8" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
