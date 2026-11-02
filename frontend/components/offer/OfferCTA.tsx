import { CalendarDays } from "lucide-react"
import Link from "next/link"

import { FadeUp } from "@/components/common/FadeUp"
import { SplitReveal } from "@/components/common/SplitReveal"
import { OffreCard } from "@/components/sections/OffresSection"
import { getOfferBySlug } from "@/data/offres"
import { CAL_URL, contactHref } from "@/lib/site"
import type { Offer } from "@/types/offer"

/** Grand bloc final « Parlons de votre situation » + offres liées. */
export function OfferCTA({ offer }: { offer: Offer }) {
  const related = offer.related.map(getOfferBySlug).filter((o): o is Offer => Boolean(o))
  const secondary = offer.cta ?? { label: "Écrire via le formulaire", href: contactHref(offer.slug) }
  return (
    <section className="relative overflow-hidden py-24 px-4 bg-[#070407]" aria-labelledby="cta-titre">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        <div className="relative card-daddia rounded-[32px] md:rounded-[40px] overflow-hidden px-6 py-16 sm:py-20 text-center">
          <div className="bg-grid-daddia absolute inset-0 opacity-60 pointer-events-none" aria-hidden />
          <div className="film-grain-daddia" aria-hidden />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <SplitReveal>
              <h2 id="cta-titre" className="font-syne font-bold text-4xl md:text-6xl tracking-tight text-hero-crimson pb-2">
                Parlons de votre situation
              </h2>
            </SplitReveal>
            <p className="text-[#9A8FA5] text-lg max-w-xl font-light leading-relaxed">
              Un appel de découverte gratuit, sans engagement : vous nous expliquez votre quotidien, on vous dit franchement ce
              qu&apos;on peut faire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-daddia-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[1.25rem] font-syne font-semibold text-lg"
              >
                <CalendarDays size={18} aria-hidden /> Réserver un appel gratuit
              </a>
              <Link
                href={secondary.href}
                className="btn-daddia-outline inline-flex items-center justify-center px-8 py-4 rounded-[1.25rem] font-syne font-semibold text-lg"
              >
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="flex flex-col gap-8">
            <p className="text-center text-xs font-medium tracking-widest uppercase text-[#C8103C]">Ces offres peuvent aussi vous intéresser</p>
            <div className={`grid gap-4 ${related.length > 1 ? "md:grid-cols-2" : ""} max-w-4xl mx-auto w-full`}>
              {related.map((o, i) => (
                <FadeUp key={o.slug} delay={i * 0.08}>
                  <OffreCard offer={o} compact />
                </FadeUp>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
