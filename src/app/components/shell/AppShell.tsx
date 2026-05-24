import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

interface AppShellProps {
  children: ReactNode;
  currentScreen: number;
  direction: number;
}

export function AppShell({ children, currentScreen, direction }: AppShellProps) {
  return (
    <main
      className="min-h-dvh w-full overflow-x-hidden bg-white"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={currentScreen}
          custom={direction}
          initial={{ x: direction * 56, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * 56, opacity: 0 }}
          transition={{ type: "tween", duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="product-flow-screen min-h-dvh w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
