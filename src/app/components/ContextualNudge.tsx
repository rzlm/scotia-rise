import { useState } from "react";
import { TrendingUp, X, ChevronRight, Info, Repeat, CheckCircle2, ArrowLeft, Bell } from "lucide-react";
import type { ScreenProps } from "../types";
import { BrandMark } from "./common/BrandMark";

function NudgeCard({
  onAccept,
  onDismiss,
}: {
  onAccept: () => void;
  onDismiss: () => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1.5px solid #EC0000",
        boxShadow: "0 8px 28px rgba(236,0,0,0.12)",
      }}
    >
      {/* Card top accent */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: "linear-gradient(135deg, #EC0000 0%, #C8102E 100%)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingUp size={14} color="white" />
          </div>
          <span style={{ color: "#fff", fontSize: 12.5, fontWeight: 600 }}>Smart Investing Nudge</span>
        </div>
        <button
          onClick={onDismiss}
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", padding: 0 }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Main message */}
      <div className="p-4 bg-white">
        <div
          className="flex items-center gap-3 p-3 rounded-xl mb-4"
          style={{ background: "#F8F8FA", border: "1px solid #F0F0F2" }}
        >
          <div style={{ fontSize: 28 }}>🎉</div>
          <div>
            <p style={{ fontSize: 13.5, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.3 }}>
              You saved <span style={{ color: "#008060" }}>$400 more</span> this month!
            </p>
            <p style={{ fontSize: 12, color: "#717182", marginTop: 2 }}>
              April vs March spending comparison
            </p>
          </div>
        </div>

        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.35, marginBottom: 8 }}>
          Want to put $50 of that toward your FHSA?
        </h3>

        <p style={{ fontSize: 13, color: "#717182", lineHeight: 1.6, marginBottom: 12 }}>
          You've been saving more consistently lately. A one-time $50 contribution keeps your momentum going — without changing your monthly plan.
        </p>

        {/* Impact preview */}
        <div
          className="rounded-xl p-3 mb-4"
          style={{ background: "#EBF7F3", border: "1px solid #C0E8DB" }}
        >
          <p style={{ fontSize: 11.5, fontWeight: 700, color: "#005C42", letterSpacing: "0.04em", marginBottom: 6 }}>
            WHAT $50 MORE DOES TODAY
          </p>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>$50</p>
              <p style={{ fontSize: 10.5, color: "#717182" }}>invested now</p>
            </div>
            <div style={{ flex: 1, height: 2, background: "#C0E8DB", margin: "0 10px" }}>
              <div style={{ position: "relative" }}>
                <ChevronRight style={{ position: "absolute", right: -8, top: -8, color: "#008060" }} size={16} />
              </div>
            </div>
            <div className="text-center">
              <p style={{ fontSize: 14, fontWeight: 700, color: "#008060" }}>~$97</p>
              <p style={{ fontSize: 10.5, color: "#717182" }}>in 10 years</p>
            </div>
          </div>
          <p style={{ fontSize: 10.5, color: "#717182", marginTop: 6, textAlign: "center" }}>
            Estimated at 6.8% avg. annual return
          </p>
        </div>

        {/* CTA buttons */}
        <button
          onClick={onAccept}
          className="w-full flex items-center justify-center gap-2 mb-2"
          style={{
            background: "linear-gradient(135deg, #EC0000, #C8102E)",
            color: "#fff",
            height: 48,
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(236,0,0,0.3)",
          }}
        >
          Yes, invest $50 now
          <ChevronRight size={16} />
        </button>
        <button
          onClick={onDismiss}
          style={{
            width: "100%",
            height: 42,
            background: "transparent",
            border: "none",
            color: "#717182",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Not right now
        </button>
      </div>
    </div>
  );
}

function SuccessCard({ amount, onSetupAuto }: { amount: number; onSetupAuto: () => void }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1.5px solid #C0E8DB", boxShadow: "0 8px 28px rgba(0,128,96,0.1)" }}
    >
      <div
        className="flex items-center gap-3 px-4 py-4"
        style={{ background: "linear-gradient(135deg, #008060, #00A070)" }}
      >
        <CheckCircle2 size={22} color="white" />
        <span style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>
          ${amount} invested successfully!
        </span>
      </div>
      <div className="p-4 bg-white">
        <p style={{ fontSize: 13, color: "#717182", lineHeight: 1.6, marginBottom: 14 }}>
          Nice move. Your FHSA portfolio has been updated. Keep the momentum going with automatic investing.
        </p>
        <button
          onClick={onSetupAuto}
          className="w-full flex items-center justify-center gap-2"
          style={{
            background: "#EBF7F3",
            color: "#008060",
            height: 44,
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            border: "1.5px solid #C0E8DB",
            cursor: "pointer",
          }}
        >
          <Repeat size={15} />
          Set up automatic investing
        </button>
      </div>
    </div>
  );
}

