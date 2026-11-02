import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Icon } from "@/components/common/Icon"
import { IllustrativeTag } from "@/components/common/IllustrativeTag"
import { JourneyTimeline } from "@/components/offer/mockups/Timeline"
import { SectorTabs } from "@/components/offer/SectorTabs"
import { SECTORS } from "@/data/offres"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useSector } from "@/hooks/useSessionSector"
import type { OfferExample, VisualBlock } from "@/types/offer"

type Journey = Extract<VisualBlock, { type: "timeline" }>

/** Une situation d'exemple rendue comme une scène : personnage, avant → après, gain (PRD §8.3). */
function ExampleScene({ example, journey }: { example: OfferExample; journey?: Journey }) {
  const sector = SECTORS[example.sector]
  const hasBefore = Boolean(example.before)
  const leftLabel = hasBefore ? "Avant" : (example.whatLabel ?? "La situation")
  const leftText = hasBefore ? example.before : example.what
  const rightLabel = hasBefore ? (example.whatLabel ?? "Après") : (example.resultLabel ?? "Résultat")
  const rightText = hasBefore ? example.what : example.result
  const showResultBelow = hasBefore && Boolean(example.result)

  return (
    <div className="rounded-3xl border border-white/7 bg-[#120D13] p-5 sm:p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-full bg-[#C8103C]/10 border border-[#C8103C]/30 flex items-center justify-center shrink-0">
            <Icon name={sector.icon} size={18} className="text-[#F03068]" />
          </span>
          <p className="font-syne font-bold text-[#F0EBF4]">{example.title.replace(/\.$/, "")}</p>
        </div>
        <IllustrativeTag />
      </div>

      {example.timeline && journey ? (
        <div className="pt-4">
          <p className="text-center font-syne font-bold text-xl text-[#F0EBF4] mb-10">{journey.title}</p>
          <JourneyTimeline items={journey.items} achievements={example.timeline} />
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-[1fr_auto_1fr] items-stretch gap-4">
            {/* Avant : teinte terne */}
            <div className="relative rounded-2xl border border-white/5 bg-[#151215] p-5 sm:p-6 flex flex-col gap-3 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 10px)" }}
                aria-hidden
              />
              <span className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {example.beforeIcon && <Icon name={example.beforeIcon} size={20} className="text-[#6B6075]" />}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#6B6075] font-medium">{leftLabel}</span>
              </span>
              <p className="relative text-[#9A8FA5] leading-relaxed">{leftText}</p>
            </div>
            <div className="flex items-center justify-center" aria-hidden>
              <span className="w-10 h-10 rounded-full bg-[#C8103C]/10 border border-[#C8103C]/30 flex items-center justify-center">
                <ArrowRight size={18} className="arrow-nudge text-[#F03068] rotate-90 md:rotate-0" />
              </span>
            </div>
            {/* Après : teinte vive, accent crimson */}
            <div className="relative rounded-2xl border border-[#C8103C]/30 bg-gradient-to-br from-[#C8103C]/15 via-[#18121A] to-[#18121A] p-5 sm:p-6 flex flex-col gap-3 shadow-[0_0_40px_rgba(200,16,60,0.08)]">
              <span className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#C8103C]/15 border border-[#C8103C]/30 flex items-center justify-center shadow-[0_0_20px_rgba(200,16,60,0.25)]">
                  {example.afterIcon && <Icon name={example.afterIcon} size={20} className="text-[#F03068]" />}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#F03068] font-medium">{rightLabel}</span>
              </span>
              <p className="text-[#F0EBF4] leading-relaxed">{rightText}</p>
            </div>
          </div>

          {showResultBelow && (
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5">
              <p className="flex items-start gap-2 text-sm text-[#9A8FA5] leading-relaxed">
                <CheckCircle2 size={16} className="text-[#2BB673] shrink-0 mt-0.5" aria-hidden />
                <span>
                  <span className="text-[#F0EBF4] font-medium">{example.resultLabel ?? "Résultat"} : </span>
                  {example.result}
                </span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

/** « Exemples de situations » : 3 onglets de secteur, changement animé (fondu + glissement). */
export function ExampleTabs({ examples, journey }: { examples: OfferExample[]; journey?: Journey }) {
  const [sector] = useSector()
  const reduced = useReducedMotion()
  const current = examples.find((e) => e.sector === sector) ?? examples[0]
  return (
    <div className="flex flex-col gap-8">
      <SectorTabs controls="example-panel" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.sector}
          id="example-panel"
          role="tabpanel"
          aria-label={SECTORS[current.sector].label}
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? undefined : { opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ExampleScene example={current} journey={journey} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
