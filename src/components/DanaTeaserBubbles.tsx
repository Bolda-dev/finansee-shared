import { useEffect, useState } from "react";
import { X, ChevronLeft } from "lucide-react";

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

  const dismiss = () => {
    sessionStorage.setItem(`dana-teaser-${productId}`, "1");
    onClose();
  };

  const open = () => {
    sessionStorage.setItem(`dana-teaser-${productId}`, "1");
    onOpen();
  };

  return (
    <div
      className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-4 pointer-events-none"
      dir="rtl"
    >
      <div
        className="pointer-events-auto max-w-[320px] ml-auto mr-1"
        style={{
          animation: "bubble-pop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
          transformOrigin: "bottom right",
        }}
      >
        <div
          className="relative rounded-2xl rounded-br-sm pt-6 pb-3.5 px-3.5 pr-4"
          style={{
            background: "white",
            border: "1px solid hsl(230, 20%, 92%)",
            boxShadow: "0 8px 28px hsla(250, 30%, 25%, 0.18)",
          }}
        >
          <button
            onClick={dismiss}
            className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
            aria-label="סגור"
          >
            <X className="h-3 w-3" style={{ color: "hsl(230, 15%, 55%)" }} />
          </button>
          <p
            className="text-[12px] leading-relaxed pr-1 text-right"
            style={{ color: "hsl(250, 35%, 20%)" }}
          >
            מצאתי לך חיסכון של{" "}
            <strong style={{ color: "hsl(250, 50%, 12%)" }}>
              {formatNIS(savings)}
            </strong>{" "}
            ✨
          </p>
          <button
            onClick={open}
            className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: "hsl(0, 0%, 8%)", color: "white" }}
          >
            ספרי לי איך
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
