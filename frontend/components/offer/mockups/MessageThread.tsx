import { motion, useScroll, useTransform } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useRef } from "react"

import { SectorTabs } from "@/components/offer/SectorTabs"
import { SECTORS } from "@/data/offres"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useSector } from "@/hooks/useSessionSector"
import { useSequence } from "@/hooks/useSequence"
import type { SectorId, ThreadMessage } from "@/types/offer"

import { Attachment, Bubble, PhoneFrame, TypingIndicator, VoiceNote } from "./Phone"

function Thread({ messages, sector }: { messages: ThreadMessage[]; sector: SectorId }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true, threshold: 0.25 })
  const reduced = useReducedMotion()
  const { shown, typing } = useSequence(messages.length, isInView, reduced, (i) => messages[i].from === "assistant", sector, 900)

  return (
    <div ref={ref}>
      <PhoneFrame contact="Votre assistant" initials="IA" status="en ligne · disponible 24h/24" bodyClassName="justify-start overflow-y-hidden">
        {messages.slice(0, shown).map((m, i) => {
          const prevTime = i > 0 ? messages[i - 1].time : undefined
          const hour = m.time?.split("h")[0]
          const newBlock = !prevTime || prevTime.split("h")[0] !== hour
          return (
            <div key={`${sector}-${i}`} className="flex flex-col gap-2">
              {newBlock && m.time && (
                <span className="self-center rounded-full bg-[#18121A] border border-white/5 px-2.5 py-0.5 text-[10px] text-[#9A8FA5]">
                  {m.time}
                </span>
              )}
              <Bubble side={m.from === "assistant" ? "right" : "left"} time={m.time}>
                {m.voice ? <VoiceNote duration={m.voice.duration} caption={m.text} /> : <p>{m.text}</p>}
                {m.attachment && <Attachment kind={m.attachment.kind} label={m.attachment.label} />}
              </Bubble>
            </div>
          )
        })}
        {typing && <TypingIndicator side="right" />}
      </PhoneFrame>
      <ol className="sr-only">
        {messages.map((m, i) => (
          <li key={i}>
            {m.time} — {m.from === "assistant" ? "Assistant" : SECTORS[sector].persona} : {m.text}
          </li>
        ))}
      </ol>
    </div>
  )
}

/** « Une journée avec votre assistant » : ligne du temps verticale + conversation (PRD §8.3). */
export function MessageThread({
  bySector,
  messages,
}: {
  bySector?: Partial<Record<SectorId, ThreadMessage[]>>
  messages?: ThreadMessage[]
}) {
  const [sector] = useSector()
  const reduced = useReducedMotion()
  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 0.8", "end 0.4"] })
  const sunTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const sunColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#F5A524", "#FFD166", "#F0703A"])
  const list = bySector?.[sector] ?? messages ?? []
  const first = list[0]?.time ?? "7h30"
  const last = list[list.length - 1]?.time ?? "18h00"

  return (
    <div className="flex flex-col items-center gap-8 w-full min-w-0">
      {bySector && <SectorTabs />}
      <div className="flex items-stretch gap-3 sm:gap-8 w-full min-w-0 justify-center">
        {/* Ligne du temps : le soleil avance de 7h30 à 18h00 pendant le scroll */}
        <div ref={railRef} className="relative w-12 sm:w-16 shrink-0 flex flex-col items-center py-6" aria-hidden>
          <span className="text-[11px] font-semibold text-[#F0EBF4] tabular-nums">{first}</span>
          <div className="relative flex-1 w-px my-3 bg-gradient-to-b from-[#F5A524]/50 via-[#C8103C]/40 to-[#7A28B8]/40">
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                top: reduced ? "50%" : sunTop,
                background: "radial-gradient(circle, rgba(245,165,36,0.35) 0%, transparent 70%)",
              }}
            >
              <motion.span style={{ color: sunColor }}>
                <Sun size={22} />
              </motion.span>
            </motion.div>
          </div>
          <span className="text-[11px] font-semibold text-[#F0EBF4] tabular-nums">{last}</span>
          <Moon size={14} className="mt-2 text-[#7A28B8]" />
        </div>
        <div className="flex-1 min-w-0 max-w-[360px]">
          <Thread key={sector} messages={list} sector={sector} />
        </div>
      </div>
    </div>
  )
}
