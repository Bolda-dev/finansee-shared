import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StickyHeaderProps {
  title: string;
  backTo: string;
  gradient: string;
  threshold?: number;
  shadowColor?: string;
  textColor?: string;
}

/**
 * Compact header that slides down from the top when the user scrolls past `threshold`.
 * Mirrors the back button + centered title pattern used in the page hero banner.
 */
export const StickyHeader = ({
  title,
  backTo,
  gradient,
  threshold = 140,
  shadowColor = "hsla(0, 0%, 0%, 0.18)",
  textColor = "white",
}: StickyHeaderProps) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 transition-all duration-300"
      style={{
        background: gradient,
        boxShadow: visible ? `0 4px 14px ${shadowColor}` : "none",
        transform: visible ? "translate(-50%, 0)" : "translate(-50%, -100%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      dir="rtl"
    >
      <div
        className="relative flex items-center justify-center px-4 py-3 min-h-[44px]"
        style={{ color: textColor }}
        dir="rtl"
      >
        <button
          onClick={() => navigate(backTo)}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-all hover:scale-105 active:scale-95"
          style={{
            background:
              textColor === "white" ? "hsla(0,0%,100%,0.18)" : "hsla(0,0%,0%,0.08)",
            border:
              textColor === "white"
                ? "1px solid hsla(0,0%,100%,0.25)"
                : "1px solid hsla(0,0%,0%,0.10)",
            backdropFilter: "blur(8px)",
            color: textColor,
          }}
          aria-label="חזרה"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <h1
          className="text-[14px] font-extrabold truncate max-w-[230px]"
          style={{ color: textColor }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};
