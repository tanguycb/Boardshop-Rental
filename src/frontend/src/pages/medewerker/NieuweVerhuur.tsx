import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Footprints,
  Link2,
  Loader2,
  Package,
  Snowflake,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ProductType } from "../../backend";
import type { Product, ProductId, Timestamp } from "../../backend";
import { useBeschikbareProducten } from "../../hooks/useProducten";
import { useStartVerhuur } from "../../hooks/useVerhuringen";

// ── helpers ──────────────────────────────────────────────────────────────────

function dateToTs(s: string): Timestamp {
  return BigInt(new Date(s).getTime()) * 1_000_000n;
}

function dagPrijs(prijs: bigint): string {
  return `€ ${Number(prijs) / 100}`;
}

function aantalDagen(start: string, eind: string): number {
  const diff = new Date(eind).getTime() - new Date(start).getTime();
  return Math.max(1, Math.ceil(diff / 86_400_000));
}

function totaal(producten: Product[], dagen: number): string {
  const sum = producten.reduce(
    (acc, p) => acc + Number(p.prijsPerDag) * dagen,
    0,
  );
  return `€ ${sum / 100}`;
}

const PRODUCT_TYPE_ICON: Record<string, React.ReactNode> = {
  [ProductType.Snowboard]: <Snowflake className="w-4 h-4" />,
  [ProductType.Boots]: <Footprints className="w-4 h-4" />,
  [ProductType.Bindingen]: <Link2 className="w-4 h-4" />,
};

const PRODUCT_TYPE_LABEL: Record<string, string> = {
  [ProductType.Snowboard]: "Snowboard",
  [ProductType.Boots]: "Schoenen",
  [ProductType.Bindingen]: "Bindingen",
};

// ── stap-indicator ────────────────────────────────────────────────────────────

const STAPPEN = [
  { label: "Producten", icon: Package },
  { label: "Klant", icon: User },
  { label: "Periode", icon: CalendarDays },
  { label: "Bevestig", icon: ClipboardCheck },
];

