import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const KEY = "daddia-cookies"

// Bannière d'information (PRD §7.8) : uniquement des cookies techniques.
export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = window.localStorage.getItem(KEY)
    } catch {
      stored = null
    }
    if (stored) return
    const t = window.setTimeout(() => setShow(true), 1500)
    return () => window.clearTimeout(t)
  }, [])

  const close = (value: "accepted" | "dismissed") => {
    try {
      window.localStorage.setItem(KEY, value)
    } catch {
      /* stockage indisponible : la bannière se ferme quand même */
    }
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="region"
          aria-label="Information sur les cookies"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[60] bg-[#18121A]/95 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
        >
          <p className="text-sm text-[#9A8FA5] leading-relaxed">
            Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun
            cookie de suivi.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => close("accepted")}
              className="min-h-[44px] px-5 rounded-lg bg-[#C8103C] hover:bg-[#F03068] text-white text-sm font-medium transition-colors"
            >
              Accepter
            </button>
            <button
              type="button"
              onClick={() => close("dismissed")}
              className="min-h-[44px] px-5 rounded-lg border border-white/10 hover:border-[#C8103C]/50 text-[#F0EBF4] text-sm font-medium transition-colors"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
