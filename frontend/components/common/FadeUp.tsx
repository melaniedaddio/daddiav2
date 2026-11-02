import type { ElementType, ReactNode } from "react"

import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"

// Repris de la maquette : opacité + translation de 24 px en 0,5 s, une seule fois.
export function FadeUp({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
}) {
  const { ref, isInView } = useInView<HTMLElement>({ once: true, rootMargin: "-40px" })
  const reduced = useReducedMotion()
  const visible = isInView || reduced
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: reduced
          ? "none"
          : `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
      }}
    >
      {children}
    </Tag>
  )
}
