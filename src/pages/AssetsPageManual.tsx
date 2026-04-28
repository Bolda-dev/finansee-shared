import { CategoryPageC, formatNIS, formatCompact, type CategoryItem } from "./CategoryPageC";
import { assetItems } from "@/lib/data";
import { useManualPalette } from "@/contexts/ManualPaletteContext";
import { hslToString, hslaToString, buildAccentBg } from "@/lib/paletteUtils";

const AssetsPageManual = () => {
  const { colors } = useManualPalette();
  const c = colors.assets;
  const items: CategoryItem[] = assetItems.map((a) => ({ ...a }));

  const totalValue = items.reduce((s, i) => s + (i.amount ?? 0), 0);
  const monthlyIncome = items.reduce((s, i) => s + (i.monthly ?? 0), 0);

  const dark = { h: c.h, s: c.s, l: Math.max(c.l - 14, 18) };
  const light = { h: c.h, s: Math.max(c.s - 10, 50), l: Math.min(c.l + 22, 80) };

  return (
    <CategoryPageC
      title="נכסים"
      theme={{
        gradient: `linear-gradient(160deg, ${hslToString(dark)} 0%, ${hslToString(c)} 55%, ${hslToString(light)} 100%)`,
        accent: hslToString(c),
        accentBg: buildAccentBg(c),
        accentText: hslToString({ h: c.h, s: c.s, l: Math.max(c.l - 24, 14) }),
        sheetShadow: hslaToString(dark, 0.35),
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
          היי משה 👋 ניתחתי את התיק שלך — יש פוטנציאל לתשואה נוספת של{" "}
          <strong>כ-3.2% בשנה</strong> דרך פיזור חכם יותר. רוצה לראות איך?
        </>
      }
      danaBubbleCta="בוא/י נגדיל יחד"
      emptyText="אין נכסים בקטגוריה זו"
      renderItemSubtitle={(item) => item.subLabel ?? ""}
      renderItemTrailing={(item) => (
        <span className="text-end leading-tight">
          <span className="block text-[13px] font-bold text-primary tracking-tight" style={{ color: "hsl(250, 50%, 12%)" }}>
            {formatNIS(item.amount ?? 0)}
          </span>
          {item.monthly ? (
            <span className="block text-[10px] font-medium" style={{ color: "hsl(150, 55%, 38%)" }}>
              +{formatNIS(item.monthly)}/חודש
            </span>
          ) : (
            <span className="block text-[10px] font-medium" style={{ color: "hsl(230, 15%, 55%)" }}>
              סך הצבירה
            </span>
          )}
        </span>
      )}
    />
  );
};

export default AssetsPageManual;
