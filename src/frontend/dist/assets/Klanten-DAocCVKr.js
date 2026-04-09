import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, U as Users, S as Skeleton } from "./index-DJrsHPCD.js";
import { C as Card, a as CardContent } from "./card-DC_4A9uF.js";
import { a as useAlleReserveringen } from "./useReserveringen-ojGO0sXC.js";
import { S as Search } from "./search-DEWMppQt.js";
import { m as motion } from "./proxy-gxodpJKO.js";
import { P as Phone } from "./phone-8mi4sPML.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
function extractUniekKlanten(reserveringen) {
  const klantMap = /* @__PURE__ */ new Map();
  for (const r of reserveringen) {
    const sleutel = r.contactEmail.toLowerCase().trim();
    const bestaand = klantMap.get(sleutel);
    if (bestaand) {
      bestaand.aantalReserveringen += 1;
      if (r.aangemaakt > bestaand.laaststeReservering) {
        bestaand.laaststeReservering = r.aangemaakt;
      }
    } else {
      klantMap.set(sleutel, {
        naam: r.contactNaam,
        email: r.contactEmail,
        telefoon: r.contactTelefoon,
        aantalReserveringen: 1,
        laaststeReservering: r.aangemaakt
      });
    }
  }
  return Array.from(klantMap.values()).sort(
    (a, b) => a.naam.localeCompare(b.naam, "nl")
  );
}
function tsNaarDatum(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("nl-NL");
}
function KlantKaart({
  klant,
  index
}) {
  const initialen = klant.naam.split(" ").slice(0, 2).map((w) => {
    var _a;
    return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
  }).join("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 6 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.04 },
      className: "bg-card border border-border rounded-xl p-4 hover:border-border/80 hover:shadow-sm transition-smooth",
      "data-ocid": "klant-kaart",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: initialen }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: klant.naam }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full shrink-0", children: [
              klant.aantalReserveringen,
              " reservering",
              klant.aantalReserveringen !== 1 ? "en" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `mailto:${klant.email}`,
                className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors truncate",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: klant.email })
                ]
              }
            ),
            klant.telefoon && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `tel:${klant.telefoon}`,
                className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 shrink-0" }),
                  klant.telefoon
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/60 mt-1.5", children: [
            "Laatste reservering: ",
            tsNaarDatum(klant.laaststeReservering)
          ] })
        ] })
      ] })
    }
  );
}
function Klanten() {
  const { data: reserveringen = [], isLoading } = useAlleReserveringen();
  const [zoekterm, setZoekterm] = reactExports.useState("");
  const alleKlanten = reactExports.useMemo(
    () => extractUniekKlanten(reserveringen),
    [reserveringen]
  );
  const gefilterdeKlanten = reactExports.useMemo(() => {
    if (!zoekterm.trim()) return alleKlanten;
    const term = zoekterm.toLowerCase();
    return alleKlanten.filter(
      (k) => k.naam.toLowerCase().includes(term) || k.email.toLowerCase().includes(term) || k.telefoon.includes(term)
    );
  }, [alleKlanten, zoekterm]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 px-4 max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-6 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-primary" }),
          "Klanten"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Contactpersonen uit alle reserveringen" })
      ] }),
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground bg-muted/50 border border-border px-3 py-1.5 rounded-lg", children: [
        alleKlanten.length,
        " klant",
        alleKlanten.length !== 1 ? "en" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", "data-ocid": "klanten-zoek", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Zoek op naam, e-mail of telefoon…",
          value: zoekterm,
          onChange: (e) => setZoekterm(e.target.value),
          className: "w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-smooth"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, i)) }) : gefilterdeKlanten.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-xl bg-muted/20",
        "data-ocid": "empty-state-klanten",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground mb-3 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: zoekterm ? "Geen klanten gevonden" : "Nog geen klanten" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: zoekterm ? `Geen klanten gevonden voor "${zoekterm}".` : "Klantgegevens verschijnen hier zodra er reserveringen zijn geplaatst." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: gefilterdeKlanten.map((klant, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(KlantKaart, { klant, index: idx }, klant.email)) }),
    !isLoading && alleKlanten.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-6 bg-muted/30 border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Klantgegevens zijn afkomstig uit reserveringen. Klanten hebben geen account nodig." }) }) })
  ] });
}
export {
  Klanten as default
};
