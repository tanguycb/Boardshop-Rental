import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createActor } from "../backend";
import type { UserProfile, UserRole } from "../backend";

export function useAuth() {
  const { identity, login, clear, loginStatus, isInitializing, isLoggingIn } =
    useInternetIdentity();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  return {
    identity,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
    login,
    logout: clear,
  };
}

export function useMijnProfiel() {
  const { actor } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<UserProfile | null>({
    queryKey: ["mijnProfiel"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMijnProfiel();
    },
    enabled: !!actor && isAuthenticated,
    staleTime: 30_000,
  });
}

export function useMijnRol() {
  const { actor } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<UserRole | null>({
    queryKey: ["mijnRol"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getMijnRol();
      return result ?? null;
    },
    enabled: !!actor && isAuthenticated,
    staleTime: 0,
    retry: 2,
  });
}

/**
 * Mutation for staff self-onboarding (registreerMedewerker).
 * Only used on the /inloggen page when a new staff member authenticates
 * for the first time. Customers do NOT register — no auth required.
 */
export function useRegistreerMedewerker() {
  const { actor } = useActor(createActor);
  const actorRef = useRef(actor);
  actorRef.current = actor;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      naam,
      contactInfo,
    }: {
      naam: string;
      contactInfo: string;
    }) => {
      // Poll for actor availability up to 8 seconds
      if (!actorRef.current) {
        const POLL_INTERVAL = 250;
        const MAX_ATTEMPTS = 32;

        await new Promise<void>((resolve, reject) => {
          let attempts = 0;
          const check = () => {
            if (actorRef.current) {
              resolve();
              return;
            }
            attempts++;
            if (attempts >= MAX_ATTEMPTS) {
              reject(
                new Error(
                  "Verbinding met backend mislukt. Vernieuw de pagina en probeer opnieuw.",
                ),
              );
              return;
            }
            setTimeout(check, POLL_INTERVAL);
          };
          check();
        });
      }

      const currentActor = actorRef.current;
      if (!currentActor) {
        throw new Error(
          "Verbinding met backend mislukt. Vernieuw de pagina en probeer opnieuw.",
        );
      }

      return currentActor.registreerMedewerker(naam, contactInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mijnRol"] });
      queryClient.invalidateQueries({ queryKey: ["mijnProfiel"] });
    },
  });
}
