import { c as createLucideIcon, r as reactExports, ab as ReserveringStatus, j as jsxRuntimeExports, y as Clock, S as Skeleton, U as Users, s as ue, B as Button, m as LoaderCircle } from "./index-DJrsHPCD.js";
import { a as useAlleReserveringen, b as useBevestigReservering, c as useAnnuleerReservering } from "./useReserveringen-ojGO0sXC.js";
import { m as motion } from "./proxy-gxodpJKO.js";
import { P as Phone } from "./phone-8mi4sPML.js";
import { C as Calendar } from "./calendar-2Hh8wQrU.js";
import { C as CircleCheck } from "./circle-check-Dn86r6ds.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
];
const PackageCheck = createLucideIcon("package-check", __iconNode);
function tsNaarDatum(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("nl-NL");
}
const STATUS_FILTERS = [
  { label: "Alle", waarde: "alle" },
  { label: "In afwachting", waarde: ReserveringStatus.InAfwachting },
  { label: "Bevestigd", waarde: ReserveringStatus.Bevestigd },
  { label: "Geannuleerd", waarde: ReserveringStatus.Geannuleerd }
];
function StatusBadge({ status }) {
  const config = {
    [ReserveringStatus.InAfwachting]: {
      label: "In afwachting",
      className: "bg-orange-500/15 text-orange-600 border-orange-400/30 dark:text-orange-400",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" })
    },
    [ReserveringStatus.Bevestigd]: {
      label: "Bevestigd",
      className: "bg-primary/15 text-primary border-primary/30",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" })
    },
    [ReserveringStatus.Geannuleerd]: {
      label: "Geannuleerd",
      className: "bg-destructive/10 text-destructive border-destructive/20",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" })
    }
  };
  const { label, className, icon } = config[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${className}`,
      children: [
        icon,
        label
      ]
    }
  );
}
function ReserveringKaart({
  reservering,
  onBevestig,
  onAnnuleer,
  bevestigBezig,
  annuleerBezig,
  index
}) {
  const isInAfwachting = reservering.status === ReserveringStatus.InAfwachting;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05 },
      className: "bg-card border border-border rounded-xl p-4 space-y-3 hover:border-border/80 hover:shadow-sm transition-smooth",
      "data-ocid": "reservering-kaart",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: reservering.contactNaam }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: reservering.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: reservering.contactEmail }),
              reservering.contactTelefoon && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                reservering.contactTelefoon
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex-shrink-0 bg-muted/50 px-2 py-0.5 rounded-md", children: [
            "#",
            reservering.id.toString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-primary/70" }),
            tsNaarDatum(reservering.startDatum),
            " →",
            " ",
            tsNaarDatum(reservering.eindDatum)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { className: "w-3.5 h-3.5 text-primary/70" }),
            reservering.productIds.length,
            " product",
            reservering.productIds.length !== 1 ? "en" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/60", children: [
            "Geplaatst ",
            tsNaarDatum(reservering.aangemaakt)
          ] })
        ] }),
        isInAfwachting && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1 flex-wrap border-t border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => onBevestig(reservering.id),
              disabled: bevestigBezig || annuleerBezig,
              "data-ocid": "btn-bevestig-reservering",
              className: "h-8 text-xs gap-1.5",
              children: [
                bevestigBezig ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                "Bevestigen"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => onAnnuleer(reservering.id),
              disabled: bevestigBezig || annuleerBezig,
              "data-ocid": "btn-annuleer-reservering",
              className: "h-8 text-xs gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/5 hover:border-destructive/50",
              children: [
                annuleerBezig ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                "Annuleren"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Reserveringen() {
  var _a;
  const { data: reserveringen = [], isLoading } = useAlleReserveringen();
  const { mutateAsync: bevestig, isPending: bevestigBezig } = useBevestigReservering();
  const { mutateAsync: annuleer, isPending: annuleerBezig } = useAnnuleerReservering();
  const [actieveFilter, setActieveFilter] = reactExports.useState("alle");
  const [bezigeId, setBezigeId] = reactExports.useState(null);
  const gefilterd = reserveringen.filter(
    (r) => actieveFilter === "alle" || r.status === actieveFilter
  );
  const gesorteerd = [...gefilterd].sort((a, b) => {
    if (a.status === ReserveringStatus.InAfwachting && b.status !== ReserveringStatus.InAfwachting)
      return -1;
    if (b.status === ReserveringStatus.InAfwachting && a.status !== ReserveringStatus.InAfwachting)
      return 1;
    return Number(a.startDatum - b.startDatum);
  });
  const tellingen = {
    alle: reserveringen.length,
    [ReserveringStatus.InAfwachting]: reserveringen.filter(
      (r) => r.status === ReserveringStatus.InAfwachting
    ).length,
    [ReserveringStatus.Bevestigd]: reserveringen.filter(
      (r) => r.status === ReserveringStatus.Bevestigd
    ).length,
    [ReserveringStatus.Geannuleerd]: reserveringen.filter(
      (r) => r.status === ReserveringStatus.Geannuleerd
    ).length
  };
  async function handleBevestig(id) {
    setBezigeId(id);
    try {
      await bevestig(id);
      ue.success("Reservering bevestigd");
    } catch {
      ue.error("Kon reservering niet bevestigen");
    } finally {
      setBezigeId(null);
    }
  }
  async function handleAnnuleer(id) {
    setBezigeId(id);
    try {
      await annuleer(id);
      ue.success("Reservering geannuleerd");
    } catch {
      ue.error("Kon reservering niet annuleren");
    } finally {
      setBezigeId(null);
    }
  }
  const inAfwachting = tellingen[ReserveringStatus.InAfwachting];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 px-4 max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-6 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Reserveringen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Bekijk en beheer klantreserveringen" })
      ] }),
      inAfwachting > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          className: "flex items-center gap-2 bg-orange-500/10 border border-orange-400/30 rounded-lg px-3 py-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-orange-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-orange-600 dark:text-orange-400", children: [
              inAfwachting,
              " in afwachting"
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center gap-2 flex-wrap mb-6",
        "data-ocid": "filter-status",
        children: STATUS_FILTERS.map((f) => {
          const isActief = actieveFilter === f.waarde;
          const badgeColor = f.waarde === ReserveringStatus.InAfwachting ? "bg-orange-500" : f.waarde === ReserveringStatus.Geannuleerd ? "bg-destructive" : "bg-primary";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActieveFilter(f.waarde),
              className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth border ${isActief ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80 hover:text-foreground"}`,
              children: [
                f.label,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold leading-none ${isActief ? "bg-primary-foreground/20 text-primary-foreground" : `${badgeColor} text-primary-foreground opacity-80`}`,
                    children: tellingen[f.waarde]
                  }
                )
              ]
            },
            f.waarde
          );
        })
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }, i)) }) : gesorteerd.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-xl bg-muted/20",
        "data-ocid": "empty-state-reserveringen",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground mb-3 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Geen reserveringen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: actieveFilter === "alle" ? "Er zijn nog geen reserveringen geplaatst." : `Geen reserveringen met status "${(_a = STATUS_FILTERS.find((f) => f.waarde === actieveFilter)) == null ? void 0 : _a.label}".` })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: gesorteerd.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReserveringKaart,
      {
        reservering: r,
        onBevestig: handleBevestig,
        onAnnuleer: handleAnnuleer,
        bevestigBezig: bevestigBezig && bezigeId === r.id,
        annuleerBezig: annuleerBezig && bezigeId === r.id,
        index: idx
      },
      r.id.toString()
    )) })
  ] });
}
export {
  Reserveringen as default
};
