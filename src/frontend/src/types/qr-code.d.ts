declare module "@caffeineai/qr-code/dist/hooks/useQRScanner" {
  export interface QRResult {
    data: string;
    timestamp: number;
  }

  export interface QRScannerConfig {
    facingMode?: "user" | "environment";
    scanInterval?: number;
    maxResults?: number;
    jsQRUrl?: string;
  }

  export interface CameraError {
    message: string;
    name: string;
  }

  export function useQRScanner(config?: QRScannerConfig): {
    qrResults: QRResult[];
    isScanning: boolean;
    jsQRLoaded: boolean;
    isActive: boolean;
    isSupported: boolean | null;
    error: CameraError | null;
    isLoading: boolean;
    currentFacingMode: "user" | "environment";
    startScanning: () => Promise<boolean>;
    stopScanning: () => Promise<void>;
    switchCamera: () => Promise<boolean>;
    clearResults: () => void;
    reset: () => void;
    retry: () => Promise<boolean>;
    videoRef: import("react").RefObject<HTMLVideoElement | null>;
    canvasRef: import("react").RefObject<HTMLCanvasElement | null>;
    isReady: boolean;
    canStartScanning: boolean;
  };
}

declare module "@caffeineai/qr-code" {
  export * from "@caffeineai/qr-code/dist/hooks/useQRScanner";
}
