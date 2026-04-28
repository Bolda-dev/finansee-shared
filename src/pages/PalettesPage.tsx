import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Palette {
  id: string;
  name: string | null;
  assets_color: string;
  liabilities_color: string;
  insurance_color: string;
  created_at: string;
}

const PalettesPage = () => {
  const navigate = useNavigate();
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("palettes")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setPalettes(data as Palette[]);
      setLoading(false);
    };
    load();
  }, []);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString("he-IL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen max-w-[430px] mx-auto" dir="rtl" style={{ background: "hsl(235, 30%, 97%)" }}>
      <div className="px-5 pt-6 pb-4 flex items-center gap-2">
        <button
          onClick={() => navigate("/manual")}
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "white", border: "1px solid hsl(230, 20%, 92%)" }}
          aria-label="חזרה"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold" style={{ color: "hsl(250, 40%, 15%)" }}>
          פלטות שנשלחו לבוריס
        </h1>
      </div>

      <div className="px-5 pb-10 space-y-3">
        {loading && (
          <p className="text-sm text-muted-foreground text-center py-10">טוען...</p>
        )}
        {!loading && palettes.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-10">
            עדיין לא נשלחו פלטות
          </p>
        )}
        {palettes.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl p-4"
            style={{
              background: "white",
              boxShadow: "0 3px 14px hsla(250, 30%, 25%, 0.07)",
              border: "1px solid hsl(230, 20%, 93%)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold" style={{ color: "hsl(250, 40%, 18%)" }}>
                {p.name || "ללא שם"}
              </p>
              <p className="text-[11px]" style={{ color: "hsl(230, 15%, 55%)" }}>
                {fmt(p.created_at)}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([
                { label: "נכסים", color: p.assets_color },
                { label: "התחייבויות", color: p.liabilities_color },
                { label: "ביטוח", color: p.insurance_color },
              ]).map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl p-3 flex flex-col items-center gap-2"
                  style={{ background: "hsl(230, 20%, 97%)" }}
                >
                  <div
                    className="w-12 h-12 rounded-lg border"
                    style={{ background: c.color, borderColor: "hsl(230, 20%, 88%)" }}
                  />
                  <span className="text-[10px] font-medium" style={{ color: "hsl(250, 35%, 30%)" }}>
                    {c.label}
                  </span>
                  <span className="text-[10px] font-mono" dir="ltr" style={{ color: "hsl(230, 15%, 50%)" }}>
                    {c.color.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PalettesPage;
