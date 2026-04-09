import { v as useActieveVerhuringen, w as useVervallenVerhuringen, V as VerhuurStatus, j as jsxRuntimeExports, x as LayoutDashboard, C as CalendarCheck, y as Clock, T as TriangleAlert, z as Package, Q as QrCode, U as Users, A as formatDate, L as Link, B as Button, S as Skeleton, a as Badge } from "./index-DJrsHPCD.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DC_4A9uF.js";
import { S as Separator } from "./separator-30y7ohbq.js";
import { u as useProducten } from "./useProducten-Cgeo_46e.js";
import { a as useAlleReserveringen } from "./useReserveringen-ojGO0sXC.js";
import { A as ArrowRight } from "./arrow-right-IVBi2QYQ.js";
function StatCard({
  label,
  value,
  icon,
  isLoading,
  accent,
  href
}) {
  const colorMap = {
    primary: "text-primary bg-primary/10",
    accent: "text-accent bg-accent/10",
    destructive: "text-destructive bg-destructive/10",
    warning: "text-orange-500 bg-orange-500/10"
  };
  const content = /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-rental hover:shadow-md transition-smooth group cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorMap[accent ?? "primary"]}`,
        children: icon
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-12 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: value })
    ] }),
    href && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth shrink-0" })
  ] }) });
  if (href) return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, children: content });
  return content;
}
function QuickActionCard({ href, label, icon, badge, urgent }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant: "outline",
      className: `w-full h-auto py-3 px-4 flex items-center gap-3 justify-start transition-smooth hover:border-primary/40 ${urgent ? "border-destructive/40 hover:border-destructive" : ""}`,
      "data-ocid": `dashboard-quick-${href.split("/").pop()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: urgent ? "text-destructive" : "text-primary", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium flex-1 text-left", children: label }),
        badge !== void 0 && badge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: urgent ? "destructive" : "secondary",
            className: "text-xs ml-auto",
            children: badge
          }
        )
      ]
    }
  ) });
}
function MedewerkerDashboard() {
  const { data: producten, isLoading: pLoading } = useProducten();
  const { data: actief, isLoading: aLoading } = useActieveVerhuringen();
  const { data: vervallen, isLoading: vLoading } = useVervallenVerhuringen();
  const { data: reserveringen, isLoading: rLoading } = useAlleReserveringen();
  const totalProducten = (producten == null ? void 0 : producten.length) ?? 0;
  const beschikbaar = (producten == null ? void 0 : producten.filter((p) => p.beschikbaar).length) ?? 0;
  const inVerhuur = (actief == null ? void 0 : actief.filter((v) => v.status === VerhuurStatus.Actief).length) ?? 0;
  const teLaat = (vervallen == null ? void 0 : vervallen.length) ?? 0;
  const inAfwachting = (reserveringen == null ? void 0 : reserveringen.filter((r) => r.status === "InAfwachting").length) ?? 0;
  const recenteActiviteit = [
    ...((actief == null ? void 0 : actief.slice(0, 3)) ?? []).map((v) => ({
      ...v,
      type: "actief"
    })),
    ...((vervallen == null ? void 0 : vervallen.slice(0, 2)) ?? []).map((v) => ({
      ...v,
      type: "telaat"
    }))
  ].slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-6 h-6 text-primary" }),
          "Medewerkers Dashboard"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Overzicht van inventaris, verhuur en reserveringen" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: (/* @__PURE__ */ new Date()).toLocaleDateString("nl-NL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "In afwachting",
          value: inAfwachting,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-5 h-5" }),
          isLoading: rLoading,
          accent: "warning",
          href: "/medewerker/reserveringen"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Actief verhuurd",
          value: inVerhuur,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
          isLoading: aLoading,
          accent: "accent",
          href: "/medewerker/verhuur"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Te laat",
          value: teLaat,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
          isLoading: vLoading,
          accent: "destructive",
          href: "/medewerker/te-laat"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Totaal producten",
          value: totalProducten,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5" }),
          isLoading: pLoading,
          accent: "primary",
          href: "/medewerker/inventaris"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Snelkoppelingen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickActionCard,
            {
              href: "/medewerker/reserveringen",
              label: "Reserveringen",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
              badge: inAfwachting,
              urgent: inAfwachting > 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickActionCard,
            {
              href: "/medewerker/verhuur",
              label: "Actieve verhuur",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
              badge: inVerhuur
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickActionCard,
            {
              href: "/medewerker/te-laat",
              label: "Te laat ingeleverd",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
              badge: teLaat,
              urgent: teLaat > 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickActionCard,
            {
              href: "/medewerker/inventaris",
              label: "Inventaris beheren",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickActionCard,
            {
              href: "/medewerker/qr-codes",
              label: "QR-codes afdrukken",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickActionCard,
            {
              href: "/medewerker/klanten",
              label: "Klantenoverzicht",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        teLaat > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-destructive/30 bg-destructive/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-destructive flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
            teLaat,
            " verhur",
            teLaat > 1 ? "ingen" : "ing",
            " over de retourdatum"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pb-4 space-y-2", children: [
            vervallen == null ? void 0 : vervallen.slice(0, 3).map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: v.klantNaam }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
                    "Retour: ",
                    formatDate(v.eindDatum)
                  ] })
                ]
              },
              v.id.toString()
            )),
            teLaat > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/medewerker/te-laat",
                className: "text-xs text-destructive underline block",
                children: [
                  "+",
                  teLaat - 3,
                  " meer bekijken"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/medewerker/te-laat", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "destructive",
                className: "gap-1.5 text-xs h-7",
                children: [
                  "Alle te late verhuringen",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                ]
              }
            ) }) })
          ] })
        ] }),
        inAfwachting > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-orange-400/30 bg-orange-500/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
            inAfwachting,
            " reservering",
            inAfwachting > 1 ? "en" : "",
            " wacht",
            inAfwachting > 1 ? "en" : "",
            " op bevestiging"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/medewerker/reserveringen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "gap-1.5 text-xs h-7 bg-orange-500 hover:bg-orange-600 text-white border-0",
              children: [
                "Reserveringen bekijken",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
              ]
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-rental", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Recente verhuuractiviteit" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 pb-4", children: aLoading || vLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : recenteActiviteit.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "Geen recente activiteit" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: recenteActiviteit.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: v.klantNaam }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  formatDate(v.startDatum),
                  " →",
                  " ",
                  formatDate(v.eindDatum)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: v.type === "telaat" ? "destructive" : "secondary",
                  className: "text-xs shrink-0 ml-2",
                  children: v.type === "telaat" ? "Te laat" : "Actief"
                }
              )
            ] }),
            idx < recenteActiviteit.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50" })
          ] }, v.id.toString())) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-rental bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: pLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-10 mx-auto" }) : beschikbaar }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Beschikbaar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: pLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-10 mx-auto" }) : totalProducten - beschikbaar }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Verhuurd" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: pLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-10 mx-auto" }) : totalProducten }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Totaal" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/medewerker/inventaris", className: "ml-auto shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5 text-xs", children: [
            "Inventaris",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
          ] }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  MedewerkerDashboard as default
};
