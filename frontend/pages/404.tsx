import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { PageShell } from "@/components/layout/PageShell"
import { offers } from "@/data/offres"

export default function NotFound() {
  return (
    <PageShell title="Page introuvable — daddIA" description="Cette page n'existe pas ou a été déplacée." noindex>
      <section className="relative overflow-hidden min-h-[80vh] flex items-center justify-center px-4 pt-32 pb-24">
        <div className="film-grain-daddia" aria-hidden />
        <div className="bg-grid-daddia absolute inset-0 opacity-60 pointer-events-none" aria-hidden />
        <div className="relative z-10 max-w-2xl text-center flex flex-col items-center gap-6">
          <p className="font-syne font-extrabold text-7xl md:text-9xl text-hero-crimson">404</p>
          <h1 className="font-syne font-bold text-3xl md:text-4xl text-hero-3d">Cette page est introuvable.</h1>
          <p className="text-[#9A8FA5] text-lg">Pas de panique : l&apos;accueil et nos offres sont juste là.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="btn-daddia-primary px-7 py-4 rounded-[1.25rem] font-syne font-semibold">
              Retour à l&apos;accueil
            </Link>
            <Link href="/#offres" className="btn-daddia-outline px-7 py-4 rounded-[1.25rem] font-syne font-semibold">
              Voir les offres
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {offers.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/offres/${o.slug}`}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-full border border-white/10 text-sm text-[#9A8FA5] hover:border-[#C8103C]/50 hover:text-[#F0EBF4] transition-colors"
                >
                  {o.name} <ArrowRight size={12} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  )
}
