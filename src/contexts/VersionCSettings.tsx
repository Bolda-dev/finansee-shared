import { createContext, useContext, useState, ReactNode } from "react";

interface VersionCSettings {
  boldCards: boolean; // נכסים/התחייבויות/ביטוח — full colored gradient
  centerBar: boolean; // מרכז פיננסי — top color bar + grayscale icons
  innerGrid: boolean; // עמודים פנימיים — תצוגת גריד במקום ליסט
  logoLeft: boolean; // לוגו בצד שמאל במקום מרכז
  filledIconsD: boolean; // דארק — אייקוני קטגוריות עם רקע מלא צבעוני ואייקון לבן
  setBoldCards: (v: boolean) => void;
  setCenterBar: (v: boolean) => void;
  setInnerGrid: (v: boolean) => void;
  setLogoLeft: (v: boolean) => void;
  setFilledIconsD: (v: boolean) => void;
}

const Ctx = createContext<VersionCSettings | null>(null);

export const VersionCSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [boldCards, setBoldCards] = useState(false);
  const [centerBar, setCenterBar] = useState(false);
  const [innerGrid, setInnerGrid] = useState(false);
  const [logoLeft, setLogoLeft] = useState(false);
  const [filledIconsD, setFilledIconsD] = useState(false);
  return (
    <Ctx.Provider
      value={{ boldCards, centerBar, innerGrid, logoLeft, filledIconsD, setBoldCards, setCenterBar, setInnerGrid, setLogoLeft, setFilledIconsD }}
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
      logoLeft: false,
      setBoldCards: () => {},
      setCenterBar: () => {},
      setInnerGrid: () => {},
      setLogoLeft: () => {},
    } as VersionCSettings;
  }
  return ctx;
};
