import { ShieldCheck } from "lucide-react"

import { FadeUp } from "@/components/common/FadeUp"
import { VisualBlock } from "@/components/offer/VisualBlock"
import type { FeatureSection as FeatureSectionData } from "@/types/offer"

/** Section éditoriale + visuel (Assistant IA : interface privée, mémoire). */
export function FeatureSection({ section }: { section: FeatureSectionData }) {
  return (
    <div className="flex flex-col gap-12">
      {section.intro && (
        <FadeUp>
          <p className="text-center text-lg text-[#9A8FA5] leading-relaxed max-w-3xl mx-auto -mt-6">{section.intro}</p>
        </FadeUp>
      )}
      <ul className={`grid gap-4 ${section.points.length === 4 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {section.points.map((p, i) => (
          <FadeUp key={p.title} delay={i * 0.1} as="li">
            <div className="h-full rounded-2xl bg-[#18121A] border border-white/7 p-6 hover:border-[#C8103C]/20 transition-colors">
              <h3 className="font-syne font-bold text-lg text-[#F0EBF4]">{p.title}</h3>
              <p className="mt-2 text-sm text-[#9A8FA5] leading-relaxed">{p.text}</p>
            </div>
          </FadeUp>
        ))}
      </ul>
      {section.visual && <VisualBlock block={section.visual} />}
      {section.reassurance && (
        <ul className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
          {section.reassurance.map((r) => (
            <li key={r} className="flex items-start gap-3 rounded-xl border border-[#2BB673]/20 bg-[#2BB673]/5 px-5 py-4 text-sm text-[#F0EBF4] leading-relaxed">
              <ShieldCheck size={18} className="text-[#2BB673] shrink-0 mt-0.5" aria-hidden />
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
