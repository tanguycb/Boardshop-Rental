import { j as jsxRuntimeExports, P as PublicLayout, a as Badge, B as Button, L as Link } from "./index-DJrsHPCD.js";
import { m as motion } from "./proxy-gxodpJKO.js";
import { A as ArrowRight } from "./arrow-right-IVBi2QYQ.js";
import { E as Euro } from "./euro-JxPIbgp5.js";
const SECTIES = [
  {
    title: "Snowboard pakketten",
    kleur: "primary",
    rows: [
      {
        product: "Kids set",
        dag: "€15",
        weekend: "€40",
        shortski: "€70",
        week: "€95",
        twoWeeks: "€150"
      },
      {
        product: "Epic snowboard + bindingen",
        dag: "€15",
        weekend: "€45",
        shortski: "€75",
        week: "€110",
        twoWeeks: "€165"
      },
      {
        product: "Epic set",
        dag: "€20",
        weekend: "€60",
        shortski: "€85",
        week: "€130",
        twoWeeks: "€185"
      },
      {
        product: "VIP snowboard + bindingen",
        dag: "€25",
        weekend: "€90",
        shortski: "€120",
        week: "€180",
        twoWeeks: "€250"
      },
      {
        product: "VIP set",
        dag: "€30",
        weekend: "€100",
        shortski: "€150",
        week: "€180",
        twoWeeks: "€250"
      },
      {
        product: "Send Before You Spend set",
        dag: "–",
        weekend: "–",
        shortski: "–",
        week: "30% aankoopprijs",
        twoWeeks: "30% aankoopprijs"
      }
    ]
  },
  {
    title: "Schoenen & bindingen",
    kleur: "accent",
    rows: [
      {
        product: "EPIC schoenen",
        dag: "€30",
        weekend: "€40",
        shortski: "€50",
        week: "€60",
        twoWeeks: "€90"
      },
      {
        product: "VIP schoenen & bindingen",
        dag: "€40",
        weekend: "€55",
        shortski: "€70",
        week: "€90",
        twoWeeks: "€150"
      },
      {
        product: "VIP STEP ON schoenen",
        dag: "€40",
        weekend: "€55",
        shortski: "€70",
        week: "€90",
        twoWeeks: "€150"
      },
      {
        product: "EPIC Classic Straps bindingen",
        dag: "–",
        weekend: "–",
        shortski: "–",
        week: "€35",
        twoWeeks: "€65"
      },
      {
        product: "VIP Step ON bindingen",
        dag: "–",
        weekend: "–",
        shortski: "–",
        week: "€90",
        twoWeeks: "€150"
      },
      {
        product: "VIP Supermatic bindingen",
        dag: "–",
        weekend: "–",
        shortski: "–",
        week: "€90",
        twoWeeks: "€150"
      }
    ]
  },
  {
    title: "Splitboard & avontuur",
    kleur: "primary",
    rows: [
      {
        product: "Splitboard 3/4 set",
        dag: "–",
        weekend: "–",
        shortski: "€180",
        week: "€200",
        twoWeeks: "€280"
      },
      {
        product: "Splitboard volledige set",
        dag: "–",
        weekend: "–",
        shortski: "€190",
        week: "€220",
        twoWeeks: "€350"
      },
      {
        product: "Avalanche set",
        dag: "–",
        weekend: "–",
        shortski: "€40",
        week: "€75",
        twoWeeks: "€100"
      },
      {
        product: "Rover set",
        dag: "–",
        weekend: "–",
        shortski: "€85",
        week: "€130",
        twoWeeks: "€185"
      },
      {
        product: "Kids harnas",
        dag: "€10",
        weekend: "€15",
        shortski: "€20",
        week: "€25",
        twoWeeks: "€40"
      }
    ]
  },
  {
    title: "Skate & surf",
    kleur: "accent",
    rows: [
      {
        product: "Surfboard",
        dag: "€30",
        weekend: "€60",
        shortski: "€100",
        week: "€190",
        twoWeeks: "–"
      },
      {
        product: "SUP",
        dag: "€25",
        weekend: "€35",
        shortski: "€65",
        week: "€120",
        twoWeeks: "–"
      },
      {
        product: "Skimboard",
        dag: "€15",
        weekend: "€20",
        shortski: "€35",
        week: "€60",
        twoWeeks: "–"
      },
      {
        product: "Skateboard",
        dag: "€15",
        weekend: "€25",
        shortski: "–",
        week: "€45",
        twoWeeks: "–"
      },
      {
        product: "Surfskate",
        dag: "€20",
        weekend: "€35",
        shortski: "–",
        week: "€60",
        twoWeeks: "–"
      }
    ]
  }
];
const HEADERS = ["Dag", "Weekend", "Shortski", "Week", "2 weken"];
function PrijslijstPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative px-4 py-14 text-center overflow-hidden",
        style: {
          background: "linear-gradient(135deg, #0F766E 0%, #0c5c56 60%, #0F172A 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 max-w-2xl mx-auto space-y-4",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "bg-white/10 text-white border-white/20 mb-2",
                  variant: "outline",
                  children: "Volledige prijslijst"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl font-bold text-white leading-tight", children: [
                "Huurprijzen ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#F59E0B" }, children: "West-Site" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-lg max-w-lg mx-auto", children: "Transparante tarieven per periode — geen verborgen kosten." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  className: "gap-2 font-semibold mt-2",
                  style: { background: "#F59E0B", color: "#0F172A" },
                  "data-ocid": "prijslijst-reserveer-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/reserveren", children: [
                    "Nu reserveren",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ] })
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto space-y-10", children: [
      SECTIES.map((sectie, si) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: si * 0.08 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Euro, { className: "w-5 h-5 text-primary" }),
              sectie.title
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border overflow-hidden shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-primary/5 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-semibold text-foreground", children: "Formule" }),
                HEADERS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "text-right px-5 py-3 font-semibold text-foreground whitespace-nowrap",
                    children: h
                  },
                  h
                ))
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sectie.rows.map((row, ri) => {
                const cells = [
                  row.dag,
                  row.weekend,
                  row.shortski,
                  row.week,
                  row.twoWeeks
                ];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: ri % 2 === 0 ? "bg-background" : "bg-muted/20",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium text-foreground whitespace-nowrap", children: row.product }),
                      cells.map((v, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: `px-5 py-3 text-right tabular-nums whitespace-nowrap ${v === "–" ? "text-muted-foreground" : "text-foreground font-semibold"}`,
                          children: v
                        },
                        HEADERS[ci]
                      ))
                    ]
                  },
                  row.product
                );
              }) })
            ] }) }) })
          ]
        },
        sectie.title
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/30 border border-border p-5 text-sm text-muted-foreground space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "* Volledige huurprijs vereist bij bevestiging." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "* Reservatie minimum 1 week voor de ophaaldag." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Vragen?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://www.west-site.com",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary hover:underline",
              children: "west-site.com"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "px-4 py-14 text-center",
        style: {
          background: "linear-gradient(135deg, #0F172A 0%, #0c5c56 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "max-w-xl mx-auto space-y-5",
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-white", children: "Klaar om te reserveren?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-base", children: "Vul het formulier in — we zorgen dat alles klaarstaat op jouw ophaaldag." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  className: "gap-2 font-semibold",
                  style: { background: "#F59E0B", color: "#0F172A" },
                  "data-ocid": "prijslijst-cta-reserveer-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/reserveren", children: [
                    "Reserveer nu",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ] })
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
export {
  PrijslijstPage as default
};
