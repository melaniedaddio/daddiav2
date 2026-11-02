import { useEffect, useRef, useState } from "react"

interface Options {
  once?: boolean
  threshold?: number
  rootMargin?: string
}

// Repris de la maquette : IntersectionObserver simple, déclenché une fois par défaut.
export function useInView<T extends Element = HTMLDivElement>(opts: Options = {}) {
  const { once = true, threshold = 0.1, rootMargin = "0px" } = opts
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsInView(true)
          if (once) obs.disconnect()
        } else if (!once) setIsInView(false)
      },
      { threshold, rootMargin },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [once, threshold, rootMargin])
  return { ref, isInView }
}
