import { createContext, useContext, useState, ReactNode } from "react";

interface VersionCSettings {
  boldCards: boolean; // נכסים/התחייבויות/ביטוח — full colored gradient
  centerBar: boolean; // מרכז פיננסי — top color bar + grayscale icons
  innerGrid: boolean; // עמודים פנימיים — תצוגת גריד במקום ליסט
  setBoldCards: (v: boolean) => void;
  setCenterBar: (v: boolean) => void;
  setInnerGrid: (v: boolean) => void;
}

const Ctx = createContext<VersionCSettings | null>(null);

export const VersionCSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [boldCards, setBoldCards] = useState(false);
  const [centerBar, setCenterBar] = useState(false);
  const [innerGrid, setInnerGrid] = useState(false);
  return (
    <Ctx.Provider
      value={{ boldCards, centerBar, innerGrid, setBoldCards, setCenterBar, setInnerGrid }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useVersionCSettings = () => {
  const ctx = useContext(Ctx);
  if (!ctx) {
    return {
      boldCards: false,
      centerBar: false,
      innerGrid: false,
      setBoldCards: () => {},
      setCenterBar: () => {},
      setInnerGrid: () => {},
    } as VersionCSettings;
  }
  return ctx;
};
