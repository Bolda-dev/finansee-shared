import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import type { HSL } from "@/lib/paletteUtils";

export type CategoryKey = "assets" | "liabilities" | "insurance";

// Defaults — copied from IndexC current state (after blue/green swap):
// assets = teal/green, liabilities = blue, insurance = purple
export const PRESETS: Record<"c" | "b", Record<CategoryKey, HSL>> = {
  c: {
    assets: { h: 174, s: 65, l: 42 },
    liabilities: { h: 225, s: 90, l: 60 },
    insurance: { h: 265, s: 78, l: 65 },
  },
  b: {
    assets: { h: 195, s: 90, l: 62 },
    liabilities: { h: 28, s: 95, l: 62 },
    insurance: { h: 282, s: 80, l: 65 },
  },
};

interface ManualPaletteContextValue {
  colors: Record<CategoryKey, HSL>;
  locks: Record<CategoryKey, boolean>;
  setColor: (key: CategoryKey, color: HSL) => void;
  toggleLock: (key: CategoryKey) => void;
  reset: (preset: "c" | "b") => void;
}

const ManualPaletteContext = createContext<ManualPaletteContextValue | null>(null);

export const ManualPaletteProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColors] = useState<Record<CategoryKey, HSL>>(PRESETS.c);
  const [locks, setLocks] = useState<Record<CategoryKey, boolean>>({
    assets: false,
    liabilities: false,
    insurance: false,
  });

  // When a color changes, also shift all locked colors by the same hue delta
  // so they stay "in harmony" relative to the changed color.
  const setColor = useCallback((key: CategoryKey, next: HSL) => {
    setColors((prev) => {
      const current = prev[key];
      const dh = next.h - current.h;
      const ds = next.s - current.s;
      const dl = next.l - current.l;
      const result: Record<CategoryKey, HSL> = { ...prev, [key]: next };
      (Object.keys(prev) as CategoryKey[]).forEach((k) => {
        if (k === key) return;
        if (locks[k]) {
          const c = prev[k];
          result[k] = {
            h: ((c.h + dh) % 360 + 360) % 360,
            s: Math.min(100, Math.max(20, c.s + ds)),
            l: Math.min(85, Math.max(20, c.l + dl)),
          };
        }
      });
      return result;
    });
  }, [locks]);

  const toggleLock = useCallback((key: CategoryKey) => {
    setLocks((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const reset = useCallback((preset: "c" | "b") => {
    setColors(PRESETS[preset]);
  }, []);

  return (
    <ManualPaletteContext.Provider value={{ colors, locks, setColor, toggleLock, reset }}>
      {children}
    </ManualPaletteContext.Provider>
  );
};

export const useManualPalette = () => {
  const ctx = useContext(ManualPaletteContext);
  if (!ctx) throw new Error("useManualPalette must be used inside ManualPaletteProvider");
  return ctx;
};
