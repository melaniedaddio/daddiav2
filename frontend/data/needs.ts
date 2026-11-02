import type { ChatMessage, IconName, OfferSlug, SectorId, ThreadMessage } from "@/types/offer"

import { accompagnementIa } from "./offres/accompagnement-ia"
import { assistantIa } from "./offres/assistant-ia"
import { auditIa } from "./offres/audit-ia"
import { chatbotIa } from "./offres/chatbot-ia"
import { outilSurMesure } from "./offres/outil-sur-mesure"

// Guide « Quel est votre besoin ? » de l'accueil.
// Les textes des scènes sont repris des fiches offres (contenu validé du §9) : rien n'est dupliqué.

export type NeedScene =
  | { kind: "chat"; contact: string; messages: { side: "left" | "right"; text: string; time?: string }[] }
  | {
      kind: "before-after"
      before: string
      beforeIcon?: IconName
      afterLabel: string
      after: string
      afterIcon?: IconName
      gain?: { value: number; prefix?: string; unit: string }
    }
  | { kind: "timeline"; steps: { label: string; text: string; icon?: IconName }[] }

export interface Need {
  id: string
  label: string
  icon: IconName
  /** La situation dans laquelle le visiteur se reconnaît (« C'est pour vous si… » de l'offre) */
  situation: string
  sector: SectorId
  sceneTitle: string
  scene: NeedScene
  result?: string
  offers: OfferSlug[]
}

const example = <T extends { sector: SectorId }>(list: T[], sector: SectorId): T | undefined =>
  list.find((e) => e.sector === sector)

const chatbotConv: ChatMessage[] = chatbotIa.visuals.flatMap((v) => (v.type === "chat" ? v.messages : []))
const assistantDay: ThreadMessage[] =
  assistantIa.visuals.flatMap((v) => (v.type === "message-thread" ? (v.bySector?.btp ?? []) : []))
const outilBtp = example(outilSurMesure.examples, "btp")
const auditInstitut = example(auditIa.examples, "institut")
const accompInstitut = example(accompagnementIa.examples, "institut")
const chatbotBtp = example(chatbotIa.examples, "btp")

export const needs: Need[] = [
  {
    id: "clients",
    label: "Vos clients attendent des réponses",
    icon: "MessageCircle",
    situation: chatbotIa.forWhom[0],
    sector: "btp",
    sceneTitle: "Un artisan, un soir de semaine",
    scene: {
      kind: "chat",
      contact: "Assistant — Rénov'Azur",
      messages: chatbotConv
        .filter((m) => m.text)
        .slice(0, 4)
        .map((m) => ({ side: m.from === "bot" ? "right" : "left", text: m.text, time: m.time })),
    },
    result: chatbotBtp?.result,
    offers: ["chatbot-ia"],
  },
  {
    id: "administratif",
    label: "Vous êtes noyé sous l'administratif",
    icon: "Inbox",
    situation: assistantIa.forWhom[0],
    sector: "btp",
    sceneTitle: "Karim, artisan BTP, à 7h30",
    scene: {
      kind: "chat",
      contact: "Votre assistant",
      messages: [assistantDay[0], assistantDay[1], assistantDay[4]]
        .filter(Boolean)
        .map((m) => ({ side: m.from === "assistant" ? "right" : "left", text: m.text, time: m.time })),
    },
    result: assistantIa.cardHighlights[2],
    offers: ["assistant-ia"],
  },
  {
    id: "metier",
    label: "Aucun logiciel ne colle à votre métier",
    icon: "Wrench",
    situation: outilSurMesure.forWhom[0],
    sector: "btp",
    sceneTitle: outilBtp?.title ?? "Artisan BTP",
    scene: {
      kind: "before-after",
      before: outilBtp?.before ?? "",
      beforeIcon: outilBtp?.beforeIcon,
      afterLabel: outilBtp?.whatLabel ?? "L'outil",
      after: outilBtp?.what ?? "",
      afterIcon: outilBtp?.afterIcon,
    },
    offers: ["outil-sur-mesure"],
  },
  {
    id: "apprendre",
    label: "Vous voulez apprendre à vous en servir",
    icon: "GraduationCap",
    situation: accompagnementIa.forWhom[0],
    sector: "institut",
    sceneTitle: accompInstitut?.title ?? "Institut de beauté",
    scene: { kind: "timeline", steps: accompInstitut?.timeline ?? [] },
    offers: ["accompagnement-ia", "ateliers-ia"],
  },
  {
    id: "commencer",
    label: "Vous ne savez pas par où commencer",
    icon: "Compass",
    situation: auditIa.forWhom[1],
    sector: "institut",
    sceneTitle: (auditInstitut?.title ?? "Institut de beauté").replace(/\.$/, ""),
    scene: {
      kind: "before-after",
      before: auditInstitut?.before ?? "",
      beforeIcon: auditInstitut?.beforeIcon,
      afterLabel: auditInstitut?.whatLabel ?? "Ce que l'audit identifie",
      after: auditInstitut?.what ?? "",
      afterIcon: auditInstitut?.afterIcon,
      gain: auditInstitut?.gain,
    },
    result: auditInstitut?.result,
    offers: ["audit-ia"],
  },
]
