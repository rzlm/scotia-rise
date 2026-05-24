import { useMemo, useState } from "react";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, CheckCircle2, Clock3 } from "lucide-react";
import type { ScreenProps } from "../types";

type ModuleId = 1 | 2 | 3;

interface ModulePage {
  title: string;
  body: string;
  points: string[];
  accent: string;
  surface: string;
}

interface LearningModule {
  id: ModuleId;
  title: string;
  subtitle: string;
  duration: string;
  pages: ModulePage[];
}

const MODULES: LearningModule[] = [
  {
    id: 1,
    title: "Why diversification helps",
    subtitle: "Understand how spreading investments lowers concentration risk",
    duration: "2-3 min",
    pages: [
      {
        title: "Your money is not in one place",
        body: "Diversification means your investment is split across different asset types and regions instead of relying on one company or one market.",
        points: [
          "Bonds, Canadian equities, and global equities can react differently.",
          "If one area underperforms, others can help stabilize results.",
          "This is designed to reduce large swings from single bets.",
        ],
        accent: "#7B3FD4",
        surface: "#F8F4FF",
      },
      {
        title: "Risk is managed, not removed",
        body: "All investing has risk, but diversification is a practical way to avoid overexposure to one outcome.",
        points: [
          "Lower concentration can reduce severe drawdowns.",
          "A balanced mix can improve consistency over long periods.",
          "It supports confidence when markets are noisy.",
        ],
        accent: "#5A2AA9",
        surface: "#F6F1FF",
      },
      {
        title: "What this means for your first investment",
        body: "Your first contribution starts a diversified plan from day one. You are building a process, not trying to guess the perfect moment.",
        points: [
          "Start with a manageable monthly amount.",
          "Keep contributions regular over time.",
          "Review progress against your goal timeline.",
        ],
        accent: "#4B1E99",
        surface: "#F3EEFF",
      },
    ],
  },
  {
    id: 2,
    title: "What to expect from market ups and downs",
    subtitle: "Build confidence to stay consistent through normal volatility",
    duration: "3 min",
    pages: [
      {
        title: "Volatility is normal",
        body: "Market prices move up and down every day. Short-term changes are expected and do not automatically mean your plan is off track.",
        points: [
          "Daily movement is part of investing.",
          "Short windows can look noisy or unpredictable.",
          "Your portfolio is built around long-term goals.",
        ],
        accent: "#0066CC",
        surface: "#EFF5FF",
      },
      {
        title: "Time in market matters",
        body: "Trying to time perfect entry points often creates stress. Staying invested and contributing regularly can be more effective for beginners.",
        points: [
          "Consistency can smooth outcomes over time.",
          "Automatic contributions remove decision fatigue.",
          "Your strategy should match your timeline and risk level.",
        ],
        accent: "#0052A3",
        surface: "#EAF2FF",
      },
      {
        title: "How to respond during downturns",
        body: "When markets dip, your plan is your anchor. Focus on contribution habits and goal progress before making reactive changes.",
        points: [
          "Revisit your goal and horizon first.",
          "Avoid panic-selling after short-term drops.",
          "Use check-ins to adjust only when your goal changes.",
        ],
        accent: "#003E7A",
        surface: "#E5EFFF",
      },
    ],
  },
  {
    id: 3,
    title: "How regular contributions build momentum",
    subtitle: "See how consistency can reduce stress and improve long-term outcomes",
    duration: "3-4 min",
    pages: [
      {
        title: "Consistency beats perfect timing",
        body: "Many beginners wait for the 'perfect' moment to invest. A repeatable contribution habit is usually more practical than trying to predict market moves.",
        points: [
          "A fixed schedule keeps your plan moving.",
          "You avoid delaying progress during uncertainty.",
          "Small amounts can add up meaningfully over time.",
        ],
        accent: "#008060",
        surface: "#ECF8F3",
      },
      {
        title: "Dollar-cost averaging in plain language",
        body: "When you invest at regular intervals, you naturally buy at different prices over time. This can help smooth the effect of short-term volatility.",
        points: [
          "Some months you buy at higher prices.",
          "Other months you buy at lower prices.",
          "Over time, this can reduce pressure to time entries perfectly.",
        ],
        accent: "#007152",
        surface: "#E8F5EE",
      },
      {
        title: "Set a contribution level you can sustain",
        body: "The best starting amount is one you can keep going. You can increase contributions later as your comfort and budget improve.",
        points: [
          "Start with an amount that feels realistic each month.",
          "Automate deposits to reduce friction.",
          "Review and adjust quarterly, not daily.",
        ],
        accent: "#005C42",
        surface: "#E2F2EA",
      },
    ],
  },
];

