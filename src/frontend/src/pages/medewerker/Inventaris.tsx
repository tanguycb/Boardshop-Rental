import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Edit2,
  Filter,
  Package,
  Plus,
  QrCode,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductType } from "../../backend";
import type { Product } from "../../backend";
import {
  useBewerkProduct,
  useProducten,
  useVerwijderProduct,
  useVoegProductToe,
} from "../../hooks/useProducten";

const typeLabel: Record<ProductType, string> = {
  [ProductType.Snowboard]: "Snowboard",
  [ProductType.Boots]: "Boots",
  [ProductType.Bindingen]: "Bindingen",
};

const typeColor: Record<ProductType, string> = {
  [ProductType.Snowboard]: "bg-primary/10 text-primary border-primary/20",
  [ProductType.Boots]: "bg-accent/10 text-accent border-accent/20",
  [ProductType.Bindingen]: "bg-muted text-muted-foreground border-border",
};

type ProductFormData = {
  naam: string;
  productType: ProductType;
  maat: string;
  prijsPerDag: string;
  beschikbaar: boolean;
};

const defaultForm: ProductFormData = {
  naam: "",
  productType: ProductType.Snowboard,
  maat: "",
  prijsPerDag: "15",
  beschikbaar: true,
};

function QrCodeDialog({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!product) return null;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(product.qrCode)}&size=200x200&margin=10`;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="font-display text-sm">
            QR-code: {product.naam}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3 py-2">
          <img
            src={qrUrl}
            alt={`QR code voor ${product.naam}`}
            className="w-48 h-48 rounded-lg border border-border"
          />
          <p className="text-xs text-muted-foreground font-mono text-center break-all">
            {product.qrCode}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>
            Sluiten
          </Button>
          <Button
            size="sm"
            onClick={() => window.open(qrUrl, "_blank")}
            className="gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5" />
            Downloaden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Inventaris() {
  const [zoekterm, setZoekterm] = useState("");
  const [filterType, setFilterType] = useState<ProductType | "alle">("alle");
  const [filterBeschikbaar, setFilterBeschikbaar] = useState<
    "alle" | "beschikbaar" | "verhuurd"
  >("alle");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [qrDialogProduct, setQrDialogProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormData>(defaultForm);

  const filter = filterType !== "alle" ? { productType: filterType } : {};
  const { data: producten, isLoading } = useProducten(filter);
  const voegToe = useVoegProductToe();
  const bewerk = useBewerkProduct();
  const verwijder = useVerwijderProduct();

  const gefilterd =
    producten?.filter((p) => {
      const matchZoek =
        p.naam.toLowerCase().includes(zoekterm.toLowerCase()) ||
        p.maat.toLowerCase().includes(zoekterm.toLowerCase());
      const matchBeschikbaar =
        filterBeschikbaar === "alle" ||
        (filterBeschikbaar === "beschikbaar" && p.beschikbaar) ||
        (filterBeschikbaar === "verhuurd" && !p.beschikbaar);
      return matchZoek && matchBeschikbaar;
    }) ?? [];

  const openNieuw = () => {
    setEditProduct(null);
    setForm(defaultForm);
    setDialogOpen(true);
  };

  const openBewerk = (p: Product) => {
    setEditProduct(p);
    setForm({
      naam: p.naam,
      productType: p.productType,
      maat: p.maat,
      prijsPerDag: p.prijsPerDag.toString(),
      beschikbaar: p.beschikbaar,
    });
    setDialogOpen(true);
  };

  const handleOpslaan = async () => {
    if (!form.naam.trim() || !form.maat.trim()) {
      toast.error("Vul alle verplichte velden in");
      return;
    }
    try {
      if (editProduct) {
        await bewerk.mutateAsync({
          id: editProduct.id,
          naam: form.naam,
          maat: form.maat,
          prijsPerDag: BigInt(form.prijsPerDag),
          beschikbaar: form.beschikbaar,
        });
        toast.success("Product bijgewerkt");
      } else {
        await voegToe.mutateAsync({
          naam: form.naam,
          productType: form.productType,
          maat: form.maat,
          prijsPerDag: BigInt(form.prijsPerDag),
        });
        toast.success("Product toegevoegd");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Opslaan mislukt. Probeer opnieuw.");
    }
  };

  const handleVerwijder = async (id: bigint, naam: string) => {
    if (!confirm(`Weet je zeker dat je "${naam}" wilt verwijderen?`)) return;
    try {
      await verwijder.mutateAsync(id);
      toast.success("Product verwijderd");
    } catch {
      toast.error("Verwijderen mislukt");
    }
  };

  return (
    <div className="p-6 space-y-5 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            Inventaris
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {producten?.length ?? 0} producten in totaal
          </p>
        </div>
        <Button
          onClick={openNieuw}
          className="gap-2 shrink-0"
          data-ocid="inventaris-add-btn"
        >
          <Plus className="w-4 h-4" />
          Product toevoegen
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Zoeken op naam of maat…"
            value={zoekterm}
            onChange={(e) => setZoekterm(e.target.value)}
            className="pl-8"
            data-ocid="inventaris-zoek"
          />
        </div>
        <Select
          value={filterType}
          onValueChange={(v) => setFilterType(v as ProductType | "alle")}
        >
          <SelectTrigger className="w-40" data-ocid="inventaris-filter-type">
            <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">Alle types</SelectItem>
            {Object.values(ProductType).map((t) => (
              <SelectItem key={t} value={t}>
                {typeLabel[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filterBeschikbaar}
          onValueChange={(v) =>
            setFilterBeschikbaar(v as "alle" | "beschikbaar" | "verhuurd")
          }
        >
          <SelectTrigger
            className="w-40"
            data-ocid="inventaris-filter-beschikbaar"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">Alle statussen</SelectItem>
            <SelectItem value="beschikbaar">Beschikbaar</SelectItem>
            <SelectItem value="verhuurd">Verhuurd</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product list */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : gefilterd.length === 0 ? (
        <div className="text-center py-16" data-ocid="inventaris-empty">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="text-muted-foreground">Geen producten gevonden</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={openNieuw}
          >
            Eerste product toevoegen
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {gefilterd.map((p) => (
            <Card
              key={p.id.toString()}
              className="card-rental hover:border-border/80"
              data-ocid={`inventaris-row-${p.id}`}
            >
              <CardContent className="p-3 flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={`shrink-0 text-xs ${typeColor[p.productType]}`}
                >
                  {typeLabel[p.productType]}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {p.naam}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maat {p.maat} · €{p.prijsPerDag.toString()}/dag
                  </p>
                </div>
                <Badge
                  variant={p.beschikbaar ? "outline" : "secondary"}
                  className={`shrink-0 text-xs ${
                    p.beschikbaar
                      ? "bg-[oklch(var(--success)/0.12)] text-[oklch(var(--success))] border-[oklch(var(--success)/0.3)]"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {p.beschikbaar ? "Beschikbaar" : "Verhuurd"}
                </Badge>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={() => setQrDialogProduct(p)}
                    aria-label="Bekijk QR-code"
                    data-ocid={`inventaris-qr-${p.id}`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => openBewerk(p)}
                    aria-label="Bewerk product"
                    data-ocid={`inventaris-edit-${p.id}`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => handleVerwijder(p.id, p.naam)}
                    aria-label="Verwijder product"
                    data-ocid={`inventaris-delete-${p.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* QR code dialog */}
      <QrCodeDialog
        product={qrDialogProduct}
        open={!!qrDialogProduct}
        onClose={() => setQrDialogProduct(null)}
      />

      {/* Add/Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editProduct ? "Product bewerken" : "Product toevoegen"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="product-naam">Naam *</Label>
              <Input
                id="product-naam"
                value={form.naam}
                onChange={(e) => setForm({ ...form, naam: e.target.value })}
                placeholder="Bijv. Salomon Huck Knife"
                data-ocid="product-naam"
              />
            </div>
            {!editProduct && (
              <div className="space-y-1.5">
                <Label htmlFor="product-type">Type *</Label>
                <Select
                  value={form.productType}
                  onValueChange={(v) =>
                    setForm({ ...form, productType: v as ProductType })
                  }
                >
                  <SelectTrigger id="product-type" data-ocid="product-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ProductType).map((t) => (
                      <SelectItem key={t} value={t}>
                        {typeLabel[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="product-maat">Maat *</Label>
                <Input
                  id="product-maat"
                  value={form.maat}
                  onChange={(e) => setForm({ ...form, maat: e.target.value })}
                  placeholder="Bijv. 156cm / 42"
                  data-ocid="product-maat"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="product-prijs">Prijs per dag (€) *</Label>
                <Input
                  id="product-prijs"
                  type="number"
                  min="1"
                  value={form.prijsPerDag}
                  onChange={(e) =>
                    setForm({ ...form, prijsPerDag: e.target.value })
                  }
                  data-ocid="product-prijs"
                />
              </div>
            </div>
            {editProduct && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="product-beschikbaar"
                  checked={form.beschikbaar}
                  onCheckedChange={(c) =>
                    setForm({ ...form, beschikbaar: !!c })
                  }
                  data-ocid="product-beschikbaar"
                />
                <Label htmlFor="product-beschikbaar" className="cursor-pointer">
                  Beschikbaar voor verhuur
                </Label>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuleren
            </Button>
            <Button
              onClick={handleOpslaan}
              disabled={voegToe.isPending || bewerk.isPending}
              data-ocid="product-opslaan"
            >
              {voegToe.isPending || bewerk.isPending
                ? "Bezig…"
                : editProduct
                  ? "Opslaan"
                  : "Toevoegen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
