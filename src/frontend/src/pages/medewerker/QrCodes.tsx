import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Camera,
  CameraOff,
  CheckCircle2,
  ExternalLink,
  Printer,
  QrCode,
  RotateCcw,
  ScanLine,
  X,
} from "lucide-react";
import QRCodeLib from "qrcode";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductType } from "../../backend";
import {
  useAlleProductenVoorQrBatch,
  useZoekProductOpQrCode,
} from "../../hooks/useProducten";
import type { Product } from "../../types";

// ── Labels ────────────────────────────────────────────────────────────────

const typeLabel: Record<ProductType, string> = {
  [ProductType.Snowboard]: "Snowboard",
  [ProductType.Boots]: "Boots",
  [ProductType.Bindingen]: "Bindingen",
};

// ── QR Canvas ─────────────────────────────────────────────────────────────

function QrCanvas({ value, size = 80 }: { value: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLib.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 1,
        color: { dark: "#000000", light: "#ffffff" },
      }).catch(() => {});
    }
  }, [value, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="rounded-sm"
      aria-label={`QR code: ${value}`}
    />
  );
}

// ── Sticker ───────────────────────────────────────────────────────────────

function Sticker({
  product,
  printMode = false,
}: {
  product: Product;
  printMode?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1.5 p-3 border border-border rounded-lg bg-white text-black break-inside-avoid${printMode ? " sticker-print-item" : ""}`}
      data-ocid={`sticker-${product.id}`}
    >
      <QrCanvas value={product.qrCode} size={printMode ? 96 : 80} />
      <div className="text-center space-y-0.5">
        <p className="text-[10px] font-mono font-bold leading-none tracking-tight truncate max-w-[90px]">
          {product.qrCode.slice(0, 14)}
        </p>
        <p className="text-[11px] font-semibold leading-tight truncate max-w-[90px]">
          {product.naam}
        </p>
        <p className="text-[10px] text-muted-foreground">Maat {product.maat}</p>
        <span className="inline-block text-[9px] px-1.5 py-0.5 rounded border border-border font-medium bg-muted text-muted-foreground">
          {typeLabel[product.productType]}
        </span>
      </div>
    </div>
  );
}

// ── Sticker Card (met hover print knop) ──────────────────────────────────

function StickerCard({ product }: { product: Product }) {
  const handlePrintEnkele = useCallback(() => {
    const canvas = document.querySelector(
      `[data-ocid="sticker-${product.id}"] canvas`,
    ) as HTMLCanvasElement | null;
    const qrDataUrl = canvas?.toDataURL("image/png") ?? "";
    const win = window.open("", "_blank", "width=400,height=500");
    if (!win) return;
    win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Sticker – ${product.naam}</title>
  <style>
    @page { size: 6cm 7cm; margin: 0; }
    body { margin: 0; display: flex; align-items: center; justify-content: center; width: 6cm; height: 7cm; font-family: monospace; }
    .sticker { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px; border: 1px solid #ccc; border-radius: 6px; width: 5.4cm; }
    img { width: 3.2cm; height: 3.2cm; }
    .code { font-size: 8px; font-weight: bold; }
    .naam { font-size: 11px; font-weight: 600; }
    .meta { font-size: 9px; color: #555; }
  </style>
</head>
<body>
  <div class="sticker">
    <img src="${qrDataUrl}" />
    <div class="code">${product.qrCode.slice(0, 14)}</div>
    <div class="naam">${product.naam}</div>
    <div class="meta">Maat ${product.maat} · ${typeLabel[product.productType]}</div>
  </div>
</body>
</html>`);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  }, [product]);

  return (
    <div className="group relative">
      <Sticker product={product} />
      <button
        type="button"
        onClick={handlePrintEnkele}
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded-full p-1 shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary"
        title={`${product.naam} afdrukken`}
        aria-label={`${product.naam} afdrukken`}
        data-ocid={`print-single-${product.id}`}
      >
        <Printer className="w-3 h-3" />
      </button>
    </div>
  );
}

// ── jsQR inline scanner (geen externe dep) ───────────────────────────────

type JsQR = (
  data: Uint8ClampedArray,
  width: number,
  height: number,
) => { data: string } | null;

function useJsQRScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const jsqrRef = useRef<JsQR | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  // Load jsQR from CDN once
  useEffect(() => {
    if (jsqrRef.current) return;
    const w = window as unknown as Record<string, unknown>;
    const existing =
      document.querySelector<HTMLScriptElement>("script[data-jsqr]");
    if (existing) {
      const poll = setInterval(() => {
        if (w.jsQR) {
          jsqrRef.current = w.jsQR as JsQR;
          clearInterval(poll);
        }
      }, 100);
      return;
    }
    const script = document.createElement("script");
    script.setAttribute("data-jsqr", "1");
    script.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js";
    script.onload = () => {
      jsqrRef.current = w.jsQR as JsQR;
    };
    document.head.appendChild(script);
  }, []);

  const startScanning = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
    } catch {
      setError("Camera toegang geweigerd of niet beschikbaar.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopScanning = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsActive(false);
  }, []);

  // Start scanning interval when active
  useEffect(() => {
    if (!isActive) return;
    intervalRef.current = setInterval(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.readyState < 2) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      if (jsqrRef.current) {
        const result = jsqrRef.current(
          imageData.data,
          imageData.width,
          imageData.height,
        );
        if (result?.data) {
          setScannedCode(result.data);
          stopScanning();
        }
      }
    }, 150);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, stopScanning]);

  const reset = useCallback(() => {
    stopScanning();
    setScannedCode(null);
    setError(null);
  }, [stopScanning]);

  return {
    videoRef,
    canvasRef,
    isActive,
    isLoading,
    error,
    scannedCode,
    startScanning,
    stopScanning,
    reset,
  };
}

// ── QR Scanner modal ──────────────────────────────────────────────────────

