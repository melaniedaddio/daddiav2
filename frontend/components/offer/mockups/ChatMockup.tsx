import { RotateCcw } from "lucide-react"
import { useState } from "react"

import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useSequence } from "@/hooks/useSequence"
import type { ChatMessage } from "@/types/offer"

import { Attachment, Bubble, PhoneFrame, TypingIndicator } from "./Phone"

/** Conversation client ↔ assistant dans un cadre de téléphone (Chatbot, PRD §8.3). */
export function ChatMockup({ contact = "Votre assistant", messages }: { contact?: string; messages: ChatMessage[] }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true, threshold: 0.3 })
  const reduced = useReducedMotion()
  const [replay, setReplay] = useState(0)
  const { shown, typing } = useSequence(messages.length, isInView, reduced, (i) => messages[i].from === "bot", replay, 1100)
  const done = shown >= messages.length
  const initials = contact.replace(/^Assistant — /, "").split(/[\s']/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase()

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <PhoneFrame contact={contact} initials={initials || "IA"} bodyClassName="justify-end">
        {messages.slice(0, shown).map((m, i) => (
          <Bubble key={i} side={m.from === "bot" ? "right" : "left"} time={m.time}>
            {m.text && <p>{m.text}</p>}
            {m.attachment && <Attachment kind={m.attachment.kind} label={m.attachment.label} />}
          </Bubble>
        ))}
        {typing && <TypingIndicator side="right" />}
      </PhoneFrame>
      <ul className="sr-only">
        {messages.map((m, i) => (
          <li key={i}>
            {m.from === "bot" ? "Assistant" : "Client"} : {m.text || m.attachment?.label}
          </li>
        ))}
      </ul>
      {!reduced && (
        <button
          type="button"
          onClick={() => setReplay((r) => r + 1)}
          disabled={!done}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 text-xs text-[#9A8FA5] hover:text-[#F0EBF4] disabled:opacity-0 transition-opacity"
        >
          <RotateCcw size={14} aria-hidden /> Rejouer la conversation
        </button>
      )}
    </div>
  )
}
