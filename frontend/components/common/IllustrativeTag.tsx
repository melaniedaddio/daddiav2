/** Mention discrète obligatoire sur chaque scène (PRD §8.3). */
export function IllustrativeTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-[#6B6075] ${className}`}
    >
      <span className="w-1 h-1 rounded-full bg-[#6B6075]" aria-hidden />
      Exemple illustratif
    </span>
  )
}
