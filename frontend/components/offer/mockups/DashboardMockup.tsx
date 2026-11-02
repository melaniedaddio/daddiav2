import { motion } from "framer-motion"
import { Bell, CalendarDays, Euro, FileText, Hammer, LayoutDashboard, Search, Users } from "lucide-react"

import { Icon } from "@/components/common/Icon"
import { useInView } from "@/hooks/useInView"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { IconName } from "@/types/offer"

const NAV = [
  { label: "Tableau de bord", icon: LayoutDashboard, active: true },
  { label: "Chantiers", icon: Hammer },
  { label: "Devis", icon: FileText },
  { label: "Factures", icon: Euro },
  { label: "Planning", icon: CalendarDays },
  { label: "Équipe", icon: Users },
]

const STATUS = {
  retard: { label: "En retard", cls: "bg-[#C8103C]/15 text-[#F03068] border-[#C8103C]/30" },
  relancee: { label: "Relancée", cls: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
  echeance: { label: "Échéance proche", cls: "bg-sky-500/10 text-sky-300 border-sky-500/30" },
} as const

// Heures saisies par jour (illustratif) pour le mini-graphique
const HOURS = [38, 44, 41, 47, 42]
const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven"]

/** Fenêtre d'application : barre de navigateur, barre latérale, cartes KPI, graphique, impayés (PRD §8.3). */
export function DashboardMockup({
  appName = "Votre outil",
  widgets,
  invoices = [],
}: {
  appName?: string
  widgets: { label: string; value: string; hint?: string; icon?: IconName }[]
  invoices?: { client: string; label: string; status: keyof typeof STATUS }[]
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true, threshold: 0.2 })
  const reduced = useReducedMotion()
  const show = isInView || reduced
  const w = 280
  const h = 90
  const pts = HOURS.map((v, i) => [(i / (HOURS.length - 1)) * w, h - ((v - 30) / 20) * h] as const)
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#0B080C] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_20px_40px_-20px_rgba(200,16,60,0.15)]">
      {/* Barre de navigateur */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#18121A] border-b border-white/5" aria-hidden>
        <span className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </span>
        <span className="flex-1 max-w-sm mx-auto h-7 rounded-md bg-[#0F0B0F] border border-white/5 px-3 flex items-center gap-2 text-[11px] text-[#6B6075]">
          🔒 outil.votre-entreprise.fr
        </span>
      </div>
      <div className="flex">
        {/* Barre latérale */}
        <aside className="hidden md:flex w-52 shrink-0 flex-col gap-1 p-4 border-r border-white/5 bg-[#0F0B0F]" aria-hidden>
          <p className="font-syne font-bold text-sm text-[#F0EBF4] mb-4 truncate">{appName}</p>
          {NAV.map(({ label, icon: I, active }) => (
            <span
              key={label}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs ${
                active ? "bg-[#C8103C]/10 text-[#F03068]" : "text-[#9A8FA5]"
              }`}
            >
              <I size={14} /> {label}
            </span>
          ))}
        </aside>
        {/* Contenu */}
        <div className="flex-1 min-w-0 p-4 sm:p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#9A8FA5]">Cette semaine</p>
              <p className="font-syne font-bold text-lg text-[#F0EBF4]">Bonjour Karim 👋</p>
            </div>
            <span className="flex items-center gap-2 text-[#9A8FA5]" aria-hidden>
              <Search size={16} />
              <Bell size={16} />
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {widgets.map((wd, i) => (
              <motion.div
                key={wd.label}
                className="dashboard-widget rounded-xl p-3 sm:p-4 flex flex-col gap-2"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={show ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <span className="flex items-center justify-between text-[#9A8FA5]">
                  <span className="text-[11px] leading-tight">{wd.label}</span>
                  {wd.icon && <Icon name={wd.icon} size={14} className="text-[#C8103C] shrink-0" />}
                </span>
                <span className="font-syne font-extrabold text-2xl sm:text-3xl text-[#F0EBF4]">{wd.value}</span>
                {wd.hint && <span className="text-[10px] text-amber-300/90">{wd.hint}</span>}
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-3">
            <div className="dashboard-widget rounded-xl p-4 lg:col-span-2">
              <p className="text-xs text-[#9A8FA5] mb-3">Heures saisies par jour</p>
              <svg viewBox={`-6 -6 ${w + 12} ${h + 26}`} className="w-full h-auto" aria-hidden>
                <defs>
                  <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C8103C" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#C8103C" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#dash-fill)" />
                <motion.path
                  d={path}
                  fill="none"
                  stroke="#F03068"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={show ? { pathLength: 1 } : undefined}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                {pts.map(([x, y], i) => (
                  <g key={DAYS[i]}>
                    <circle cx={x} cy={y} r={3.5} fill="#0B080C" stroke="#F03068" strokeWidth={2} />
                    <text x={x} y={h + 18} textAnchor="middle" fontSize="10" fill="#6B6075">
                      {DAYS[i]}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="dashboard-widget rounded-xl p-4 lg:col-span-3">
              <p className="text-xs text-[#9A8FA5] mb-2">Factures impayées</p>
              <ul>
                {invoices.map((inv) => (
                  <li key={inv.client} className="task-row flex items-center gap-3 py-2.5">
                    <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-[#9A8FA5] shrink-0" aria-hidden>
                      {inv.client.replace(/^(M\.|Mme|SCI)\s*/, "").slice(0, 2).toUpperCase()}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-xs text-[#F0EBF4] truncate">{inv.client}</span>
                      <span className="block text-[10px] text-[#6B6075] truncate">{inv.label}</span>
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${STATUS[inv.status].cls}`}>
                      {STATUS[inv.status].label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
