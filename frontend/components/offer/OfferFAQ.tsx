import { Accordion } from "@/components/common/Accordion"
import type { Offer } from "@/types/offer"

export function OfferFAQ({ faq }: { faq: Offer["faq"] }) {
  return <Accordion items={faq} className="max-w-3xl mx-auto" />
}
