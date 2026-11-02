import { FolderOpen } from "lucide-react"

import { FadeUp } from "@/components/common/FadeUp"
import { Icon } from "@/components/common/Icon"
import type { IconName } from "@/types/offer"

/** Cartes illustrées (formules, thèmes) ou espace de fichiers (« Votre espace personnel »). */
export function CardsBlock({
  items,
  footer,
  variant = "grid",
}: {
  items: { title: string; text: string; icon?: IconName }[]
  footer?: string
  variant?: "grid" | "folders"
}) {
  if (variant === "folders") {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0B080C] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[#18121A] border-b border-white/5" aria-hidden>
            <span className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            </span>
            <span className="text-[11px] text-[#9A8FA5] flex items-center gap-1.5">
              <FolderOpen size={12} /> Mon espace daddIA
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6">
            {items.map((it, i) => (
              <FadeUp key={it.title} delay={i * 0.1} as="li">
                <div className="h-full rounded-xl dashboard-widget p-4 flex flex-col gap-3 hover:border-[#C8103C]/30 transition-colors">
                  <span className="w-10 h-10 rounded-lg bg-[#C8103C]/10 border border-[#C8103C]/20 flex items-center justify-center">
                    {it.icon && <Icon name={it.icon} size={18} className="text-[#F03068]" />}
                  </span>
                  <span className="text-sm text-[#F0EBF4] font-medium leading-snug">{it.title}</span>
                  <span className="mt-auto flex gap-1" aria-hidden>
                    {[60, 40].map((w) => (
                      <span key={w} className="h-1.5 rounded bg-white/7" style={{ width: `${w}%` }} />
                    ))}
                  </span>
                </div>
              </FadeUp>
            ))}
          </ul>
        </div>
        {footer && <p className="mt-6 text-center text-[#9A8FA5]">{footer}</p>}
      </div>
    )
  }
  const cols = items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4"
  return (
    <div className="w-full">
      <ul className={`grid gap-4 ${cols}`}>
        {items.map((it, i) => (
          <FadeUp key={it.title} delay={i * 0.1} as="li">
            <div className="h-full rounded-2xl bg-[#18121A] border border-white/7 p-6 flex flex-col gap-4 hover:border-[#C8103C]/30 transition-colors">
              {it.icon && (
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C8103C]/25 to-[#7A28B8]/10 border border-[#C8103C]/25 flex items-center justify-center">
                  <Icon name={it.icon} size={22} className="text-[#F03068]" />
                </span>
              )}
              <h4 className="font-syne font-bold text-lg text-[#F0EBF4]">{it.title}</h4>
              {it.text && <p className="text-sm text-[#9A8FA5] leading-relaxed">{it.text}</p>}
            </div>
          </FadeUp>
        ))}
      </ul>
      {footer && <p className="mt-6 text-center text-[#9A8FA5]">{footer}</p>}
    </div>
  )
}
