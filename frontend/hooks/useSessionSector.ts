import { createContext, useCallback, useContext, useSyncExternalStore } from "react"

import type { SectorId } from "@/types/offer"

const KEY = "daddia-sector"
const DEFAULT: SectorId = "institut"
const VALID: SectorId[] = ["institut", "immobilier", "btp"]
const listeners = new Set<() => void>()
let memory: SectorId = DEFAULT // repli si le sessionStorage est indisponible

function read(): SectorId {
  try {
    const saved = window.sessionStorage.getItem(KEY)
    if (saved && (VALID as string[]).includes(saved)) return saved as SectorId
  } catch {
    /* stockage indisponible */
  }
  return memory
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Secteur choisi dans les onglets d'exemples, conservé d'une page offre à l'autre (sessionStorage, « institut » par défaut). */
export function useSessionSectorState(): [SectorId, (s: SectorId) => void] {
  const sector = useSyncExternalStore(subscribe, read, () => DEFAULT)
  const setSector = useCallback((s: SectorId) => {
    memory = s
    try {
      window.sessionStorage.setItem(KEY, s)
    } catch {
      /* ignoré : la valeur reste en mémoire */
    }
    listeners.forEach((l) => l())
  }, [])
  return [sector, setSector]
}

export const SectorContext = createContext<[SectorId, (s: SectorId) => void]>([DEFAULT, () => undefined])

export function useSector() {
  return useContext(SectorContext)
}
