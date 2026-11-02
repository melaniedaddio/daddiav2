import type { IconName, Offer, OfferSlug, SectorId } from "@/types/offer"

import { accompagnementIa } from "./accompagnement-ia"
import { assistantIa } from "./assistant-ia"
import { ateliersIa } from "./ateliers-ia"
import { auditIa } from "./audit-ia"
import { chatbotIa } from "./chatbot-ia"
import { outilSurMesure } from "./outil-sur-mesure"

/** Ordre d'affichage sur l'accueil (2 rangées de 3). */
export const offers: Offer[] = [
  auditIa,
  chatbotIa,
  outilSurMesure,
  assistantIa,
  accompagnementIa,
  ateliersIa,
]

export const OFFER_SLUGS: OfferSlug[] = offers.map((o) => o.slug)

/** Noms courts (pied de page). */
export const OFFER_SHORT_NAMES: Record<OfferSlug, string> = {
  "audit-ia": "Audit IA",
  "chatbot-ia": "Chatbot",
  "outil-sur-mesure": "Outil sur mesure",
  "assistant-ia": "Assistant IA",
  "accompagnement-ia": "Accompagnement",
  "ateliers-ia": "Ateliers",
}

/** L'offre mise en avant sur l'accueil (PRD §7.4). */
export const FEATURED_OFFER: OfferSlug = "audit-ia"

export function getOfferBySlug(slug: string): Offer | undefined {
  return offers.find((o) => o.slug === slug)
}

export function isOfferSlug(value: string): value is OfferSlug {
  return (OFFER_SLUGS as string[]).includes(value)
}

/** Fil rouge des exemples : les trois secteurs et leurs personnages (illustratifs). */
export const SECTORS: Record<
  SectorId,
  { label: string; icon: IconName; persona: string; initials: string; color: string }
> = {
  institut: {
    label: "Institut de beauté",
    icon: "Sparkles",
    persona: "Sophie",
    initials: "S",
    color: "#D9467A",
  },
  immobilier: {
    label: "Agence immobilière",
    icon: "Building2",
    persona: "Marc",
    initials: "M",
    color: "#2460D8",
  },
  btp: {
    label: "Artisan BTP",
    icon: "Hammer",
    persona: "Karim",
    initials: "K",
    color: "#D98A1E",
  },
}

export const SECTOR_ORDER: SectorId[] = ["institut", "immobilier", "btp"]
