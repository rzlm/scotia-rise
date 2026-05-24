import { useMemo, useState } from "react";
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

const BASE_MILESTONES = [
  { id: 1, label: "Account opened", done: true },
  { id: 2, label: "First deposit made", done: true },
  { id: 3, label: "Set up auto-invest", done: true },
  { id: 4, label: "Read 3 learning cards", done: false },
  { id: 5, label: "Reach $1,000 invested", done: false },
];

const LEARNING_MODULES = [
  {
    id: 1,
    title: "Why diversification helps",
    duration: "30 sec",
    points: [
      "Your money is spread across multiple assets.",
      "A single dip matters less when your portfolio is diversified.",
      "Long-term consistency matters more than perfect timing.",
    ],
  },
  {
    id: 2,
    title: "What to expect from market ups and downs",
    duration: "35 sec",
    points: [
      "Short-term changes are normal and expected.",
      "Your plan is designed for your timeline, not daily swings.",
      "Regular investing can smooth out volatility over time.",
    ],
  },
];

const ACTION_ITEMS = [
  { id: "learning", icon: BookOpen, color: "#7B3FD4", bg: "#F4EEFF" },
  { id: "target", icon: Target, color: "#0066CC", bg: "#EFF5FF", label: "Set a savings target for your FHSA" },
  { id: "alerts", icon: Bell, color: "#EC0000", bg: "#FFF0F0", label: "Enable deposit alerts" },
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
  const [showLearningModules, setShowLearningModules] = useState(false);
  const [completedLearningModules, setCompletedLearningModules] = useState<number[]>([]);

  const remainingLearningModules = Math.max(0, 2 - completedLearningModules.length);
  const learningLabel =
    remainingLearningModules > 0
      ? `Complete ${remainingLearningModules} more learning module${remainingLearningModules === 1 ? "" : "s"}`
      : "Learning modules complete";

  const milestones = useMemo(
    () =>
      BASE_MILESTONES.map((milestone) =>
        milestone.id === 4 ? { ...milestone, done: completedLearningModules.length >= 2 } : milestone,
      ),
    [completedLearningModules],
  );

  const doneMilestones = milestones.filter((m) => m.done).length;
  const confidenceScore = 72;

  const toggleLearningModuleComplete = (moduleId: number) => {
    setCompletedLearningModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId],
    );
  };

  const handleNextAction = (actionId: string) => {
    if (actionId === "learning") {
      setShowLearningModules(true);
      return;
    }
    onNext();
  };

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
            {milestones.map((m, i) => (
              <div
                key={m.id}
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: i < milestones.length - 1 ? "1px solid #F8F8FA" : "none" }}
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
            {ACTION_ITEMS.map(({ id, icon: Icon, label, color, bg }) => (
              <button
                key={id}
                onClick={() => handleNextAction(id)}
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
                <span style={{ flex: 1, fontSize: 13, color: "#1A1A1A", lineHeight: 1.4 }}>
                  {id === "learning" ? learningLabel : label}
                </span>
                <ChevronRight size={15} color="#ADADB8" />
              </button>
            ))}
          </div>

          {showLearningModules && (
            <div
              className="mt-3 rounded-2xl p-3"
              style={{ background: "#FBFAFF", border: "1px solid #EEE8FF" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: 13, fontWeight: 700, color: "#3F2C67" }}>Learning modules</span>
                <span style={{ fontSize: 11.5, color: "#7D6AA5" }}>
                  {completedLearningModules.length}/2 completed
                </span>
              </div>
              <div className="space-y-2">
                {LEARNING_MODULES.map((module) => {
                  const done = completedLearningModules.includes(module.id);
                  return (
                    <div
                      key={module.id}
                      className="rounded-xl p-3"
                      style={{ background: "#FFFFFF", border: "1px solid #EEE8FF" }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{module.title}</p>
                          <p style={{ fontSize: 11.5, color: "#7D6AA5" }}>{module.duration}</p>
                        </div>
                        <button
                          onClick={() => toggleLearningModuleComplete(module.id)}
                          style={{
                            border: `1px solid ${done ? "#A9E1CE" : "#E1E3EA"}`,
                            background: done ? "#EBF7F3" : "#F8F8FA",
                            color: done ? "#008060" : "#5E6372",
                            height: 30,
                            padding: "0 10px",
                            borderRadius: 999,
                            fontSize: 11.5,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          {done ? "Completed" : "Mark complete"}
                        </button>
                      </div>
                      <ul className="pl-4" style={{ margin: 0 }}>
                        {module.points.map((point) => (
                          <li key={point} style={{ fontSize: 12, color: "#5E6372", lineHeight: 1.45, marginBottom: 4 }}>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
