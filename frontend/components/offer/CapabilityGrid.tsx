import { FadeUp } from "@/components/common/FadeUp"
import { Icon } from "@/components/common/Icon"
import type { CapabilityGroup } from "@/types/offer"

/** Capacités de l'assistant : grandes icônes, la carte s'ouvre au survol sur un mini-exemple de message. */
export function CapabilityGrid({ groups }: { groups: CapabilityGroup[] }) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((g, i) => (
        <FadeUp key={g.title} delay={(i % 3) * 0.1} as="li" className={i === groups.length - 1 && groups.length % 3 === 1 ? "lg:col-start-2" : ""}>
          <div
            tabIndex={0}
            className="group h-full rounded-2xl bg-[#18121A] border border-white/7 p-6 flex flex-col gap-4 hover:border-[#C8103C]/40 hover:bg-[#1F1425] focus-visible:border-[#C8103C]/40 focus-visible:outline-none transition-colors duration-200"
          >
            <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C8103C]/25 to-[#7A28B8]/10 border border-[#C8103C]/25 flex items-center justify-center shadow-[0_0_24px_rgba(200,16,60,0.15)] group-hover:scale-105 transition-transform">
              <Icon name={g.icon} size={26} className="text-[#F03068]" />
            </span>
            <h3 className="font-syne font-bold text-xl text-[#F0EBF4]">{g.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {g.items.map((it) => (
                <li key={it} className="flex gap-2 text-sm text-[#9A8FA5] leading-relaxed">
                  <span className="mt-2 w-1 h-1 rounded-full bg-[#C8103C] shrink-0" aria-hidden />
                  {it}
                </li>
              ))}
            </ul>
            {g.example && (
              <div className="mt-auto grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
                <div className="overflow-hidden">
                  <div className="pt-2">
                    <p className="text-[10px] uppercase tracking-widest text-[#6B6075] mb-1.5">Exemple de message</p>
                    <p className="ml-auto max-w-[95%] rounded-2xl rounded-tr-md bg-gradient-to-b from-[#9E1236] to-[#7E0E2B] px-3 py-2 text-[13px] text-white shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                      {g.example}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FadeUp>
      ))}
    </ul>
  )
}
