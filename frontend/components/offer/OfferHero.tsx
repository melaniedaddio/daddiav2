import { motion } from "framer-motion"
import { CalendarDays, ChevronRight, Clock } from "lucide-react"
import Link from "next/link"

import { OfferTag } from "@/components/sections/OffresSection"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { CAL_URL, contactHref } from "@/lib/site"
import type { Offer } from "@/types/offer"

/** En-tête de page offre : même ambiance que le hero de l'accueil, sans épinglage (PRD §8.2). */
export function OfferHero({ offer }: { offer: Offer }) {
  const reduced = useReducedMotion()
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30, filter: "blur(12px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        }
  return (
    <section className="relative overflow-hidden bg-[#070407] pt-32 pb-24 px-4" style={{ perspective: "1500px" }}>
      <div className="film-grain-daddia" aria-hidden />
      <div className="bg-grid-daddia absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden />
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[600px] max-w-full rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,16,60,0.12) 0%, transparent 65%)" }}
        aria-hidden
      />
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
        <motion.nav aria-label="Fil d'Ariane" {...enter(0)}>
          <ol className="flex items-center gap-1.5 text-xs text-[#9A8FA5]">
            <li>
              <Link href="/#offres" className="hover:text-[#F0EBF4] transition-colors">
                Offres
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={12} />
            </li>
            <li aria-current="page" className="text-[#F0EBF4]">
              {offer.name}
            </li>
          </ol>
        </motion.nav>
        <motion.div className="flex flex-wrap items-center justify-center gap-3" {...enter(0.05)}>
          <OfferTag kind={offer.kind} />
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#F0EBF4]">
            <Clock size={12} className="text-[#C8103C]" aria-hidden />
            {offer.duration}
          </span>
        </motion.div>
        <motion.h1
          className="font-syne font-extrabold tracking-tight leading-[1.05] text-[clamp(1.2rem,6vw,2.25rem)] sm:text-5xl md:text-7xl text-hero-3d break-words"
          {...enter(0.1)}
        >
          {offer.name}
        </motion.h1>
        {offer.subtitle && (
          <motion.p
            className="font-syne font-bold tracking-tight text-xl sm:text-2xl md:text-3xl text-hero-crimson max-w-3xl leading-snug"
            {...enter(0.2)}
          >
            {offer.subtitle}
          </motion.p>
        )}
        <motion.p className="text-[#9A8FA5] text-base sm:text-lg leading-relaxed max-w-2xl font-light" {...enter(0.3)}>
          {offer.hook}
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto" {...enter(0.4)}>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-daddia-primary inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[1.25rem] font-syne font-semibold text-base sm:text-lg"
          >
            <CalendarDays size={18} aria-hidden /> Réserver un appel gratuit
          </a>
          <Link
            href={contactHref(offer.slug)}
            className="btn-daddia-outline inline-flex items-center justify-center px-7 py-4 rounded-[1.25rem] font-syne font-semibold text-base sm:text-lg"
          >
            Poser une question
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
