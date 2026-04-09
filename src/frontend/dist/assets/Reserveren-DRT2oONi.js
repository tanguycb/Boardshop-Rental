import { c as createLucideIcon, r as reactExports, u as useDirection, b as useControllableState, j as jsxRuntimeExports, d as Primitive, e as useId, R as Root, I as Item, f as composeEventHandlers, g as Presence, h as createRovingFocusGroupScope, i as createContextScope, k as cn, P as PublicLayout, a as Badge, C as CalendarCheck, l as useNavigate, B as Button, m as LoaderCircle } from "./index-DJrsHPCD.js";
import { C as Checkbox, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-B0S-c_Sy.js";
import { I as Input } from "./input-CilnsQ6Q.js";
import { L as Label } from "./label-MKFleP4N.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-OwNETDxw.js";
import { S as Separator } from "./separator-30y7ohbq.js";
import { u as usePlaatsReserveringPubliek } from "./useReserveringen-ojGO0sXC.js";
import { E as Euro } from "./euro-JxPIbgp5.js";
import { C as CircleAlert } from "./circle-alert-Ch1xRJNs.js";
import "./check-Bmymcbbk.js";
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const DUUR_LABELS = {
  dag: "Dag",
  weekend: "Weekend",
  shortski: "Shortski",
  week: "Week",
  twoWeeks: "2 weken"
};
const DUUR_KEYS = ["dag", "weekend", "shortski", "week", "twoWeeks"];
const PRIJZEN = {
  "Kids set": [15, 40, 70, 95, 150],
  "Epic snowboard + bindingen": [15, 45, 75, 110, 165],
  "Epic set": [20, 60, 85, 130, 185],
  "VIP snowboard + bindingen": [25, 90, 120, 180, 250],
  "VIP set": [30, 100, 150, 180, 250],
  "Send Before You Spend set": [
    null,
    null,
    null,
    "30% aankoopprijs",
    "30% aankoopprijs"
  ],
  "EPIC schoenen": [30, 40, 50, 60, 90],
  "VIP schoenen & bindingen": [40, 55, 70, 90, 150],
  "VIP STEP ON schoenen": [40, 55, 70, 90, 150],
  "EPIC Classic Straps bindingen": [null, null, null, 35, 65],
  "VIP Step ON bindingen": [null, null, null, 90, 150],
  "VIP Supermatic bindingen": [null, null, null, 90, 150],
  "Splitboard 3/4 set": [null, null, 180, 200, 280],
  "Splitboard volledige set": [null, null, 190, 220, 350],
  "Avalanche set": [null, null, 40, 75, 100],
  "Rover set": [null, null, 85, 130, 185],
  "Kids harnas": [10, 15, 20, 25, 40],
  Surfboard: [30, 60, 100, 190, null],
  SUP: [25, 35, 65, 120, null],
  Skimboard: [15, 20, 35, 60, null],
  Skateboard: [15, 25, null, 45, null],
  Surfskate: [20, 35, null, 60, null]
};
const MATERIAAL_OPTIES = Object.keys(PRIJZEN);
const TERREIN_OPTIES = ["All-mountain", "Park", "Powder"];
const EMPTY_FORM = {
  aanspreking: "",
  voornaam: "",
  achternaam: "",
  email: "",
  gsm: "",
  materiaal: "",
  duur: "",
  ophaaldag: "",
  niveau: "",
  houding: "",
  schoenmaat: "",
  lengte: "",
  gewicht: "",
  gradenVoorvoet: "",
  gradenAchtervoet: "",
  terrein: [],
  opmerkingen: ""
};
function getMinOphaaldag() {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}
function getPrijs(materiaal, duur) {
  if (!materiaal || !duur) return void 0;
  const row = PRIJZEN[materiaal];
  if (!row) return void 0;
  const idx = DUUR_KEYS.indexOf(duur);
  return idx >= 0 ? row[idx] : void 0;
}
const PRIJSLIJST_SECTIES = [
  {
    title: "Snowboard pakketten",
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
      }
    ]
  },
  {
    title: "Schoenen & bindingen",
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
      }
    ]
  },
  {
    title: "Splitboard & avontuur",
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
const TABLE_HEADERS = ["Dag", "Weekend", "Shortski", "Week", "2 weken"];
function PrijslijstTab() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    PRIJSLIJST_SECTIES.map((sectie) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Euro, { className: "w-4 h-4 text-primary" }),
        sectie.title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium text-foreground", children: "Formule" }),
          TABLE_HEADERS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "text-right px-4 py-2.5 font-medium text-foreground whitespace-nowrap",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-foreground font-medium", children: row.product }),
                cells.map((v, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: `px-4 py-2.5 text-right tabular-nums ${v === "–" ? "text-muted-foreground" : "text-foreground font-semibold"}`,
                    children: v
                  },
                  TABLE_HEADERS[ci]
                ))
              ]
            },
            row.product
          );
        }) })
      ] }) }) })
    ] }, sectie.title)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "* Volledige huurprijs vereist bij bevestiging. Reservatie min. 1 week voor ophaaldag. Neem contact op via",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "https://www.west-site.com",
          className: "text-primary hover:underline",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "west-site.com"
        }
      ),
      " ",
      "voor meer info."
    ] })
  ] });
}
function ReserveerFormulier() {
  const navigate = useNavigate();
  const plaatsReservering = usePlaatsReserveringPubliek();
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [bevestigOpen, setBevestigOpen] = reactExports.useState(false);
  const [serverError, setServerError] = reactExports.useState(null);
  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: void 0 }));
  };
  const toggleTerrein = (t) => {
    const next = form.terrein.includes(t) ? form.terrein.filter((x) => x !== t) : [...form.terrein, t];
    set("terrein", next);
  };
  const validate = () => {
    var _a;
    const e = {};
    if (!form.aanspreking) e.aanspreking = "Aanspreking is verplicht";
    if (!form.voornaam.trim()) e.voornaam = "Voornaam is verplicht";
    if (!form.achternaam.trim()) e.achternaam = "Achternaam is verplicht";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Geldig e-mailadres is verplicht";
    if (!form.gsm.trim()) e.gsm = "GSM nummer is verplicht";
    if (!form.materiaal) e.materiaal = "Kies wat je wilt huren";
    if (!form.duur) e.duur = "Kies de huurduur";
    if (!form.ophaaldag) e.ophaaldag = "Kies een ophaaldag";
    if (!form.niveau) e.niveau = "Niveau is verplicht";
    if (!form.houding) e.houding = "Houding is verplicht";
    if (!form.schoenmaat || Number(form.schoenmaat) < 30 || Number(form.schoenmaat) > 55)
      e.schoenmaat = "Geldige schoenmaat (30–55) is verplicht";
    if (!form.lengte || Number(form.lengte) < 100 || Number(form.lengte) > 220)
      e.lengte = "Geldige lengte in cm (100–220) is verplicht";
    if (!form.gewicht || Number(form.gewicht) < 20 || Number(form.gewicht) > 200)
      e.gewicht = "Geldig gewicht in kg (20–200) is verplicht";
    if (form.terrein.length === 0) e.terrein = "Selecteer minstens één terrein";
    if (form.materiaal && form.duur) {
      const prijs2 = getPrijs(form.materiaal, form.duur);
      if (prijs2 === null)
        e.materiaal = `${form.materiaal} is niet beschikbaar voor ${(_a = DUUR_LABELS[form.duur]) == null ? void 0 : _a.toLowerCase()}`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setServerError(null);
      setBevestigOpen(true);
    }
  };
  const handleBevestig = async () => {
    setServerError(null);
    const duurDagen = {
      dag: 1,
      weekend: 3,
      shortski: 5,
      week: 7,
      twoWeeks: 14
    };
    const startDate = new Date(form.ophaaldag);
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date(startDate);
    const dagen = duurDagen[form.duur] ?? 1;
    endDate.setDate(endDate.getDate() + dagen);
    const contactNaam = `${form.aanspreking} ${form.voornaam} ${form.achternaam}`.trim();
    const notities = [
      `Materiaal: ${form.materiaal}`,
      `Duur: ${form.duur ? DUUR_LABELS[form.duur] : ""}`,
      `Niveau: ${form.niveau}`,
      `Houding: ${form.houding}`,
      `Schoenmaat: ${form.schoenmaat}`,
      `Lengte: ${form.lengte}cm`,
      `Gewicht: ${form.gewicht}kg`,
      form.gradenVoorvoet ? `Voorvoet: ${form.gradenVoorvoet}°` : "",
      form.gradenAchtervoet ? `Achtervoet: ${form.gradenAchtervoet}°` : "",
      `Terrein: ${form.terrein.join(", ")}`,
      form.opmerkingen ? `Opmerkingen: ${form.opmerkingen}` : ""
    ].filter(Boolean).join(" | ");
    try {
      const reserveringId = await plaatsReservering.mutateAsync({
        contactNaam,
        contactEmail: form.email,
        contactTelefoon: form.gsm,
        productIds: [],
        startDatum: BigInt(startDate.getTime()) * 1000000n,
        eindDatum: BigInt(endDate.getTime()) * 1000000n
      });
      setBevestigOpen(false);
      sessionStorage.setItem(
        "reservering_naam",
        `${form.voornaam} ${form.achternaam}`
      );
      sessionStorage.setItem("reservering_email", form.email);
      sessionStorage.setItem("reservering_materiaal", form.materiaal);
      sessionStorage.setItem(
        "reservering_duur",
        form.duur ? DUUR_LABELS[form.duur] : ""
      );
      sessionStorage.setItem("reservering_ophaaldag", form.ophaaldag);
      sessionStorage.setItem("reservering_id", String(reserveringId));
      sessionStorage.setItem("reservering_notities", notities);
      await navigate({ to: "/bevestiging" });
    } catch {
      setServerError(
        "Reservering kon niet worden verstuurd. Probeer het opnieuw."
      );
    }
  };
  const prijs = form.materiaal && form.duur ? getPrijs(form.materiaal, form.duur) : void 0;
  const prijsLabel = prijs !== null && prijs !== void 0 ? typeof prijs === "string" ? prijs : `€${prijs}` : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        noValidate: true,
        className: "space-y-6 max-w-2xl mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground border-b border-border pb-2", children: "1. Persoonlijke gegevens" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "aanspreking", className: "text-sm", children: [
                  "Aanspreking ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.aanspreking,
                    onValueChange: (v) => set("aanspreking", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "aanspreking",
                          className: "h-12",
                          "data-ocid": "form-aanspreking",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Kies…" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Dhr.", children: "Dhr." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Mevr.", children: "Mevr." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Mx.", children: "Mx." })
                      ] })
                    ]
                  }
                ),
                errors.aanspreking && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.aanspreking })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "voornaam", className: "text-sm", children: [
                  "Voornaam ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "voornaam",
                    className: "h-12",
                    value: form.voornaam,
                    onChange: (e) => set("voornaam", e.target.value),
                    placeholder: "Jan",
                    "data-ocid": "form-voornaam"
                  }
                ),
                errors.voornaam && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.voornaam })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "achternaam", className: "text-sm", children: [
                  "Achternaam ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "achternaam",
                    className: "h-12",
                    value: form.achternaam,
                    onChange: (e) => set("achternaam", e.target.value),
                    placeholder: "Janssen",
                    "data-ocid": "form-achternaam"
                  }
                ),
                errors.achternaam && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.achternaam })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", className: "text-sm", children: [
                  "E-mail ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "email",
                    type: "email",
                    className: "h-12",
                    value: form.email,
                    onChange: (e) => set("email", e.target.value),
                    placeholder: "jan@example.com",
                    "data-ocid": "form-email"
                  }
                ),
                errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "gsm", className: "text-sm", children: [
                  "GSM nummer ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "gsm",
                    type: "tel",
                    className: "h-12",
                    value: form.gsm,
                    onChange: (e) => set("gsm", e.target.value),
                    placeholder: "+32 4xx xx xx xx",
                    "data-ocid": "form-gsm"
                  }
                ),
                errors.gsm && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.gsm })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground border-b border-border pb-2", children: "2. Materiaalkeuze & Duur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "materiaal", className: "text-sm", children: [
                "Wat wil je huren? ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.materiaal,
                  onValueChange: (v) => set("materiaal", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        id: "materiaal",
                        className: "h-12",
                        "data-ocid": "form-materiaal",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Kies een optie…" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MATERIAAL_OPTIES.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, children: opt }, opt)) })
                  ]
                }
              ),
              errors.materiaal && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.materiaal })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "duur", className: "text-sm", children: [
                  "Hoe lang ben je weg? ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.duur,
                    onValueChange: (v) => set("duur", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "duur", className: "h-12", "data-ocid": "form-duur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Kies duurtijd…" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DUUR_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k, children: DUUR_LABELS[k] }, k)) })
                    ]
                  }
                ),
                errors.duur && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.duur })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ophaaldag", className: "text-sm", children: [
                  "Gewenste ophaaldag ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ophaaldag",
                    type: "date",
                    className: "h-12",
                    value: form.ophaaldag,
                    onChange: (e) => set("ophaaldag", e.target.value),
                    min: getMinOphaaldag(),
                    "data-ocid": "form-ophaaldag"
                  }
                ),
                errors.ophaaldag && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.ophaaldag })
              ] })
            ] }),
            form.materiaal && form.duur && (() => {
              const p = getPrijs(form.materiaal, form.duur);
              if (p === null)
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "Niet beschikbaar voor deze periode" })
                ] });
              if (p !== void 0)
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Totaalprijs" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
                      "Vereist bij bevestiging"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold text-primary", children: typeof p === "string" ? p : `€${p}` })
                ] });
              return null;
            })()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground border-b border-border pb-2", children: "3. Niveau & Profiel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "niveau", className: "text-sm", children: [
                  "Niveau ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.niveau,
                    onValueChange: (v) => set("niveau", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "niveau",
                          className: "h-12",
                          "data-ocid": "form-niveau",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Kies niveau…" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Beginner", "Gemiddeld", "Gevorderd", "Expert"].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: n, children: n }, n)) })
                    ]
                  }
                ),
                errors.niveau && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.niveau })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "houding", className: "text-sm", children: [
                  "Houding ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.houding,
                    onValueChange: (v) => set("houding", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "houding",
                          className: "h-12",
                          "data-ocid": "form-houding",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Kies houding…" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Regular", children: "Regular" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Goofy", children: "Goofy" })
                      ] })
                    ]
                  }
                ),
                errors.houding && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.houding })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground border-b border-border pb-2", children: "4. Maten" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4", children: [
              {
                id: "schoenmaat",
                label: "Schoenmaat",
                min: 30,
                max: 55,
                ph: "42",
                field: "schoenmaat"
              },
              {
                id: "lengte",
                label: "Lengte (cm)",
                min: 100,
                max: 220,
                ph: "175",
                field: "lengte"
              },
              {
                id: "gewicht",
                label: "Gewicht (kg)",
                min: 20,
                max: 200,
                ph: "75",
                field: "gewicht"
              }
            ].map(({ id, label, min, max, ph, field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: id, className: "text-sm", children: [
                label,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id,
                  type: "number",
                  min,
                  max,
                  className: "h-12",
                  value: form[field],
                  onChange: (e) => set(field, e.target.value),
                  placeholder: ph,
                  "data-ocid": `form-${id}`
                }
              ),
              errors[field] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors[field] })
            ] }, id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground border-b border-border pb-2", children: "5. Extra informatie" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "gradenVoorvoet", className: "text-sm", children: [
                  "Graden voorvoet",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(opt.)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "gradenVoorvoet",
                    type: "number",
                    className: "h-12",
                    value: form.gradenVoorvoet,
                    onChange: (e) => set("gradenVoorvoet", e.target.value),
                    placeholder: "bv. 15",
                    "data-ocid": "form-graden-voorvoet"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "gradenAchtervoet", className: "text-sm", children: [
                  "Graden achtervoet",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(opt.)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "gradenAchtervoet",
                    type: "number",
                    className: "h-12",
                    value: form.gradenAchtervoet,
                    onChange: (e) => set("gradenAchtervoet", e.target.value),
                    placeholder: "bv. -6",
                    "data-ocid": "form-graden-achtervoet"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm", children: [
                "Terrein ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4", children: TERREIN_OPTIES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    id: `terrein-${t}`,
                    checked: form.terrein.includes(t),
                    onCheckedChange: () => toggleTerrein(t),
                    "data-ocid": `form-terrein-${t.toLowerCase()}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: `terrein-${t}`,
                    className: "text-sm font-normal cursor-pointer",
                    children: t
                  }
                )
              ] }, t)) }),
              errors.terrein && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.terrein })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "opmerkingen", className: "text-sm", children: [
                "Extra opmerkingen",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(opt.)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "opmerkingen",
                  value: form.opmerkingen,
                  onChange: (e) => set("opmerkingen", e.target.value),
                  placeholder: "Bijkomende informatie…",
                  className: "resize-none h-24",
                  "data-ocid": "form-opmerkingen"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              className: "w-full h-12",
              size: "lg",
              "data-ocid": "reserveer-submit-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4 mr-2" }),
                "Reservering aanvragen"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: bevestigOpen, onOpenChange: setBevestigOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Reservering bevestigen" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-1 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-muted/40 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Persoonlijke gegevens" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            form.aanspreking,
            " ",
            form.voornaam,
            " ",
            form.achternaam
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            form.email,
            " · ",
            form.gsm
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-muted/40 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Materiaal & periode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: form.materiaal }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "Duur: ",
            form.duur ? DUUR_LABELS[form.duur] : "",
            " · Ophaaldag: ",
            form.ophaaldag
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-muted/40 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Profiel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            form.niveau,
            " · ",
            form.houding,
            " · Maat ",
            form.schoenmaat,
            " ·",
            " ",
            form.lengte,
            "cm · ",
            form.gewicht,
            "kg"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "Terrein: ",
            form.terrein.join(", ")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        prijsLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Totaalprijs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-display font-bold text-primary", children: prijsLabel })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Volledige huurprijs vereist bij bevestiging" }),
        serverError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: serverError })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 flex-col sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setBevestigOpen(false),
            disabled: plaatsReservering.isPending,
            children: "Terug"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleBevestig,
            disabled: plaatsReservering.isPending,
            "data-ocid": "bevestig-reservering-btn",
            children: plaatsReservering.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
              "Bezig…"
            ] }) : "Bevestig reservering"
          }
        )
      ] })
    ] }) })
  ] });
}
function ReserverenPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PublicLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-10 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          className: "mb-3 bg-primary/10 text-primary border-primary/20",
          variant: "outline",
          children: "Reserveren"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Materiaal reserveren" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Vul het formulier in en we nemen contact op om je reservering te bevestigen." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "reserveer", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "reserveren-tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "reserveer",
            className: "gap-2",
            "data-ocid": "tab-reserveer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
              "Reserveren"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "prijslijst",
            className: "gap-2",
            "data-ocid": "tab-prijslijst",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Euro, { className: "w-4 h-4" }),
              "Prijslijst"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "reserveer", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReserveerFormulier, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "prijslijst", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrijslijstTab, {}) })
    ] })
  ] }) });
}
export {
  ReserverenPage as default
};
