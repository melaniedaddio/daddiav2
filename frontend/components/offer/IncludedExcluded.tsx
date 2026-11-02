import { Check, X } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { FadeUp } from "@/components/common/FadeUp"
import { getOfferBySlug } from "@/data/offres"
import type { OfferSlug } from "@/types/offer"

/** Transforme le nom de l'offre cité dans le texte en lien vers sa page. */
function withLink(text: string, slug?: OfferSlug): ReactNode {
  const offer = slug ? getOfferBySlug(slug) : undefined
  if (!offer) return text
  const name = text.includes(offer.name) ? offer.name : offer.name.replace(/^Votre /, "")
  const idx = text.indexOf(name)
  if (idx < 0) return text
  return (
    <>
      {text.slice(0, idx)}
      <Link href={`/offres/${offer.slug}`} className="text-[#F0EBF4] underline underline-offset-2 decoration-[#C8103C]/60 hover:text-[#F03068]">
        {name}
      </Link>
      {text.slice(idx + name.length)}
    </>
  )
}

export function IncludedExcluded({
  included,
  excluded,
  excludedLinks = {},
  financing,
}: {
  included: string[]
  excluded: string[]
  excludedLinks?: Partial<Record<number, OfferSlug>>
  financing?: string
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid md:grid-cols-2 gap-4">
        <FadeUp>
          <div className="h-full rounded-2xl bg-[#18121A] border border-[#2BB673]/20 p-6 sm:p-8">
            <h3 className="font-syne font-bold text-xl text-[#F0EBF4] mb-5">Inclus</h3>
            <ul className="flex flex-col gap-3">
              {included.map((it) => (
                <li key={it} className="flex items-start gap-3 text-[#F0EBF4] leading-relaxed">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#2BB673]/15 flex items-center justify-center shrink-0">
                    <Check size={13} className="text-[#2BB673]" aria-hidden />
                  </span>
                  <span>
                    <span className="sr-only">Inclus : </span>
                    {it}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="h-full rounded-2xl bg-[#18121A]/60 border border-white/7 p-6 sm:p-8">
            <h3 className="font-syne font-bold text-xl text-[#9A8FA5] mb-5">Non inclus</h3>
            <ul className="flex flex-col gap-3">
              {excluded.map((it, i) => (
                <li key={it} className="flex items-start gap-3 text-[#9A8FA5] leading-relaxed">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <X size={13} className="text-[#6B6075]" aria-hidden />
                  </span>
                  <span>
                    <span className="sr-only">Non inclus : </span>
                    {withLink(it, excludedLinks[i])}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
      {financing && (
        <p className="text-center text-sm text-[#9A8FA5] rounded-xl border border-dashed border-white/10 px-5 py-4">{financing}</p>
      )}
    </div>
  )
}
