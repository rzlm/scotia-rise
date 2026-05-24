export type Goal = "fhsa" | "travel" | "emergency" | "wealth";
export type RiskLevel = "conservative" | "balanced" | "growth";
export type TimeHorizon = "short" | "medium" | "long";
export type Experience = "beginner" | "some" | "experienced";

export interface UserProfile {
  goals: Goal[];
  risk: RiskLevel;
  timeHorizon: TimeHorizon;
  experience: Experience;
}

export interface ScreenProps {
  onNext: () => void;
  onBack: () => void;
  navigateToScreen: (screen: number) => void;
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  completedModules: number[];
  setCompletedModules: React.Dispatch<React.SetStateAction<number[]>>;
}

