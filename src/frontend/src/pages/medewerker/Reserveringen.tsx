import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  PackageCheck,
  Phone,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ReserveringStatus } from "../../backend";
import type { ReservationId, Reservering } from "../../backend";
import {
  useAlleReserveringen,
  useAnnuleerReservering,
  useBevestigReservering,
} from "../../hooks/useReserveringen";

// ── helpers ────────────────────────────────────────────────────────────────────

function tsNaarDatum(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("nl-NL");
}

type StatusFilter = "alle" | ReserveringStatus;

const STATUS_FILTERS: { label: string; waarde: StatusFilter }[] = [
  { label: "Alle", waarde: "alle" },
  { label: "In afwachting", waarde: ReserveringStatus.InAfwachting },
  { label: "Bevestigd", waarde: ReserveringStatus.Bevestigd },
  { label: "Geannuleerd", waarde: ReserveringStatus.Geannuleerd },
];

function StatusBadge({ status }: { status: ReserveringStatus }) {
  const config: Record<
    ReserveringStatus,
    { label: string; className: string; icon: React.ReactNode }
  > = {
    [ReserveringStatus.InAfwachting]: {
      label: "In afwachting",
      className:
        "bg-orange-500/15 text-orange-600 border-orange-400/30 dark:text-orange-400",
      icon: <Clock className="w-3 h-3" />,
    },
    [ReserveringStatus.Bevestigd]: {
      label: "Bevestigd",
      className: "bg-primary/15 text-primary border-primary/30",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    [ReserveringStatus.Geannuleerd]: {
      label: "Geannuleerd",
      className: "bg-destructive/10 text-destructive border-destructive/20",
      icon: <XCircle className="w-3 h-3" />,
    },
  };

  const { label, className, icon } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}

// ── ReserveringKaart ───────────────────────────────────────────────────────────

function ReserveringKaart({
  reservering,
  onBevestig,
  onAnnuleer,
  bevestigBezig,
  annuleerBezig,
  index,
}: {
  reservering: Reservering;
  onBevestig: (id: ReservationId) => void;
  onAnnuleer: (id: ReservationId) => void;
  bevestigBezig: boolean;
  annuleerBezig: boolean;
  index: number;
}) {
  const isInAfwachting = reservering.status === ReserveringStatus.InAfwachting;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card border border-border rounded-xl p-4 space-y-3 hover:border-border/80 hover:shadow-sm transition-smooth"
      data-ocid="reservering-kaart"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-foreground">
              {reservering.contactNaam}
            </span>
            <StatusBadge status={reservering.status} />
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <p className="text-xs text-muted-foreground truncate">
              {reservering.contactEmail}
            </p>
            {reservering.contactTelefoon && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {reservering.contactTelefoon}
              </p>
            )}
          </div>
        </div>
        <span className="text-xs text-muted-foreground flex-shrink-0 bg-muted/50 px-2 py-0.5 rounded-md">
          #{reservering.id.toString()}
        </span>
      </div>

      {/* Details row */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-primary/70" />
          {tsNaarDatum(reservering.startDatum)} →{" "}
          {tsNaarDatum(reservering.eindDatum)}
        </span>
        <span className="flex items-center gap-1.5">
          <PackageCheck className="w-3.5 h-3.5 text-primary/70" />
          {reservering.productIds.length} product
          {reservering.productIds.length !== 1 ? "en" : ""}
        </span>
        <span className="text-muted-foreground/60">
          Geplaatst {tsNaarDatum(reservering.aangemaakt)}
        </span>
      </div>

      {/* Action buttons — only for InAfwachting */}
      {isInAfwachting && (
        <div className="flex items-center gap-2 pt-1 flex-wrap border-t border-border/50">
          <Button
            size="sm"
            onClick={() => onBevestig(reservering.id)}
            disabled={bevestigBezig || annuleerBezig}
            data-ocid="btn-bevestig-reservering"
            className="h-8 text-xs gap-1.5"
          >
            {bevestigBezig ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <CheckCircle2 className="w-3 h-3" />
            )}
            Bevestigen
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAnnuleer(reservering.id)}
            disabled={bevestigBezig || annuleerBezig}
            data-ocid="btn-annuleer-reservering"
            className="h-8 text-xs gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/5 hover:border-destructive/50"
          >
            {annuleerBezig ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
            Annuleren
          </Button>
        </div>
      )}
    </motion.div>
  );
}

