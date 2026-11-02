import { motion } from "framer-motion"
import { ArrowRight, Brain } from "lucide-react"

import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"

import { Bubble, PhoneFrame } from "./Phone"

type Side = { label: string; text: string }

function Gauge({ label, items }: { label: string; items: { label: string; value: number }[] }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true, threshold: 0.4 })
  const reduced = useReducedMotion()
  return (
    <div ref={ref} className="w-full max-w-md mx-auto rounded-2xl border border-white/7 bg-[#18121A] p-6">
      <p className="flex items-center gap-2 font-syne font-bold text-[#F0EBF4]">
        <Brain size={18} className="text-[#F03068]" aria-hidden /> {label}
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((it, i) => (
          <li key={it.label}>
            <div className="flex justify-between text-xs text-[#9A8FA5]">
              <span>{it.label}</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-white/7 overflow-hidden" role="presentation">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#C8103C] to-[#F03068]"
                initial={reduced ? false : { width: "8%" }}
                animate={isInView || reduced ? { width: `${it.value}%` } : undefined}
                style={reduced ? { width: `${it.value}%` } : undefined}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: "easeOut" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Comparaison « Semaine 1 / Mois 3 » : deux téléphones côte à côte + jauge (PRD §8.3). */
export function BeforeAfter({
  before,
  after,
  variant = "panels",
  gauge,
}: {
  before: Side
  after: Side
  variant?: "phones" | "panels"
  gauge?: { label: string; items: { label: string; value: number }[] }
}) {
  if (variant === "phones") {
    return (
      <div className="flex flex-col gap-10">
        <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-6">
          {[before, after].map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center gap-3 ${i === 1 ? "md:order-3" : ""}`}>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                  i === 0 ? "border-white/10 text-[#9A8FA5] bg-white/5" : "border-[#C8103C]/40 text-[#F03068] bg-[#C8103C]/10"
                }`}
              >
                {s.label}
              </span>
              <div className={i === 0 ? "w-full opacity-75 saturate-50" : "w-full"}>
                <PhoneFrame contact="Votre assistant" initials="IA" className="scale-[0.92] md:scale-100" bodyClassName="justify-center">
                  <Bubble side="right" time={i === 0 ? "9h12" : "9h04"}>
                    <p>{s.text}</p>
                  </Bubble>
                </PhoneFrame>
              </div>
            </div>
          ))}
          <ArrowRight className="arrow-nudge mx-auto text-[#C8103C] md:order-2 rotate-90 md:rotate-0" size={28} aria-hidden />
        </div>
        {gauge && <Gauge label={gauge.label} items={gauge.items} />}
      </div>
    )
  }
  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr] items-stretch gap-4">
      <div className="rounded-2xl border border-white/5 bg-[#121012] p-6 grayscale">
        <p className="text-xs uppercase tracking-widest text-[#6B6075]">{before.label}</p>
        <p className="mt-2 text-[#9A8FA5]">{before.text}</p>
      </div>
      <ArrowRight className="arrow-nudge self-center mx-auto text-[#C8103C] rotate-90 md:rotate-0" size={24} aria-hidden />
      <div className="rounded-2xl border border-[#C8103C]/30 bg-gradient-to-br from-[#C8103C]/15 to-[#18121A] p-6">
        <p className="text-xs uppercase tracking-widest text-[#F03068]">{after.label}</p>
        <p className="mt-2 text-[#F0EBF4]">{after.text}</p>
      </div>
    </div>
  )
}
