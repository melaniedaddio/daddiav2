import { useEffect, useState } from "react"

/**
 * Fait apparaître des éléments un par un (conversations, PRD §12) une fois `start` vrai.
 * `typingBefore(i)` : vrai si un indicateur « en train d'écrire… » précède l'élément i.
 * Renvoie le nombre d'éléments visibles et si l'indicateur est affiché.
 */
export function useSequence(
  total: number,
  start: boolean,
  reduced: boolean,
  typingBefore: (i: number) => boolean,
  replayKey: unknown = 0,
  stepMs = 700,
  typingMs = 900,
): { shown: number; typing: boolean } {
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!start || reduced) return
    const timers: number[] = [
      window.setTimeout(() => {
        setShown(0)
        setTyping(false)
      }, 0),
    ]
    let t = 300
    for (let i = 0; i < total; i++) {
      if (typingBefore(i)) {
        timers.push(window.setTimeout(() => setTyping(true), t))
        t += typingMs
      } else {
        t += stepMs * 0.6
      }
      const idx = i
      timers.push(
        window.setTimeout(() => {
          setTyping(false)
          setShown(idx + 1)
        }, t),
      )
      t += stepMs
    }
    return () => timers.forEach((id) => window.clearTimeout(id))
    // typingBefore est une fonction recréée à chaque rendu : on ne relance que sur les vraies entrées
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, start, reduced, replayKey, stepMs, typingMs])

  if (reduced && start) return { shown: total, typing: false }
  return { shown, typing }
}
