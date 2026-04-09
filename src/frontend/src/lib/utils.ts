import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a nanosecond timestamp (bigint) to a Dutch locale date string.
 */
export function formatDate(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Calculate the number of days between two nanosecond timestamps.
 */
export function dagsBetween(from: bigint, to: bigint): number {
  const msFrom = Number(from / 1_000_000n);
  const msTo = Number(to / 1_000_000n);
  return Math.max(0, Math.ceil((msTo - msFrom) / (1000 * 60 * 60 * 24)));
}