export function LearningModulesScreen({ onBack, navigateToScreen, completedModules, setCompletedModules }: ScreenProps) {
  const [activeModuleId, setActiveModuleId] = useState<ModuleId | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const activeModule = useMemo(
    () => MODULES.find((module) => module.id === activeModuleId) ?? null,
    [activeModuleId],
  );

  const startModule = (moduleId: ModuleId) => {
    setActiveModuleId(moduleId);
    setPageIndex(0);
  };

  const completeActiveModule = () => {
    if (!activeModule) {
      return;
    }

    setCompletedModules((previous) =>
      previous.includes(activeModule.id) ? previous : [...previous, activeModule.id],
    );
    setActiveModuleId(null);
    setPageIndex(0);
  };

  if (activeModule) {
    const totalPages = activeModule.pages.length;
    const page = activeModule.pages[pageIndex];
    const isFirstPage = pageIndex === 0;
    const isLastPage = pageIndex === totalPages - 1;

    return (
      <div className="flex h-full flex-col bg-white">
        <div
          className="px-5 pt-5 pb-6"
          style={{ background: "linear-gradient(160deg, #C8102E 0%, #EC0000 100%)" }}
        >
          <button
            onClick={() => {
              setActiveModuleId(null);
              setPageIndex(0);
            }}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.82)",
              cursor: "pointer",
              padding: 0,
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginBottom: 16,
            }}
          >
            <ArrowLeft size={15} />
            Back to modules
          </button>

          <div className="flex items-center gap-2 mb-4">
            {activeModule.pages.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === pageIndex ? 22 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i <= pageIndex ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.32)",
                }}
              />
            ))}
            <span style={{ color: "rgba(255,255,255,0.74)", fontSize: 11, marginLeft: 4 }}>
              Page {pageIndex + 1} of {totalPages}
            </span>
          </div>

          <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, lineHeight: 1.25, marginBottom: 6 }}>
            {activeModule.title}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 13.5, lineHeight: 1.5 }}>
            {activeModule.subtitle}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <section
            className="rounded-2xl p-4"
            style={{ background: page.surface, border: `1px solid ${page.accent}22` }}
          >
            <p style={{ color: page.accent, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8 }}>
              LEARNING PAGE {pageIndex + 1}
            </p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.32, marginBottom: 10 }}>
              {page.title}
            </h3>
            <p style={{ fontSize: 13.5, color: "#4A4F5C", lineHeight: 1.65, marginBottom: 12 }}>
              {page.body}
            </p>
            <ul className="pl-4" style={{ margin: 0 }}>
              {page.points.map((point) => (
                <li key={point} style={{ fontSize: 13, color: "#4A4F5C", lineHeight: 1.55, marginBottom: 6 }}>
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div
          className="px-5 pt-3 pb-5"
          style={{ borderTop: "1px solid #F0F0F2", background: "#FFFFFF" }}
        >
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setPageIndex((current) => Math.max(0, current - 1))}
              disabled={isFirstPage}
              className="flex-1 flex items-center justify-center gap-2"
              style={{
                height: 46,
                borderRadius: 12,
                border: "1px solid #E5E5EA",
                background: "#FFFFFF",
                color: isFirstPage ? "#ADADB8" : "#4A4F5C",
                fontSize: 14,
                fontWeight: 600,
                cursor: isFirstPage ? "default" : "pointer",
              }}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            {isLastPage ? (
              <button
                onClick={completeActiveModule}
                className="flex-1 flex items-center justify-center gap-2"
                style={{
                  height: 46,
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #008060, #007152)",
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <CheckCircle2 size={16} />
                Complete Module
              </button>
            ) : (
              <button
                onClick={() => setPageIndex((current) => Math.min(totalPages - 1, current + 1))}
                className="flex-1 flex items-center justify-center gap-2"
                style={{
                  height: 46,
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #EC0000, #C8102E)",
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Next Page
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <div
        className="px-5 pt-5 pb-6"
        style={{ background: "linear-gradient(160deg, #C8102E 0%, #EC0000 100%)" }}
      >
        <button
          onClick={() => navigateToScreen(6)}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.82)",
            cursor: "pointer",
            padding: 0,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 16,
          }}
        >
          <ArrowLeft size={15} />
          Back to dashboard
        </button>

        <h2 style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 700, lineHeight: 1.25, marginBottom: 6 }}>
          Learning Modules
        </h2>
        <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 13.5, lineHeight: 1.5 }}>
          Take a deeper look with guided, multi-page modules designed for first-time investors.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="mb-4 rounded-xl p-3" style={{ background: "#F8F8FA", border: "1px solid #F0F0F2" }}>
          <p style={{ fontSize: 13, color: "#4A4F5C" }}>
            Progress: <strong>{completedModules.length}/{MODULES.length}</strong> modules completed
          </p>
        </div>

        <div className="space-y-3">
          {MODULES.map((module) => {
            const done = completedModules.includes(module.id);
            return (
              <button
                key={module.id}
                onClick={() => startModule(module.id)}
                className="w-full text-left rounded-2xl p-4"
                style={{
                  background: "#FFFFFF",
                  border: `1.5px solid ${done ? "#BFE8DA" : "#E8E8EC"}`,
                  boxShadow: done ? "0 2px 8px rgba(0,128,96,0.08)" : "none",
                  cursor: "pointer",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen size={15} color={done ? "#008060" : "#6A6F7D"} />
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>{module.title}</span>
                    </div>
                    <p style={{ fontSize: 12.5, color: "#6A6F7D", lineHeight: 1.5, marginBottom: 6 }}>
                      {module.subtitle}
                    </p>
                    <div className="flex items-center gap-1.5" style={{ color: "#8B90A0" }}>
                      <Clock3 size={13} />
                      <span style={{ fontSize: 11.5 }}>{module.duration}</span>
                    </div>
                  </div>
                  <div style={{ alignSelf: "center" }}>
                    {done ? (
                      <div className="flex items-center gap-1.5" style={{ color: "#008060", fontSize: 12, fontWeight: 600 }}>
                        <CheckCircle2 size={14} />
                        Completed
                      </div>
                    ) : (
                      <ChevronRight size={18} color="#ADADB8" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-2 pb-5">
        <button
          onClick={onBack}
          className="w-full"
          style={{
            height: 44,
            borderRadius: 12,
            border: "1px solid #E6E7EC",
            background: "#FFFFFF",
            color: "#5D6170",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Continue in onboarding flow
        </button>
      </div>
    </div>
  );
}
