import { ChevronDown } from "lucide-react"
import { useId, useState } from "react"

// Accordéon de la maquette : une seule question ouverte à la fois, ouverture par grid-template-rows.
export function Accordion({
  items,
  className = "",
}: {
  items: { q: string; a: string }[]
  className?: string
}) {
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {items.map((it, i) => {
        const isOpen = open === i
        const btnId = `${baseId}-q-${i}`
        const panelId = `${baseId}-a-${i}`
        return (
          <div
            key={it.q}
            className="bg-[#18121A] border border-white/7 rounded-xl px-6 hover:border-white/15 transition-colors"
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full min-h-[44px] flex items-center justify-between gap-4 py-5 text-left font-syne font-semibold text-[#F0EBF4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8103C]/60 rounded-md"
              >
                <span className="flex-1">{it.q}</span>
                <ChevronDown
                  size={18}
                  aria-hidden
                  className={`text-[#C8103C] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.3s ease",
              }}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="text-[#9A8FA5] leading-relaxed pb-5">{it.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
