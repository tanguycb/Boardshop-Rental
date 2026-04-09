import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { NieuweReservering, ReservationId, Reservering } from "../backend";

/**
 * Public mutation — no auth required.
 * Calls plaatsReserveringPubliek with contact info embedded in the payload.
 */
export function usePlaatsReserveringPubliek() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoer: NieuweReservering) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.plaatsReserveringPubliek(invoer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beschikbareProducten"] });
      queryClient.invalidateQueries({ queryKey: ["alleReserveringen"] });
    },
  });
}

/**
 * Staff-only: fetch all reservations.
 */
export function useAlleReserveringen() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Reservering[]>({
    queryKey: ["alleReserveringen"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAlleReserveringen();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

/**
 * Staff-only: confirm a reservation.
 */
export function useBevestigReservering() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: ReservationId) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.bevestigReservering(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alleReserveringen"] });
    },
  });
}

/**
 * Staff-only: cancel a reservation.
 */
export function useAnnuleerReservering() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: ReservationId) => {
      if (!actor) throw new Error("Niet verbonden met backend");
      return actor.annuleerReservering(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alleReserveringen"] });
    },
  });
}
