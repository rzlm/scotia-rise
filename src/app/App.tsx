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
import { LearningModulesScreen } from "./components/LearningModulesScreen";

export default function App() {
  const [screen, setScreen] = useState(1);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [direction, setDirection] = useState(1);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const goNext = () => {
    setDirection(1);
    setScreen((s) => Math.min(s + 1, screenLabels.length));
  };

  const goBack = () => {
    setDirection(-1);
    setScreen((s) => Math.max(s - 1, 1));
  };

  const navigateToScreen = (targetScreen: number) => {
    const clamped = Math.max(1, Math.min(targetScreen, screenLabels.length));
    setDirection(clamped >= screen ? 1 : -1);
    setScreen(clamped);
  };

  const screenProps: ScreenProps = {
    onNext: goNext,
    onBack: goBack,
    navigateToScreen,
    profile,
    setProfile,
    completedModules,
    setCompletedModules,
  };

  const screens = [
    <WelcomeScreen key="welcome" {...screenProps} />,
    <GoalSelection key="goals" {...screenProps} />,
    <InvestorProfile key="profile" {...screenProps} />,
    <EmbeddedLearning key="learning" {...screenProps} />,
    <FirstInvestment key="investment" {...screenProps} />,
    <ProgressDashboard key="dashboard" {...screenProps} />,
    <ContextualNudge key="nudge" {...screenProps} />,
    <LearningModulesScreen key="modules" {...screenProps} />,
  ];

  return (
    <AppShell currentScreen={screen} direction={direction}>
      {screens[screen - 1]}
    </AppShell>
  );
}
