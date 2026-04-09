import { c as createLucideIcon, r as reactExports, E as ProductType, j as jsxRuntimeExports, z as Package, B as Button, S as Skeleton, a as Badge, Q as QrCode, s as ue } from "./index-DJrsHPCD.js";
import { C as Card, a as CardContent } from "./card-DC_4A9uF.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, C as Checkbox, d as DialogFooter } from "./dialog-B0S-c_Sy.js";
import { I as Input } from "./input-CilnsQ6Q.js";
import { L as Label } from "./label-MKFleP4N.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-OwNETDxw.js";
import { u as useProducten, a as useVoegProductToe, b as useBewerkProduct, c as useVerwijderProduct } from "./useProducten-Cgeo_46e.js";
import { P as Plus } from "./plus-DVTWttl-.js";
import { S as Search } from "./search-DEWMppQt.js";
import "./check-Bmymcbbk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$2);
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const typeLabel = {
  [ProductType.Snowboard]: "Snowboard",
  [ProductType.Boots]: "Boots",
  [ProductType.Bindingen]: "Bindingen"
};
const typeColor = {
  [ProductType.Snowboard]: "bg-primary/10 text-primary border-primary/20",
  [ProductType.Boots]: "bg-accent/10 text-accent border-accent/20",
  [ProductType.Bindingen]: "bg-muted text-muted-foreground border-border"
};
const defaultForm = {
  naam: "",
  productType: ProductType.Snowboard,
  maat: "",
  prijsPerDag: "15",
  beschikbaar: true
};
function QrCodeDialog({
  product,
  open,
  onClose
}) {
  if (!product) return null;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(product.qrCode)}&size=200x200&margin=10`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-sm", children: [
      "QR-code: ",
      product.naam
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: qrUrl,
          alt: `QR code voor ${product.naam}`,
          className: "w-48 h-48 rounded-lg border border-border"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono text-center break-all", children: product.qrCode })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: onClose, children: "Sluiten" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: () => window.open(qrUrl, "_blank"),
          className: "gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5" }),
            "Downloaden"
          ]
        }
      )
    ] })
  ] }) });
}
function Inventaris() {
  const [zoekterm, setZoekterm] = reactExports.useState("");
  const [filterType, setFilterType] = reactExports.useState("alle");
  const [filterBeschikbaar, setFilterBeschikbaar] = reactExports.useState("alle");
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [qrDialogProduct, setQrDialogProduct] = reactExports.useState(null);
  const [editProduct, setEditProduct] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(defaultForm);
  const filter = filterType !== "alle" ? { productType: filterType } : {};
  const { data: producten, isLoading } = useProducten(filter);
  const voegToe = useVoegProductToe();
  const bewerk = useBewerkProduct();
  const verwijder = useVerwijderProduct();
  const gefilterd = (producten == null ? void 0 : producten.filter((p) => {
    const matchZoek = p.naam.toLowerCase().includes(zoekterm.toLowerCase()) || p.maat.toLowerCase().includes(zoekterm.toLowerCase());
    const matchBeschikbaar = filterBeschikbaar === "alle" || filterBeschikbaar === "beschikbaar" && p.beschikbaar || filterBeschikbaar === "verhuurd" && !p.beschikbaar;
    return matchZoek && matchBeschikbaar;
  })) ?? [];
  const openNieuw = () => {
    setEditProduct(null);
    setForm(defaultForm);
    setDialogOpen(true);
  };
  const openBewerk = (p) => {
    setEditProduct(p);
    setForm({
      naam: p.naam,
      productType: p.productType,
      maat: p.maat,
      prijsPerDag: p.prijsPerDag.toString(),
      beschikbaar: p.beschikbaar
    });
    setDialogOpen(true);
  };
  const handleOpslaan = async () => {
    if (!form.naam.trim() || !form.maat.trim()) {
      ue.error("Vul alle verplichte velden in");
      return;
    }
    try {
      if (editProduct) {
        await bewerk.mutateAsync({
          id: editProduct.id,
          naam: form.naam,
          maat: form.maat,
          prijsPerDag: BigInt(form.prijsPerDag),
          beschikbaar: form.beschikbaar
        });
        ue.success("Product bijgewerkt");
      } else {
        await voegToe.mutateAsync({
          naam: form.naam,
          productType: form.productType,
          maat: form.maat,
          prijsPerDag: BigInt(form.prijsPerDag)
        });
        ue.success("Product toegevoegd");
      }
      setDialogOpen(false);
    } catch {
      ue.error("Opslaan mislukt. Probeer opnieuw.");
    }
  };
  const handleVerwijder = async (id, naam) => {
    if (!confirm(`Weet je zeker dat je "${naam}" wilt verwijderen?`)) return;
    try {
      await verwijder.mutateAsync(id);
      ue.success("Product verwijderd");
    } catch {
      ue.error("Verwijderen mislukt");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-primary" }),
          "Inventaris"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          (producten == null ? void 0 : producten.length) ?? 0,
          " producten in totaal"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openNieuw,
          className: "gap-2 shrink-0",
          "data-ocid": "inventaris-add-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Product toevoegen"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Zoeken op naam of maat…",
            value: zoekterm,
            onChange: (e) => setZoekterm(e.target.value),
            className: "pl-8",
            "data-ocid": "inventaris-zoek"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: filterType,
          onValueChange: (v) => setFilterType(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "w-40", "data-ocid": "inventaris-filter-type", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 mr-1.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "alle", children: "Alle types" }),
              Object.values(ProductType).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: typeLabel[t] }, t))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: filterBeschikbaar,
          onValueChange: (v) => setFilterBeschikbaar(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-40",
                "data-ocid": "inventaris-filter-beschikbaar",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "alle", children: "Alle statussen" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "beschikbaar", children: "Beschikbaar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "verhuurd", children: "Verhuurd" })
            ] })
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, i)) }) : gefilterd.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "inventaris-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Geen producten gevonden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "mt-3",
          onClick: openNieuw,
          children: "Eerste product toevoegen"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: gefilterd.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "card-rental hover:border-border/80",
        "data-ocid": `inventaris-row-${p.id}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: `shrink-0 text-xs ${typeColor[p.productType]}`,
              children: typeLabel[p.productType]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate", children: p.naam }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Maat ",
              p.maat,
              " · €",
              p.prijsPerDag.toString(),
              "/dag"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: p.beschikbaar ? "outline" : "secondary",
              className: `shrink-0 text-xs ${p.beschikbaar ? "bg-[oklch(var(--success)/0.12)] text-[oklch(var(--success))] border-[oklch(var(--success)/0.3)]" : "bg-muted text-muted-foreground"}`,
              children: p.beschikbaar ? "Beschikbaar" : "Verhuurd"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-muted-foreground hover:text-foreground",
                onClick: () => setQrDialogProduct(p),
                "aria-label": "Bekijk QR-code",
                "data-ocid": `inventaris-qr-${p.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7",
                onClick: () => openBewerk(p),
                "aria-label": "Bewerk product",
                "data-ocid": `inventaris-edit-${p.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-destructive hover:text-destructive",
                onClick: () => handleVerwijder(p.id, p.naam),
                "aria-label": "Verwijder product",
                "data-ocid": `inventaris-delete-${p.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] })
      },
      p.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      QrCodeDialog,
      {
        product: qrDialogProduct,
        open: !!qrDialogProduct,
        onClose: () => setQrDialogProduct(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: editProduct ? "Product bewerken" : "Product toevoegen" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product-naam", children: "Naam *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "product-naam",
              value: form.naam,
              onChange: (e) => setForm({ ...form, naam: e.target.value }),
              placeholder: "Bijv. Salomon Huck Knife",
              "data-ocid": "product-naam"
            }
          )
        ] }),
        !editProduct && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product-type", children: "Type *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.productType,
              onValueChange: (v) => setForm({ ...form, productType: v }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "product-type", "data-ocid": "product-type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(ProductType).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: typeLabel[t] }, t)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product-maat", children: "Maat *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "product-maat",
                value: form.maat,
                onChange: (e) => setForm({ ...form, maat: e.target.value }),
                placeholder: "Bijv. 156cm / 42",
                "data-ocid": "product-maat"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product-prijs", children: "Prijs per dag (€) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "product-prijs",
                type: "number",
                min: "1",
                value: form.prijsPerDag,
                onChange: (e) => setForm({ ...form, prijsPerDag: e.target.value }),
                "data-ocid": "product-prijs"
              }
            )
          ] })
        ] }),
        editProduct && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              id: "product-beschikbaar",
              checked: form.beschikbaar,
              onCheckedChange: (c) => setForm({ ...form, beschikbaar: !!c }),
              "data-ocid": "product-beschikbaar"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product-beschikbaar", className: "cursor-pointer", children: "Beschikbaar voor verhuur" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setDialogOpen(false), children: "Annuleren" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleOpslaan,
            disabled: voegToe.isPending || bewerk.isPending,
            "data-ocid": "product-opslaan",
            children: voegToe.isPending || bewerk.isPending ? "Bezig…" : editProduct ? "Opslaan" : "Toevoegen"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Inventaris as default
};
