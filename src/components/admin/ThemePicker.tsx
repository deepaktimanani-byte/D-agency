"use client";
import { useTheme, type Theme } from "@/components/ThemeProvider";

const THEMES: { id: Theme; label: string; style: React.CSSProperties }[] = [
  { id: "navy",    label: "Navy",    style: { backgroundColor: "#1B2D5E" } },
  { id: "orange",  label: "Orange",  style: { backgroundColor: "#E8621A" } },
  { id: "emerald", label: "Emerald", style: { backgroundColor: "#059669" } },
  { id: "purple",  label: "Purple",  style: { backgroundColor: "#7C3AED" } },
  { id: "sunset",  label: "Sunset",  style: { background: "linear-gradient(135deg, #F97316 50%, #EC4899 50%)" } },
];

export function ThemePicker() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5" title="Change theme">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.label}
          style={t.style}
          className={`w-5 h-5 rounded-full transition-all hover:scale-110 focus:outline-none ${
            theme === t.id
              ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
              : "opacity-70 hover:opacity-100"
          }`}
        />
      ))}
    </div>
  );
}