function QrScanner() {
  const [open, setOpen] = useState(false);
  const [gevondenProduct, setGevondenProduct] = useState<Product | null>(null);
  const [geenResultaat, setGeenResultaat] = useState(false);

  const { mutate: zoekProduct, isPending } = useZoekProductOpQrCode();
  const scanner = useJsQRScanner();

  // Handle scan result
  useEffect(() => {
    if (!scanner.scannedCode) return;
    setGevondenProduct(null);
    setGeenResultaat(false);
    zoekProduct(scanner.scannedCode, {
      onSuccess: (product) => {
        if (product) {
          setGevondenProduct(product as Product);
        } else {
          setGeenResultaat(true);
        }
      },
    });
  }, [scanner.scannedCode, zoekProduct]);

  const handleOpen = () => {
    setOpen(true);
    setGevondenProduct(null);
    setGeenResultaat(false);
  };

  const handleClose = () => {
    setOpen(false);
    scanner.reset();
    setGevondenProduct(null);
    setGeenResultaat(false);
  };

  const handleOpnieuw = () => {
    scanner.reset();
    setGevondenProduct(null);
    setGeenResultaat(false);
  };

  const isSupported =
    typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia;

  return (
    <>
      <Button
        variant="outline"
        className="gap-2"
        onClick={handleOpen}
        data-ocid="scanner-open-btn"
      >
        <ScanLine className="w-4 h-4" />
        QR-code scannen
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <ScanLine className="w-5 h-5 text-primary" />
                <h2 className="font-display font-semibold text-foreground">
                  QR-code scannen
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-1.5 hover:bg-muted transition-colors"
                aria-label="Sluiten"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              {/* Gevonden product */}
              {gevondenProduct && (
                <div
                  className="rounded-lg border border-border bg-muted/40 p-4 space-y-3"
                  data-ocid="scanner-result"
                >
                  <div className="flex items-center gap-2 text-[oklch(var(--success))]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Product gevonden!</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-md bg-white border border-border flex items-center justify-center shrink-0">
                      <QrCanvas value={gevondenProduct.qrCode} size={48} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground truncate">
                        {gevondenProduct.naam}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Maat {gevondenProduct.maat}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {typeLabel[gevondenProduct.productType]}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            gevondenProduct.beschikbaar
                              ? "text-[oklch(var(--success))] border-[oklch(var(--success)/0.4)] bg-[oklch(var(--success)/0.08)]"
                              : "text-destructive border-destructive/40 bg-destructive/10"
                          }`}
                        >
                          {gevondenProduct.beschikbaar
                            ? "Beschikbaar"
                            : "Verhuurd"}
                        </Badge>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground mt-1 truncate">
                        {gevondenProduct.qrCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-1 flex-wrap">
                    <a
                      href="/medewerker/inventaris"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                      data-ocid="scanner-result-link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Bekijk in inventaris
                    </a>
                    <button
                      type="button"
                      onClick={handleOpnieuw}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Opnieuw scannen
                    </button>
                  </div>
                </div>
              )}

              {/* Geen resultaat */}
              {geenResultaat && !gevondenProduct && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-destructive font-medium">
                      Product niet gevonden
                    </p>
                    <p className="text-xs text-muted-foreground truncate font-mono">
                      {scanner.scannedCode}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpnieuw}
                    className="text-xs text-muted-foreground hover:text-foreground underline shrink-0"
                  >
                    Opnieuw
                  </button>
                </div>
              )}

              {/* Camera */}
              {!gevondenProduct && (
                <div className="space-y-2">
                  {!isSupported && (
                    <div className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">
                      <CameraOff className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      Camera wordt niet ondersteund op dit apparaat.
                    </div>
                  )}
                  {scanner.error && (
                    <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
                      {scanner.error}
                    </div>
                  )}

                  {/* Video preview */}
                  <div className="relative rounded-lg overflow-hidden bg-black aspect-square max-h-64">
                    <video
                      ref={scanner.videoRef}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                    />
                    <canvas ref={scanner.canvasRef} className="hidden" />

                    {/* Scan overlay frame */}
                    {scanner.isActive && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-40 h-40">
                          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary" />
                          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary" />
                          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary" />
                          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary" />
                        </div>
                      </div>
                    )}

                    {!scanner.isActive && !scanner.isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Camera className="w-10 h-10 text-white/60" />
                      </div>
                    )}

                    {isPending && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="text-white text-sm font-medium animate-pulse">
                          Zoeken…
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Camera knoppen */}
                  <div className="flex gap-2">
                    {!scanner.isActive ? (
                      <Button
                        className="flex-1 gap-2"
                        onClick={scanner.startScanning}
                        disabled={scanner.isLoading || !isSupported}
                        data-ocid="scanner-start-btn"
                      >
                        <Camera className="w-4 h-4" />
                        {scanner.isLoading
                          ? "Camera starten…"
                          : "Camera starten"}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="flex-1 gap-2"
                        onClick={scanner.stopScanning}
                        data-ocid="scanner-stop-btn"
                      >
                        <CameraOff className="w-4 h-4" />
                        Camera stoppen
                      </Button>
                    )}
                  </div>

                  {scanner.isActive && (
                    <p className="text-xs text-center text-muted-foreground animate-pulse">
                      Richt de camera op een QR-code sticker…
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Hoofd pagina ──────────────────────────────────────────────────────────

export default function QrCodes() {
  const { data: producten, isLoading } = useAlleProductenVoorQrBatch();
  const aantalProducten = producten?.length ?? 0;

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #qr-print-area, #qr-print-area * { visibility: visible !important; }
          #qr-print-area {
            position: fixed !important;
            inset: 0;
            display: grid !important;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 16px;
            background: white;
          }
          .sticker-print-item {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="p-6 space-y-5 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 flex-wrap print:hidden">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <QrCode className="w-6 h-6 text-primary" />
              QR-codes
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isLoading
                ? "Laden…"
                : `${aantalProducten} product${aantalProducten !== 1 ? "en" : ""}`}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <QrScanner />
            <Button
              className="gap-2"
              onClick={() => window.print()}
              disabled={aantalProducten === 0}
              data-ocid="qr-print-all-btn"
            >
              <Printer className="w-4 h-4" />
              Alles afdrukken
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        ) : aantalProducten === 0 ? (
          <div className="text-center py-16" data-ocid="qr-empty">
            <QrCode className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="font-medium text-foreground mb-1">Geen producten</p>
            <p className="text-sm text-muted-foreground">
              Voeg producten toe in de inventaris om QR-codes te genereren.
            </p>
          </div>
        ) : (
          <>
            {/* Instructies */}
            <Card className="print:hidden bg-muted/30 border-border">
              <CardContent className="py-3 px-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">
                    Individueel afdrukken:
                  </strong>{" "}
                  beweeg de muis over een sticker en klik op het printer-icoon.{" "}
                  <strong className="text-foreground">Batch afdrukken:</strong>{" "}
                  klik <em>Alles afdrukken</em> en stel de paginamarge in op{" "}
                  <strong className="text-foreground">Geen</strong>.
                </p>
              </CardContent>
            </Card>

            {/* Scherm grid */}
            <div
              className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 print:hidden"
              data-ocid="qr-sticker-grid"
            >
              {producten?.map((p) => (
                <StickerCard key={p.id.toString()} product={p} />
              ))}
            </div>

            {/* Print-only area */}
            <div id="qr-print-area" className="hidden" aria-hidden="true">
              {producten?.map((p) => (
                <Sticker key={p.id.toString()} product={p} printMode />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
