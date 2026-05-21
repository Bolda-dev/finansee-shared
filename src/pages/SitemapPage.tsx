import { Link } from "react-router-dom";

const groups: { title: string; links: { to: string; label: string; note?: string }[] }[] = [
  {
    title: "Onboarding / Signup",
    links: [
      { to: "/signup", label: "/signup", note: "תהליך הרשמה ראשי" },
      { to: "/signup2", label: "/signup2", note: "תהליך הרשמה גרסה 2" },
    ],
  },
  {
    title: "Aha Dashboards",
    links: [
      { to: "/aha", label: "/aha", note: "דשבורד אהה גרסה A (כהה)" },
      { to: "/aha2", label: "/aha2", note: "דשבורד אהה גרסה B (בהיר/גלאסמורפיזם)" },
    ],
  },
  {
    title: "Home",
    links: [
      { to: "/", label: "/", note: "עמוד בית ראשי (IndexC)" },
    ],
  },
  {
    title: "ביטוח",
    links: [
      { to: "/insurance", label: "/insurance", note: "קטגוריית ביטוח" },
      { to: "/insurance/health", label: "/insurance/health", note: "ביטוח בריאות" },
    ],
  },
  {
    title: "נכסים",
    links: [
      { to: "/assets", label: "/assets", note: "קטגוריית נכסים" },
      { to: "/assets/pension", label: "/assets/pension", note: "פנסיה - רשימת מוצרים" },
      { to: "/assets/pension/1", label: "/assets/pension/:id", note: "מוצר פנסיה ספציפי (דוגמה id=1)" },
    ],
  },
  {
    title: "התחייבויות",
    links: [
      { to: "/liabilities", label: "/liabilities", note: "קטגוריית התחייבויות" },
      { to: "/liabilities/mortgage-investment", label: "/liabilities/mortgage-investment", note: "משכנתא לדירה להשקעה" },
    ],
  },
  {
    title: "מערכת",
    links: [
      { to: "/design-system", label: "/design-system", note: "דיזיין סיסטם פנימי" },
      { to: "/sitemap", label: "/sitemap", note: "העמוד הזה" },
    ],
  },
];

const SitemapPage = () => {
  return (
    <div
      style={{
        padding: 20,
        fontFamily: "system-ui, -apple-system, sans-serif",
        direction: "rtl",
        background: "#f7f7fa",
        minHeight: "100vh",
        color: "#111",
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: "4px 0 4px" }}>Sitemap</h1>
      <p style={{ color: "#555", margin: "0 0 20px", fontSize: 13 }}>
        רשימת כל המסלולים באפליקציה.
      </p>
      {groups.map((g) => (
        <section key={g.title} style={{ marginBottom: 22 }}>
          <h2
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              color: "#666",
              margin: "0 0 10px",
            }}
          >
            {g.title}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {g.links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "10px 14px",
                  background: "#fff",
                  border: "1px solid #e2e2e8",
                  borderRadius: 10,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  textDecoration: "none",
                  color: "#111",
                }}
              >
                <span
                  style={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#1e40af",
                  }}
                >
                  {l.label}
                </span>
                {l.note && (
                  <span style={{ fontSize: 12, color: "#666", textAlign: "start" }}>
                    {l.note}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default SitemapPage;
