"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "navy" | "orange" | "emerald" | "purple" | "sunset";

export const THEME_VARS: Record<Theme, {
  navy: string; navyDark: string; navyLight: string; bgMint: string; accentTeal: string; bgDark: string;
}> = {
  navy:    { navy: "#1B2D5E", navyDark: "#0F1F42", navyLight: "#2D4A9A", bgMint: "#EDF7F3", accentTeal: "#4DBFA0", bgDark: "#0D1B35" },
  orange:  { navy: "#E8621A", navyDark: "#C4501A", navyLight: "#F07A3A", bgMint: "#FFF4EF", accentTeal: "#F59E0B", bgDark: "#431407" },
  emerald: { navy: "#059669", navyDark: "#047857", navyLight: "#10B981", bgMint: "#ECFDF5", accentTeal: "#34D399", bgDark: "#022C22" },
  purple:  { navy: "#7C3AED", navyDark: "#6D28D9", navyLight: "#8B5CF6", bgMint: "#F5F3FF", accentTeal: "#A78BFA", bgDark: "#1E0A3C" },
  sunset:  { navy: "#F97316", navyDark: "#EA6C0A", navyLight: "#FB923C", bgMint: "#FFF7ED", accentTeal: "#EC4899", bgDark: "#431407" },
};

function applyThemeVars(t: Theme) {
  const v = THEME_VARS[t];
  const s = document.documentElement.style;
  s.setProperty("--color-navy",        v.navy);
  s.setProperty("--color-navy-dark",   v.navyDark);
  s.setProperty("--color-navy-light",  v.navyLight);
  s.setProperty("--color-bg-mint",     v.bgMint);
  s.setProperty("--color-accent-teal", v.accentTeal);
  s.setProperty("--color-bg-dark",     v.bgDark);
}

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "navy",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("navy");

  useEffect(() => {
    const saved = (localStorage.getItem("site-theme") as Theme | null) ?? "navy";
    setThemeState(saved);
    applyThemeVars(saved);
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("site-theme", t);
    applyThemeVars(t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
