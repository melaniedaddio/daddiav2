import type { ReactNode } from "react"

import { SectionHeader } from "@/components/common/SectionHeader"

/** Section d'une page offre : rythme py-24 px-4, fonds alternés (PRD §3.4). */
export function OfferSection({
  id,
  tone,
  eyebrow,
  title,
  subtitle,
  width = "max-w-6xl",
  children,
}: {
  id: string
  tone: "primary" | "secondary"
  eyebrow?: string
  title?: string
  subtitle?: ReactNode
  width?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-titre` : undefined}
      className={`py-24 px-4 ${tone === "secondary" ? "bg-[#0F0B0F]" : "bg-[#070407]"}`}
    >
      <div className={`${width} mx-auto`}>
        {title && (
          <SectionHeader id={`${id}-titre`} eyebrow={eyebrow} title={title} subtitle={subtitle} className="mb-14" />
        )}
        {children}
      </div>
    </section>
  )
}
