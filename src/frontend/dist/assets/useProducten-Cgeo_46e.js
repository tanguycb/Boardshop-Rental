import { q as useActor, ad as useQuery, ae as useQueryClient, af as useMutation, t as createActor } from "./index-DJrsHPCD.js";
function useProducten(filter = {}) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["producten", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducten(filter);
    },
    enabled: !!actor && !isFetching,
    staleTime: 15e3
  });
}
function useBeschikbareProducten(startDatum, eindDatum, enabled = true) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: [
      "beschikbareProducten",
      startDatum.toString(),
      eindDatum.toString()
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBeschikbareProducten(startDatum, eindDatum);
    },
    enabled: !!actor && !isFetching && enabled && startDatum > 0n && eindDatum > 0n,
    staleTime: 15e3
  });
}
function useAlleProductenVoorQrBatch() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["qrBatch"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAlleProductenVoorQrBatch();
    },
    enabled: !!actor && !isFetching
  });
}
function useVoegProductToe() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      naam,
      productType,
      maat,
      prijsPerDag
    }) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.voegProductToe(naam, productType, maat, prijsPerDag);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["producten"] });
      queryClient.invalidateQueries({ queryKey: ["qrBatch"] });
    }
  });
}
function useBewerkProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      naam,
      maat,
      prijsPerDag,
      beschikbaar
    }) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.bewerkProduct(id, naam, maat, prijsPerDag, beschikbaar);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["producten"] });
      queryClient.invalidateQueries({
        queryKey: ["product", vars.id.toString()]
      });
    }
  });
}
function useVerwijderProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.verwijderProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["producten"] });
      queryClient.invalidateQueries({ queryKey: ["qrBatch"] });
    }
  });
}
function useZoekProductOpQrCode() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (qrCode) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.zoekProductOpQrCode(qrCode);
    }
  });
}
export {
  useVoegProductToe as a,
  useBewerkProduct as b,
  useVerwijderProduct as c,
  useBeschikbareProducten as d,
  useAlleProductenVoorQrBatch as e,
  useZoekProductOpQrCode as f,
  useProducten as u
};
