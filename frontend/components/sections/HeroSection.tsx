import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { type MouseEvent, useEffect, useLayoutEffect, useRef } from "react"

import { useReducedMotion } from "@/hooks/useReducedMotion"

// Hero cinématographique — porté depuis HeroSection de design/maquette-source.jsx (PRD §7.1).

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

const HERO_TASKS = [
  { label: "Relances clients", icon: "📧", done: true },
  { label: "Devis auto-générés", icon: "📄", done: true },
  { label: "Rapports hebdo", icon: "📊", done: true },
  { label: "Planning optimisé", icon: "📅", done: false },
]

function scrollToId(e: MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id)
  if (!el) return
  e.preventDefault()
  el.scrollIntoView({ behavior: "smooth" })
}

/** Les deux lignes du titre, dans un seul <h1>. */
function HeroTitle({ animated }: { animated: boolean }) {
  const reveal = animated ? "gsap-reveal" : ""
  return (
    <h1 className="font-syne font-extrabold leading-[1.05] text-5xl md:text-7xl lg:text-[6rem]">
      <span className={`hero-tagline1 ${reveal} block text-hero-3d tracking-tight mb-2`}>
        L&apos;IA qui travaille pour vous,
      </span>
      <span
        className={`hero-tagline2 ${reveal} block text-hero-crimson tracking-tighter`}
        style={{ fontFamily: "system-ui" }}
      >
        et avec vous.
      </span>
    </h1>
  )
}

function CtaContent() {
  return (
    <>
      <h2 className="font-syne font-bold text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tight text-hero-crimson">
        Commençons ensemble.
      </h2>
      <p className="text-[#9A8FA5] text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
        Un seul appel de découverte. Un plan d&apos;action concret. Des outils qui tournent en production.
      </p>
      <div className="flex flex-col sm:flex-row gap-5 justify-center">
        <a
          href="#contact"
          onClick={(e) => scrollToId(e, "contact")}
          className="btn-daddia-primary px-8 py-4 rounded-[1.25rem] font-syne font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#C8103C] focus:ring-offset-2 focus:ring-offset-[#070407]"
        >
          Nous contacter
        </a>
        <a
          href="#offres"
          onClick={(e) => scrollToId(e, "offres")}
          className="btn-daddia-outline px-8 py-4 rounded-[1.25rem] font-syne font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          Voir les offres
        </a>
      </div>
    </>
  )
}

