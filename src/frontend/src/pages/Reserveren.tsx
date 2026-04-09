import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, CalendarCheck, Euro, Loader2, Tag } from "lucide-react";
import { useState } from "react";
import { PublicLayout } from "../components/Layout";
import { usePlaatsReserveringPubliek } from "../hooks/useReserveringen";

// ─── Types ────────────────────────────────────────────────────────────────────
type DuurKey = "dag" | "weekend" | "shortski" | "week" | "twoWeeks";
type PrijsValue = number | string | null;

interface ReservatieFormData {
  aanspreking: string;
  voornaam: string;
  achternaam: string;
  email: string;
  gsm: string;
  materiaal: string;
  duur: DuurKey | "";
  ophaaldag: string;
  niveau: string;
  houding: string;
  schoenmaat: string;
  lengte: string;
  gewicht: string;
  gradenVoorvoet: string;
  gradenAchtervoet: string;
  terrein: string[];
  opmerkingen: string;
}

type FormErrors = Partial<Record<keyof ReservatieFormData, string>>;

// ─── Constants ────────────────────────────────────────────────────────────────
const DUUR_LABELS: Record<DuurKey, string> = {
  dag: "Dag",
  weekend: "Weekend",
  shortski: "Shortski",
  week: "Week",
  twoWeeks: "2 weken",
};
const DUUR_KEYS: DuurKey[] = ["dag", "weekend", "shortski", "week", "twoWeeks"];

const PRIJZEN: Record<
  string,
  [PrijsValue, PrijsValue, PrijsValue, PrijsValue, PrijsValue]
> = {
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
    "30% aankoopprijs",
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
  Surfskate: [20, 35, null, 60, null],
};

const MATERIAAL_OPTIES = Object.keys(PRIJZEN);
const TERREIN_OPTIES = ["All-mountain", "Park", "Powder"];

const EMPTY_FORM: ReservatieFormData = {
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
  opmerkingen: "",
};

function getMinOphaaldag() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}

function getPrijs(
  materiaal: string,
  duur: DuurKey | "",
): PrijsValue | undefined {
  if (!materiaal || !duur) return undefined;
  const row = PRIJZEN[materiaal];
  if (!row) return undefined;
  const idx = DUUR_KEYS.indexOf(duur as DuurKey);
  return idx >= 0 ? row[idx] : undefined;
}

// ─── Prijslijst tab ───────────────────────────────────────────────────────────
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
        twoWeeks: "€150",
      },
      {
        product: "Epic snowboard + bindingen",
        dag: "€15",
        weekend: "€45",
        shortski: "€75",
        week: "€110",
        twoWeeks: "€165",
      },
      {
        product: "Epic set",
        dag: "€20",
        weekend: "€60",
        shortski: "€85",
        week: "€130",
        twoWeeks: "€185",
      },
      {
        product: "VIP snowboard + bindingen",
        dag: "€25",
        weekend: "€90",
        shortski: "€120",
        week: "€180",
        twoWeeks: "€250",
      },
      {
        product: "VIP set",
        dag: "€30",
        weekend: "€100",
        shortski: "€150",
        week: "€180",
        twoWeeks: "€250",
      },
    ],
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
        twoWeeks: "€90",
      },
      {
        product: "VIP schoenen & bindingen",
        dag: "€40",
        weekend: "€55",
        shortski: "€70",
        week: "€90",
        twoWeeks: "€150",
      },
      {
        product: "EPIC Classic Straps bindingen",
        dag: "–",
        weekend: "–",
        shortski: "–",
        week: "€35",
        twoWeeks: "€65",
      },
      {
        product: "VIP Step ON bindingen",
        dag: "–",
        weekend: "–",
        shortski: "–",
        week: "€90",
        twoWeeks: "€150",
      },
    ],
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
        twoWeeks: "€280",
      },
      {
        product: "Splitboard volledige set",
        dag: "–",
        weekend: "–",
        shortski: "€190",
        week: "€220",
        twoWeeks: "€350",
      },
      {
        product: "Avalanche set",
        dag: "–",
        weekend: "–",
        shortski: "€40",
        week: "€75",
        twoWeeks: "€100",
      },
      {
        product: "Kids harnas",
        dag: "€10",
        weekend: "€15",
        shortski: "€20",
        week: "€25",
        twoWeeks: "€40",
      },
    ],
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
        twoWeeks: "–",
      },
      {
        product: "SUP",
        dag: "€25",
        weekend: "€35",
        shortski: "€65",
        week: "€120",
        twoWeeks: "–",
      },
      {
        product: "Skateboard",
        dag: "€15",
        weekend: "€25",
        shortski: "–",
        week: "€45",
        twoWeeks: "–",
      },
      {
        product: "Surfskate",
        dag: "€20",
        weekend: "€35",
        shortski: "–",
        week: "€60",
        twoWeeks: "–",
      },
    ],
  },
];

