import { IllustrativeTag } from "@/components/common/IllustrativeTag"
import { BeforeAfter } from "@/components/offer/mockups/BeforeAfter"
import { UsageGallery } from "@/components/offer/mockups/UsageGallery"
import { CardsBlock } from "@/components/offer/mockups/CardsBlock"
import { ChatMockup } from "@/components/offer/mockups/ChatMockup"
import { DashboardMockup } from "@/components/offer/mockups/DashboardMockup"
import { MessageThread } from "@/components/offer/mockups/MessageThread"
import { PrivateAI } from "@/components/offer/mockups/PrivateAI"
import { ReportExcerpt } from "@/components/offer/mockups/ReportExcerpt"
import { SecurityGrid } from "@/components/offer/mockups/SecurityGrid"
import { DurationsTimeline, JourneyTimeline } from "@/components/offer/mockups/Timeline"
import type { VisualBlock as VisualBlockData } from "@/types/offer"

/** Aiguille chaque bloc visuel vers sa maquette HTML/CSS (PRD §8.3). */
export function VisualBlock({ block }: { block: VisualBlockData }) {
  const illustrative = block.type !== "security-grid" && block.type !== "cards"
  const content = (() => {
    switch (block.type) {
      case "report-excerpt":
        return <ReportExcerpt lines={block.lines} bars={block.bars} difficulty={block.difficulty} />
      case "chat":
        return <ChatMockup contact={block.contact} messages={block.messages} />
      case "message-thread":
        return <MessageThread bySector={block.bySector} messages={block.messages} />
      case "dashboard":
        return <DashboardMockup appName={block.appName} widgets={block.widgets} invoices={block.invoices} />
      case "timeline":
        return block.variant === "durations" ? (
          <DurationsTimeline items={block.items} footer={block.footer} />
        ) : (
          <JourneyTimeline items={block.items} />
        )
      case "before-after":
        return <BeforeAfter before={block.before} after={block.after} variant={block.variant} gauge={block.gauge} />
      case "cards":
        return <CardsBlock items={block.items} footer={block.footer} variant={block.variant} />
      case "private-ai":
        return (
          <PrivateAI
            brandName={block.brandName}
            brandInitials={block.brandInitials}
            sources={block.sources}
            suggestions={block.suggestions}
            answers={block.answers}
          />
        )
      case "security-grid":
        return <SecurityGrid items={block.items} footer={block.footer} />
      case "usage-gallery":
        return <UsageGallery intro={block.intro} items={block.items} footer={block.footer} />
    }
  })()
  return (
    <div className="flex flex-col items-center gap-6">
      {content}
      {illustrative && <IllustrativeTag />}
    </div>
  )
}

export function visualTitle(block: VisualBlockData): string | undefined {
  return "title" in block ? block.title : undefined
}
