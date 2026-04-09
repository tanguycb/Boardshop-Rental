import { c as createLucideIcon, j as jsxRuntimeExports, P as PublicLayout, B as Button, L as Link, a as Badge } from "./index-DJrsHPCD.js";
import { C as Card, a as CardContent } from "./card-DC_4A9uF.js";
import { m as motion } from "./proxy-gxodpJKO.js";
import { A as ArrowRight } from "./arrow-right-IVBi2QYQ.js";
import { C as CircleCheck } from "./circle-check-Dn86r6ds.js";
import { S as Snowflake } from "./snowflake-BpFEUXa1.js";
import { C as Calendar } from "./calendar-2Hh8wQrU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 3v6", key: "1holv5" }],
  [
    "path",
    {
      d: "M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z",
      key: "187q7i"
    }
  ],
  ["path", { d: "M3.054 9.013h17.893", key: "grwhos" }]
];
const Package2 = createLucideIcon("package-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const FEATURES = [
  {
    icon: Snowflake,
    title: "Snowboards & sets",
    desc: "Kies uit Epic, VIP of complete sets voor elk niveau — van beginner tot expert."
  },
  {
    icon: Package2,
    title: "Boots & bindingen",
    desc: "Passende schoenen en bindingen uit ons kwalitatief assortiment."
  },
  {
    icon: ShoppingBag,
    title: "Skate & surf",
    desc: "Skateboard, surfskate, surfboard, SUP en skimboard voor elk seizoen."
  },
  {
    icon: Calendar,
    title: "Flexibele periodes",
    desc: "Dag, weekend, shortski, week of twee weken — kies wat past."
  }
];
const PRICE_HIGHLIGHTS = [
  { label: "Kids set", from: "€15 / dag", badge: "Populair" },
  { label: "Epic set", from: "€20 / dag", badge: null },
  { label: "VIP set", from: "€30 / dag", badge: "Premium" },
  { label: "Splitboard set", from: "€180 / shortski", badge: null }
];
const STEPS = [
  {
    nr: "01",
    title: "Kies je materiaal",
    desc: "Surf door ons aanbod en selecteer je snowboard, boots, bindingen of complete set."
  },
  {
    nr: "02",
    title: "Vul het formulier in",
    desc: "Geef je maten, niveau en gewenste ophaaldag op — alles in 2 minuten."
  },
  {
    nr: "03",
    title: "Ontvang bevestiging",
    desc: "We nemen contact op en zorgen dat alles klaarstaat op jouw ophaaldag."
  }
];
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center overflow-hidden",
        style: {
          background: "linear-gradient(160deg, #0F766E 0%, #0c5c56 45%, #0F172A 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/login-hero-panel.dim_900x1080.jpg",
              alt: "",
              "aria-hidden": "true",
              className: "absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "relative z-10 max-w-3xl mx-auto space-y-6",
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      "aria-hidden": "true",
                      width: "44",
                      height: "34",
                      viewBox: "0 0 80 60",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M40 4L72 56H8L40 4Z", fill: "white", fillOpacity: "0.9" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M28 24L40 4L52 24", fill: "white", fillOpacity: "0.5" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80 font-display font-semibold text-lg", children: "West-Site Rental" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight", children: [
                  "Jouw perfecte setup",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#F59E0B" }, children: "op de piste" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xl max-w-xl mx-auto leading-relaxed", children: "Huur snowboards, boots, bindingen en meer. Snelle reservering, professioneel advies, klaar bij ophalen." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      className: "gap-2 font-semibold text-base",
                      style: { background: "#F59E0B", color: "#0F172A" },
                      "data-ocid": "hero-reserveer-btn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/reserveren", children: [
                        "Reserveer nu",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      variant: "outline",
                      className: "gap-2 font-semibold text-base border-white/30 text-white hover:bg-white/10",
                      "data-ocid": "hero-prijslijst-btn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/prijslijst", children: "Bekijk prijzen" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-6 pt-4", children: ["Gratis advies", "Maten op maat", "Snel afhalen"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-1.5 text-white/60 text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-white/40" }),
                      item
                    ]
                  },
                  item
                )) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Alles voor je avontuur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Van snowboardsets voor beginners tot splitboards voor de gevorderde rider — West-Site heeft het allemaal." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full hover:border-primary/40 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: f.desc })
          ] }) })
        },
        f.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-20 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Onze populairste formules" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Transparante prijzen, geen verrassingen. Vanaf:" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10", children: PRICE_HIGHLIGHTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { delay: i * 0.08 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "text-center hover:border-primary/40 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-2", children: [
            p.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "text-xs bg-primary/10 text-primary border-primary/20",
                variant: "outline",
                children: p.badge
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg", children: p.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-primary", children: p.from })
          ] }) })
        },
        p.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          size: "lg",
          className: "gap-2 font-semibold",
          "data-ocid": "pricing-cta-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/reserveren", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }),
            "Alle prijzen & reserveren"
          ] })
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Zo werkt het" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Reserveer in 3 eenvoudige stappen" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center space-y-4",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.15 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-lg", children: step.nr }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: step.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: step.desc })
          ]
        },
        step.nr
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          size: "lg",
          className: "gap-2 font-semibold",
          "data-ocid": "steps-cta-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/reserveren", children: [
            "Begin met reserveren",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        }
      ) })
    ] }) })
  ] });
}
export {
  HomePage as default
};