function AutoSetupCard({ onBack }: { onBack: () => void }) {
  const [frequency, setFrequency] = useState<"weekly" | "biweekly" | "monthly">("monthly");
  const [amount, setAmount] = useState(50);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-2xl p-5 text-center" style={{ background: "#F8F8FA", border: "1px solid #F0F0F2" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A", marginBottom: 6 }}>
          Auto-invest is on!
        </h3>
        <p style={{ fontSize: 13, color: "#717182", lineHeight: 1.6 }}>
          ${amount} will be invested automatically every {frequency === "biweekly" ? "2 weeks" : frequency === "weekly" ? "week" : "month"}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #E5E5EA" }}>
      <div className="px-4 pt-4 pb-3" style={{ background: "#F8F8FA" }}>
        <div className="flex items-center gap-2 mb-1">
          <Repeat size={15} color="#EC0000" />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Set up Auto-Invest</span>
        </div>
        <p style={{ fontSize: 12, color: "#717182" }}>
          Invest a fixed amount automatically — set it and forget it.
        </p>
      </div>
      <div className="p-4 bg-white space-y-4">
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#717182", marginBottom: 8, letterSpacing: "0.04em" }}>
            HOW OFTEN?
          </p>
          <div className="flex gap-2">
            {(["weekly", "biweekly", "monthly"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 10,
                  border: `2px solid ${frequency === f ? "#EC0000" : "transparent"}`,
                  background: frequency === f ? "#FFF0F0" : "#F8F8FA",
                  color: frequency === f ? "#EC0000" : "#717182",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {f === "biweekly" ? "Bi-weekly" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#717182", marginBottom: 8, letterSpacing: "0.04em" }}>
            AMOUNT
          </p>
          <div className="flex gap-2">
            {[25, 50, 100, 200].map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 10,
                  border: `2px solid ${amount === a ? "#EC0000" : "transparent"}`,
                  background: amount === a ? "#FFF0F0" : "#F8F8FA",
                  color: amount === a ? "#EC0000" : "#1A1A1A",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ${a}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => setDone(true)}
          style={{
            width: "100%",
            height: 44,
            borderRadius: 12,
            background: "linear-gradient(135deg, #EC0000, #C8102E)",
            color: "white",
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(236,0,0,0.25)",
          }}
        >
          Confirm Auto-Invest
        </button>
      </div>
    </div>
  );
}

export function ContextualNudge({ onBack }: ScreenProps) {
  const [state, setState] = useState<"nudge" | "success" | "auto">("nudge");

  return (
    <div className="flex flex-col bg-white" style={{ minHeight: "100%" }}>
      {/* Header bar */}
      <div
        className="px-5 pt-4 pb-4 flex items-center justify-between"
        style={{ background: "#fff", borderBottom: "1px solid #F0F0F2" }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#717182", padding: 0, marginRight: 4 }}
          >
            <ArrowLeft size={18} />
          </button>
          <BrandMark compact subtitle="iTRADE" />
        </div>
        <div className="relative">
          <Bell size={20} color="#717182" />
          <div style={{ position: "absolute", top: 0, right: 0, width: 7, height: 7, borderRadius: "50%", background: "#EC0000", border: "1.5px solid white" }} />
        </div>
      </div>

      <div className="flex-1 px-5 pt-5 pb-6">
        {/* Context label */}
        <div
          className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl"
          style={{ background: "#FFF8E7", border: "1px solid #FDECC5" }}
        >
          <Info size={13} color="#A07800" />
          <p style={{ fontSize: 12, color: "#7A6000", lineHeight: 1.4 }}>
            <strong>Smart Nudge</strong> — based on your spending pattern this month
          </p>
        </div>

        {/* Main card */}
        {state === "nudge" && (
          <NudgeCard
            onAccept={() => setState("success")}
            onDismiss={() => setState("nudge")}
          />
        )}
        {state === "success" && (
          <SuccessCard amount={50} onSetupAuto={() => setState("auto")} />
        )}
        {state === "auto" && (
          <AutoSetupCard onBack={() => setState("success")} />
        )}

        {/* Context explanation */}
        {state === "nudge" && (
          <div className="mt-4 space-y-2">
            <p style={{ fontSize: 12.5, fontWeight: 600, color: "#717182", letterSpacing: "0.04em" }}>
              WHY AM I SEEING THIS?
            </p>
            <div className="space-y-2">
              {[
                "You spent $400 less in April than March",
                "Your FHSA has room for $6,800 more this year",
                "You've been on track with your savings goal",
              ].map((reason) => (
                <div key={reason} className="flex items-start gap-2">
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#EC0000", marginTop: 6, flexShrink: 0 }} />
                  <p style={{ fontSize: 12.5, color: "#717182", lineHeight: 1.5 }}>{reason}</p>
                </div>
              ))}
            </div>
            <button
              style={{
                marginTop: 4,
                background: "none",
                border: "none",
                color: "#ADADB8",
                fontSize: 12,
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <X size={12} />
              Stop showing nudges like this
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
