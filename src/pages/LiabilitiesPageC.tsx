import { useNavigate } from "react-router-dom";
import { CategoryPageC, formatNIS, formatCompact, type CategoryItem } from "./CategoryPageC";
import { liabilityItems } from "@/lib/data";

const LiabilitiesPageC = () => {
  const navigate = useNavigate();
  const items: CategoryItem[] = liabilityItems.map((a) => ({ ...a }));

  const totalBalance = items.reduce((s, i) => s + (i.balance ?? 0), 0);
  const monthlyPayment = items.reduce((s, i) => s + (i.monthly ?? 0), 0);

  return (
    <CategoryPageC
      onItemClick={(item) => {
        if (item.label.includes("דירה להשקעה")) {
          navigate("/liabilities/mortgage-investment");
        }
      }}
      title="התחייבויות"
      theme={{
        gradient:
          "linear-gradient(160deg, hsl(220, 85%, 45%) 0%, hsl(225, 90%, 58%) 55%, hsl(215, 95%, 72%) 100%)",
        accent: "hsl(222, 85%, 45%)",
        accentBg: "hsl(220, 85%, 95%)",
        accentText: "hsl(222, 80%, 28%)",
        sheetShadow: "hsla(222, 80%, 25%, 0.35)",
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
            {formatNIS(item.balance ?? 0)}
          </span>
          {item.monthly ? (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                background: "hsl(176, 55%, 91%)",
                color: "hsl(178, 70%, 22%)",
                border: "1px solid hsl(176, 50%, 82%)",
              }}
            >
              -{formatNIS(item.monthly)}/ח
            </span>
          ) : null}
        </span>
      )}
    />
  );
};

export default LiabilitiesPageC;
