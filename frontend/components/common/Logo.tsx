/** Wordmark texte : « dadd » + « IA » en crimson. Toujours écrit « daddIA ». */
export function Logo({ className = "text-2xl" }: { className?: string }) {
  return (
    <span className={`font-syne font-extrabold tracking-tight ${className}`}>
      <span className="text-[#F0EBF4]">dadd</span>
      <span className="text-[#C8103C]">IA</span>
    </span>
  )
}
