import { useEffect, useState } from "react"

// Repris de la maquette : section la plus visible au centre de l'écran.
export function useScrollSpy(ids: readonly string[], enabled = true): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(",")
  useEffect(() => {
    if (!enabled) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    const observe = () =>
      key.split(",").forEach((id) => {
        const el = document.getElementById(id)
        if (el) obs.observe(el)
      })
    observe()
    // Les sections chargées à la demande peuvent arriver après le premier rendu.
    const t = window.setTimeout(observe, 1200)
    return () => {
      window.clearTimeout(t)
      obs.disconnect()
    }
  }, [key, enabled])
  return active
}
