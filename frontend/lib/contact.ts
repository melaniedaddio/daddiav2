import { z } from "zod"

// PRD §7.7
export const OFFER_IDS = ["audit-ia", "chatbot-ia", "outil-sur-mesure", "assistant-ia", "accompagnement-ia", "ateliers-ia", "autre"] as const
export type OfferId = (typeof OFFER_IDS)[number]

export const OFFER_OPTIONS: { value: OfferId; label: string }[] = [
  { value: "audit-ia", label: "Audit IA" },
  { value: "chatbot-ia", label: "Chatbot IA personnalisé" },
  { value: "outil-sur-mesure", label: "Votre outil sur mesure" },
  { value: "assistant-ia", label: "Votre assistant IA" },
  { value: "accompagnement-ia", label: "Accompagnement IA" },
  { value: "ateliers-ia", label: "Ateliers IA" },
  { value: "autre", label: "Autre / Je ne sais pas encore" },
]

export function isOfferId(value: string): value is OfferId {
  return (OFFER_IDS as readonly string[]).includes(value)
}

export const contactSchema = z.object({
  nom: z.string().trim().min(2, "Nom requis").max(100),
  entreprise: z.string().trim().min(1, "Entreprise requise").max(150),
  email: z.string().trim().email("Email invalide").max(254),
  offre: z.enum(OFFER_IDS),
  message: z.string().trim().min(10, "Message trop court").max(3000),
  consentement: z.literal(true, { errorMap: () => ({ message: "Merci d'accepter pour qu'on puisse vous répondre" }) }),
  website: z.string().max(0).optional(), // champ piège anti-spam, caché en CSS, jamais affiché
})

export type ContactInput = z.input<typeof contactSchema>
export type ContactValues = z.output<typeof contactSchema>
