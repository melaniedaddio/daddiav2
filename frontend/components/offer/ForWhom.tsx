import { Check } from "lucide-react"

import { FadeUp } from "@/components/common/FadeUp"

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export function ForWhom({ items }: { items: string[] }) {
  return (
    <ul className="grid md:grid-cols-3 gap-4">
      {items.map((it, i) => (
        <FadeUp key={it} delay={i * 0.1} as="li">
          <div className="h-full bg-[#18121A] border border-white/7 rounded-xl p-6 flex gap-4 hover:border-[#C8103C]/20 transition-colors">
            <span className="w-8 h-8 shrink-0 rounded-full bg-[#2BB673]/15 border border-[#2BB673]/30 flex items-center justify-center">
              <Check size={16} className="text-[#2BB673]" aria-hidden />
            </span>
            <p className="text-[#F0EBF4] leading-relaxed">{capitalize(it)}.</p>
          </div>
        </FadeUp>
      ))}
    </ul>
  )
}
