import { Clock } from "lucide-react"

import { FadeUp } from "@/components/common/FadeUp"
import type { OfferStep } from "@/types/offer"

/** Étapes numérotées, au style de la section Processus de la maquette, avec la durée rappelée. */
export function OfferSteps({ steps, duration }: { steps: OfferStep[]; duration: string }) {
  return (
    <div className="flex flex-col items-center gap-12">
      <span className="inline-flex items-center gap-2 rounded-full border border-[#C8103C]/30 bg-[#C8103C]/10 px-4 py-2 text-sm text-[#F0EBF4]">
        <Clock size={14} className="text-[#F03068]" aria-hidden /> Durée : {duration}
      </span>
      <ol className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-0 relative w-full">
        {steps.map((step, i) => (
          <FadeUp key={step.title} delay={i * 0.1} as="li">
            <div className="relative flex flex-col items-center text-center gap-4 px-4">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-[#C8103C]/20 to-transparent" />
              )}
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#18121A] border border-[#C8103C]/20 flex items-center justify-center">
                <span className="font-syne font-bold text-lg text-[#C8103C]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-syne font-bold text-lg text-[#F0EBF4] leading-snug">{step.title}</h3>
                {step.desc && <p className="text-sm text-[#9A8FA5] leading-relaxed">{step.desc}</p>}
              </div>
              {i < steps.length - 1 && <div className="lg:hidden w-px h-8 bg-gradient-to-b from-[#C8103C]/20 to-transparent" />}
            </div>
          </FadeUp>
        ))}
      </ol>
    </div>
  )
}
