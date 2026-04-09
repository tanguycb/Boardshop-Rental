import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, Search, Users } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Reservering } from "../../backend";
import { useAlleReserveringen } from "../../hooks/useReserveringen";

// ── types ──────────────────────────────────────────────────────────────────────

interface KlantContact {
  naam: string;
  email: string;
  telefoon: string;
  aantalReserveringen: number;
  laaststeReservering: bigint;
}

// ── helpers ────────────────────────────────────────────────────────────────────

function extractUniekKlanten(reserveringen: Reservering[]): KlantContact[] {
  const klantMap = new Map<string, KlantContact>();

  for (const r of reserveringen) {
    const sleutel = r.contactEmail.toLowerCase().trim();
    const bestaand = klantMap.get(sleutel);

    if (bestaand) {
      bestaand.aantalReserveringen += 1;
      if (r.aangemaakt > bestaand.laaststeReservering) {
        bestaand.laaststeReservering = r.aangemaakt;
      }
    } else {
      klantMap.set(sleutel, {
        naam: r.contactNaam,
        email: r.contactEmail,
        telefoon: r.contactTelefoon,
        aantalReserveringen: 1,
        laaststeReservering: r.aangemaakt,
      });
    }
  }

  return Array.from(klantMap.values()).sort((a, b) =>
    a.naam.localeCompare(b.naam, "nl"),
  );
}

function tsNaarDatum(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("nl-NL");
}

// ── KlantKaart ────────────────────────────────────────────────────────────────

function KlantKaart({
  klant,
  index,
}: {
  klant: KlantContact;
  index: number;
}) {
  const initialen = klant.naam
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-card border border-border rounded-xl p-4 hover:border-border/80 hover:shadow-sm transition-smooth"
      data-ocid="klant-kaart"
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-primary">{initialen}</span>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="font-semibold text-sm text-foreground truncate">
              {klant.naam}
            </p>
            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full shrink-0">
              {klant.aantalReserveringen} reservering
              {klant.aantalReserveringen !== 1 ? "en" : ""}
            </span>
          </div>

          <div className="mt-1.5 space-y-1">
            <a
              href={`mailto:${klant.email}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors truncate"
            >
              <Mail className="w-3 h-3 shrink-0" />
              <span className="truncate">{klant.email}</span>
            </a>
            {klant.telefoon && (
              <a
                href={`tel:${klant.telefoon}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-3 h-3 shrink-0" />
                {klant.telefoon}
              </a>
            )}
          </div>

          <p className="text-xs text-muted-foreground/60 mt-1.5">
            Laatste reservering: {tsNaarDatum(klant.laaststeReservering)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── hoofd-component ────────────────────────────────────────────────────────────

export default function Klanten() {
  const { data: reserveringen = [], isLoading } = useAlleReserveringen();
  const [zoekterm, setZoekterm] = useState("");

  const alleKlanten = useMemo(
    () => extractUniekKlanten(reserveringen),
    [reserveringen],
  );

  const gefilterdeKlanten = useMemo(() => {
    if (!zoekterm.trim()) return alleKlanten;
    const term = zoekterm.toLowerCase();
    return alleKlanten.filter(
      (k) =>
        k.naam.toLowerCase().includes(term) ||
        k.email.toLowerCase().includes(term) ||
        k.telefoon.includes(term),
    );
  }, [alleKlanten, zoekterm]);

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Klanten
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Contactpersonen uit alle reserveringen
          </p>
        </div>
        {!isLoading && (
          <span className="text-sm text-muted-foreground bg-muted/50 border border-border px-3 py-1.5 rounded-lg">
            {alleKlanten.length} klant{alleKlanten.length !== 1 ? "en" : ""}
          </span>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-5" data-ocid="klanten-zoek">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Zoek op naam, e-mail of telefoon…"
          value={zoekterm}
          onChange={(e) => setZoekterm(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-smooth"
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : gefilterdeKlanten.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-xl bg-muted/20"
          data-ocid="empty-state-klanten"
        >
          <Users className="w-10 h-10 text-muted-foreground mb-3 opacity-50" />
          <p className="font-medium text-foreground">
            {zoekterm ? "Geen klanten gevonden" : "Nog geen klanten"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {zoekterm
              ? `Geen klanten gevonden voor "${zoekterm}".`
              : "Klantgegevens verschijnen hier zodra er reserveringen zijn geplaatst."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {gefilterdeKlanten.map((klant, idx) => (
            <KlantKaart key={klant.email} klant={klant} index={idx} />
          ))}
        </div>
      )}

      {/* Footer note */}
      {!isLoading && alleKlanten.length > 0 && (
        <Card className="mt-6 bg-muted/30 border-border/50">
          <CardContent className="px-4 py-3">
            <p className="text-xs text-muted-foreground text-center">
              Klantgegevens zijn afkomstig uit reserveringen. Klanten hebben
              geen account nodig.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
