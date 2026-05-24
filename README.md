
# Scotia Rise

Scotia Rise is a mobile-first investing onboarding prototype designed to help first-time investors move from curiosity to action with confidence.

This project is a submission for [case]hacks.

## Overview

The experience focuses on reducing early-stage investing anxiety by embedding clear, timely guidance directly into the onboarding journey.

Instead of sending users to a separate learning center, Scotia Rise introduces a short in-flow learning moment right before the first investment decision.

## Problem We Address

Many beginner investors drop off before funding their first investment because they feel uncertain about risk, terminology, and whether they are making the right choice.

Scotia Rise addresses this by:
1. Keeping explanations short and context-aware
2. Using plain language instead of financial jargon
3. Preserving momentum inside a single guided flow

## Key Product Flow

The current prototype includes these screens:
1. Welcome
2. Goal Selection
3. Investor Profile
4. Embedded Learning Moment ("Before you invest")
5. First Investment
6. Progress Dashboard
7. Contextual Nudge

## Embedded Learning Module

The in-app learning screen is intentionally lightweight and designed to be completed in under 60 seconds.

It includes:
1. Quick concept card:
Money deposited -> diversified investment -> long-term growth
2. Interactive explanation:
User selects what matters most, then receives a tailored explanation
3. Confidence check:
Captures readiness before continuing

Primary CTA:
Continue to Investment

Secondary CTA:
Save and learn later

## Design Direction

1. Mobile-native layout
2. Clean white interface with subtle red accents
3. Modern banking visual language
4. Confidence-building tone
5. Minimal cognitive load and low friction progression

## Tech Stack

1. React 18
2. TypeScript
3. Vite
4. Tailwind CSS utilities
5. Motion (animation)
6. Lucide icons

## Getting Started

Prerequisites:
1. Node.js 18+
2. pnpm 9+

Install dependencies:

```bash
pnpm install
```

Run locally:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Project Structure

1. App entry: [src/app/App.tsx](src/app/App.tsx)
2. Onboarding data: [src/app/data/onboarding.ts](src/app/data/onboarding.ts)
3. Screen components: [src/app/components](src/app/components)
4. Shared shell: [src/app/components/shell/AppShell.tsx](src/app/components/shell/AppShell.tsx)
5. Styles: [src/styles](src/styles)

