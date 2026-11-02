import type { GetStaticPaths, GetStaticProps } from "next"
import type { ReactNode } from "react"

import { CapabilityGrid } from "@/components/offer/CapabilityGrid"
import { CompareCallout } from "@/components/offer/CompareCallout"
import { ExampleTabs } from "@/components/offer/ExampleTabs"
import { FeatureSection } from "@/components/offer/FeatureSection"
import { ForWhom } from "@/components/offer/ForWhom"
import { IncludedExcluded } from "@/components/offer/IncludedExcluded"
import { OfferCTA } from "@/components/offer/OfferCTA"
import { OfferFAQ } from "@/components/offer/OfferFAQ"
import { OfferHero } from "@/components/offer/OfferHero"
import { OfferSection } from "@/components/offer/OfferSection"
import { OfferSteps } from "@/components/offer/OfferSteps"
import { Reassurance } from "@/components/offer/Reassurance"
import { VisualBlock } from "@/components/offer/VisualBlock"
import { PageShell } from "@/components/layout/PageShell"
import { getOfferBySlug, OFFER_SLUGS } from "@/data/offres"
import { SectorContext, useSessionSectorState } from "@/hooks/useSessionSector"
import type { Offer, OfferSlug, VisualBlock as VisualBlockData } from "@/types/offer"

type Props = { slug: OfferSlug }

type Block = { id: string; eyebrow?: string; title?: string; subtitle?: ReactNode; width?: string; node: ReactNode }

/** Construit la liste ordonnée des sections (PRD §8.2) ; chaque bloc est optionnel. */
function buildBlocks(offer: Offer): Block[] {
  const blocks: Block[] = []
  const journey = offer.examples.some((e) => e.timeline)
    ? offer.visuals.find((v): v is Extract<VisualBlockData, { type: "timeline" }> => v.type === "timeline" && v.variant === "journey")
    : undefined
  const visuals = offer.visuals.filter((v) => v !== journey)

  if (offer.forWhom.length)
    blocks.push({ id: "pour-vous", eyebrow: "Pour qui ?", title: "C'est pour vous si…", node: <ForWhom items={offer.forWhom} /> })
  if (offer.steps.length)
    blocks.push({
      id: "deroulement",
      eyebrow: "Le déroulé",
      title: "Comment ça se passe",
      node: <OfferSteps steps={offer.steps} duration={offer.duration} />,
    })
  if (offer.capabilities?.length)
    blocks.push({
      id: "capacites",
      eyebrow: "Ce qu'il fait pour vous",
      title: "Un assistant, plein de missions",
      node: <CapabilityGrid groups={offer.capabilities} />,
    })
  for (const s of offer.featureSections ?? [])
    blocks.push({ id: s.id, eyebrow: s.eyebrow, title: s.title, node: <FeatureSection section={s} /> })
  if (offer.examples.length)
    blocks.push({
      id: "exemples",
      eyebrow: "Mises en situation",
      title: "Exemples de situations",
      subtitle: "Exemples illustratifs, pour vous aider à vous projeter.",
      width: "max-w-5xl",
      node: <ExampleTabs examples={offer.examples} journey={journey} />,
    })
  visuals.forEach((v, i) =>
    blocks.push({
      id: `visuel-${i + 1}`,
      eyebrow: v.type === "security-grid" ? "Sécurité" : v.type === "usage-gallery" ? "En pratique" : "En images",
      title: "title" in v ? v.title : undefined,
      node: <VisualBlock block={v} />,
    }),
  )
  blocks.push({
    id: "inclus",
    eyebrow: "Sans surprise",
    title: "Ce qui est inclus",
    width: "max-w-5xl",
    node: (
      <IncludedExcluded
        included={offer.included}
        excluded={offer.excluded}
        excludedLinks={offer.excludedLinks}
        financing={offer.financing}
      />
    ),
  })
  if (offer.compare || offer.reassurance)
    blocks.push({
      id: "reperes",
      width: "max-w-5xl",
      node: (
        <div className="flex flex-col gap-6">
          {offer.reassurance && <Reassurance reassurance={offer.reassurance} />}
          {offer.compare && <CompareCallout compare={offer.compare} />}
        </div>
      ),
    })
  if (offer.faq.length)
    blocks.push({ id: "faq-offre", eyebrow: "Questions fréquentes", title: "Vos questions", node: <OfferFAQ faq={offer.faq} /> })
  return blocks
}

export default function OfferPage({ slug }: Props) {
  const sectorState = useSessionSectorState()
  const offer = getOfferBySlug(slug)
  if (!offer) return null
  const blocks = buildBlocks(offer)
  return (
    <PageShell title={offer.seo.title} description={offer.seo.description}>
      <SectorContext.Provider value={sectorState}>
        <OfferHero offer={offer} />
        {blocks.map((b, i) => (
          <OfferSection
            key={b.id}
            id={b.id}
            tone={i % 2 === 0 ? "secondary" : "primary"}
            eyebrow={b.eyebrow}
            title={b.title}
            subtitle={b.subtitle}
            width={b.width}
          >
            {b.node}
          </OfferSection>
        ))}
        <OfferCTA offer={offer} />
      </SectorContext.Provider>
    </PageShell>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: OFFER_SLUGS.map((slug) => ({ params: { slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const offer = getOfferBySlug(String(params?.slug ?? ""))
  if (!offer) return { notFound: true }
  return { props: { slug: offer.slug } }
}
