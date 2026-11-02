import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReducedMotion } from "@/hooks/useReducedMotion"

// Curseur personnalisé (PRD §7.8) : point crimson + anneau, uniquement avec une souris sur grand écran.
export function CustomCursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine) and (min-width: 1024px)")
  const reduced = useReducedMotion()
  const enabled = finePointer && !reduced
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 500, damping: 28 })
  const dotY = useSpring(y, { stiffness: 500, damping: 28 })
  const ringX = useSpring(x, { stiffness: 200, damping: 20 })
  const ringY = useSpring(y, { stiffness: 200, damping: 20 })

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add("has-custom-cursor")
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as Element | null
      setHovering(Boolean(target?.closest("a, button, [role='button'], [role='tab'], select, label")))
    }
    const onLeave = () => setVisible(false)
    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-[#C8103C]"
        style={{ x: dotX, y: dotY, width: 8, height: 8, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !hovering ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-[#C8103C]/40"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovering ? 48 : 32, height: hovering ? 48 : 32, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
