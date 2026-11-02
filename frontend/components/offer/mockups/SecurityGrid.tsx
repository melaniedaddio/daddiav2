import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

import { FadeUp } from "@/components/common/FadeUp"
import { Icon } from "@/components/common/Icon"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { IconName } from "@/types/offer"

/** Cadenas central animé qui se ferme à l'entrée dans l'écran. */
function Padlock() {
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true, threshold: 0.6 })
  const reduced = useReducedMotion()
  const closed = isInView || reduced
  return (
    <div ref={ref} className="relative mx-auto w-28 h-28 flex items-center justify-center" aria-hidden>
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(43,182,115,0.25) 0%, transparent 70%)" }}
        initial={reduced ? false : { opacity: 0, scale: 0.6 }}
        animate={closed ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.5, delay: 0.45 }}
      />
      <svg viewBox="0 0 64 72" className="relative w-16 h-auto">
        <motion.path
          d="M18 32 V22 a14 14 0 0 1 28 0 V32"
          fill="none"
          stroke="#F0EBF4"
          strokeWidth={6}
          strokeLinecap="round"
          initial={reduced ? false : { y: -10, rotate: -18 }}
          animate={closed ? { y: 0, rotate: 0 } : undefined}
          style={{ originX: "46px", originY: "32px" }}
          transition={{ duration: 0.45, ease: [0.5, 0, 0.2, 1.4] }}
        />
        <rect x="8" y="30" width="48" height="38" rx="9" fill="url(#lock-body)" />
        <defs>
          <linearGradient id="lock-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F03068" />
            <stop offset="100%" stopColor="#C8103C" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="46" r="5" fill="#070407" />
        <rect x="30" y="48" width="4" height="10" rx="2" fill="#070407" />
      </svg>
    </div>
  )
}

/** Grille sécurité : cartes avec icônes, apparition en cascade, cadenas central (PRD §8.3). */
export function SecurityGrid({
  items,
  footer,
}: {
  items: { icon: IconName; title: string; text: string }[]
  footer?: string
}) {
  return (
    <div className="flex flex-col gap-10">
      <Padlock />
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it, i) => (
          <FadeUp key={it.title} delay={i * 0.08} as="li">
            <div className="h-full rounded-2xl bg-[#18121A] border border-white/7 p-5 flex flex-col gap-3 hover:border-[#2BB673]/30 transition-colors">
              <span className="w-10 h-10 rounded-lg bg-[#2BB673]/10 border border-[#2BB673]/20 flex items-center justify-center">
                <Icon name={it.icon} size={18} className="text-[#2BB673]" />
              </span>
              <h4 className="font-syne font-bold text-[#F0EBF4] leading-snug">{it.title}</h4>
              <p className="text-sm text-[#9A8FA5] leading-relaxed">{it.text}</p>
            </div>
          </FadeUp>
        ))}
      </ul>
      {footer && (
        <p className="flex items-start gap-3 max-w-3xl mx-auto text-center sm:text-left text-[#F0EBF4] rounded-xl border border-[#2BB673]/20 bg-[#2BB673]/5 px-5 py-4">
          <ShieldCheck size={20} className="text-[#2BB673] shrink-0 mt-0.5" aria-hidden />
          {footer}
        </p>
      )}
    </div>
  )
}
