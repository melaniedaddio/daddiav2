import { useMediaQuery } from "@/hooks/useMediaQuery"

/** true si l'utilisateur demande moins d'animations. false pendant le rendu serveur. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)")
}
