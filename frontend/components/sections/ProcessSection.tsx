import { FadeUp } from "@/components/common/FadeUp"
import { SectionHeader } from "@/components/common/SectionHeader"
import { steps } from "@/data/process"

export default function ProcessSection() {
  return (
    <section id="processus" className="py-24 px-4" aria-labelledby="processus-titre">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          id="processus-titre"
          eyebrow="Comment ça marche"
          title="Comment on commence"
          subtitle="Quelle que soit l'offre, le premier pas est le même."
        />
        <ol className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-0 relative max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.1} as="li">
              <div className="relative flex flex-col items-center text-center gap-4 px-4">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-[#C8103C]/20 to-transparent" />
                )}
                <div className="relative z-10 w-16 h-16 rounded-full bg-[#18121A] border border-[#C8103C]/20 flex items-center justify-center">
                  <span className="font-syne font-bold text-lg text-[#C8103C]">{step.num}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-syne font-bold text-lg text-[#F0EBF4]">{step.title}</h3>
                  <p className="text-sm text-[#9A8FA5] leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="lg:hidden w-px h-8 bg-gradient-to-b from-[#C8103C]/20 to-transparent" />
                )}
              </div>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  )
}
