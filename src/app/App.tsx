import { useState } from "react";
import { defaultProfile, screenLabels } from "./data/onboarding";
import type { ScreenProps, UserProfile } from "./types";
import { AppShell } from "./components/shell/AppShell";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { GoalSelection } from "./components/GoalSelection";
import { InvestorProfile } from "./components/InvestorProfile";
import { EmbeddedLearning } from "./components/EmbeddedLearning";
import { FirstInvestment } from "./components/FirstInvestment";
import { ProgressDashboard } from "./components/ProgressDashboard";
import { ContextualNudge } from "./components/ContextualNudge";

export default function App() {
  const [screen, setScreen] = useState(1);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    setScreen((s) => Math.min(s + 1, screenLabels.length));
  };

  const goBack = () => {
    setDirection(-1);
    setScreen((s) => Math.max(s - 1, 1));
  };

  const screenProps: ScreenProps = { onNext: goNext, onBack: goBack, profile, setProfile };

  const screens = [
    <WelcomeScreen key="welcome" {...screenProps} />,
    <GoalSelection key="goals" {...screenProps} />,
    <InvestorProfile key="profile" {...screenProps} />,
    <EmbeddedLearning key="learning" {...screenProps} />,
    <FirstInvestment key="investment" {...screenProps} />,
    <ProgressDashboard key="dashboard" {...screenProps} />,
    <ContextualNudge key="nudge" {...screenProps} />,
  ];

  return (
    <AppShell currentScreen={screen} direction={direction}>
      {screens[screen - 1]}
    </AppShell>
  );
}
