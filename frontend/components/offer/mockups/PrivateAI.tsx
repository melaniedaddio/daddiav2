import { AnimatePresence, motion } from "framer-motion"
import { Check, Lock, PanelLeft, Plus, Send, Upload, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { PrivateAIAnswer } from "@/types/offer"

type Source = { label: string; enabled: boolean }

function SourcesList({ sources }: { sources: Source[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {sources.map((s) => (
        <li
          key={s.label}
          className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-xs ${s.enabled ? "text-[#F0EBF4] bg-white/[0.03]" : "text-[#6B6075]"}`}
        >
          <span className="flex items-center gap-2">
            {!s.enabled && <Lock size={12} aria-hidden />}
            {s.label}
            <span className="sr-only">{s.enabled ? " : accès autorisé" : " : non autorisée"}</span>
          </span>
          <span
            aria-hidden
            className={`relative w-8 h-[18px] rounded-full transition-colors ${s.enabled ? "bg-[#2BB673]" : "bg-white/10"}`}
          >
            <span className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow transition-all ${s.enabled ? "left-[16px]" : "left-[2px] opacity-60"}`} />
          </span>
        </li>
      ))}
    </ul>
  )
}

function LearnDialog({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])
  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="learn-title"
        initial={{ y: 16, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 8, scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#18121A] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center justify-between">
          <h4 id="learn-title" className="font-syne font-bold text-[#F0EBF4]">
            Apprendre quelque chose
          </h4>
          <button type="button" onClick={onClose} aria-label="Fermer" className="p-2 -mr-2 text-[#9A8FA5] hover:text-[#F0EBF4]">
            <X size={16} aria-hidden />
          </button>
        </div>
        {saved ? (
          <p className="mt-6 mb-2 flex items-center gap-2 text-sm text-[#2BB673]" role="status">
            <Check size={16} aria-hidden /> C&apos;est noté. Je m&apos;en servirai dans mes prochaines réponses.
          </p>
        ) : (
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              setSaved(true)
            }}
          >
            <div className="rounded-xl border-2 border-dashed border-white/10 px-4 py-6 flex flex-col items-center gap-2 text-center">
              <Upload size={20} className="text-[#C8103C]" aria-hidden />
              <span className="text-xs text-[#9A8FA5]">Déposez un document ici (tarifs, contrat type, procédure…)</span>
            </div>
            <label htmlFor="learn-input" className="text-xs text-[#9A8FA5]">
              Ou écrivez-le simplement
            </label>
            <input
              ref={inputRef}
              id="learn-input"
              defaultValue="Retiens que… "
              className="bg-[#0F0B0F] border border-white/10 rounded-lg h-11 px-3 text-sm text-[#F0EBF4] focus:border-[#C8103C]/50 focus:outline-none"
            />
            <button type="submit" className="min-h-[44px] rounded-lg bg-[#C8103C] hover:bg-[#F03068] text-white text-sm font-medium transition-colors">
              Retenir
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

/** Interface privée « à votre nom » façon ChatGPT (Assistant IA, PRD §8.3). */
export function PrivateAI({
  brandName,
  brandInitials = "IA",
  sources,
  suggestions,
  answers = [],
}: {
  brandName: string
  brandInitials?: string
  sources: Source[]
  suggestions: string[]
  answers?: PrivateAIAnswer[]
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true, threshold: 0.3 })
  const reduced = useReducedMotion()
  const [current, setCurrent] = useState(1)
  const [run, setRun] = useState(0)
  const [animPhase, setPhase] = useState<"idle" | "question" | "thinking" | "answer">("idle")
  const [drawer, setDrawer] = useState(false)
  const [learn, setLearn] = useState(false)

  useEffect(() => {
    if (!isInView || reduced) return
    const t0 = window.setTimeout(() => setPhase("question"), 0)
    const t1 = window.setTimeout(() => setPhase("thinking"), 600)
    const t2 = window.setTimeout(() => setPhase("answer"), 1700)
    return () => {
      window.clearTimeout(t0)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [isInView, reduced, run, current])

  const ask = (i: number) => {
    setCurrent(i)
    setRun((r) => r + 1)
  }

  const phase = reduced && isInView ? "answer" : animPhase
  const answer = answers[current]
  const enabledCount = sources.filter((s) => s.enabled).length

  return (
    <div ref={ref} className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#0B080C] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_20px_40px_-20px_rgba(200,16,60,0.15)]">
      {/* Barre de titre */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#18121A] border-b border-white/5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </span>
        <span className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-6 h-6 rounded-md bg-gradient-to-br from-[#D98A1E] to-[#B4531A] text-[10px] font-bold text-white flex items-center justify-center" aria-hidden>
            {brandInitials}
          </span>
          <span className="text-xs font-semibold text-[#F0EBF4]">{brandName}</span>
        </span>
        <button
          type="button"
          onClick={() => setDrawer(true)}
          className="md:hidden ml-auto flex items-center gap-1.5 min-h-[36px] px-2 rounded-md text-[11px] text-[#9A8FA5] border border-white/10"
          aria-expanded={drawer}
          aria-controls="pai-sources"
        >
          <PanelLeft size={14} aria-hidden /> Sources ({enabledCount})
        </button>
      </div>

      <div className="relative flex min-h-[520px]">
        {/* Barre latérale (tiroir sur mobile) */}
        <aside className="hidden md:block w-60 shrink-0 border-r border-white/5 bg-[#0F0B0F] p-4">
          <p className="text-[10px] uppercase tracking-widest text-[#9A8FA5] mb-3">Sources connectées</p>
          <SourcesList sources={sources} />
        </aside>
        <AnimatePresence>
          {drawer && (
            <motion.aside
              id="pai-sources"
              className="md:hidden absolute inset-y-0 left-0 z-20 w-64 border-r border-white/10 bg-[#0F0B0F] p-4 shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-widest text-[#9A8FA5]">Sources connectées</p>
                <button type="button" onClick={() => setDrawer(false)} aria-label="Fermer les sources" className="p-2 -mr-2 text-[#9A8FA5]">
                  <X size={16} aria-hidden />
                </button>
              </div>
              <SourcesList sources={sources} />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Conversation */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4" aria-live="polite">
            {phase !== "idle" && (
              <motion.div key={`q-${run}-${current}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="self-end max-w-[85%] rounded-2xl rounded-tr-md bg-[#241C27] px-4 py-2.5 text-sm text-[#F0EBF4]">
                {suggestions[current]}
              </motion.div>
            )}
            {phase === "thinking" && (
              <div className="flex items-center gap-1 px-1" role="status" aria-label="en train d'écrire">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-[#F03068]" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            )}
            {phase === "answer" && answer && (
              <motion.div key={`a-${run}-${current}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 max-w-[95%]">
                <span className="w-7 h-7 rounded-md bg-gradient-to-br from-[#D98A1E] to-[#B4531A] text-[10px] font-bold text-white flex items-center justify-center shrink-0" aria-hidden>
                  {brandInitials}
                </span>
                <div className="flex flex-col gap-3 min-w-0">
                  <p className="text-sm text-[#E6DFEB] leading-relaxed">{answer.text}</p>
                  {answer.table && (
                    <div className="overflow-x-auto rounded-lg border border-white/10">
                      <table className="w-full text-xs">
                        <thead className="bg-white/5 text-[#9A8FA5]">
                          <tr>
                            {answer.table.columns.map((c) => (
                              <th key={c} scope="col" className="text-left font-medium px-3 py-2">
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {answer.table.rows.map((r) => (
                            <tr key={r.join("|")} className="border-t border-white/5 text-[#F0EBF4]">
                              {r.map((cell, ci) => (
                                <td key={ci} className="px-3 py-2 whitespace-nowrap">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {answer.sources.map((s) => (
                      <span key={s} className="text-[11px] rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[#9A8FA5]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Saisie + suggestions */}
          <div className="border-t border-white/5 p-3 sm:p-4 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Exemples de questions">
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(i)}
                  aria-pressed={i === current}
                  className={`text-left text-[11px] sm:text-xs rounded-full border px-3 py-1.5 min-h-[32px] transition-colors ${
                    i === current
                      ? "border-[#C8103C]/40 bg-[#C8103C]/10 text-[#F03068]"
                      : "border-white/10 text-[#9A8FA5] hover:border-white/20 hover:text-[#F0EBF4]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLearn(true)}
                className="shrink-0 flex items-center gap-1.5 min-h-[40px] px-3 rounded-lg border border-[#C8103C]/30 bg-[#C8103C]/10 text-xs font-medium text-[#F03068] hover:bg-[#C8103C]/20 transition-colors"
              >
                <Plus size={14} aria-hidden /> Apprendre quelque chose
              </button>
              <div className="flex-1 min-w-0 h-10 rounded-lg bg-[#0F0B0F] border border-white/10 px-3 flex items-center justify-between text-xs text-[#6B6075]" aria-hidden>
                <span className="truncate">Posez votre question…</span>
                <Send size={14} className="text-[#C8103C] shrink-0" />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>{learn && <LearnDialog onClose={() => setLearn(false)} />}</AnimatePresence>
      </div>
    </div>
  )
}
