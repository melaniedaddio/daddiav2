import { Mail } from "lucide-react"
import Link from "next/link"

import { Logo } from "@/components/common/Logo"
import { OFFER_SHORT_NAMES, offers } from "@/data/offres"
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site"

const linkCls = "text-[#6B6075] hover:text-[#F0EBF4] transition-colors text-xs font-medium tracking-wide"

export function Footer() {
  return (
    <footer className="border-t border-white/7 py-12 px-4 bg-[#070407]">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
        <Logo />
        <p className="text-[#6B6075] text-sm italic">&quot;Pas de promesses. Des outils qui tournent.&quot;</p>
        <p className="text-[#6B6075] text-sm">Nice (06) · PACA · France</p>
        <nav aria-label="Offres" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs">
          <span className="text-[#6B6075]">Offres :</span>
          {offers.map((o, i) => (
            <span key={o.slug} className="flex items-center gap-3">
              <Link href={`/offres/${o.slug}`} className={linkCls}>
                {OFFER_SHORT_NAMES[o.slug]}
              </Link>
              {i < offers.length - 1 && <span className="text-[#6B6075]/50" aria-hidden>·</span>}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <a href={SOCIAL_LINKS.linkedin} className={linkCls}>
            LinkedIn
          </a>
          <a href={SOCIAL_LINKS.youtube} className={linkCls}>
            YouTube
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[#6B6075] hover:text-[#F0EBF4] transition-colors"
            aria-label={`Écrire à ${CONTACT_EMAIL}`}
          >
            <Mail size={18} aria-hidden />
          </a>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/mentions-legales" className={linkCls}>
            Mentions légales
          </Link>
          <Link href="/confidentialite" className={linkCls}>
            Confidentialité
          </Link>
        </div>
        <p className="text-[#6B6075] text-xs border-t border-white/5 pt-6 w-full">© 2026 daddIA — Micro-entreprise</p>
      </div>
    </footer>
  )
}