function StapIndicator({ huidig }: { huidig: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STAPPEN.map((stap, i) => {
        const Icon = stap.icon;
        const actief = i === huidig;
        const klaar = i < huidig;
        return (
          <div key={stap.label} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                actief
                  ? "bg-primary text-primary-foreground"
                  : klaar
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {klaar ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Icon className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{stap.label}</span>
            </div>
            {i < STAPPEN.length - 1 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── ProductKaart ──────────────────────────────────────────────────────────────

function ProductKaart({
  product,
  geselecteerd,
  onToggle,
}: {
  product: Product;
  geselecteerd: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      data-ocid="product-select-card"
      className={`w-full text-left p-3 rounded-lg border transition-smooth cursor-pointer ${
        geselecteerd
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-card hover:border-primary/40 hover:bg-accent/5"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={geselecteerd ? "text-primary" : "text-muted-foreground"}
          >
            {PRODUCT_TYPE_ICON[product.productType as string]}
          </span>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{product.naam}</p>
            <p className="text-xs text-muted-foreground">
              {PRODUCT_TYPE_LABEL[product.productType as string]} · Maat{" "}
              {product.maat}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm font-medium text-foreground">
            {dagPrijs(product.prijsPerDag)}/dag
          </span>
          {geselecteerd && <Check className="w-4 h-4 text-primary" />}
        </div>
      </div>
    </button>
  );
}

// ── Stap 1: Productselectie ───────────────────────────────────────────────────

function StapProducten({
  startDatum,
  eindDatum,
  setStartDatum,
  setEindDatum,
  geselecteerdeIds,
  setGeselecteerdeIds,
  isSet,
  setIsSet,
  onVolgende,
}: {
  startDatum: string;
  eindDatum: string;
  setStartDatum: (v: string) => void;
  setEindDatum: (v: string) => void;
  geselecteerdeIds: Set<ProductId>;
  setGeselecteerdeIds: (v: Set<ProductId>) => void;
  isSet: boolean;
  setIsSet: (v: boolean) => void;
  onVolgende: () => void;
}) {
  const vandaag = new Date().toISOString().split("T")[0];
  const startTs = startDatum ? dateToTs(startDatum) : 0n;
  const eindTs = eindDatum ? dateToTs(eindDatum) : 0n;
  const kanLaden = !!startDatum && !!eindDatum && startTs < eindTs;

  const { data: producten = [], isLoading } = useBeschikbareProducten(
    startTs,
    eindTs,
    kanLaden,
  );

  const snowboards = producten.filter(
    (p) => p.productType === ProductType.Snowboard,
  );
  const boots = producten.filter((p) => p.productType === ProductType.Boots);
  const bindingen = producten.filter(
    (p) => p.productType === ProductType.Bindingen,
  );

  function toggle(id: ProductId) {
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
      setGeselecteerdeIds(new Set([board.id, boot.id, binding.id]));
      setIsSet(true);
    } else {
      toast.error("Geen complete set beschikbaar voor deze periode");
    }
  }

  const kanSet =
    snowboards.length > 0 && boots.length > 0 && bindingen.length > 0;

  function renderGroep(label: string, items: Product[]) {
    if (items.length === 0) return null;
    return (
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          {label}
        </p>
        <div className="space-y-2">
          {items.map((p) => (
            <ProductKaart
              key={p.id.toString()}
              product={p}
              geselecteerd={geselecteerdeIds.has(p.id)}
              onToggle={() => {
                toggle(p.id);
                setIsSet(false);
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="startDatum">Startdatum</Label>
          <Input
            id="startDatum"
            type="date"
            min={vandaag}
            value={startDatum}
            onChange={(e) => setStartDatum(e.target.value)}
            data-ocid="input-start-datum"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="eindDatum">Einddatum</Label>
          <Input
            id="eindDatum"
            type="date"
            min={startDatum || vandaag}
            value={eindDatum}
            onChange={(e) => setEindDatum(e.target.value)}
            data-ocid="input-eind-datum"
          />
        </div>
      </div>

      {!kanLaden ? (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
          Kies eerst een start- en einddatum om beschikbare producten te zien.
        </div>
      ) : isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : producten.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
          Geen beschikbare producten voor deze periode.
        </div>
      ) : (
        <div className="space-y-4">
          {kanSet && (
            <Button
              variant="outline"
              size="sm"
              onClick={selecteerSet}
              data-ocid="btn-selecteer-set"
              className="w-full border-primary/40 text-primary hover:bg-primary/5"
            >
              <Package className="w-4 h-4 mr-2" />
              Selecteer complete set (snowboard + schoenen + bindingen)
            </Button>
          )}
          {isSet && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Complete set geselecteerd
            </Badge>
          )}
          {renderGroep("Snowboards", snowboards)}
          {renderGroep("Schoenen", boots)}
          {renderGroep("Bindingen", bindingen)}
        </div>
      )}

      <div className="flex justify-end pt-2">
        <Button
          onClick={onVolgende}
          disabled={geselecteerdeIds.size === 0}
          data-ocid="btn-volgende-klant"
        >
          Volgende
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// ── Stap 2: Klantgegevens ─────────────────────────────────────────────────────

function StapKlant({
  naam,
  setNaam,
  contact,
  setContact,
  onTerug,
  onVolgende,
}: {
  naam: string;
  setNaam: (v: string) => void;
  contact: string;
  setContact: (v: string) => void;
  onTerug: () => void;
  onVolgende: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="naam">Naam klant</Label>
          <Input
            id="naam"
            placeholder="Voor- en achternaam"
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            data-ocid="input-klant-naam"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="contact">Contactgegevens</Label>
          <Input
            id="contact"
            placeholder="Telefoon of e-mailadres"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            data-ocid="input-klant-contact"
          />
        </div>
      </div>
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onTerug}>
          Terug
        </Button>
        <Button
          onClick={onVolgende}
          disabled={!naam.trim() || !contact.trim()}
          data-ocid="btn-volgende-periode"
        >
          Volgende <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// ── Stap 3: Periode (geen apart date-invoer meer — al bij stap 1 ingevuld) ───
// We show a summary of the period + total price

function StapPeriode({
  startDatum,
  eindDatum,
  geselecteerdeProducten,
  onTerug,
  onVolgende,
}: {
  startDatum: string;
  eindDatum: string;
  geselecteerdeProducten: Product[];
  onTerug: () => void;
  onVolgende: () => void;
}) {
  const dagen = aantalDagen(startDatum, eindDatum);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Startdatum</span>
          <span className="font-medium">
            {new Date(startDatum).toLocaleDateString("nl-NL")}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Einddatum</span>
          <span className="font-medium">
            {new Date(eindDatum).toLocaleDateString("nl-NL")}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Aantal dagen</span>
          <span className="font-medium">
            {dagen} dag{dagen !== 1 ? "en" : ""}
          </span>
        </div>
        <hr className="border-border" />
        {geselecteerdeProducten.map((p) => (
          <div key={p.id.toString()} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{p.naam}</span>
            <span>
              {dagPrijs(p.prijsPerDag)}/dag × {dagen} = €{" "}
              {(Number(p.prijsPerDag) * dagen) / 100}
            </span>
          </div>
        ))}
        <hr className="border-border" />
        <div className="flex justify-between font-semibold">
          <span>Totaal</span>
          <span className="text-primary">
            {totaal(geselecteerdeProducten, dagen)}
          </span>
        </div>
      </div>
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onTerug}>
          Terug
        </Button>
        <Button onClick={onVolgende} data-ocid="btn-volgende-bevestig">
          Bekijk samenvatting <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// ── Stap 4: Bevestiging ───────────────────────────────────────────────────────

function StapBevestig({
  naam,
  contact,
  startDatum,
  eindDatum,
  geselecteerdeProducten,
  isSet,
  onTerug,
  onBevestig,
  bezig,
}: {
  naam: string;
  contact: string;
  startDatum: string;
  eindDatum: string;
  geselecteerdeProducten: Product[];
  isSet: boolean;
  onTerug: () => void;
  onBevestig: () => void;
  bezig: boolean;
}) {
  const dagen = aantalDagen(startDatum, eindDatum);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SamenvattingBlok titel="Klantgegevens">
          <Rij label="Naam" waarde={naam} />
          <Rij label="Contact" waarde={contact} />
        </SamenvattingBlok>
        <SamenvattingBlok titel="Periode">
          <Rij
            label="Start"
            waarde={new Date(startDatum).toLocaleDateString("nl-NL")}
          />
          <Rij
            label="Eind"
            waarde={new Date(eindDatum).toLocaleDateString("nl-NL")}
          />
          <Rij label="Dagen" waarde={`${dagen}`} />
          {isSet && <Rij label="Type" waarde="Complete set" />}
        </SamenvattingBlok>
        <SamenvattingBlok titel="Producten">
          {geselecteerdeProducten.map((p) => (
            <Rij
              key={p.id.toString()}
              label={p.naam}
              waarde={`${dagPrijs(p.prijsPerDag)}/dag`}
            />
          ))}
          <hr className="border-border" />
          <div className="flex justify-between font-semibold text-sm">
            <span>Totaal</span>
            <span className="text-primary">
              {totaal(geselecteerdeProducten, dagen)}
            </span>
          </div>
        </SamenvattingBlok>
      </div>
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onTerug} disabled={bezig}>
          Terug
        </Button>
        <Button
          onClick={onBevestig}
          disabled={bezig}
          data-ocid="btn-start-verhuur"
        >
          {bezig ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Bezig…
            </>
          ) : (
            <>
              <Check className="w-4 h-4 mr-2" />
              Verhuur starten
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function SamenvattingBlok({
  titel,
  children,
}: { titel: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
        {titel}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Rij({ label, waarde }: { label: string; waarde: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{waarde}</span>
    </div>
  );
}

// ── hoofd-component ───────────────────────────────────────────────────────────

export default function NieuweVerhuur() {
  const navigate = useNavigate();
  const { mutateAsync: startVerhuur, isPending } = useStartVerhuur();

  const [stap, setStap] = useState(0);

  // Stap 1
  const [startDatum, setStartDatum] = useState("");
  const [eindDatum, setEindDatum] = useState("");
  const [geselecteerdeIds, setGeselecteerdeIds] = useState<Set<ProductId>>(
    new Set(),
  );
  const [isSet, setIsSet] = useState(false);

  // Alle producten (voor stap 3/4)
  const startTs = startDatum ? dateToTs(startDatum) : 0n;
  const eindTs = eindDatum ? dateToTs(eindDatum) : 0n;
  const { data: alleBeschikbaar = [] } = useBeschikbareProducten(
    startTs,
    eindTs,
    !!startDatum && !!eindDatum,
  );
  const geselecteerdeProducten = useMemo(
    () => alleBeschikbaar.filter((p) => geselecteerdeIds.has(p.id)),
    [alleBeschikbaar, geselecteerdeIds],
  );

  // Stap 2
  const [naam, setNaam] = useState("");
  const [contact, setContact] = useState("");

  async function handleBevestig() {
    try {
      await startVerhuur({
        klantNaam: naam,
        klantContact: contact,
        productIds: Array.from(geselecteerdeIds),
        isSet,
        startDatum: startTs,
        eindDatum: eindTs,
      });
      toast.success("Verhuur gestart!");
      navigate({ to: "/medewerker/verhuur" });
    } catch {
      toast.error("Verhuur kon niet worden gestart. Probeer het opnieuw.");
    }
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">
          Nieuwe Verhuur
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vul alle stappen in om een verhuur te starten
        </p>
      </div>

      <StapIndicator huidig={stap} />

      <div className="bg-card border border-border rounded-xl p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={stap}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {stap === 0 && (
              <StapProducten
                startDatum={startDatum}
                eindDatum={eindDatum}
                setStartDatum={setStartDatum}
                setEindDatum={setEindDatum}
                geselecteerdeIds={geselecteerdeIds}
                setGeselecteerdeIds={setGeselecteerdeIds}
                isSet={isSet}
                setIsSet={setIsSet}
                onVolgende={() => setStap(1)}
              />
            )}
            {stap === 1 && (
              <StapKlant
                naam={naam}
                setNaam={setNaam}
                contact={contact}
                setContact={setContact}
                onTerug={() => setStap(0)}
                onVolgende={() => setStap(2)}
              />
            )}
            {stap === 2 && (
              <StapPeriode
                startDatum={startDatum}
                eindDatum={eindDatum}
                geselecteerdeProducten={geselecteerdeProducten}
                onTerug={() => setStap(1)}
                onVolgende={() => setStap(3)}
              />
            )}
            {stap === 3 && (
              <StapBevestig
                naam={naam}
                contact={contact}
                startDatum={startDatum}
                eindDatum={eindDatum}
                geselecteerdeProducten={geselecteerdeProducten}
                isSet={isSet}
                onTerug={() => setStap(2)}
                onBevestig={handleBevestig}
                bezig={isPending}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
