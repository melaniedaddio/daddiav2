import type { ReactNode } from "react"

import { PageShell } from "@/components/layout/PageShell"

/** Gabarit sobre des pages légales. */
export function LegalPage({
  title,
  description,
  updated,
  children,
}: {
  title: string
  description: string
  updated: string
  children: ReactNode
}) {
  return (
    <PageShell title={`${title} — daddIA`} description={description}>
      <article className="max-w-3xl mx-auto px-4 pt-32 pb-24">
        <h1 className="font-syne font-bold text-4xl sm:text-5xl text-[#F0EBF4] tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-[#6B6075]">Dernière mise à jour : {updated}</p>
        <div className="legal mt-12 flex flex-col gap-10 text-[#9A8FA5] leading-relaxed">{children}</div>
      </article>
    </PageShell>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-syne font-bold text-xl text-[#F0EBF4]">{title}</h2>
      {children}
    </section>
  )
}

/** Valeur à renseigner avant la mise en ligne. */
export function ToComplete({ children = "[À COMPLÉTER]" }: { children?: ReactNode }) {
  return <mark className="bg-[#C8103C]/15 text-[#F03068] rounded px-1">{children}</mark>
}
