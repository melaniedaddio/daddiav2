import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useEffect } from "react"

import { PageShell } from "@/components/layout/PageShell"
import { readOfferFromUrl, SELECT_OFFER_EVENT } from "@/components/sections/ContactSection"
import { HeroSection } from "@/components/sections/HeroSection"

// Sections sous la ligne de flottaison : chargées à la demande (PRD §13). Le hero ne l'est pas.
const WhatIACanDo = dynamic(() => import("@/components/sections/WhatIACanDo"))
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection"))
const OffresSection = dynamic(() => import("@/components/sections/OffresSection"))
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"))
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"))

/**
 * Gère les liens du type `/#contact?offre=audit-ia` : défilement vers la section
 * (après la mise en place de l'épinglage du hero) et pré-sélection de l'offre.
 */
function useHashNavigation() {
  const router = useRouter()
  useEffect(() => {
    let timer = 0
    const go = (smooth: boolean) => {
      const raw = window.location.hash.slice(1)
      if (!raw) return
      const id = raw.split("?")[0]
      const offre = readOfferFromUrl()
      if (offre) window.dispatchEvent(new CustomEvent(SELECT_OFFER_EVENT, { detail: offre }))
      let tries = 0
      const tick = () => {
        const el = id ? document.getElementById(id) : null
        if (el) el.scrollIntoView({ behavior: smooth ? "smooth" : "auto" })
        else if (tries++ < 40) timer = window.setTimeout(tick, 100)
      }
      window.clearTimeout(timer)
      timer = window.setTimeout(tick, smooth ? 0 : 250)
    }
    go(false)
    const onHash = () => go(true)
    window.addEventListener("hashchange", onHash)
    router.events.on("hashChangeComplete", onHash)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("hashchange", onHash)
      router.events.off("hashChangeComplete", onHash)
    }
  }, [router.events])
}

export default function Home() {
  useHashNavigation()
  return (
    <PageShell
      title="daddIA — Automatisations IA pour TPE et PME, à Nice"
      description="daddIA aide les TPE et PME à intégrer l'IA dans leur activité : audit, chatbot, outil sur mesure, assistant IA, accompagnement et ateliers. Pas de promesses. Des outils qui tournent."
    >
      <HeroSection />
      <OffresSection />
      <WhatIACanDo />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
    </PageShell>
  )
}
