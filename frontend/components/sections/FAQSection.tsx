import { Accordion } from "@/components/common/Accordion"
import { SectionHeader } from "@/components/common/SectionHeader"
import { faq } from "@/data/faq"

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 px-4 bg-[#0F0B0F]" aria-labelledby="faq-titre">
      <div className="max-w-3xl mx-auto">
        <SectionHeader id="faq-titre" eyebrow="Questions fréquentes" title="Vos questions, nos réponses" />
        <Accordion items={faq} />
      </div>
    </section>
  )
}
