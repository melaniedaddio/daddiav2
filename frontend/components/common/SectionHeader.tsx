import type { ReactNode } from "react"

import { FadeUp } from "@/components/common/FadeUp"
import { SplitReveal } from "@/components/common/SplitReveal"

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-medium tracking-widest uppercase text-[#C8103C]">{children}</span>
  )
}

/** En-tête de section de la maquette : surtitre, H2 révélé, sous-titre. */
export function SectionHeader({
  eyebrow,
  title,
  accent,
  subtitle,
  subtitleClassName = "max-w-xl text-lg",
  className = "mb-16",
  id,
}: {
  eyebrow?: string
  title: ReactNode
  accent?: ReactNode
  subtitle?: ReactNode
  subtitleClassName?: string
  className?: string
  id?: string
}) {
  return (
    <div className={`flex flex-col items-center gap-4 text-center ${className}`}>
      {eyebrow && (
        <FadeUp>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
        </FadeUp>
      )}
      <SplitReveal className="w-full">
        <h2 id={id} className="font-syne font-bold text-4xl sm:text-5xl text-[#F0EBF4] leading-tight">
          {title}
          {accent && (
            <>
              <br />
              <span className="text-[#C8103C]">{accent}</span>
            </>
          )}
        </h2>
      </SplitReveal>
      {subtitle && (
        <FadeUp delay={0.1}>
          <p className={`text-[#9A8FA5] leading-relaxed mx-auto ${subtitleClassName}`}>{subtitle}</p>
        </FadeUp>
      )}
    </div>
  )
}
