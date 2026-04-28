import { createContext, useContext, useState, ReactNode } from "react";

interface VersionCSettings {
  boldCards: boolean; // נכסים/התחייבויות/ביטוח — full colored gradient
  centerBar: boolean; // מרכז פיננסי — top color bar + grayscale icons
  setBoldCards: (v: boolean) => void;
  setCenterBar: (v: boolean) => void;
}

const Ctx = createContext<VersionCSettings | null>(null);

export const VersionCSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [boldCards, setBoldCards] = useState(false);
  const [centerBar, setCenterBar] = useState(false);
  return (
    <Ctx.Provider value={{ boldCards, centerBar, setBoldCards, setCenterBar }}>
      {children}
    </Ctx.Provider>
  );
};

export const useVersionCSettings = () => {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Safe fallback — non-C routes can call the hook harmlessly
    return {
      boldCards: false,
      centerBar: false,
      setBoldCards: () => {},
      setCenterBar: () => {},
    } as VersionCSettings;
  }
  return ctx;
};
