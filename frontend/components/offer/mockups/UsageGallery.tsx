import { AnimatePresence, motion } from "framer-motion"
import { FileText, Send, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

import { Icon } from "@/components/common/Icon"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { UsageItem } from "@/types/offer"

type Slide = Extract<UsageItem["result"], { kind: "slides" }>["slides"][number]

/** Mini-diapositive aux couleurs (fictives) de l'entreprise. */
function MiniSlide({ slide, brand }: { slide: Slide; brand: string }) {
  if (slide.layout === "cover") {
    return (
      <div className="aspect-video rounded-md p-3 flex flex-col justify-between text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${brand} 0%, ${brand}CC 100%)` }}>
        <span className="w-5 h-5 rounded bg-white/90 text-[7px] font-bold flex items-center justify-center" style={{ color: brand }}>VE</span>
        <span className="text-[10px] sm:text-xs font-bold leading-tight">{slide.title}</span>
      </div>
    )
  }
  return (
    <div className="aspect-video rounded-md bg-white p-3 flex flex-col gap-2 shadow-lg">
      <span className="flex items-center justify-between">
        <span className="text-[9px] sm:text-[10px] font-bold leading-tight" style={{ color: brand }}>{slide.title}</span>
        <span className="w-3 h-3 rounded-sm" style={{ background: brand }} />
      </span>
      {slide.layout === "chart" ? (
        <span className="flex-1 flex items-end gap-1.5">
          {[45, 70, 55, 90].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 3 ? brand : `${brand}55` }} />
          ))}
        </span>
      ) : (
        <span className="flex flex-col gap-1.5 mt-1">
          {[85, 70, 60].map((w, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: brand }} />
              <span className="h-1.5 rounded bg-neutral-200" style={{ width: `${w}%` }} />
            </span>
          ))}
        </span>
      )}
    </div>
  )
}

