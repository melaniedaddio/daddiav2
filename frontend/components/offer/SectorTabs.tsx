import { type KeyboardEvent, useRef } from "react"

import { Icon } from "@/components/common/Icon"
import { SECTOR_ORDER, SECTORS } from "@/data/offres"
import { useSector } from "@/hooks/useSessionSector"

/** Onglets Institut / Immobilier / Artisan BTP, partagés par toutes les scènes de la page (sessionStorage). */
export function SectorTabs({ controls }: { controls?: string }) {
  const [sector, setSector] = useSector()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = SECTOR_ORDER.indexOf(sector)
    let next = -1
    if (e.key === "ArrowRight") next = (i + 1) % SECTOR_ORDER.length
    if (e.key === "ArrowLeft") next = (i - 1 + SECTOR_ORDER.length) % SECTOR_ORDER.length
    if (next < 0) return
    e.preventDefault()
    setSector(SECTOR_ORDER[next])
    refs.current[next]?.focus()
  }

  return (
    <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
      <div role="tablist" aria-label="Choisissez un secteur" onKeyDown={onKey} className="flex gap-3 sm:justify-center w-max sm:w-auto mx-auto">
        {SECTOR_ORDER.map((id, i) => {
          const s = SECTORS[id]
          const active = id === sector
          return (
            <button
              key={id}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={controls}
              tabIndex={active ? 0 : -1}
              onClick={() => setSector(id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 min-h-[44px] rounded-full text-sm font-medium border transition-all duration-200 ${
                active
                  ? "bg-[#C8103C]/10 border-[#C8103C]/40 text-[#F03068]"
                  : "border-white/10 text-[#9A8FA5] hover:border-white/20 hover:text-[#F0EBF4]"
              }`}
            >
              <Icon name={s.icon} size={14} />
              {s.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
