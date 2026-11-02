import type { Variants } from "framer-motion"

// PRD §12
export const fadeUp: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }
export const staggerContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
export const splitReveal: Variants = { hidden: { clipPath: "inset(0 100% 0 0)" }, visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } } }
export const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }
