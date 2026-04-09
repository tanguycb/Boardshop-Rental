import { c as createLucideIcon, l as useNavigate, a9 as useStartVerhuur, r as reactExports, j as jsxRuntimeExports, s as ue, z as Package, aa as User, E as ProductType, S as Skeleton, B as Button, a as Badge, m as LoaderCircle } from "./index-DJrsHPCD.js";
import { I as Input } from "./input-CilnsQ6Q.js";
import { L as Label } from "./label-MKFleP4N.js";
import { d as useBeschikbareProducten } from "./useProducten-Cgeo_46e.js";
import { A as AnimatePresence } from "./index-COo9MCy4.js";
import { m as motion } from "./proxy-gxodpJKO.js";
import { C as Check } from "./check-Bmymcbbk.js";
import { S as Snowflake } from "./snowflake-BpFEUXa1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
];
const ClipboardCheck = createLucideIcon("clipboard-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
      key: "1dudjm"
    }
  ],
  [
    "path",
    {
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
      key: "l2t8xc"
    }
  ],
  ["path", { d: "M16 17h4", key: "1dejxt" }],
  ["path", { d: "M4 13h4", key: "1bwh8b" }]
];
const Footprints = createLucideIcon("footprints", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode);
function dateToTs(s) {
  return BigInt(new Date(s).getTime()) * 1000000n;
}
function dagPrijs(prijs) {
  return `€ ${Number(prijs) / 100}`;
}
function aantalDagen(start, eind) {
  const diff = new Date(eind).getTime() - new Date(start).getTime();
  return Math.max(1, Math.ceil(diff / 864e5));
}
function totaal(producten, dagen) {
  const sum = producten.reduce(
    (acc, p) => acc + Number(p.prijsPerDag) * dagen,
    0
  );
  return `€ ${sum / 100}`;
}
const PRODUCT_TYPE_ICON = {
  [ProductType.Snowboard]: /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "w-4 h-4" }),
  [ProductType.Boots]: /* @__PURE__ */ jsxRuntimeExports.jsx(Footprints, { className: "w-4 h-4" }),
  [ProductType.Bindingen]: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4" })
};
const PRODUCT_TYPE_LABEL = {
  [ProductType.Snowboard]: "Snowboard",
  [ProductType.Boots]: "Schoenen",
  [ProductType.Bindingen]: "Bindingen"
};
const STAPPEN = [
  { label: "Producten", icon: Package },
  { label: "Klant", icon: User },
  { label: "Periode", icon: CalendarDays },
  { label: "Bevestig", icon: ClipboardCheck }
];
function StapIndicator({ huidig }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-8", children: STAPPEN.map((stap, i) => {
    const Icon = stap.icon;
    const actief = i === huidig;
    const klaar = i < huidig;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${actief ? "bg-primary text-primary-foreground" : klaar ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
          children: [
            klaar ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: stap.label })
          ]
        }
      ),
      i < STAPPEN.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
    ] }, stap.label);
  }) });
}
function ProductKaart({
  product,
  geselecteerd,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: onToggle,
      "data-ocid": "product-select-card",
      className: `w-full text-left p-3 rounded-lg border transition-smooth cursor-pointer ${geselecteerd ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-primary/40 hover:bg-accent/5"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: geselecteerd ? "text-primary" : "text-muted-foreground",
              children: PRODUCT_TYPE_ICON[product.productType]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: product.naam }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              PRODUCT_TYPE_LABEL[product.productType],
              " · Maat",
              " ",
              product.maat
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
            dagPrijs(product.prijsPerDag),
            "/dag"
          ] }),
          geselecteerd && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary" })
        ] })
      ] })
    }
  );
}
function StapProducten({
  startDatum,
  eindDatum,
  setStartDatum,
  setEindDatum,
  geselecteerdeIds,
  setGeselecteerdeIds,
  isSet,
  setIsSet,
  onVolgende
}) {
  const vandaag = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const startTs = startDatum ? dateToTs(startDatum) : 0n;
  const eindTs = eindDatum ? dateToTs(eindDatum) : 0n;
  const kanLaden = !!startDatum && !!eindDatum && startTs < eindTs;
  const { data: producten = [], isLoading } = useBeschikbareProducten(
    startTs,
    eindTs,
    kanLaden
  );
  const snowboards = producten.filter(
    (p) => p.productType === ProductType.Snowboard
  );
  const boots = producten.filter((p) => p.productType === ProductType.Boots);
  const bindingen = producten.filter(
    (p) => p.productType === ProductType.Bindingen
  );
  function toggle(id) {
    const next = new Set(geselecteerdeIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setGeselecteerdeIds(next);
  }
  function selecteerSet() {
    const board = snowboards[0];
    const boot = boots[0];
    const binding = bindingen[0];
    if (board && boot && binding) {
      setGeselecteerdeIds(/* @__PURE__ */ new Set([board.id, boot.id, binding.id]));
      setIsSet(true);
    } else {
      ue.error("Geen complete set beschikbaar voor deze periode");
    }
  }
  const kanSet = snowboards.length > 0 && boots.length > 0 && bindingen.length > 0;
  function renderGroep(label, items) {
    if (items.length === 0) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductKaart,
        {
          product: p,
          geselecteerd: geselecteerdeIds.has(p.id),
          onToggle: () => {
            toggle(p.id);
            setIsSet(false);
          }
        },
        p.id.toString()
      )) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "startDatum", children: "Startdatum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "startDatum",
            type: "date",
            min: vandaag,
            value: startDatum,
            onChange: (e) => setStartDatum(e.target.value),
            "data-ocid": "input-start-datum"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "eindDatum", children: "Einddatum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "eindDatum",
            type: "date",
            min: startDatum || vandaag,
            value: eindDatum,
            onChange: (e) => setEindDatum(e.target.value),
            "data-ocid": "input-eind-datum"
          }
        )
      ] })
    ] }),
    !kanLaden ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground", children: "Kies eerst een start- en einddatum om beschikbare producten te zien." }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, i)) }) : producten.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground", children: "Geen beschikbare producten voor deze periode." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      kanSet && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: selecteerSet,
          "data-ocid": "btn-selecteer-set",
          className: "w-full border-primary/40 text-primary hover:bg-primary/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 mr-2" }),
            "Selecteer complete set (snowboard + schoenen + bindingen)"
          ]
        }
      ),
      isSet && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-primary/10 text-primary", children: "Complete set geselecteerd" }),
      renderGroep("Snowboards", snowboards),
      renderGroep("Schoenen", boots),
      renderGroep("Bindingen", bindingen)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: onVolgende,
        disabled: geselecteerdeIds.size === 0,
        "data-ocid": "btn-volgende-klant",
        children: [
          "Volgende",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
        ]
      }
    ) })
  ] });
}
function StapKlant({
  naam,
  setNaam,
  contact,
  setContact,
  onTerug,
  onVolgende
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "naam", children: "Naam klant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "naam",
            placeholder: "Voor- en achternaam",
            value: naam,
            onChange: (e) => setNaam(e.target.value),
            "data-ocid": "input-klant-naam"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact", children: "Contactgegevens" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "contact",
            placeholder: "Telefoon of e-mailadres",
            value: contact,
            onChange: (e) => setContact(e.target.value),
            "data-ocid": "input-klant-contact"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onTerug, children: "Terug" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: onVolgende,
          disabled: !naam.trim() || !contact.trim(),
          "data-ocid": "btn-volgende-periode",
          children: [
            "Volgende ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
          ]
        }
      )
    ] })
  ] });
}
function StapPeriode({
  startDatum,
  eindDatum,
  geselecteerdeProducten,
  onTerug,
  onVolgende
}) {
  const dagen = aantalDagen(startDatum, eindDatum);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Startdatum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: new Date(startDatum).toLocaleDateString("nl-NL") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Einddatum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: new Date(eindDatum).toLocaleDateString("nl-NL") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Aantal dagen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
          dagen,
          " dag",
          dagen !== 1 ? "en" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-border" }),
      geselecteerdeProducten.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: p.naam }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          dagPrijs(p.prijsPerDag),
          "/dag × ",
          dagen,
          " = €",
          " ",
          Number(p.prijsPerDag) * dagen / 100
        ] })
      ] }, p.id.toString())),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Totaal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: totaal(geselecteerdeProducten, dagen) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onTerug, children: "Terug" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onVolgende, "data-ocid": "btn-volgende-bevestig", children: [
        "Bekijk samenvatting ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
      ] })
    ] })
  ] });
}
function StapBevestig({
  naam,
  contact,
  startDatum,
  eindDatum,
  geselecteerdeProducten,
  isSet,
  onTerug,
  onBevestig,
  bezig
}) {
  const dagen = aantalDagen(startDatum, eindDatum);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SamenvattingBlok, { titel: "Klantgegevens", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Rij, { label: "Naam", waarde: naam }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Rij, { label: "Contact", waarde: contact })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SamenvattingBlok, { titel: "Periode", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Rij,
          {
            label: "Start",
            waarde: new Date(startDatum).toLocaleDateString("nl-NL")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Rij,
          {
            label: "Eind",
            waarde: new Date(eindDatum).toLocaleDateString("nl-NL")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Rij, { label: "Dagen", waarde: `${dagen}` }),
        isSet && /* @__PURE__ */ jsxRuntimeExports.jsx(Rij, { label: "Type", waarde: "Complete set" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SamenvattingBlok, { titel: "Producten", children: [
        geselecteerdeProducten.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Rij,
          {
            label: p.naam,
            waarde: `${dagPrijs(p.prijsPerDag)}/dag`
          },
          p.id.toString()
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Totaal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: totaal(geselecteerdeProducten, dagen) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onTerug, disabled: bezig, children: "Terug" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: onBevestig,
          disabled: bezig,
          "data-ocid": "btn-start-verhuur",
          children: bezig ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
            "Bezig…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }),
            "Verhuur starten"
          ] })
        }
      )
    ] })
  ] });
}
function SamenvattingBlok({
  titel,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3", children: titel }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children })
  ] });
}
function Rij({ label, waarde }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: waarde })
  ] });
}
function NieuweVerhuur() {
  const navigate = useNavigate();
  const { mutateAsync: startVerhuur, isPending } = useStartVerhuur();
  const [stap, setStap] = reactExports.useState(0);
  const [startDatum, setStartDatum] = reactExports.useState("");
  const [eindDatum, setEindDatum] = reactExports.useState("");
  const [geselecteerdeIds, setGeselecteerdeIds] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [isSet, setIsSet] = reactExports.useState(false);
  const startTs = startDatum ? dateToTs(startDatum) : 0n;
  const eindTs = eindDatum ? dateToTs(eindDatum) : 0n;
  const { data: alleBeschikbaar = [] } = useBeschikbareProducten(
    startTs,
    eindTs,
    !!startDatum && !!eindDatum
  );
  const geselecteerdeProducten = reactExports.useMemo(
    () => alleBeschikbaar.filter((p) => geselecteerdeIds.has(p.id)),
    [alleBeschikbaar, geselecteerdeIds]
  );
  const [naam, setNaam] = reactExports.useState("");
  const [contact, setContact] = reactExports.useState("");
  async function handleBevestig() {
    try {
      await startVerhuur({
        klantNaam: naam,
        klantContact: contact,
        productIds: Array.from(geselecteerdeIds),
        isSet,
        startDatum: startTs,
        eindDatum: eindTs
      });
      ue.success("Verhuur gestart!");
      navigate({ to: "/medewerker/verhuur" });
    } catch {
      ue.error("Verhuur kon niet worden gestart. Probeer het opnieuw.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto py-8 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Nieuwe Verhuur" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Vul alle stappen in om een verhuur te starten" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StapIndicator, { huidig: stap }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { duration: 0.2 },
        children: [
          stap === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StapProducten,
            {
              startDatum,
              eindDatum,
              setStartDatum,
              setEindDatum,
              geselecteerdeIds,
              setGeselecteerdeIds,
              isSet,
              setIsSet,
              onVolgende: () => setStap(1)
            }
          ),
          stap === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StapKlant,
            {
              naam,
              setNaam,
              contact,
              setContact,
              onTerug: () => setStap(0),
              onVolgende: () => setStap(2)
            }
          ),
          stap === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StapPeriode,
            {
              startDatum,
              eindDatum,
              geselecteerdeProducten,
              onTerug: () => setStap(1),
              onVolgende: () => setStap(3)
            }
          ),
          stap === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StapBevestig,
            {
              naam,
              contact,
              startDatum,
              eindDatum,
              geselecteerdeProducten,
              isSet,
              onTerug: () => setStap(2),
              onBevestig: handleBevestig,
              bezig: isPending
            }
          )
        ]
      },
      stap
    ) }) })
  ] });
}
export {
  NieuweVerhuur as default
};
