import { create } from "zustand";
import type { ProductId, ProductType } from "../backend";

type FilterState = {
  productType?: ProductType;
  maat?: string;
  beschikbaar?: boolean;
  zoekterm: string;
};

type CartItem = {
  productId: ProductId;
  naam: string;
  productType: ProductType;
  maat: string;
  prijsPerDag: bigint;
};

type AppStore = {
  // Filters
  filter: FilterState;
  setFilter: (filter: Partial<FilterState>) => void;
  resetFilter: () => void;

  // Cart / geselecteerde producten
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: ProductId) => void;
  clearCart: () => void;

  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Geselecteerde verhuur voor markeer-ingeleverd
  selectedVerhuurId: bigint | null;
  setSelectedVerhuurId: (id: bigint | null) => void;
};

const defaultFilter: FilterState = {
  zoekterm: "",
  productType: undefined,
  maat: undefined,
  beschikbaar: undefined,
};

export const useAppStore = create<AppStore>((set) => ({
  filter: defaultFilter,
  setFilter: (f) => set((s) => ({ filter: { ...s.filter, ...f } })),
  resetFilter: () => set({ filter: defaultFilter }),

  cart: [],
  addToCart: (item) =>
    set((s) => {
      if (s.cart.some((c) => c.productId === item.productId)) return s;
      return { cart: [...s.cart, item] };
    }),
  removeFromCart: (productId) =>
    set((s) => ({ cart: s.cart.filter((c) => c.productId !== productId) })),
  clearCart: () => set({ cart: [] }),

  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  selectedVerhuurId: null,
  setSelectedVerhuurId: (id) => set({ selectedVerhuurId: id }),
}));