function Result({ item }: { item: UsageItem }) {
  const r = item.result
  switch (r.kind) {
    case "slides":
      return (
        <div className="flex flex-col gap-3 w-full">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {r.slides.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                <MiniSlide slide={s} brand={r.brand} />
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-[#E6DFEB]">{r.caption}</p>
        </div>
      )
    case "table":
      return (
        <div className="flex flex-col gap-2 w-full min-w-0">
          {r.text && <p className="text-sm text-[#E6DFEB]">{r.text}</p>}
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-xs">
              <thead className="bg-white/5 text-[#9A8FA5]">
                <tr>
                  {r.columns.map((c) => (
                    <th key={c} scope="col" className="text-left font-medium px-3 py-2">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.rows.map((row) => (
                  <tr key={row.join("|")} className="border-t border-white/5 text-[#F0EBF4]">
                    {row.map((cell, i) => (
                      <td key={i} className="px-3 py-2 whitespace-nowrap">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    case "chart":
      return (
        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm text-[#E6DFEB]">{r.text}</p>
          <div className="flex flex-col gap-2">
            {r.bars.map((b, i) => (
              <div key={b.label} className="flex items-center gap-3 text-xs">
                <span className="w-20 shrink-0 text-[#9A8FA5]">{b.label}</span>
                <span className="flex-1 h-2.5 rounded-full bg-white/7 overflow-hidden">
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ background: b.down ? "#F03068" : "#2BB673" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${b.value}%` }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                </span>
                <span className={`w-4 ${b.down ? "text-[#F03068]" : "text-[#2BB673]"}`} aria-label={b.down ? "en baisse" : "en hausse"}>
                  {b.down ? "↓" : "↑"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    case "tones":
      return (
        <div className="grid sm:grid-cols-3 gap-2 w-full">
          {r.options.map((o, i) => (
            <div key={o.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: ["#2BB673", "#F5A524", "#F03068"][i % 3] }}>
                {o.label}
              </span>
              <p className="text-xs text-[#E6DFEB] leading-relaxed">{o.text}</p>
            </div>
          ))}
        </div>
      )
    default:
      return (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#E6DFEB] leading-relaxed">{r.text}</p>
          {r.source && (
            <span className="self-start inline-flex items-center gap-1 text-[11px] rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[#9A8FA5]">
              📄 {r.source}
            </span>
          )}
        </div>
      )
  }
}

function Exchange({ item, play }: { item: UsageItem; play: boolean }) {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<"request" | "typing" | "result">("request")
  useEffect(() => {
    if (!play || reduced) return
    const t0 = window.setTimeout(() => setPhase("request"), 0)
    const t1 = window.setTimeout(() => setPhase("typing"), 500)
    const t2 = window.setTimeout(() => setPhase("result"), 1500)
    return () => [t0, t1, t2].forEach((t) => window.clearTimeout(t))
  }, [play, reduced])
  const shown = reduced ? "result" : phase

  return (
    <div className="flex flex-col">
      <div className="px-4 sm:px-5 py-3 border-b border-white/5 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-widest text-[#6B6075] mr-1">Vous lui donnez</span>
        {item.gives.map((g) => (
          <span key={g} className="inline-flex items-center gap-1 text-[11px] rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[#9A8FA5]">
            <FileText size={11} aria-hidden /> {g}
          </span>
        ))}
      </div>
      <div className="p-4 sm:p-5 flex flex-col gap-3 min-h-[260px]" aria-live="polite">
        <div className="self-end max-w-[85%] rounded-2xl rounded-tr-md bg-[#241C27] px-4 py-2.5 text-sm text-[#F0EBF4]">{item.request}</div>
        {shown === "typing" && (
          <div className="flex items-center gap-1 px-1" role="status" aria-label="en train d'écrire">
            {[0, 1, 2].map((i) => (
              <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: item.color, animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        )}
        {shown === "result" && (
          <motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 min-w-0">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}26`, color: item.color }} aria-hidden>
              <Sparkles size={14} />
            </span>
            <div className="flex-1 min-w-0">
              <Result item={item} />
            </div>
          </motion.div>
        )}
      </div>
      <div className="m-3 sm:m-4 mt-0 h-10 rounded-lg bg-[#0F0B0F] border border-white/10 px-3 flex items-center justify-between text-xs text-[#6B6075]" aria-hidden>
        <span className="truncate">Demandez ce que vous voulez…</span>
        <Send size={14} style={{ color: item.color }} />
      </div>
    </div>
  )
}

/** Galerie d'usages concrets montrés en atelier : ce qu'on donne à l'IA, ce qu'on demande, ce qu'elle rend. */
export function UsageGallery({ intro, items, footer }: { intro?: string; items: UsageItem[]; footer?: string }) {
  const [active, setActive] = useState(0)
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true, threshold: 0.3 })
  const item = items[active]
  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {intro && <p className="text-center text-lg text-[#9A8FA5] leading-relaxed max-w-3xl mx-auto -mt-6">{intro}</p>}
      <div className="grid lg:grid-cols-[280px_1fr] gap-4">
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
          <div role="tablist" aria-label="Exemples d'usages" className="flex lg:flex-col gap-2 w-max lg:w-auto">
            {items.map((it, i) => {
              const on = i === active
              return (
                <button
                  key={it.name}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="usage-panel"
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 min-h-[44px] text-left transition-colors whitespace-nowrap lg:whitespace-normal ${
                    on ? "border-white/20 bg-[#1F1425]" : "border-white/7 bg-[#18121A] hover:border-white/15"
                  }`}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${it.color}26`, color: it.color }}>
                    <Icon name={it.icon} size={16} />
                  </span>
                  <span className={`text-sm font-medium ${on ? "text-[#F0EBF4]" : "text-[#9A8FA5]"}`}>{it.name}</span>
                </button>
              )
            })}
          </div>
        </div>
        <div id="usage-panel" role="tabpanel" className="min-w-0 rounded-xl overflow-hidden border border-white/10 bg-[#0B080C] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_20px_40px_-20px_rgba(200,16,60,0.15)]">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[#18121A] border-b border-white/5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            </span>
            <span className="text-xs font-semibold text-[#F0EBF4] flex items-center gap-2">
              <span style={{ color: item.color }}>
                <Icon name={item.icon} size={14} />
              </span>
              {item.name}
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={item.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <Exchange item={item} play={isInView} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {footer && <p className="text-center text-[#9A8FA5]">{footer}</p>}
    </div>
  )
}
