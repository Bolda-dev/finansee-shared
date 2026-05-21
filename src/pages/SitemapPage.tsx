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
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif", direction: "rtl" }}>
      <h1>Sitemap</h1>
      <p>רשימת כל המסלולים באפליקציה.</p>
      {groups.map((g) => (
        <section key={g.title} style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 16 }}>{g.title}</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {g.links.map((l) => (
              <li key={l.to} style={{ marginBottom: 8 }}>
                <Link to={l.to}>
                  <button type="button">{l.label}</button>
                </Link>
                {l.note && <span style={{ marginInlineStart: 8, color: "#555" }}>— {l.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default SitemapPage;
