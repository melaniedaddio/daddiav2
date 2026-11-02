// Types des pages offres (PRD §8.1).
// Les champs marqués « ajout » complètent le type du PRD pour porter le contenu du §9
// et les scènes visuelles du §8.3 (voir DECISIONS.md).

export type OfferSlug =
  | "audit-ia"
  | "chatbot-ia"
  | "outil-sur-mesure"
  | "assistant-ia"
  | "accompagnement-ia"
  | "ateliers-ia"
export type OfferKind = "ponctuel" | "abonnement"
export type SectorId = "institut" | "immobilier" | "btp" // fil rouge des exemples

/** Nom d'une icône Lucide disponible dans components/common/Icon.tsx */
export type IconName =
  | "AlarmClock"
  | "BarChart3"
  | "BellRing"
  | "BookOpen"
  | "Box"
  | "BrainCircuit"
  | "Building2"
  | "CalendarCheck"
  | "CalendarDays"
  | "ClipboardList"
  | "Clock"
  | "Compass"
  | "Euro"
  | "FileText"
  | "FolderOpen"
  | "GraduationCap"
  | "Hammer"
  | "Inbox"
  | "KeyRound"
  | "Layers"
  | "LayoutDashboard"
  | "Lightbulb"
  | "Lock"
  | "Mail"
  | "MailCheck"
  | "MessageCircle"
  | "MessagesSquare"
  | "Mic"
  | "Moon"
  | "Notebook"
  | "PhoneCall"
  | "Radar"
  | "Repeat"
  | "Rocket"
  | "ScrollText"
  | "Send"
  | "Server"
  | "ShieldCheck"
  | "Sparkles"
  | "Star"
  | "Target"
  | "Timer"
  | "TrendingUp"
  | "UserCheck"
  | "Users"
  | "Wand2"
  | "Wrench"

export interface OfferStep {
  title: string
  desc: string
}

export interface OfferExample {
  sector: SectorId
  title: string // ex. « Institut de beauté, 4 employées »
  before?: string
  /** ajout : libellé du panneau « Après » (ex. « Ce que l'audit identifie ») */
  whatLabel?: string
  what: string // ce que l'offre apporte concrètement
  /** ajout : libellé du résultat (ex. « Gain estimé ») */
  resultLabel?: string
  result?: string // gain estimé ou effet visible
  /** ajout : gros chiffre animé du badge de gain (§8.3) */
  gain?: { value: number; prefix?: string; unit: string }
  /** ajout : icônes de la contrainte (avant) et de la solution (après) */
  beforeIcon?: IconName
  afterIcon?: IconName
  timeline?: { label: string; text: string; icon?: IconName }[] // utilisé par l'Accompagnement (mois 1/2/3)
}

export interface CapabilityGroup {
  icon: IconName
  title: string
  items: string[]
  /** ajout : mini-exemple de message montré au survol de la carte (§8.3) */
  example?: string
}

export type ThreadMessage = {
  time?: string
  from: "user" | "assistant"
  text: string
  /** ajout : note vocale affichée comme une forme d'onde */
  voice?: { duration: string }
  /** ajout : pièce jointe (document ou photos) */
  attachment?: { kind: "document" | "photos"; label: string }
}

export interface ChatMessage {
  from: "client" | "bot"
  text: string
  time?: string
  attachment?: { kind: "document" | "photos"; label: string }
}

export interface PrivateAIAnswer {
  text: string
  sources: string[]
  table?: { columns: string[]; rows: string[][] }
}

