import { q as useActor, ad as useQuery, ae as useQueryClient, af as useMutation, t as createActor } from "./index-DJrsHPCD.js";
function usePlaatsReserveringPubliek() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invoer) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.plaatsReserveringPubliek(invoer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beschikbareProducten"] });
      queryClient.invalidateQueries({ queryKey: ["alleReserveringen"] });
    }
  });
}
function useAlleReserveringen() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["alleReserveringen"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAlleReserveringen();
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useBevestigReservering() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.bevestigReservering(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alleReserveringen"] });
    }
  });
}
function useAnnuleerReservering() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.annuleerReservering(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alleReserveringen"] });
    }
  });
}
export {
  useAlleReserveringen as a,
  useBevestigReservering as b,
  useAnnuleerReservering as c,
  usePlaatsReserveringPubliek as u
};
