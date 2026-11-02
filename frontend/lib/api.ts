import { API_BASE } from "@/lib/site"
import type { ContactValues } from "@/lib/contact"

export type ContactResult = { ok: true } | { ok: false; reason: "rate-limit" | "error" }

/** Envoie le formulaire au backend FastAPI : POST ${NEXT_PUBLIC_API_BASE}/contact */
export async function sendContact(values: ContactValues): Promise<ContactResult> {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    if (res.ok) return { ok: true }
    if (res.status === 429) return { ok: false, reason: "rate-limit" }
    return { ok: false, reason: "error" }
  } catch {
    return { ok: false, reason: "error" }
  }
}
