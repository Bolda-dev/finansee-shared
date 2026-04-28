import { CategoryPageC, formatNIS, formatCompact, type CategoryItem } from "./CategoryPageC";
import { liabilityItems } from "@/lib/data";
import { useManualPalette } from "@/contexts/ManualPaletteContext";
import { hslToString, hslaToString, buildAccentBg } from "@/lib/paletteUtils";

const LiabilitiesPageManual = () => {
  const { colors } = useManualPalette();
  const c = colors.liabilities;
  const items: CategoryItem[] = liabilityItems.map((a) => ({ ...a }));

  const totalBalance = items.reduce((s, i) => s + (i.balance ?? 0), 0);
  const monthlyPayment = items.reduce((s, i) => s + (i.monthly ?? 0), 0);

  const dark = { h: c.h, s: c.s, l: Math.max(c.l - 14, 18) };
  const light = { h: c.h, s: Math.max(c.s - 10, 50), l: Math.min(c.l + 22, 80) };

  return (
    <CategoryPageC
      title="התחייבויות"
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
        { key: "mortgage", label: "משכנתא", test: (i) => i.label.includes("משכנתא") },
        { key: "loans", label: "הלוואות", test: (i) => i.label.includes("הלוואה") || i.label.includes("הלוואת") },
        { key: "credit", label: "אשראי", test: (i) => i.label.includes("אשראי") },
        { key: "high", label: "סכום גבוה", test: (i) => (i.balance ?? 0) > 100000 },
      ]}
      primaryKpiLabel="סך כל ההתחייבויות"
      primaryKpiValue={formatCompact(totalBalance)}
      secondaryLeft={`${items.length} התחייבויות פעילות`}
      secondaryRight={`${formatNIS(monthlyPayment)}/חודש החזר`}
      sectionTitle="כל ההתחייבויות שלי"
      itemNoun="התחייבויות"
      footerNote="כל ההתחייבויות מתעדכנות אוטומטית מהחיבור לבנקים"
      danaCtaText="איך להוריד את ההחזרים?"
      danaBubbleText={
        <>
          היי משה 👋 בדקתי את ההתחייבויות שלך — מיחזור משכנתא יכול לחסוך לך עד{" "}
          <strong>₪780 בחודש</strong>. רוצה שנבדוק יחד?
        </>
      }
      danaBubbleCta="בוא/י נחסוך ביחד"
      emptyText="אין התחייבויות בקטגוריה זו"
      renderItemSubtitle={(item) => item.subLabel ?? ""}
      renderItemTrailing={(item) => (
        <span className="text-end leading-tight">
          <span className="block text-[13px] font-bold text-primary tracking-tight" style={{ color: "hsl(250, 50%, 12%)" }}>
            {formatNIS(item.balance ?? 0)}
          </span>
          {item.monthly ? (
            <span className="block text-[10px] font-medium" style={{ color: hslToString(colors.assets) }}>
              -{formatNIS(item.monthly)}/חודש
            </span>
          ) : null}
        </span>
      )}
    />
  );
};

export default LiabilitiesPageManual;
