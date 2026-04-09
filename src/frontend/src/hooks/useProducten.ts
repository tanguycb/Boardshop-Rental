import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Product,
  ProductFilter,
  ProductId,
  ProductType,
  Timestamp,
} from "../backend";

export function useProducten(filter: ProductFilter = {}) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["producten", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducten(filter);
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
  });
}

export function useBeschikbareProducten(
  startDatum: Timestamp,
  eindDatum: Timestamp,
  enabled = true,
) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: [
      "beschikbareProducten",
      startDatum.toString(),
      eindDatum.toString(),
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBeschikbareProducten(startDatum, eindDatum);
    },
    enabled:
      !!actor && !isFetching && enabled && startDatum > 0n && eindDatum > 0n,
    staleTime: 15_000,
  });
}

export function useProduct(id: ProductId | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    staleTime: 15_000,
  });
}

export function useAlleProductenVoorQrBatch() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["qrBatch"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAlleProductenVoorQrBatch();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVoegProductToe() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      naam,
      productType,
      maat,
      prijsPerDag,
    }: {
      naam: string;
      productType: ProductType;
      maat: string;
      prijsPerDag: bigint;
    }) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.voegProductToe(naam, productType, maat, prijsPerDag);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["producten"] });
      queryClient.invalidateQueries({ queryKey: ["qrBatch"] });
    },
  });
}

export function useBewerkProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      naam,
      maat,
      prijsPerDag,
      beschikbaar,
    }: {
      id: ProductId;
      naam: string;
      maat: string;
      prijsPerDag: bigint;
      beschikbaar: boolean;
    }) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.bewerkProduct(id, naam, maat, prijsPerDag, beschikbaar);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["producten"] });
      queryClient.invalidateQueries({
        queryKey: ["product", vars.id.toString()],
      });
    },
  });
}

export function useVerwijderProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: ProductId) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.verwijderProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["producten"] });
      queryClient.invalidateQueries({ queryKey: ["qrBatch"] });
    },
  });
}

export function useZoekProductOpQrCode() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (qrCode: string) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.zoekProductOpQrCode(qrCode);
    },
  });
}
