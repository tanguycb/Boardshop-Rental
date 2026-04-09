import { v as useActieveVerhuringen, Z as useMarkeerIngeleverd, l as useNavigate, r as reactExports, V as VerhuurStatus, j as jsxRuntimeExports, y as Clock, B as Button, T as TriangleAlert, S as Skeleton, a as Badge, z as Package, A as formatDate, s as ue } from "./index-DJrsHPCD.js";
import { C as Card, a as CardContent } from "./card-DC_4A9uF.js";
import { I as Input } from "./input-CilnsQ6Q.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-OwNETDxw.js";
import { P as Plus } from "./plus-DVTWttl-.js";
import { S as Search } from "./search-DEWMppQt.js";
import { C as CircleCheck } from "./circle-check-Dn86r6ds.js";
import "./check-Bmymcbbk.js";
const statusFilterLabel = {
  alle: "Alle statussen",
  actief: "Actief",
  telaat: "Te laat"
};
function ActieveVerhuur() {
  const { data: verhuringen, isLoading } = useActieveVerhuringen();
  const markeerIngeleverd = useMarkeerIngeleverd();
  const navigate = useNavigate();
  const [zoekterm, setZoekterm] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("alle");
  const teLaatCount = (verhuringen == null ? void 0 : verhuringen.filter((v) => v.status === VerhuurStatus.TeLaat).length) ?? 0;
  const gefilterd = (verhuringen == null ? void 0 : verhuringen.filter((v) => {
    const matchNaam = v.klantNaam.toLowerCase().includes(zoekterm.toLowerCase());
    const matchStatus = statusFilter === "alle" || statusFilter === "actief" && v.status === VerhuurStatus.Actief || statusFilter === "telaat" && v.status === VerhuurStatus.TeLaat;
    return matchNaam && matchStatus;
  })) ?? [];
  const handleMarkeer = async (id, naam) => {
    try {
      await markeerIngeleverd.mutateAsync(id);
      ue.success(`Verhuur van ${naam} gemarkeerd als ingeleverd`);
    } catch {
      ue.error("Markeren mislukt");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6 text-primary" }),
          "Actieve verhuur"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          (verhuringen == null ? void 0 : verhuringen.length) ?? 0,
          " actieve verhur",
          (verhuringen == null ? void 0 : verhuringen.length) !== 1 ? "ingen" : "ing",
          teLaatCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-destructive font-medium", children: [
            " ",
            "· ",
            teLaatCount,
            " te laat"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "gap-2 shrink-0",
          onClick: () => navigate({ to: "/medewerker/nieuwe-verhuur" }),
          "data-ocid": "verhuur-nieuw-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Verhuur starten"
          ]
        }
      )
    ] }),
    teLaatCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: teLaatCount }),
        " verhur",
        teLaatCount !== 1 ? "ingen zijn" : "ing is",
        " over de retourdatum — neem contact op met de klant"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Zoeken op klantnaam…",
            value: zoekterm,
            onChange: (e) => setZoekterm(e.target.value),
            className: "pl-8",
            "data-ocid": "verhuur-zoek"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: statusFilter,
          onValueChange: (v) => setStatusFilter(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", "data-ocid": "verhuur-filter-status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["alle", "actief", "telaat"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: statusFilterLabel[s] }, s)) })
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, i)) }) : gefilterd.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "verhuur-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Geen actieve verhuringen" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: gefilterd.map((v) => {
      const isTeLaat = v.status === VerhuurStatus.TeLaat;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `card-rental transition-smooth ${isTeLaat ? "border-destructive/30 bg-destructive/5" : ""}`,
          "data-ocid": `verhuur-row-${v.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: v.klantNaam }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: isTeLaat ? "destructive" : "secondary",
                    className: "text-xs",
                    "data-ocid": `verhuur-status-${v.id}`,
                    children: isTeLaat ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
                      "Te laat"
                    ] }) : "Actief"
                  }
                ),
                v.isSet && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3 mr-1" }),
                  "Set"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                v.klantContact && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-2", children: [
                  v.klantContact,
                  " ·"
                ] }),
                formatDate(v.startDatum),
                " – ",
                formatDate(v.eindDatum),
                v.productIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2", children: [
                  "· ",
                  v.productIds.length,
                  " product",
                  v.productIds.length !== 1 ? "en" : ""
                ] })
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
                "data-ocid": `verhuur-inleveren-${v.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                  "Ingeleverd"
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
  ActieveVerhuur as default
};
