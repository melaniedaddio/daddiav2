import { SECTORS } from "@/data/offres"
import type { SectorId } from "@/types/offer"

/** Mini-avatar : initiales dans un cercle coloré (personnage illustratif du secteur). */
export function Avatar({ sector, size = 40 }: { sector: SectorId; size?: number }) {
  const s = SECTORS[sector]
  return (
    <span
      className="rounded-full flex items-center justify-center font-syne font-bold text-white shrink-0 ring-2 ring-white/10"
      style={{ width: size, height: size, background: s.color, fontSize: size * 0.4 }}
      aria-hidden
    >
      {s.initials}
    </span>
  )
}
