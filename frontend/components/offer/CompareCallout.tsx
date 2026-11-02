import { ArrowRight, Scale } from "lucide-react"

import { FadeUp } from "@/components/common/FadeUp"
import type { Offer } from "@/types/offer"

export function CompareCallout({ compare }: { compare: NonNullable<Offer["compare"]> }) {
  return (
    <FadeUp>
      <aside className="relative overflow-hidden rounded-2xl border border-[#7A28B8]/30 bg-gradient-to-br from-[#7A28B8]/12 via-[#18121A] to-[#18121A] p-6 sm:p-8">
        <p className="flex items-center gap-2 font-syne font-bold text-xl text-[#F0EBF4]">
          <Scale size={20} className="text-[#A060E0]" aria-hidden /> {compare.title}
        </p>
        <dl className="mt-5 grid sm:grid-cols-2 gap-3">
          {compare.rows.map((r) => (
            <div key={r.label} className="rounded-xl bg-black/20 border border-white/7 px-5 py-4 flex items-center gap-3">
              <dt className="font-syne font-semibold text-[#F0EBF4] whitespace-nowrap">{r.label}</dt>
              <ArrowRight size={16} className="text-[#A060E0] shrink-0" aria-hidden />
              <dd className="text-[#9A8FA5]">{r.text}</dd>
            </div>
          ))}
        </dl>
        {compare.note && <p className="mt-4 text-sm text-[#9A8FA5]">{compare.note}</p>}
      </aside>
    </FadeUp>
  )
}
