import { ArrowRight, Check, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useId, useState } from "react"

import { FadeUp } from "@/components/common/FadeUp"
import { SectionHeader } from "@/components/common/SectionHeader"
import { FEATURED_OFFER, offers } from "@/data/offres"
import { contactHref } from "@/lib/site"
import type { Offer } from "@/types/offer"

export function OfferTag({ kind }: { kind: Offer["kind"] }) {
  const cls =
    kind === "ponctuel"
      ? "bg-[#C8103C]/10 text-[#F03068] border-[#C8103C]/30"
      : "bg-[#7A28B8]/10 text-[#A060E0] border-[#7A28B8]/30"
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${cls}`}>
      {kind === "ponctuel" ? "PONCTUEL" : "ABONNEMENT"}
    </span>
  )
}

// Carte d'offre de la maquette (OffreCard), alimentée par data/offres (PRD §7.4).
export function OffreCard({ offer, compact = false }: { offer: Offer; compact?: boolean }) {
  const [open, setOpen] = useState(false)
  const featured = offer.slug === FEATURED_OFFER && !compact
  const panelId = useId()
  return (
    <article
      className={`group flex flex-col gap-5 rounded-2xl p-6 border transition-all duration-200 h-full hover:bg-[#1F1425] ${
        featured
          ? "bg-[#18121A] border-[#C8103C]/30 shadow-[0_0_40px_rgba(200,16,60,0.08)] hover:shadow-[0_0_60px_rgba(200,16,60,0.14)] hover:border-[#C8103C]/50"
          : "bg-[#18121A] border-white/7 hover:border-[#C8103C]/50"
      }`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <OfferTag kind={offer.kind} />
        {featured && (
          <span className="text-xs font-medium text-[#C8103C] border border-[#C8103C]/30 px-2.5 py-1 rounded-full">
            Point de départ recommandé
          </span>
        )}
      </div>

      <div>
        <h3 className="font-syne font-bold text-xl text-[#F0EBF4] mb-2">{offer.name}</h3>
        <p className="text-[#9A8FA5] text-sm leading-relaxed">{offer.cardPitch}</p>
      </div>

      {!compact && (
        <div className="border-t border-white/10">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={panelId}
            className="w-full min-h-[44px] flex items-center justify-between py-3 text-sm text-[#9A8FA5] hover:text-[#F0EBF4] transition-colors"
          >
            <span>Ce qui est inclus</span>
            <ChevronDown size={16} aria-hidden className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </button>
          <div
            id={panelId}
            style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.3s ease" }}
          >
            <div className="overflow-hidden" inert={!open}>
              <ul className="flex flex-col gap-2 pt-1 pb-3">
                {offer.cardHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#9A8FA5]">
                    <Check size={14} aria-hidden className="text-[#C8103C] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2">
        <Link
          href={`/offres/${offer.slug}`}
          className={`min-h-[44px] w-full py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
            featured
              ? "bg-[#C8103C] hover:bg-[#F03068] text-white"
              : "border border-white/10 hover:border-[#C8103C]/50 text-[#F0EBF4]"
          }`}
        >
          Découvrir l&apos;offre <ArrowRight size={14} aria-hidden />
          <span className="sr-only"> : {offer.name}</span>
        </Link>
        {!compact && (
          <Link
            href={contactHref(offer.slug)}
            className="min-h-[44px] flex items-center justify-center text-xs text-[#9A8FA5] hover:text-[#F03068] transition-colors"
          >
            Prendre contact<span className="sr-only"> au sujet de l&apos;offre {offer.name}</span>
          </Link>
        )}
      </div>
    </article>
  )
}

export default function OffresSection() {
  return (
    <section id="offres" className="py-24 px-4" aria-labelledby="offres-titre">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          id="offres-titre"
          eyebrow="Nos offres"
          title="Commencez où vous êtes"
          subtitle="Six façons de travailler ensemble. Commencez petit, sans engagement long."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer, i) => (
            <FadeUp key={offer.slug} delay={i * 0.08}>
              <OffreCard offer={offer} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
