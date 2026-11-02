export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://daddia.fr").replace(/\/$/, "")
export const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL ?? "https://cal.com/daddia/decouverte"
export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "/api").replace(/\/$/, "")
export const CONTACT_EMAIL = "contact@daddia.fr"

// PRD §17 #6 : liens en attente, « # » tant qu'ils ne sont pas fournis.
export const SOCIAL_LINKS = {
  linkedin: "#", // CHANGE_ME : URL de la page LinkedIn
  youtube: "#", // CHANGE_ME : URL de la chaîne YouTube
}

export const NAV_LINKS = [
  { label: "Offres", id: "offres" },
  { label: "L'IA pour vous", id: "ia-pour-vous" },
  { label: "Comment ça marche", id: "processus" },
  { label: "FAQ", id: "faq" },
] as const

export function contactHref(slug?: string): string {
  return slug ? `/#contact?offre=${slug}` : "/#contact"
}
