import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Icon } from "@/components/common/Icon"
import { IllustrativeTag } from "@/components/common/IllustrativeTag"
import { Avatar } from "@/components/offer/mockups/Avatar"
import { GainBadge } from "@/components/offer/mockups/GainBadge"
import { Bubble } from "@/components/offer/mockups/Phone"
import { getOfferBySlug } from "@/data/offres"
import { type Need, type NeedScene, needs } from "@/data/needs"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { Offer } from "@/types/offer"

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function Scene({ scene }: { scene: NeedScene }) {
  if (scene.kind === "chat") {
    return (
      <div className="rounded-2xl bg-[#0F0B0F] border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#18121A] border-b border-white/5">
          <span className="w-7 h-7 rounded-full bg-[#C8103C] text-[10px] font-bold text-white flex items-center justify-center" aria-hidden>
            IA
          </span>
          <span className="text-sm font-semibold text-[#F0EBF4]">{scene.contact}</span>
          <span className="ml-auto flex items-center gap-1 text-[11px] text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden /> en ligne
          </span>
        </div>
        <div className="flex flex-col gap-2 p-4">
          {scene.messages.map((m, i) => (
            <Bubble key={i} side={m.side} time={m.time}>
              <p>{m.text}</p>
            </Bubble>
          ))}
        </div>
      </div>
    )
  }
  if (scene.kind === "timeline") {
    return (
      <ol className="relative flex flex-col gap-3 pl-6">
        <span className="absolute left-[9px] top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-[#C8103C] to-[#7A28B8]" aria-hidden />
        {scene.steps.map((s) => (
          <li key={s.label} className="relative rounded-xl border border-white/7 bg-[#18121A] p-4">
            <span className="absolute -left-[22px] top-4 w-3 h-3 rounded-full bg-[#F03068] ring-4 ring-[#120D13]" aria-hidden />
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#F03068] font-semibold">
              {s.icon && <Icon name={s.icon} size={13} />}
              {s.label.replace(/^M/, "Mois ")}
            </span>
            <p className="mt-1.5 text-sm text-[#F0EBF4] leading-relaxed">{s.text}</p>
          </li>
        ))}
      </ol>
    )
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-white/5 bg-[#151215] p-4 flex gap-3">
        <span className="w-9 h-9 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          {scene.beforeIcon && <Icon name={scene.beforeIcon} size={17} className="text-[#6B6075]" />}
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-widest text-[#6B6075] font-medium">Avant</p>
          <p className="mt-1 text-sm text-[#9A8FA5] leading-relaxed">{scene.before}</p>
        </div>
      </div>
      <ArrowRight size={16} className="arrow-nudge self-center rotate-90 text-[#F03068]" aria-hidden />
      <div className="rounded-xl border border-[#C8103C]/30 bg-gradient-to-br from-[#C8103C]/15 via-[#18121A] to-[#18121A] p-4 flex gap-3">
        <span className="w-9 h-9 shrink-0 rounded-lg bg-[#C8103C]/15 border border-[#C8103C]/30 flex items-center justify-center">
          {scene.afterIcon && <Icon name={scene.afterIcon} size={17} className="text-[#F03068]" />}
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-widest text-[#F03068] font-medium">{scene.afterLabel}</p>
          <p className="mt-1 text-sm text-[#F0EBF4] leading-relaxed">{scene.after}</p>
        </div>
      </div>
      {scene.gain && (
        <div className="self-start">
          <GainBadge {...scene.gain} />
        </div>
      )}
    </div>
  )
}

function NeedPanel({ need }: { need: Need }) {
  const offers = need.offers.map(getOfferBySlug).filter((o): o is Offer => Boolean(o))
  return (
    <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6 lg:gap-10 items-start">
      {/* Situation + offre(s) qui y répondent */}
      <div className="flex flex-col gap-6 lg:pt-4">
        <div>
          <p className="text-xs font-medium text-[#6B6075] uppercase tracking-wider">Vous vous reconnaissez ?</p>
          <p className="mt-2 font-syne font-bold text-2xl sm:text-3xl text-[#F0EBF4] leading-snug">
            « {capitalize(need.situation)}. »
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-[#C8103C]/80 uppercase tracking-wider">
            {offers.length > 1 ? "Nos offres pour ça" : "Notre offre pour ça"}
          </p>
          {offers.map((o) => (
            <Link
              key={o.slug}
              href={`/offres/${o.slug}`}
              className="group rounded-xl border border-white/7 bg-[#18121A] hover:border-[#C8103C]/50 hover:bg-[#1F1425] transition-colors p-5 flex flex-col gap-2"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-syne font-bold text-lg text-[#F0EBF4]">{o.name}</span>
                <ArrowRight size={18} aria-hidden className="text-[#F03068] transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-sm text-[#9A8FA5] leading-relaxed">{o.cardPitch}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Scène illustrative */}
      <div className="rounded-3xl border border-white/7 bg-[#120D13] p-5 sm:p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="flex items-center gap-3">
            <Avatar sector={need.sector} size={36} />
            <span className="text-sm text-[#9A8FA5]">{need.sceneTitle}</span>
          </span>
          <IllustrativeTag />
        </div>
        <Scene scene={need.scene} />
        {need.result && (
          <p className="flex items-start gap-2 text-sm text-[#9A8FA5] leading-relaxed border-t border-white/5 pt-4">
            <CheckCircle2 size={16} className="text-[#2BB673] shrink-0 mt-0.5" aria-hidden />
            {need.result}
          </p>
        )}
      </div>
    </div>
  )
}

/** Guide « Quel est votre besoin ? » : le visiteur choisit sa situation, on lui montre une scène et l'offre qui y répond. */
export function NeedsSelector() {
  const [activeId, setActiveId] = useState(needs[0].id)
  const reduced = useReducedMotion()
  const active = needs.find((n) => n.id === activeId) ?? needs[0]
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-3 justify-center" role="tablist" aria-label="Choisissez votre besoin">
        {needs.map((n) => {
          const isActive = n.id === active.id
          return (
            <button
              key={n.id}
              type="button"
              role="tab"
              id={`need-tab-${n.id}`}
              aria-selected={isActive}
              aria-controls="need-panel"
              onClick={() => setActiveId(n.id)}
              className={`flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full text-sm font-medium border transition-all duration-200 ${
                isActive
                  ? "bg-[#C8103C]/10 border-[#C8103C]/40 text-[#F03068]"
                  : "border-white/10 text-[#9A8FA5] hover:border-white/20 hover:text-[#F0EBF4]"
              }`}
            >
              <Icon name={n.icon} size={14} />
              {n.label}
            </button>
          )
        })}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id}
          id="need-panel"
          role="tabpanel"
          aria-labelledby={`need-tab-${active.id}`}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <NeedPanel need={active} />
        </motion.div>
      </AnimatePresence>
      <p className="text-center text-xs text-[#6B6075]">Exemples types — les gains réels dépendent de votre activité.</p>
    </div>
  )
}
