import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as PublicLayout, B as Button, L as Link } from "./index-DJrsHPCD.js";
import { C as CircleCheck } from "./circle-check-Dn86r6ds.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode);
function BevestigingPage() {
  const reserveringId = reactExports.useMemo(() => {
    if (typeof sessionStorage === "undefined") return null;
    const id = sessionStorage.getItem("reservering_id");
    return id ? id : null;
  }, []);
  const naam = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("reservering_naam") ?? void 0 : void 0;
  const email = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("reservering_email") ?? void 0 : void 0;
  const materiaal = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("reservering_materiaal") ?? void 0 : void 0;
  const duur = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("reservering_duur") ?? void 0 : void 0;
  const ophaaldag = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("reservering_ophaaldag") ?? void 0 : void 0;
  const referentie = reserveringId ? `WSR-${reserveringId}` : `WSR-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "")}-${String(Math.floor(1e3 + Math.random() * 9e3))}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PublicLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-md w-full text-center space-y-6",
      "data-ocid": "bevestiging-container",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Reservering ontvangen!" }),
          naam && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "Bedankt,",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: naam }),
            "!"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed", children: [
          "Je reservering is ontvangen. We nemen zo snel mogelijk contact op",
          email ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " ",
            "via ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: email })
          ] }) : " via e-mail of GSM",
          " ",
          "om je reservering te bevestigen."
        ] }),
        (materiaal || duur || ophaaldag) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4 text-left space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Jouw aanvraag" }),
          materiaal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Materiaal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: materiaal })
          ] }),
          duur && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Periode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: duur })
          ] }),
          ophaaldag && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Ophaaldag" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: ophaaldag })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-muted border border-border mx-auto",
            "data-ocid": "bevestiging-referentie",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Referentienummer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-foreground text-lg", children: referentie })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Noteer dit referentienummer voor je eigen administratie." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 text-left space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Wat nu?" }),
          [
            "We controleren je aanvraag en de beschikbaarheid.",
            "Je ontvangt een bevestiging via e-mail of telefoon.",
            "Op je ophaaldag ligt alles klaar bij West-Site Boardshop."
          ].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3 text-sm text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step })
              ]
            },
            step
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              className: "gap-2",
              "data-ocid": "bevestiging-home-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/home", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
                "Terug naar home"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "gap-2", "data-ocid": "bevestiging-nieuw-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/reserveren", children: "Nieuwe reservering" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground pt-2", children: [
          "Vragen? Bezoek",
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
      ]
    }
  ) }) });
}
export {
  BevestigingPage as default
};
