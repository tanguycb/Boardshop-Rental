import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { NieuweVerhuur, RentalId, Verhuur } from "../backend";

export function useActieveVerhuringen() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Verhuur[]>({
    queryKey: ["actieveVerhuringen"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActieveVerhuringen();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}

export function useVervallenVerhuringen() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Verhuur[]>({
    queryKey: ["vervallenVerhuringen"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVervallenVerhuringen();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}

export function useVerhuur(id: RentalId | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Verhuur | null>({
    queryKey: ["verhuur", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getVerhuur(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useStartVerhuur() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoer: NieuweVerhuur) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.startVerhuur(invoer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actieveVerhuringen"] });
      queryClient.invalidateQueries({ queryKey: ["producten"] });
      queryClient.invalidateQueries({ queryKey: ["beschikbareProducten"] });
    },
  });
}

export function useMarkeerIngeleverd() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: RentalId) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.markeerIngeleverd(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actieveVerhuringen"] });
      queryClient.invalidateQueries({ queryKey: ["vervallenVerhuringen"] });
      queryClient.invalidateQueries({ queryKey: ["producten"] });
    },
  });
}