// ── hoofd-component ────────────────────────────────────────────────────────────

export default function Reserveringen() {
  const { data: reserveringen = [], isLoading } = useAlleReserveringen();
  const { mutateAsync: bevestig, isPending: bevestigBezig } =
    useBevestigReservering();
  const { mutateAsync: annuleer, isPending: annuleerBezig } =
    useAnnuleerReservering();

  const [actieveFilter, setActieveFilter] = useState<StatusFilter>("alle");
  const [bezigeId, setBezigeId] = useState<ReservationId | null>(null);

  const gefilterd = reserveringen.filter(
    (r) => actieveFilter === "alle" || r.status === actieveFilter,
  );

  const gesorteerd = [...gefilterd].sort((a, b) => {
    // InAfwachting first
    if (
      a.status === ReserveringStatus.InAfwachting &&
      b.status !== ReserveringStatus.InAfwachting
    )
      return -1;
    if (
      b.status === ReserveringStatus.InAfwachting &&
      a.status !== ReserveringStatus.InAfwachting
    )
      return 1;
    // Then sort by start date
    return Number(a.startDatum - b.startDatum);
  });

  const tellingen: Record<StatusFilter, number> = {
    alle: reserveringen.length,
    [ReserveringStatus.InAfwachting]: reserveringen.filter(
      (r) => r.status === ReserveringStatus.InAfwachting,
    ).length,
    [ReserveringStatus.Bevestigd]: reserveringen.filter(
      (r) => r.status === ReserveringStatus.Bevestigd,
    ).length,
    [ReserveringStatus.Geannuleerd]: reserveringen.filter(
      (r) => r.status === ReserveringStatus.Geannuleerd,
    ).length,
  };

  async function handleBevestig(id: ReservationId) {
    setBezigeId(id);
    try {
      await bevestig(id);
      toast.success("Reservering bevestigd");
    } catch {
      toast.error("Kon reservering niet bevestigen");
    } finally {
      setBezigeId(null);
    }
  }

  async function handleAnnuleer(id: ReservationId) {
    setBezigeId(id);
    try {
      await annuleer(id);
      toast.success("Reservering geannuleerd");
    } catch {
      toast.error("Kon reservering niet annuleren");
    } finally {
      setBezigeId(null);
    }
  }

  const inAfwachting = tellingen[ReserveringStatus.InAfwachting];

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Reserveringen
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Bekijk en beheer klantreserveringen
          </p>
        </div>
        {inAfwachting > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 bg-orange-500/10 border border-orange-400/30 rounded-lg px-3 py-2"
          >
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
              {inAfwachting} in afwachting
            </span>
          </motion.div>
        )}
      </div>

      {/* Status filter tabs */}
      <div
        className="flex items-center gap-2 flex-wrap mb-6"
        data-ocid="filter-status"
      >
        {STATUS_FILTERS.map((f) => {
          const isActief = actieveFilter === f.waarde;
          const badgeColor =
            f.waarde === ReserveringStatus.InAfwachting
              ? "bg-orange-500"
              : f.waarde === ReserveringStatus.Geannuleerd
                ? "bg-destructive"
                : "bg-primary";
          return (
            <button
              key={f.waarde}
              type="button"
              onClick={() => setActieveFilter(f.waarde)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth border ${
                isActief
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {f.label}
              <span
                className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold leading-none ${
                  isActief
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : `${badgeColor} text-primary-foreground opacity-80`
                }`}
              >
                {tellingen[f.waarde]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      ) : gesorteerd.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-xl bg-muted/20"
          data-ocid="empty-state-reserveringen"
        >
          <Users className="w-10 h-10 text-muted-foreground mb-3 opacity-50" />
          <p className="font-medium text-foreground">Geen reserveringen</p>
          <p className="text-sm text-muted-foreground mt-1">
            {actieveFilter === "alle"
              ? "Er zijn nog geen reserveringen geplaatst."
              : `Geen reserveringen met status "${STATUS_FILTERS.find((f) => f.waarde === actieveFilter)?.label}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {gesorteerd.map((r, idx) => (
            <ReserveringKaart
              key={r.id.toString()}
              reservering={r}
              onBevestig={handleBevestig}
              onAnnuleer={handleAnnuleer}
              bevestigBezig={bevestigBezig && bezigeId === r.id}
              annuleerBezig={annuleerBezig && bezigeId === r.id}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}
