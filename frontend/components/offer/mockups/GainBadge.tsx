import { TrendingUp } from "lucide-react"

import { useCountUp } from "@/hooks/useCountUp"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"

/** Badge de gain : gros chiffre animé, couleur state.success (PRD §8.3). */
export function GainBadge({ value, prefix = "", unit }: { value: number; prefix?: string; unit: string }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true })
  const reduced = useReducedMotion()
  const n = useCountUp(value, isInView, reduced)
  return (
    <div
      ref={ref}
      className="inline-flex items-center gap-3 rounded-2xl border border-[#2BB673]/30 bg-[#2BB673]/10 px-4 py-3"
    >
      <span className="w-9 h-9 rounded-full bg-[#2BB673]/15 flex items-center justify-center shrink-0">
        <TrendingUp size={18} className="text-[#2BB673]" aria-hidden />
      </span>
      <span className="flex items-baseline gap-2">
        <span className="font-syne font-extrabold text-3xl text-[#2BB673] tabular-nums">
          {prefix && <span className="font-dm-sans font-medium mr-0.5">{prefix}</span>}
          {n}
        </span>
        <span className="text-sm font-medium text-[#7FD9A8]">{unit}</span>
      </span>
    </div>
  )
}
