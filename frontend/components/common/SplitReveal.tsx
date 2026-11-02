import type { ReactNode } from "react"

import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"

// Repris de la maquette : balayage clip-path de gauche à droite, 0,65 s.
export function SplitReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true, rootMargin: "-80px" })
  const reduced = useReducedMotion()
  const visible = isInView || reduced
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        data-reveal=""
        style={{
          clipPath: visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: reduced ? "none" : `clip-path 0.65s cubic-bezier(0.76,0,0.24,1) ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