const TABLE_HEADERS = ["Dag", "Weekend", "Shortski", "Week", "2 weken"];

function PrijslijstTab() {
  return (
    <div className="space-y-8">
      {PRIJSLIJST_SECTIES.map((sectie) => (
        <div key={sectie.title}>
          <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Euro className="w-4 h-4 text-primary" />
            {sectie.title}
          </h3>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="text-left px-4 py-2.5 font-medium text-foreground">
                      Formule
                    </th>
                    {TABLE_HEADERS.map((h) => (
                      <th
                        key={h}
                        className="text-right px-4 py-2.5 font-medium text-foreground whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sectie.rows.map((row, ri) => {
                    const cells = [
                      row.dag,
                      row.weekend,
                      row.shortski,
                      row.week,
                      row.twoWeeks,
                    ];
                    return (
                      <tr
                        key={row.product}
                        className={
                          ri % 2 === 0 ? "bg-background" : "bg-muted/20"
                        }
                      >
                        <td className="px-4 py-2.5 text-foreground font-medium">
                          {row.product}
                        </td>
                        {cells.map((v, ci) => (
                          <td
                            key={TABLE_HEADERS[ci]}
                            className={`px-4 py-2.5 text-right tabular-nums ${v === "–" ? "text-muted-foreground" : "text-foreground font-semibold"}`}
                          >
                            {v}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">
        * Volledige huurprijs vereist bij bevestiging. Reservatie min. 1 week
        voor ophaaldag. Neem contact op via{" "}
        <a
          href="https://www.west-site.com"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          west-site.com
        </a>{" "}
        voor meer info.
      </p>
    </div>
  );
}

// ─── Reserveer formulier ──────────────────────────────────────────────────────
function ReserveerFormulier() {
  const navigate = useNavigate();
  const plaatsReservering = usePlaatsReserveringPubliek();
  const [form, setForm] = useState<ReservatieFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [bevestigOpen, setBevestigOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const set = (field: keyof ReservatieFormData, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleTerrein = (t: string) => {
    const next = form.terrein.includes(t)
      ? form.terrein.filter((x) => x !== t)
      : [...form.terrein, t];
    set("terrein", next);
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
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
    if (
      !form.schoenmaat ||
      Number(form.schoenmaat) < 30 ||
      Number(form.schoenmaat) > 55
    )
      e.schoenmaat = "Geldige schoenmaat (30–55) is verplicht";
    if (!form.lengte || Number(form.lengte) < 100 || Number(form.lengte) > 220)
      e.lengte = "Geldige lengte in cm (100–220) is verplicht";
    if (
      !form.gewicht ||
      Number(form.gewicht) < 20 ||
      Number(form.gewicht) > 200
    )
      e.gewicht = "Geldig gewicht in kg (20–200) is verplicht";
    if (form.terrein.length === 0) e.terrein = "Selecteer minstens één terrein";
    if (form.materiaal && form.duur) {
      const prijs = getPrijs(form.materiaal, form.duur);
      if (prijs === null)
        e.materiaal = `${form.materiaal} is niet beschikbaar voor ${DUUR_LABELS[form.duur as DuurKey]?.toLowerCase()}`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setServerError(null);
      setBevestigOpen(true);
    }
  };

  const handleBevestig = async () => {
    setServerError(null);
    // Build timestamps from ophaaldag — start = ophaaldag midnight, end = +duur days
    const duurDagen: Record<DuurKey, number> = {
      dag: 1,
      weekend: 3,
      shortski: 5,
      week: 7,
      twoWeeks: 14,
    };
    const startDate = new Date(form.ophaaldag);
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date(startDate);
    const dagen = duurDagen[form.duur as DuurKey] ?? 1;
    endDate.setDate(endDate.getDate() + dagen);

    const contactNaam =
      `${form.aanspreking} ${form.voornaam} ${form.achternaam}`.trim();
    const notities = [
      `Materiaal: ${form.materiaal}`,
      `Duur: ${form.duur ? DUUR_LABELS[form.duur as DuurKey] : ""}`,
      `Niveau: ${form.niveau}`,
      `Houding: ${form.houding}`,
      `Schoenmaat: ${form.schoenmaat}`,
      `Lengte: ${form.lengte}cm`,
      `Gewicht: ${form.gewicht}kg`,
      form.gradenVoorvoet ? `Voorvoet: ${form.gradenVoorvoet}°` : "",
      form.gradenAchtervoet ? `Achtervoet: ${form.gradenAchtervoet}°` : "",
      `Terrein: ${form.terrein.join(", ")}`,
      form.opmerkingen ? `Opmerkingen: ${form.opmerkingen}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      const reserveringId = await plaatsReservering.mutateAsync({
        contactNaam,
        contactEmail: form.email,
        contactTelefoon: form.gsm,
        productIds: [],
        startDatum: BigInt(startDate.getTime()) * 1_000_000n,
        eindDatum: BigInt(endDate.getTime()) * 1_000_000n,
      });

      setBevestigOpen(false);
      sessionStorage.setItem(
        "reservering_naam",
        `${form.voornaam} ${form.achternaam}`,
      );
      sessionStorage.setItem("reservering_email", form.email);
      sessionStorage.setItem("reservering_materiaal", form.materiaal);
      sessionStorage.setItem(
        "reservering_duur",
        form.duur ? DUUR_LABELS[form.duur as DuurKey] : "",
      );
      sessionStorage.setItem("reservering_ophaaldag", form.ophaaldag);
      sessionStorage.setItem("reservering_id", String(reserveringId));
      sessionStorage.setItem("reservering_notities", notities);

      await navigate({ to: "/bevestiging" });
    } catch {
      setServerError(
        "Reservering kon niet worden verstuurd. Probeer het opnieuw.",
      );
    }
  };

  const prijs =
    form.materiaal && form.duur
      ? getPrijs(form.materiaal, form.duur)
      : undefined;
  const prijsLabel =
    prijs !== null && prijs !== undefined
      ? typeof prijs === "string"
        ? prijs
        : `€${prijs}`
      : null;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6 max-w-2xl mx-auto"
      >
        {/* 1. Persoonlijke gegevens */}
        <section className="space-y-4">
          <h2 className="font-display font-semibold text-base text-foreground border-b border-border pb-2">
            1. Persoonlijke gegevens
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="aanspreking" className="text-sm">
                Aanspreking <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.aanspreking}
                onValueChange={(v) => set("aanspreking", v)}
              >
                <SelectTrigger
                  id="aanspreking"
                  className="h-12"
                  data-ocid="form-aanspreking"
                >
                  <SelectValue placeholder="Kies…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dhr.">Dhr.</SelectItem>
                  <SelectItem value="Mevr.">Mevr.</SelectItem>
                  <SelectItem value="Mx.">Mx.</SelectItem>
                </SelectContent>
              </Select>
              {errors.aanspreking && (
                <p className="text-xs text-destructive">{errors.aanspreking}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="voornaam" className="text-sm">
                Voornaam <span className="text-destructive">*</span>
              </Label>
              <Input
                id="voornaam"
                className="h-12"
                value={form.voornaam}
                onChange={(e) => set("voornaam", e.target.value)}
                placeholder="Jan"
                data-ocid="form-voornaam"
              />
              {errors.voornaam && (
                <p className="text-xs text-destructive">{errors.voornaam}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="achternaam" className="text-sm">
                Achternaam <span className="text-destructive">*</span>
              </Label>
              <Input
                id="achternaam"
                className="h-12"
                value={form.achternaam}
                onChange={(e) => set("achternaam", e.target.value)}
                placeholder="Janssen"
                data-ocid="form-achternaam"
              />
              {errors.achternaam && (
                <p className="text-xs text-destructive">{errors.achternaam}</p>
              )}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">
                E-mail <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                className="h-12"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="jan@example.com"
                data-ocid="form-email"
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gsm" className="text-sm">
                GSM nummer <span className="text-destructive">*</span>
              </Label>
              <Input
                id="gsm"
                type="tel"
                className="h-12"
                value={form.gsm}
                onChange={(e) => set("gsm", e.target.value)}
                placeholder="+32 4xx xx xx xx"
                data-ocid="form-gsm"
              />
              {errors.gsm && (
                <p className="text-xs text-destructive">{errors.gsm}</p>
              )}
            </div>
          </div>
        </section>

        {/* 2. Materiaal & Duur */}
        <section className="space-y-4">
          <h2 className="font-display font-semibold text-base text-foreground border-b border-border pb-2">
            2. Materiaalkeuze & Duur
          </h2>
          <div className="space-y-1.5">
            <Label htmlFor="materiaal" className="text-sm">
              Wat wil je huren? <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.materiaal}
              onValueChange={(v) => set("materiaal", v)}
            >
              <SelectTrigger
                id="materiaal"
                className="h-12"
                data-ocid="form-materiaal"
              >
                <SelectValue placeholder="Kies een optie…" />
              </SelectTrigger>
              <SelectContent>
                {MATERIAAL_OPTIES.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.materiaal && (
              <p className="text-xs text-destructive">{errors.materiaal}</p>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="duur" className="text-sm">
                Hoe lang ben je weg? <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.duur}
                onValueChange={(v) => set("duur", v as DuurKey)}
              >
                <SelectTrigger id="duur" className="h-12" data-ocid="form-duur">
                  <SelectValue placeholder="Kies duurtijd…" />
                </SelectTrigger>
                <SelectContent>
                  {DUUR_KEYS.map((k) => (
                    <SelectItem key={k} value={k}>
                      {DUUR_LABELS[k]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.duur && (
                <p className="text-xs text-destructive">{errors.duur}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ophaaldag" className="text-sm">
                Gewenste ophaaldag <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ophaaldag"
                type="date"
                className="h-12"
                value={form.ophaaldag}
                onChange={(e) => set("ophaaldag", e.target.value)}
                min={getMinOphaaldag()}
                data-ocid="form-ophaaldag"
              />
              {errors.ophaaldag && (
                <p className="text-xs text-destructive">{errors.ophaaldag}</p>
              )}
            </div>
          </div>
          {form.materiaal &&
            form.duur &&
            (() => {
              const p = getPrijs(form.materiaal, form.duur);
              if (p === null)
                return (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="text-destructive">
                      Niet beschikbaar voor deze periode
                    </span>
                  </div>
                );
              if (p !== undefined)
                return (
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Totaalprijs
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Vereist bij bevestiging
                      </p>
                    </div>
                    <span className="text-2xl font-display font-bold text-primary">
                      {typeof p === "string" ? p : `€${p}`}
                    </span>
                  </div>
                );
              return null;
            })()}
        </section>

        {/* 3. Niveau & Profiel */}
        <section className="space-y-4">
          <h2 className="font-display font-semibold text-base text-foreground border-b border-border pb-2">
            3. Niveau & Profiel
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="niveau" className="text-sm">
                Niveau <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.niveau}
                onValueChange={(v) => set("niveau", v)}
              >
                <SelectTrigger
                  id="niveau"
                  className="h-12"
                  data-ocid="form-niveau"
                >
                  <SelectValue placeholder="Kies niveau…" />
                </SelectTrigger>
                <SelectContent>
                  {["Beginner", "Gemiddeld", "Gevorderd", "Expert"].map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.niveau && (
                <p className="text-xs text-destructive">{errors.niveau}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="houding" className="text-sm">
                Houding <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.houding}
                onValueChange={(v) => set("houding", v)}
              >
                <SelectTrigger
                  id="houding"
                  className="h-12"
                  data-ocid="form-houding"
                >
                  <SelectValue placeholder="Kies houding…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Regular">Regular</SelectItem>
                  <SelectItem value="Goofy">Goofy</SelectItem>
                </SelectContent>
              </Select>
              {errors.houding && (
                <p className="text-xs text-destructive">{errors.houding}</p>
              )}
            </div>
          </div>
        </section>

        {/* 4. Maten */}
        <section className="space-y-4">
          <h2 className="font-display font-semibold text-base text-foreground border-b border-border pb-2">
            4. Maten
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                id: "schoenmaat",
                label: "Schoenmaat",
                min: 30,
                max: 55,
                ph: "42",
                field: "schoenmaat" as const,
              },
              {
                id: "lengte",
                label: "Lengte (cm)",
                min: 100,
                max: 220,
                ph: "175",
                field: "lengte" as const,
              },
              {
                id: "gewicht",
                label: "Gewicht (kg)",
                min: 20,
                max: 200,
                ph: "75",
                field: "gewicht" as const,
              },
            ].map(({ id, label, min, max, ph, field }) => (
              <div key={id} className="space-y-1.5">
                <Label htmlFor={id} className="text-sm">
                  {label} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id={id}
                  type="number"
                  min={min}
                  max={max}
                  className="h-12"
                  value={form[field]}
                  onChange={(e) => set(field, e.target.value)}
                  placeholder={ph}
                  data-ocid={`form-${id}`}
                />
                {errors[field] && (
                  <p className="text-xs text-destructive">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. Extra info */}
        <section className="space-y-4">
          <h2 className="font-display font-semibold text-base text-foreground border-b border-border pb-2">
            5. Extra informatie
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="gradenVoorvoet" className="text-sm">
                Graden voorvoet{" "}
                <span className="text-muted-foreground text-xs">(opt.)</span>
              </Label>
              <Input
                id="gradenVoorvoet"
                type="number"
                className="h-12"
                value={form.gradenVoorvoet}
                onChange={(e) => set("gradenVoorvoet", e.target.value)}
                placeholder="bv. 15"
                data-ocid="form-graden-voorvoet"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gradenAchtervoet" className="text-sm">
                Graden achtervoet{" "}
                <span className="text-muted-foreground text-xs">(opt.)</span>
              </Label>
              <Input
                id="gradenAchtervoet"
                type="number"
                className="h-12"
                value={form.gradenAchtervoet}
                onChange={(e) => set("gradenAchtervoet", e.target.value)}
                placeholder="bv. -6"
                data-ocid="form-graden-achtervoet"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">
              Terrein <span className="text-destructive">*</span>
            </Label>
            <div className="flex flex-wrap gap-4">
              {TERREIN_OPTIES.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Checkbox
                    id={`terrein-${t}`}
                    checked={form.terrein.includes(t)}
                    onCheckedChange={() => toggleTerrein(t)}
                    data-ocid={`form-terrein-${t.toLowerCase()}`}
                  />
                  <Label
                    htmlFor={`terrein-${t}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {t}
                  </Label>
                </div>
              ))}
            </div>
            {errors.terrein && (
              <p className="text-xs text-destructive">{errors.terrein}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="opmerkingen" className="text-sm">
              Extra opmerkingen{" "}
              <span className="text-muted-foreground text-xs">(opt.)</span>
            </Label>
            <Textarea
              id="opmerkingen"
              value={form.opmerkingen}
              onChange={(e) => set("opmerkingen", e.target.value)}
              placeholder="Bijkomende informatie…"
              className="resize-none h-24"
              data-ocid="form-opmerkingen"
            />
          </div>
        </section>

        <Button
          type="submit"
          className="w-full h-12"
          size="lg"
          data-ocid="reserveer-submit-btn"
        >
          <CalendarCheck className="w-4 h-4 mr-2" />
          Reservering aanvragen
        </Button>
      </form>

      {/* Confirmation dialog */}
      <Dialog open={bevestigOpen} onOpenChange={setBevestigOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              Reservering bevestigen
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-1 text-sm">
            <div className="p-3 rounded-lg bg-muted/40 space-y-1.5">
              <p className="font-medium text-foreground">
                Persoonlijke gegevens
              </p>
              <p className="text-muted-foreground">
                {form.aanspreking} {form.voornaam} {form.achternaam}
              </p>
              <p className="text-muted-foreground">
                {form.email} · {form.gsm}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 space-y-1.5">
              <p className="font-medium text-foreground">Materiaal & periode</p>
              <p className="text-muted-foreground">{form.materiaal}</p>
              <p className="text-muted-foreground">
                Duur: {form.duur ? DUUR_LABELS[form.duur as DuurKey] : ""} ·
                Ophaaldag: {form.ophaaldag}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 space-y-1.5">
              <p className="font-medium text-foreground">Profiel</p>
              <p className="text-muted-foreground">
                {form.niveau} · {form.houding} · Maat {form.schoenmaat} ·{" "}
                {form.lengte}cm · {form.gewicht}kg
              </p>
              <p className="text-muted-foreground">
                Terrein: {form.terrein.join(", ")}
              </p>
            </div>
            <Separator />
            {prijsLabel && (
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  Totaalprijs
                </span>
                <span className="text-xl font-display font-bold text-primary">
                  {prijsLabel}
                </span>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Volledige huurprijs vereist bij bevestiging
            </p>
            {serverError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm">
                <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                <span className="text-destructive">{serverError}</span>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2 flex-col sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setBevestigOpen(false)}
              disabled={plaatsReservering.isPending}
            >
              Terug
            </Button>
            <Button
              onClick={handleBevestig}
              disabled={plaatsReservering.isPending}
              data-ocid="bevestig-reservering-btn"
            >
              {plaatsReservering.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Bezig…
                </>
              ) : (
                "Bevestig reservering"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ReserverenPage() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div>
          <Badge
            className="mb-3 bg-primary/10 text-primary border-primary/20"
            variant="outline"
          >
            Reserveren
          </Badge>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Materiaal reserveren
          </h1>
          <p className="text-muted-foreground">
            Vul het formulier in en we nemen contact op om je reservering te
            bevestigen.
          </p>
        </div>

        <Tabs defaultValue="reserveer" className="space-y-6">
          <TabsList data-ocid="reserveren-tabs">
            <TabsTrigger
              value="reserveer"
              className="gap-2"
              data-ocid="tab-reserveer"
            >
              <CalendarCheck className="w-4 h-4" />
              Reserveren
            </TabsTrigger>
            <TabsTrigger
              value="prijslijst"
              className="gap-2"
              data-ocid="tab-prijslijst"
            >
              <Euro className="w-4 h-4" />
              Prijslijst
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reserveer" className="mt-4">
            <ReserveerFormulier />
          </TabsContent>

          <TabsContent value="prijslijst" className="mt-4">
            <PrijslijstTab />
          </TabsContent>
        </Tabs>
      </div>
    </PublicLayout>
  );
}