/** Contenu de la grande carte : wordmark, téléphone tableau de bord, badges, accroche. */
function CardContent({ animated }: { animated: boolean }) {
  const reveal = animated ? "gsap-reveal" : ""
  return (
    <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
      {/* Marque */}
      <div className={`card-col-right ${reveal} order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full`}>
        <p
          aria-label="daddIA"
          className="font-syne font-black text-6xl md:text-[6rem] lg:text-[8rem] tracking-tighter text-card-white leading-none"
        >
          {/* Comme le logo : « dadd » en blanc, « IA » en crimson */}
          <span aria-hidden>
            dadd<span style={{ WebkitTextFillColor: "#C8103C", color: "#C8103C" }}>IA</span>
          </span>
        </p>
      </div>

      {/* Téléphone tableau de bord */}
      <div
        className="dashboard-scroll order-2 relative w-full h-[360px] lg:h-[540px] flex items-center justify-center z-10"
        style={{ perspective: "1000px" }}
        aria-hidden
      >
        <div className="relative w-full h-full flex items-center justify-center transform scale-[0.7] md:scale-90 lg:scale-100">
          <div
            className="relative w-[300px] h-[520px] rounded-[2rem] overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #1A0F20 0%, #0A0408 100%)",
              boxShadow:
                "inset 0 0 0 1px rgba(200,16,60,0.15), 0 40px 80px -15px rgba(0,0,0,0.9), 0 15px 25px -5px rgba(200,16,60,0.1)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none z-40"
              style={{ background: "linear-gradient(110deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 45%)" }}
            />
            <div className="relative w-full h-full pt-6 px-5 pb-6 flex flex-col gap-4">
              <div className="dash-widget flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-[#9A8FA5] uppercase tracking-widest font-bold">Tableau de bord</span>
                  <p className="text-base font-syne font-bold text-white mt-0.5">Automatisation IA</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#C8103C]/10 border border-[#C8103C]/20 flex items-center justify-center text-sm font-bold text-[#C8103C]">
                  AI
                </div>
              </div>

              <div className="dash-widget relative w-36 h-36 mx-auto flex items-center justify-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                <svg className="absolute inset-0 w-full h-full">
                  <circle cx="72" cy="72" r="50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
                  <circle className="progress-arc" cx="72" cy="72" r="50" fill="none" stroke="#C8103C" strokeWidth="10" />
                </svg>
                <div className="text-center z-10">
                  <span className="counter-h text-3xl font-extrabold tracking-tighter text-white font-syne">
                    {animated ? 0 : 5}
                  </span>
                  <span className="text-white font-syne font-extrabold text-xl">h</span>
                  <p className="text-[8px] text-[#9A8FA5] uppercase tracking-[0.15em] font-bold mt-0.5">
                    récupérées/semaine
                  </p>
                </div>
              </div>

              <div className="dash-widget dashboard-widget rounded-xl overflow-hidden">
                {HERO_TASKS.map((t) => (
                  <div key={t.label} className="task-row flex items-center gap-3 px-4 py-2.5">
                    <span className="text-sm">{t.icon}</span>
                    <span className="flex-1 text-xs text-[#9A8FA5]">{t.label}</span>
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        t.done ? "bg-green-500/20 border border-green-500/30" : "border border-white/10"
                      }`}
                    >
                      {t.done && (
                        <svg className="w-2.5 h-2.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="dash-widget mt-auto flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: "rgba(200,16,60,0.08)", border: "1px solid rgba(200,16,60,0.15)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-[#9A8FA5]">3 outils actifs en production</span>
              </div>
            </div>
          </div>

          <div className="floating-b absolute flex top-6 lg:top-10 left-[-20px] lg:left-[-90px] floating-badge-daddia rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(200,16,60,0.15)", border: "1px solid rgba(200,16,60,0.25)" }}
            >
              <span className="text-sm">⚡</span>
            </div>
            <div>
              <p className="text-white text-xs font-syne font-bold tracking-tight">Email automatisé</p>
              <p className="text-[#9A8FA5] text-[10px]">Relance envoyée · il y a 2 min</p>
            </div>
          </div>

          <div className="floating-b absolute flex bottom-10 lg:bottom-16 right-[-20px] lg:right-[-90px] floating-badge-daddia rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(122,40,184,0.15)", border: "1px solid rgba(122,40,184,0.25)" }}
            >
              <span className="text-sm">📄</span>
            </div>
            <div>
              <p className="text-white text-xs font-syne font-bold tracking-tight">Devis généré</p>
              <p className="text-[#9A8FA5] text-[10px]">En 47 secondes · 100% auto</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accroche */}
      <div className={`card-col-left ${reveal} order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0`}>
        <p className="text-white font-syne font-bold text-2xl md:text-3xl lg:text-4xl mb-4 tracking-tight">
          Pas de promesses.
          <br />
          <span style={{ color: "#C8103C" }}>Des outils qui tournent.</span>
        </p>
        <p className="hidden md:block text-[#9A8FA5] text-sm lg:text-base leading-relaxed max-w-sm">
          <span className="text-white font-semibold font-syne">daddIA</span> déploie des automatisations IA concrètes
          dans votre activité — intégrations, scripts, outils sur mesure.
        </p>
      </div>
    </div>
  )
}

/** Version statique, empilée, pour prefers-reduced-motion (PRD §7.1). */
function HeroStatic() {
  return (
    <section
      id="hero"
      className="hero-static relative overflow-hidden bg-[#070407] text-[#F0EBF4] antialiased pt-32 pb-24 px-4"
    >
      <div className="film-grain-daddia" aria-hidden />
      <div className="bg-grid-daddia absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden />
      <div className="relative z-10 flex flex-col items-center gap-16">
        <div className="text-center">
          <HeroTitle animated={false} />
        </div>
        <div className="card-daddia relative overflow-hidden w-full max-w-7xl rounded-[32px] md:rounded-[40px] py-10 lg:py-16">
          <CardContent animated={false} />
        </div>
        <div className="text-center">
          <CtaContent />
        </div>
      </div>
    </section>
  )
}

function HeroAnimated() {
  const containerRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  // Reflet crimson qui suit la souris
  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        cardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`)
        cardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`)
      })
    }
    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Timeline GSAP de référence (maquette), côté client uniquement
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mobile = window.innerWidth < 768
    // Appareil modeste : épinglage plus court (PRD §7.1, « Mobile »)
    const slow = mobile && (navigator.hardwareConcurrency ?? 8) <= 4
    const vh = window.innerHeight

    const ctx = gsap.context(() => {
      gsap.set(".hero-tagline1", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 })
      gsap.set(".hero-tagline2", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" })
      gsap.set(".main-card-daddia", { y: vh + 200, autoAlpha: 1 })
      gsap.set([".card-col-left", ".card-col-right", ".dashboard-scroll", ".floating-b", ".dash-widget"], { autoAlpha: 0 })
      gsap.set(".cta-final", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" })

      gsap
        .timeline({ delay: 0.3 })
        .to(".hero-tagline1", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".hero-tagline2", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0")

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: slow ? "+=4500" : "+=7000",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
        .to([".hero-text-wrap", ".bg-grid-daddia"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card-daddia", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card-daddia", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(
          ".dashboard-scroll",
          { y: 300, z: -500, rotationX: 50, rotationY: -20, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 },
          "-=0.8",
        )
        .fromTo(".dash-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-arc", { strokeDashoffset: 40, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-h", { innerHTML: 5, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-b", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-col-left", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-col-right", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrap", { autoAlpha: 0 })
        .set(".cta-final", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".dashboard-scroll", ".floating-b", ".card-col-left", ".card-col-right"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card-daddia", {
          width: mobile ? "92vw" : "85vw",
          height: mobile ? "92vh" : "85vh",
          borderRadius: mobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".cta-final", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card-daddia", { y: -vh - 300, ease: "power3.in", duration: 1.5 })
    }, containerRef)

    // Hauteurs justes une fois les polices chargées
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#070407] text-[#F0EBF4] antialiased"
      style={{ perspective: "1500px" }}
    >
      <div className="film-grain-daddia" aria-hidden />
      <div className="bg-grid-daddia absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden />

      {/* Titre */}
      <div className="hero-text-wrap absolute z-10 flex flex-col items-center justify-center text-center w-full px-4">
        <HeroTitle animated />
      </div>

      {/* Appel à l'action final */}
      <div className="cta-final gsap-reveal absolute z-10 flex flex-col items-center justify-center text-center w-full px-4 pointer-events-auto">
        <CtaContent />
      </div>

      {/* Grande carte */}
      <div
        className="hero-card-layer absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={{ perspective: "1500px" }}
      >
        <div
          ref={cardRef}
          className="main-card-daddia card-daddia relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen-daddia" aria-hidden />
          <CardContent animated />
        </div>
      </div>
    </section>
  )
}

export function HeroSection() {
  const reduced = useReducedMotion()
  return reduced ? <HeroStatic /> : <HeroAnimated />
}
