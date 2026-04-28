import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Unlock, RotateCcw, Send, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useManualPalette, type CategoryKey } from "@/contexts/ManualPaletteContext";
import { hexToHsl, hslToHex } from "@/lib/paletteUtils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const labels: Record<CategoryKey, string> = {
  assets: "נכסים",
  liabilities: "התחייבויות",
  insurance: "ביטוח",
};

export const ColorPickerSheet = ({ open, onOpenChange }: Props) => {
  const navigate = useNavigate();
  const { colors, locks, setColor, toggleLock, reset } = useManualPalette();
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setSending(true);
    const { error } = await supabase.from("palettes").insert({
      name: name.trim() || null,
      assets_color: hslToHex(colors.assets),
      liabilities_color: hslToHex(colors.liabilities),
      insurance_color: hslToHex(colors.insurance),
    });
    setSending(false);
    if (error) {
      toast.error("שליחה נכשלה: " + error.message);
      return;
    }
    toast.success("נשלח לבוריס בהצלחה!");
    setName("");
    onOpenChange(false);
    navigate("/palettes");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl p-0 max-h-[85vh] overflow-y-auto" dir="rtl">
        <SheetHeader className="p-5 pb-3 border-b border-border">
          <SheetTitle className="text-right text-base font-bold">ערכת צבעים ידנית</SheetTitle>
          <p className="text-xs text-muted-foreground text-right">
            נעל קטגוריות כדי לשמור הרמוניה בין הצבעים בעת שינוי
          </p>
        </SheetHeader>

        <div className="p-5 space-y-4">
          {(Object.keys(colors) as CategoryKey[]).map((key) => {
            const hex = hslToHex(colors[key]);
            const isLocked = locks[key];
            return (
              <div key={key} className="flex items-center gap-3">
                <button
                  onClick={() => toggleLock(key)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{
                    background: isLocked ? "hsl(250, 40%, 92%)" : "hsl(230, 20%, 96%)",
                    color: isLocked ? "hsl(262, 75%, 45%)" : "hsl(230, 15%, 50%)",
                  }}
                  aria-label={isLocked ? "בטל נעילה" : "נעל"}
                >
                  {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </button>

                <div className="flex-1 flex items-center gap-2">
                  <span className="text-sm font-semibold w-20 text-right">{labels[key]}</span>
                  <label className="relative cursor-pointer flex-shrink-0">
                    <span
                      className="block w-12 h-12 rounded-xl border-2"
                      style={{
                        background: hex,
                        borderColor: "hsl(230, 20%, 88%)",
                        boxShadow: "inset 0 1px 2px hsla(0, 0%, 0%, 0.1)",
                      }}
                    />
                    <input
                      type="color"
                      value={hex}
                      onChange={(e) => setColor(key, hexToHsl(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                  <input
                    type="text"
                    value={hex.toUpperCase()}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (/^#[0-9A-Fa-f]{6}$/.test(v)) setColor(key, hexToHsl(v));
                    }}
                    className="flex-1 px-3 py-2 rounded-lg border border-border text-sm font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>
            );
          })}

          {/* Reset buttons */}
          <div className="flex items-center gap-2 pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground ml-auto">איפוס לערכת ברירת המחדל:</span>
            <Button variant="outline" size="sm" onClick={() => reset("c")} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" />
              גרסה C
            </Button>
            <Button variant="outline" size="sm" onClick={() => reset("b")} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" />
              גרסה B
            </Button>
          </div>

          {/* Name + Send */}
          <div className="pt-3 border-t border-border space-y-2.5">
            <Input
              placeholder="שם הפלטה (אופציונלי)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              dir="rtl"
              className="text-right"
            />
            <Button
              onClick={handleSend}
              disabled={sending}
              className="w-full gap-2"
              style={{
                background: "linear-gradient(135deg, hsl(265, 78%, 55%) 0%, hsl(280, 80%, 65%) 100%)",
              }}
            >
              <Send className="h-4 w-4" />
              {sending ? "שולח..." : "שלח לבוריס"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
