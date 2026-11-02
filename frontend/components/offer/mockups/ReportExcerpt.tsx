import { motion } from "framer-motion"
import { Clock } from "lucide-react"

import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const LEVELS = ["faible", "moyenne", "forte"] as const
const LEVEL_STYLE: Record<(typeof LEVELS)[number], string> = {
  faible: "bg-emerald-100 text-emerald-700 border-emerald-300",
  moyenne: "bg-amber-100 text-amber-700 border-amber-300",
  forte: "bg-rose-100 text-rose-700 border-rose-300",
}

/** Aperçu de rapport d'audit : page de document claire, inclinée, barres comparatives (PRD §8.3). */
export function ReportExcerpt({
  lines,
  bars = [],
  difficulty,
}: {
  lines: string[]
  bars?: { label: string; text: string; minutes: number }[]
  difficulty?: (typeof LEVELS)[number]
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true, threshold: 0.3 })
  const reduced = useReducedMotion()
  const max = Math.max(...bars.map((b) => b.minutes), 1)
  const [heading, , , difficultyLine, setupLine] = lines

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-xl py-6" style={{ perspective: "1200px" }}>
      {/* Pages en dessous, pour l'effet de liasse */}
      <div className="absolute inset-x-6 top-10 bottom-0 rounded-lg bg-[#D9D2DE] rotate-[3deg] opacity-40" aria-hidden />
      <motion.article
        initial={reduced ? false : { rotate: 0, y: 30, opacity: 0 }}
        animate={isInView || reduced ? { rotate: -1.5, y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="relative rounded-lg bg-[#F7F4F9] text-[#18121A] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_10px_20px_-10px_rgba(200,16,60,0.25)] px-6 sm:px-10 py-8"
        aria-label="Extrait de rapport d'audit"
      >
        <header className="flex items-center justify-between border-b border-[#18121A]/10 pb-4">
          <p className="font-syne font-extrabold tracking-tight text-lg">
            dadd<span className="text-[#C8103C]">IA</span>
            <span className="font-dm-sans font-normal text-sm text-[#6B6075]"> — Rapport d&apos;audit</span>
          </p>
          <span className="text-[10px] uppercase tracking-widest text-[#6B6075]">p. 7</span>
        </header>

        <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-[#C8103C] font-semibold">Les pistes IA</p>
        <h4 className="mt-1 font-syne font-bold text-lg sm:text-xl leading-snug">{heading}</h4>

        <div className="mt-6 flex flex-col gap-4">
          {bars.map((b, i) => (
            <div key={b.label}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold">{b.label}</span>
                <span className="text-[#6B6075]">{b.text}</span>
              </div>
              <div className="mt-1.5 h-3 rounded-full bg-[#18121A]/8 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${i === 0 ? "bg-gradient-to-r from-[#9A8FA5] to-[#6B6075]" : "bg-gradient-to-r from-[#2BB673] to-[#1E9A5E]"}`}
                  initial={reduced ? false : { width: 0 }}
                  animate={isInView || reduced ? { width: `${Math.max((b.minutes / max) * 100, 6)}%` } : undefined}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2, ease: "easeOut" }}
                  style={reduced ? { width: `${Math.max((b.minutes / max) * 100, 6)}%` } : undefined}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold mr-1">{difficultyLine?.split(":")[0]?.trim() ?? "Difficulté"} :</span>
          {LEVELS.map((lvl) => (
            <span
              key={lvl}
              className={`text-xs px-2.5 py-1 rounded-full border ${
                lvl === difficulty ? LEVEL_STYLE[lvl] + " font-semibold" : "border-[#18121A]/10 text-[#18121A]/35"
              }`}
              aria-current={lvl === difficulty ? "true" : undefined}
            >
              {lvl}
            </span>
          ))}
        </div>

        {setupLine && (
          <p className="mt-4 flex items-center gap-2 text-sm text-[#3A3040]">
            <Clock size={14} className="text-[#C8103C]" aria-hidden /> {setupLine}
          </p>
        )}

        {/* Lignes de texte simulées */}
        <div className="mt-6 flex flex-col gap-2" aria-hidden>
          {[92, 100, 76].map((w) => (
            <span key={w} className="h-2 rounded bg-[#18121A]/8" style={{ width: `${w}%` }} />
          ))}
        </div>
        <ul className="sr-only">
          {lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </motion.article>
    </div>
  )
}
