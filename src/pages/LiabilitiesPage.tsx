import { CategoryPage, formatNIS, formatCompact, type CategoryItem } from "./CategoryPage";
import { liabilityItems } from "@/lib/data";

const LiabilitiesPage = () => {
  const items: CategoryItem[] = liabilityItems.map((a) => ({ ...a }));

  const totalBalance = items.reduce((s, i) => s + (i.balance ?? 0), 0);
  const monthlyPayment = items.reduce((s, i) => s + (i.monthly ?? 0), 0);

  return (
    <CategoryPage
      title="התחייבויות"
      theme={{
        gradient:
          "linear-gradient(160deg, hsl(18, 90%, 50%) 0%, hsl(28, 95%, 58%) 55%, hsl(38, 100%, 68%) 100%)",
        accent: "hsl(22, 90%, 48%)",
        accentBg: "hsl(28, 90%, 95%)",
        accentText: "hsl(22, 80%, 32%)",
        sheetShadow: "hsla(22, 80%, 25%, 0.35)",
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
          היי משה 👋 בדקתי את ההתחייבויות שלך — מיחזור משכנתא יכול לחסוך לך עד
          {" "}
          <strong>₪780 בחודש</strong>. רוצה שנבדוק יחד?
        </>
      }
      danaBubbleCta="בוא/י נחסוך ביחד"
      emptyText="אין התחייבויות בקטגוריה זו"
      renderItemSubtitle={(item) => item.subLabel ?? ""}
      renderItemTrailing={(item) => (
        <span className="text-end leading-tight">
          <span
            className="block text-[13px] font-bold tracking-tight"
            style={{ color: "hsl(250, 50%, 12%)" }}
          >
            {formatNIS(item.balance ?? 0)}
          </span>
          {item.monthly ? (
            <span
              className="block text-[10px] font-medium"
              style={{ color: "hsl(22, 80%, 45%)" }}
            >
              -{formatNIS(item.monthly)}/חודש
            </span>
          ) : null}
        </span>
      )}
    />
  );
};

export default LiabilitiesPage;
