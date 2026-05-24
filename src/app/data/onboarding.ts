import type { UserProfile } from "../types";

export const defaultProfile: UserProfile = {
  goals: [],
  risk: "balanced",
  timeHorizon: "medium",
  experience: "beginner",
};

export const screenLabels = [
  "Welcome",
  "Your Goals",
  "Your Profile",
  "Learn",
  "First Investment",
  "Dashboard",
  "Smart Nudge",
  "Learning Modules",
] as const;

export type ScreenLabel = (typeof screenLabels)[number];

