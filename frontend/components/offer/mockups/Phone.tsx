import { CheckCheck, ChevronLeft, FileText, ImageIcon, Mic, Paperclip, Play, Plus, Send } from "lucide-react"
import type { ReactNode } from "react"

/** Cadre de téléphone en CSS : encoche, barre d'état, en-tête de contact (PRD §8.3). */
export function PhoneFrame({
  contact,
  initials,
  color = "#C8103C",
  status = "en ligne",
  children,
  className = "",
  bodyClassName = "",
}: {
  contact: string
  initials: string
  color?: string
  status?: string
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <div
      className={`relative w-full max-w-[360px] mx-auto rounded-[2.5rem] p-[10px] ${className}`}
      style={{
        background: "linear-gradient(160deg, #241828 0%, #0A0408 100%)",
        boxShadow:
          "inset 0 0 0 1px rgba(200,16,60,0.18), 0 40px 80px -15px rgba(0,0,0,0.9), 0 15px 25px -5px rgba(200,16,60,0.12)",
      }}
    >
      <div className="relative rounded-[2rem] overflow-hidden bg-[#0B080C] flex flex-col min-h-[560px]">
        {/* Encoche */}
        <div className="absolute left-1/2 top-2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-20" aria-hidden />
        {/* Barre d'état */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-[#F0EBF4]" aria-hidden>
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] rounded-sm bg-[#F0EBF4]" style={{ height: h }} />
              ))}
            </span>
            <span className="ml-1 w-5 h-2.5 rounded-[3px] border border-[#F0EBF4]/70 p-[1px]">
              <span className="block h-full w-3/4 rounded-[1px] bg-[#F0EBF4]" />
            </span>
          </span>
        </div>
        {/* En-tête du contact */}
        <div className="flex items-center gap-3 px-3 py-2.5 bg-[#18121A] border-b border-white/5">
          <ChevronLeft size={18} className="text-[#9A8FA5]" aria-hidden />
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: color }}
            aria-hidden
          >
            {initials}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#F0EBF4] truncate">{contact}</p>
            <p className="text-[11px] text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden />
              {status}
            </p>
          </div>
        </div>
        {/* Conversation */}
        <div
          className={`flex-1 overflow-hidden px-3 py-3 flex flex-col gap-2 ${bodyClassName}`}
          style={{
            backgroundColor: "#0F0B0F",
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), radial-gradient(rgba(200,16,60,0.03) 1px, transparent 1px)",
            backgroundSize: "18px 18px, 26px 26px",
            backgroundPosition: "0 0, 9px 13px",
          }}
        >
          {children}
        </div>
        {/* Zone de saisie (décorative) */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-[#18121A] border-t border-white/5" aria-hidden>
          <Plus size={18} className="text-[#6B6075]" />
          <div className="flex-1 h-8 rounded-full bg-[#0F0B0F] border border-white/5 px-3 flex items-center text-[11px] text-[#6B6075]">
            Message
          </div>
          <span className="w-8 h-8 rounded-full bg-[#C8103C] flex items-center justify-center">
            <Mic size={14} className="text-white" />
          </span>
        </div>
      </div>
    </div>
  )
}

/** Bulle façon WhatsApp : à gauche en gris, à droite en accent. */
export function Bubble({
  side,
  time,
  children,
}: {
  side: "left" | "right"
  time?: string
  children: ReactNode
}) {
  const right = side === "right"
  return (
    <div className={`flex ${right ? "justify-end" : "justify-start"}`} style={{ animation: "sectorFade 0.3s ease" }}>
      <div
        className={`relative max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-snug shadow-[0_2px_6px_rgba(0,0,0,0.35)] ${
          right
            ? "rounded-tr-md bg-gradient-to-b from-[#9E1236] to-[#7E0E2B] text-white"
            : "rounded-tl-md bg-[#241C27] text-[#E6DFEB]"
        }`}
      >
        {children}
        {time && (
          <span className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${right ? "text-white/60" : "text-[#9A8FA5]"}`}>
            {time}
            {right && <CheckCheck size={12} aria-hidden className="text-sky-300" />}
          </span>
        )}
      </div>
    </div>
  )
}

/** Indicateur « en train d'écrire… » (trois points animés). */
export function TypingIndicator({ side = "right" }: { side?: "left" | "right" }) {
  const right = side === "right"
  return (
    <div className={`flex ${right ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-center gap-1 rounded-2xl px-3 py-2.5 ${right ? "bg-[#7E0E2B]/70" : "bg-[#241C27]"}`}
        role="status"
        aria-label="en train d'écrire"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="typing-dot w-1.5 h-1.5 rounded-full bg-white/80"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

const WAVE = [6, 10, 14, 9, 16, 20, 12, 7, 14, 18, 22, 15, 9, 12, 19, 14, 8, 11, 17, 13, 7, 10, 15, 9, 6, 11]

/** Note vocale : forme d'onde + durée. */
export function VoiceNote({ duration, caption }: { duration: string; caption?: string }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-[190px]">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
          <Play size={12} className="ml-0.5" aria-hidden />
        </span>
        <div className="flex items-center gap-[2px] h-6 flex-1" aria-hidden>
          {WAVE.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-current opacity-70 origin-center"
              style={{ height: h, animation: `wave 1.2s ${i * 0.05}s ease-in-out infinite` }}
            />
          ))}
        </div>
        <span className="text-[10px] opacity-70 tabular-nums">{duration}</span>
      </div>
      {caption && <span className="text-[11px] opacity-80">🎙️ {caption}</span>}
    </div>
  )
}

/** Pièce jointe : carte de document ou vignettes de photos. */
export function Attachment({ kind, label }: { kind: "document" | "photos"; label: string }) {
  if (kind === "photos") {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex gap-1.5">
          {["from-[#5B4A3A] to-[#2A211B]", "from-[#3E4A57] to-[#1C2229]"].map((g) => (
            <span key={g} className={`w-20 h-16 rounded-lg bg-gradient-to-br ${g} flex items-center justify-center`}>
              <ImageIcon size={16} className="text-white/50" aria-hidden />
            </span>
          ))}
        </div>
        <span className="text-[10px] opacity-70 flex items-center gap-1">
          <Paperclip size={10} aria-hidden /> {label}
        </span>
      </div>
    )
  }
  return (
    <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-black/25 border border-white/10 px-2.5 py-2">
      <span className="w-8 h-9 rounded bg-white/90 flex items-center justify-center shrink-0">
        <FileText size={14} className="text-[#C8103C]" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-medium truncate">{label}</span>
        <span className="block text-[9px] opacity-60">PDF · 1 page</span>
      </span>
    </div>
  )
}

export function SendIcon() {
  return <Send size={14} aria-hidden />
}
