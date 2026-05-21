import { useEffect, useState } from "react";
import { X } from "lucide-react";

const formatNIS = (n: number) => "₪" + n.toLocaleString("he-IL");

interface Props {
  productId: string;
  savings: number;
  onOpen: () => void;
  onClose: () => void;
}

export function DanaTeaserBubbles({ productId, savings, onOpen, onClose }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 250);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  const dismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.setItem(`dana-teaser-${productId}`, "1");
    onClose();
  };

  const open = () => {
    sessionStorage.setItem(`dana-teaser-${productId}`, "1");
    onOpen();
  };

  return (
    <div
      className="fixed bottom-4 left-4 z-40 pointer-events-none"
      dir="rtl"
      style={{ animation: "danaBubbleIn 0.35s ease-out both" }}
    >
      <div className="relative pointer-events-auto">
        {/* Tooltip tail */}
        <span
          aria-hidden
          className="absolute -bottom-1.5 left-6 w-3 h-3 rotate-45"
          style={{
            background: "white",
            borderRight: "1px solid hsl(230, 20%, 92%)",
            borderBottom: "1px solid hsl(230, 20%, 92%)",
          }}
        />

        <button
          onClick={open}
          className="relative flex flex-col items-end gap-2 max-w-[280px] pl-3 pr-4 py-3 rounded-2xl text-right active:scale-[0.98] transition-transform"
          style={{
            background: "white",
            border: "1px solid hsl(230, 20%, 92%)",
            boxShadow: "0 10px 28px hsla(250, 30%, 15%, 0.18)",
          }}
        >
          {/* Dismiss — matches home page style */}
          <span
            onClick={dismiss}
            role="button"
            aria-label="סגור"
            className="absolute top-1.5 left-1.5 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-black/5"
          >
            <X className="h-4 w-4" style={{ color: "hsl(230, 15%, 45%)" }} />
          </span>

          <span
            className="text-[12px] leading-snug pr-1"
            style={{ color: "hsl(250, 35%, 25%)" }}
          >
            מצאתי לך חיסכון של{" "}
            <strong style={{ color: "hsl(250, 50%, 12%)" }}>
              {formatNIS(savings)}
            </strong>{" "}
            ✨
          </span>
          <span
            className="text-[11px] font-bold px-3 py-1.5 rounded-full text-white inline-flex items-center gap-1"
            style={{
              background: "hsl(250, 30%, 8%)",
              boxShadow: "0 4px 12px hsla(250, 30%, 15%, 0.35)",
            }}
          >
            ספרי לי איך
            <span aria-hidden>←</span>
          </span>
        </button>
      </div>
    </div>
  );
}
