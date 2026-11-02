import { NeedsSelector } from "@/components/common/NeedsSelector"
import { SectionHeader } from "@/components/common/SectionHeader"

export default function WhatIACanDo() {
  return (
    <section id="ia-pour-vous" className="py-24 px-4 bg-[#0F0B0F]" aria-labelledby="ia-pour-vous-titre">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          id="ia-pour-vous-titre"
          eyebrow="Ce que l'IA peut faire pour vous"
          title="Quel est votre besoin ?"
          accent="On vous montre la réponse."
          subtitle="Choisissez la situation qui vous ressemble : un exemple concret, et l'offre qui y répond."
        />
        <NeedsSelector />
      </div>
    </section>
  )
}
