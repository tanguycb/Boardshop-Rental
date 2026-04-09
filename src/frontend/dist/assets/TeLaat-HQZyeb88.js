import { w as useVervallenVerhuringen, Z as useMarkeerIngeleverd, r as reactExports, a8 as dagsBetween, j as jsxRuntimeExports, T as TriangleAlert, S as Skeleton, a as Badge, A as formatDate, B as Button, s as ue } from "./index-DJrsHPCD.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DC_4A9uF.js";
import { I as Input } from "./input-CilnsQ6Q.js";
import { S as Search } from "./search-DEWMppQt.js";
import { C as CircleCheck } from "./circle-check-Dn86r6ds.js";
import { P as Phone } from "./phone-8mi4sPML.js";
function DaysLateBadge({ days }) {
  const severity = days >= 7 ? "bg-destructive text-destructive-foreground" : days >= 3 ? "bg-destructive/80 text-destructive-foreground" : "bg-destructive/60 text-destructive-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${severity}`,
      children: [
        days,
        " dag",
        days !== 1 ? "en" : "",
        " te laat"
      ]
    }
  );
}
function TeLaat() {
  const { data: verhuringen, isLoading } = useVervallenVerhuringen();
  const markeerIngeleverd = useMarkeerIngeleverd();
  const [zoekterm, setZoekterm] = reactExports.useState("");
  const gefilterd = (verhuringen == null ? void 0 : verhuringen.filter(
    (v) => v.klantNaam.toLowerCase().includes(zoekterm.toLowerCase())
  )) ?? [];
  const gesorteerd = [...gefilterd].sort((a, b) => {
    const now = BigInt(Date.now() * 1e6);
    const daysA = dagsBetween(a.eindDatum, now);
    const daysB = dagsBetween(b.eindDatum, now);
    return daysB - daysA;
  });
  const handleMarkeer = async (id, naam) => {
    try {
      await markeerIngeleverd.mutateAsync(id);
      ue.success(`Verhuur van ${naam} gemarkeerd als ingeleverd`);
    } catch {
      ue.error("Markeren mislukt");
    }
  };
  const totalDaysLate = gesorteerd.reduce((sum, v) => {
    return sum + dagsBetween(v.eindDatum, BigInt(Date.now() * 1e6));
  }, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6 text-destructive" }),
        "Te laat ingeleverd"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
        (verhuringen == null ? void 0 : verhuringen.length) ?? 0,
        " verhur",
        (verhuringen == null ? void 0 : verhuringen.length) === 1 ? "ing" : "ingen",
        " over de retourdatum"
      ] })
    ] }),
    ((verhuringen == null ? void 0 : verhuringen.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive/30 bg-destructive/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-destructive flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
        "Actie vereist — neem contact op met klanten"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-destructive", children: (verhuringen == null ? void 0 : verhuringen.length) ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-1", children: [
            "open verhuring",
            ((verhuringen == null ? void 0 : verhuringen.length) ?? 0) !== 1 ? "en" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-destructive", children: totalDaysLate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-1", children: "totaal dagen te laat" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Zoeken op klantnaam…",
          value: zoekterm,
          onChange: (e) => setZoekterm(e.target.value),
          className: "pl-8",
          "data-ocid": "telaat-zoek"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, i)) }) : gesorteerd.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "telaat-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-[oklch(var(--success))] mx-auto mb-3 opacity-60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Alles op tijd ingeleverd!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Geen te late verhuringen gevonden." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: gesorteerd.map((v) => {
      const daysLate = dagsBetween(
        v.eindDatum,
        BigInt(Date.now() * 1e6)
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border-destructive/30 bg-destructive/5 transition-smooth",
          "data-ocid": `telaat-row-${v.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: v.klantNaam }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DaysLateBadge, { days: daysLate }),
                v.isSet && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Set" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Retour verwacht: ",
                  formatDate(v.eindDatum)
                ] }),
                v.klantContact && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: `tel:${v.klantContact}`,
                    className: "flex items-center gap-1 text-xs text-primary hover:underline",
                    "aria-label": `Bel ${v.klantNaam}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                      v.klantContact
                    ]
                  }
                )
              ] }),
              v.productIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                v.productIds.length,
                " product",
                v.productIds.length !== 1 ? "en" : "",
                " uitstaand"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "gap-1.5 shrink-0 text-[oklch(var(--success))] border-[oklch(var(--success)/0.4)] hover:bg-[oklch(var(--success)/0.1)]",
                onClick: () => handleMarkeer(v.id, v.klantNaam),
                disabled: markeerIngeleverd.isPending,
                "data-ocid": `telaat-inleveren-${v.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                  "Markeer ingeleverd"
                ]
              }
            )
          ] })
        },
        v.id.toString()
      );
    }) })
  ] });
}
export {
  TeLaat as default
};
