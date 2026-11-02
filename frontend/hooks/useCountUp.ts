import { animate } from "framer-motion"
import { useEffect, useState } from "react"

/** Compteur animé de 0 à `value` quand `start` devient vrai (valeur finale directe si animations réduites). */
export function useCountUp(value: number, start: boolean, reduced: boolean, duration = 1.4): number {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (!start || reduced) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCurrent(Math.round(v)),
    })
    return () => controls.stop()
  }, [value, start, reduced, duration])
  return reduced && start ? value : current
}
