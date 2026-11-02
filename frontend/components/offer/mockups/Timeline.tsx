import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { Mail } from "lucide-react"
import { useRef, useState } from "react"

import { Icon } from "@/components/common/Icon"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { IconName } from "@/types/offer"

type Item = { label: string; title: string; text: string; minutes?: number; icon?: IconName }
type Achievement = { label: string; text: string; icon?: IconName }

/**
 * Parcours en 3 jalons : frise horizontale + barre de progression qui se remplit au scroll,
 * et sous chaque mois une mini-carte de réalisation (PRD §8.3, Accompagnement).
 */
export function JourneyTimeline({ items, achievements }: { items: Item[]; achievements?: Achievement[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div ref={ref} className="relative w-full">
      {/* Barre de progression (horizontale sur ordinateur, verticale sur mobile) */}
      <div className="hidden md:block absolute top-6 left-[16.66%] right-[16.66%] h-1 rounded-full bg-white/7" aria-hidden>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#C8103C] to-[#7A28B8] origin-left"
          style={{ scaleX: reduced ? 1 : progress }}
        />
      </div>
      <div className="md:hidden absolute left-6 top-6 bottom-6 w-1 rounded-full bg-white/7" aria-hidden>
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-b from-[#C8103C] to-[#7A28B8] origin-top"
          style={{ scaleY: reduced ? 1 : progress }}
        />
      </div>
      <ol className="relative grid md:grid-cols-3 gap-8 md:gap-6">
        {items.map((it, i) => {
          const ach = achievements?.[i]
          return (
            <li key={it.label} className="flex md:flex-col items-start md:items-center gap-4 md:text-center">
              <span className="relative z-10 w-12 h-12 shrink-0 rounded-full bg-[#18121A] border border-[#C8103C]/40 flex items-center justify-center shadow-[0_0_24px_rgba(200,16,60,0.25)]">
                {it.icon ? <Icon name={it.icon} size={20} className="text-[#F03068]" /> : <span className="font-syne font-bold text-[#C8103C]">{i + 1}</span>}
              </span>
              <div className="flex flex-col gap-3 md:items-center flex-1">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#C8103C] font-medium">{it.label}</p>
                  <h4 className="font-syne font-bold text-lg text-[#F0EBF4]">{it.title}</h4>
                  <p className="text-sm text-[#9A8FA5] leading-relaxed mt-1 max-w-xs">{it.text}</p>
                </div>
                <AnimatePresence mode="wait">
                  {ach && (
                    <motion.div
                      key={ach.text}
                      initial={reduced ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-w-xs rounded-xl border border-[#2BB673]/25 bg-gradient-to-b from-[#2BB673]/10 to-transparent p-4 text-left"
                    >
                      <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#2BB673] font-semibold">
                        {ach.icon && <Icon name={ach.icon} size={14} />}
                        Réalisation · {ach.label}
                      </span>
                      <p className="mt-2 text-sm text-[#F0EBF4] leading-relaxed">{ach.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

const PHASE_COLORS = ["#C8103C", "#7A28B8", "#2460D8", "#2BB673"]

/** Déroulé d'atelier : barre proportionnelle aux durées, une couleur par phase, détail au survol/toucher. */
export function DurationsTimeline({ items, footer }: { items: Item[]; footer?: string }) {
  const [active, setActive] = useState(0)
  const total = items.reduce((s, it) => s + (it.minutes ?? 0), 0) || 1
  const cur = items[active]
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex w-full h-16 sm:h-20 rounded-2xl overflow-hidden border border-white/10" role="tablist" aria-label="Phases de l'atelier">
        {items.map((it, i) => (
          <button
            key={it.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="atelier-phase"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="relative flex flex-col items-center justify-center gap-0.5 text-white transition-[filter,opacity] duration-200 px-1 min-w-0"
            style={{
              flexGrow: it.minutes ?? 1,
              flexBasis: 0,
              background: `linear-gradient(180deg, ${PHASE_COLORS[i % 4]} 0%, ${PHASE_COLORS[i % 4]}B3 100%)`,
              opacity: i === active ? 1 : 0.55,
            }}
          >
            <span className="font-syne font-bold text-xs sm:text-sm whitespace-nowrap">{it.label}</span>
            <span className="hidden sm:block text-[10px] text-white/80 truncate max-w-full">{it.title}</span>
            {i === active && <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/80" aria-hidden />}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-[#6B6075] -mt-3 tabular-nums" aria-hidden>
        <span>0 h</span>
        <span>{Math.round(total / 60)} h</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={cur.label}
          id="atelier-phase"
          role="tabpanel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-white/7 bg-[#18121A] p-6 flex items-start gap-4"
        >
          <span
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${PHASE_COLORS[active % 4]}26`, color: PHASE_COLORS[active % 4] }}
          >
            {cur.icon && <Icon name={cur.icon} size={22} />}
          </span>
          <div>
            <p className="text-xs uppercase tracking-widest font-medium" style={{ color: PHASE_COLORS[active % 4] }}>
              {cur.label}
            </p>
            <h4 className="font-syne font-bold text-xl text-[#F0EBF4]">{cur.title}</h4>
            {cur.text && <p className="text-[#9A8FA5] mt-1 leading-relaxed">{cur.text}</p>}
          </div>
        </motion.div>
      </AnimatePresence>
      {footer && (
        <p className="flex items-center gap-3 rounded-xl border border-dashed border-white/10 px-5 py-4 text-sm text-[#9A8FA5]">
          <Mail size={18} className="text-[#C8103C] shrink-0" aria-hidden />
          {footer}
        </p>
      )}
    </div>
  )
}
