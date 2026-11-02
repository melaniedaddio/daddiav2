import { ShieldCheck } from "lucide-react"

import { FadeUp } from "@/components/common/FadeUp"
import type { Offer } from "@/types/offer"

export function Reassurance({ reassurance }: { reassurance: NonNullable<Offer["reassurance"]> }) {
  return (
    <FadeUp>
      <aside className="rounded-2xl border border-[#2BB673]/25 bg-gradient-to-br from-[#2BB673]/10 via-[#18121A] to-[#18121A] p-6 sm:p-8">
        <p className="flex items-center gap-2 font-syne font-bold text-xl text-[#F0EBF4]">
          <ShieldCheck size={22} className="text-[#2BB673]" aria-hidden /> {reassurance.title}
        </p>
        <ul className="mt-5 grid md:grid-cols-3 gap-3">
          {reassurance.items.map((it) => (
            <li key={it} className="rounded-xl bg-black/20 border border-white/7 px-5 py-4 text-sm text-[#F0EBF4] leading-relaxed">
              {it}
            </li>
          ))}
        </ul>
      </aside>
    </FadeUp>
  )
}
