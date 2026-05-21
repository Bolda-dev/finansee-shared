import { useNavigate } from "react-router-dom";
import { CategoryPageC, formatNIS, formatCompact, type CategoryItem } from "./CategoryPageC";
import { assetItems, pensionProducts } from "@/lib/data";
import { Layers } from "lucide-react";

const AssetsPageC = () => {
  const navigate = useNavigate();
  const problematicPensions = pensionProducts.filter((p) => !!p.alert).length;
  const items: CategoryItem[] = assetItems.map((a) =>
    a.label === "פנסיה" ? { ...a, badgeCount: problematicPensions } : { ...a }
  );

  const totalValue = items.reduce((s, i) => s + (i.amount ?? 0), 0);
  const monthlyIncome = items.reduce((s, i) => s + (i.monthly ?? 0), 0);

  return (
    <CategoryPageC
      title="נכסים"
      theme={{
        gradient:
          "linear-gradient(160deg, hsl(170, 80%, 35%) 0%, hsl(174, 65%, 42%) 55%, hsl(170, 70%, 56%) 100%)",
        accent: "hsl(178, 70%, 30%)",
        accentBg: "hsl(176, 55%, 91%)",
        accentText: "hsl(178, 70%, 18%)",
        sheetShadow: "hsla(176, 70%, 22%, 0.35)",
      }}
      items={items}
      filters={[
        { key: "all", label: "הכל", test: () => true },
        { key: "liquid", label: "נזיל", test: (i) => ["חשבון עו״ש", "פיקדון בנקאי", "קרן השתלמות", "מטבע דיגיטלי"].includes(i.label) },
        { key: "long", label: "טווח ארוך", test: (i) => ["פנסיה", "קופת גמל", "השקעות"].includes(i.label) },
        { key: "income", label: "מניב הכנסה", test: (i) => (i.monthly ?? 0) > 0 },
        { key: "realestate", label: "נדל״ן", test: (i) => i.label.includes("נדל") },
        { key: "investments", label: "השקעות", test: (i) => ["השקעות", "מטבע דיגיטלי"].includes(i.label) },
      ]}
      primaryKpiLabel="סך כל הנכסים"
      primaryKpiValue={formatCompact(totalValue)}
      secondaryLeft={`${items.length} נכסים פעילים`}
      secondaryRight={`${formatNIS(monthlyIncome)} מניב/חודש`}
      sectionTitle="כל הנכסים שלי"
      itemNoun="נכסים"
      footerNote="כל הנכסים מתעדכנים אוטומטית מהחיבור לחשבונות"
      danaCtaText="איך להגדיל את הנכסים שלי?"
      danaBubbleText={
        <>
          היי משה 👋 ניתחתי את התיק שלך — יש פוטנציאל לתשואה נוספת של
          {" "}
          <strong>כ-3.2% בשנה</strong> דרך פיזור חכם יותר. רוצה לראות איך?
        </>
      }
      danaBubbleCta="בוא/י נגדיל יחד"
      emptyText="אין נכסים בקטגוריה זו"
      onItemClick={(item) => {
        if (item.label === "פנסיה") {
          navigate("/assets/pension");
        }
      }}
      renderItemSubtitle={(item) => {
        const sub = item.subLabel ?? "";
        const p = item.provider;
        if (p && p !== "—" && p !== "פרטי") return sub ? `${p} · ${sub}` : p;
        return sub;
      }}
      renderItemTrailing={(item) => (
        <span className="flex flex-col items-end gap-1 leading-tight">
          <span
            className="block text-[13px] font-bold tracking-tight"
            style={{ color: "hsl(250, 50%, 12%)" }}
          >
            {formatNIS(item.amount ?? 0)}
          </span>
          {item.label === "פנסיה" ? (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                background: "hsl(176, 55%, 91%)",
                color: "hsl(178, 70%, 22%)",
                border: "1px solid hsl(176, 50%, 82%)",
              }}
            >
              <Layers className="h-2.5 w-2.5" strokeWidth={2.5} />
              {pensionProducts.length} מוצרים
            </span>
          ) : item.monthly ? (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                background: "hsl(150, 60%, 93%)",
                color: "hsl(150, 65%, 26%)",
                border: "1px solid hsl(150, 55%, 84%)",
              }}
            >
              +{formatNIS(item.monthly)}/חודש
            </span>
          ) : null}
        </span>
      )}
    />
  );
};

export default AssetsPageC;