export type VisualBlock =
  | {
      type: "report-excerpt"
      title: string
      lines: string[]
      /** ajout : barres comparatives et difficulté */
      bars?: { label: string; text: string; minutes: number }[]
      difficulty?: "faible" | "moyenne" | "forte"
    }
  | { type: "chat"; title?: string; contact?: string; messages: ChatMessage[] }
  | {
      type: "message-thread"
      title?: string
      bySector?: Partial<Record<SectorId, ThreadMessage[]>>
      messages?: ThreadMessage[]
    }
  | {
      type: "dashboard"
      title: string
      appName?: string
      widgets: { label: string; value: string; hint?: string; icon?: IconName }[]
      /** ajout : liste « Factures impayées » */
      invoices?: { client: string; label: string; status: "retard" | "relancee" | "echeance" }[]
    }
  | {
      type: "timeline"
      title: string
      /** ajout : « journey » = frise de jalons, « durations » = barre proportionnelle */
      variant?: "journey" | "durations"
      items: { label: string; title: string; text: string; minutes?: number; icon?: IconName }[]
      footer?: string
    }
  | {
      type: "before-after"
      title: string
      before: { label: string; text: string }
      after: { label: string; text: string }
      /** ajout : rendu en deux téléphones + jauge « Ce qu'il connaît de vous » */
      variant?: "phones" | "panels"
      gauge?: { label: string; items: { label: string; value: number }[] }
    }
  | {
      type: "cards"
      title: string
      items: { title: string; text: string; icon?: IconName }[]
      footer?: string
      /** ajout : « folders » = rendu façon espace de fichiers */
      variant?: "grid" | "folders"
    }
  | {
      type: "private-ai"
      brandName: string
      brandInitials?: string
      sources: { label: string; enabled: boolean }[]
      suggestions: string[]
      messages: { from: "user" | "assistant"; text: string }[]
      /** ajout : réponse illustrative pour chaque suggestion (même index) */
      answers?: PrivateAIAnswer[]
    }
  | {
      type: "security-grid"
      title: string
      items: { icon: IconName; title: string; text: string }[]
      footer?: string
    }
  | {
      /** ajout : galerie d'usages concrets montrés en atelier (Ateliers IA) */
      type: "usage-gallery"
      title: string
      intro?: string
      items: UsageItem[]
      footer?: string
    }

/** ajout : un usage montré en atelier (ce qu'on donne à l'IA, ce qu'on lui demande, ce qu'elle rend) */
export interface UsageItem {
  name: string
  icon: IconName
  color: string
  gives: string[]
  request: string
  result:
    | { kind: "text"; text: string; source?: string }
    | { kind: "slides"; brand: string; slides: { title: string; layout: "cover" | "chart" | "list" }[]; caption: string }
    | { kind: "table"; text?: string; columns: string[]; rows: string[][] }
    | { kind: "chart"; text: string; bars: { label: string; value: number; down?: boolean }[] }
    | { kind: "tones"; options: { label: string; text: string }[] }
}

/** ajout : section éditoriale avec visuel (Assistant IA : « Votre propre ChatGPT », mémoire) */
export interface FeatureSection {
  id: string
  eyebrow?: string
  title: string
  intro?: string
  points: { title: string; text: string }[]
  examplesTitle?: string
  examples?: string[]
  visual?: VisualBlock
  reassurance?: string[]
}

export interface Offer {
  slug: OfferSlug
  kind: OfferKind
  name: string
  subtitle?: string
  duration: string // ex. « 3 à 7 jours ouvrés »
  // Carte de l'accueil
  cardPitch: string
  cardHighlights: [string, string, string]
  // Page détaillée
  hook: string
  forWhom: string[]
  steps: OfferStep[]
  examples: OfferExample[]
  capabilities?: CapabilityGroup[]
  /** ajout */
  featureSections?: FeatureSection[]
  visuals: VisualBlock[]
  included: string[]
  excluded: string[]
  /** ajout : lien éventuel d'une ligne « Non inclus » vers une autre offre */
  excludedLinks?: Partial<Record<number, OfferSlug>>
  compare?: { title: string; rows: { label: string; text: string }[]; note?: string }
  reassurance?: { title: string; items: string[] }
  /** ajout : phrase de financement (Ateliers) */
  financing?: string
  faq: { q: string; a: string }[]
  /** ajout : CTA spécifique (Ateliers) */
  cta?: { label: string; href: string }
  related: OfferSlug[] // 1 ou 2 offres liées, affichées en bas de page
  seo: { title: string; description: string }
}
