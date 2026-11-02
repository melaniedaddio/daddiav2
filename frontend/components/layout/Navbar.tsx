import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { type MouseEvent, useEffect, useRef, useState } from "react"

import { Logo } from "@/components/common/Logo"
import { offers } from "@/data/offres"
import { useScrollSpy } from "@/hooks/useScrollSpy"
import { NAV_LINKS } from "@/lib/site"

const IDS = NAV_LINKS.map((l) => l.id)

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export function Navbar() {
  const router = useRouter()
  const isHome = router.pathname === "/"
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const active = useScrollSpy(IDS, isHome)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    h()
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    const close = () => {
      setMobileOpen(false)
      setMenuOpen(false)
    }
    router.events.on("routeChangeStart", close)
    return () => router.events.off("routeChangeStart", close)
  }, [router.events])

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`)

  const onAnchor = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    setMobileOpen(false)
    setMenuOpen(false)
    if (!isHome) return
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-[#070407]/90 backdrop-blur-md border-b border-white/7"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href={isHome ? "#hero" : "/"}
              onClick={(e) => {
                setMobileOpen(false)
                if (isHome) {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
              className="flex items-center min-h-[44px]"
              aria-label="daddIA — accueil"
            >
              <Logo />
            </Link>

            <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
              {NAV_LINKS.map((link) => {
                const isActive = isHome && active === link.id
                const anchor = (
                  <a
                    href={href(link.id)}
                    onClick={(e) => onAnchor(e, link.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="relative text-sm font-medium text-[#9A8FA5] hover:text-[#F0EBF4] transition-colors duration-200 pb-1"
                  >
                    {link.label}
                    {isActive && <span className="absolute bottom-0 left-0 right-0 h-px bg-[#C8103C]" />}
                  </a>
                )
                if (link.id !== "offres") return <div key={link.id} className="flex items-center">{anchor}</div>
                return (
                  <div
                    key={link.id}
                    ref={menuRef}
                    className="relative flex items-center gap-1"
                    onMouseEnter={() => setMenuOpen(true)}
                    onMouseLeave={() => setMenuOpen(false)}
                    onBlur={(e) => {
                      if (!menuRef.current?.contains(e.relatedTarget as Node)) setMenuOpen(false)
                    }}
                    onKeyDown={(e) => e.key === "Escape" && setMenuOpen(false)}
                  >
                    {anchor}
                    <button
                      type="button"
                      aria-label="Afficher les offres"
                      aria-expanded={menuOpen}
                      aria-controls="offres-menu"
                      onClick={() => setMenuOpen((o) => !o)}
                      className="text-[#9A8FA5] hover:text-[#F0EBF4] p-1 -mr-1"
                    >
                      <ChevronDown
                        size={14}
                        aria-hidden
                        className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      id="offres-menu"
                      className={`absolute left-1/2 top-full pt-3 -translate-x-1/2 transition-all duration-200 ${
                        menuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                      }`}
                    >
                      <ul className="w-72 bg-[#0F0B0F]/95 backdrop-blur-md border border-white/10 rounded-xl p-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
                        {offers.map((o) => (
                          <li key={o.slug}>
                            <Link
                              href={`/offres/${o.slug}`}
                              className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-[#9A8FA5] hover:text-[#F0EBF4] hover:bg-white/5 transition-colors"
                            >
                              <span>{o.name}</span>
                              <span
                                className={`text-[10px] uppercase tracking-wider ${
                                  o.kind === "abonnement" ? "text-[#A060E0]" : "text-[#F03068]"
                                }`}
                              >
                                {o.kind}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </nav>

            <div className="hidden md:flex items-center">
              <a
                href={href("contact")}
                onClick={(e) => onAnchor(e, "contact")}
                className="px-4 py-2 text-sm font-medium bg-[#C8103C] hover:bg-[#F03068] text-white rounded-md transition-colors duration-200"
              >
                Nous contacter
              </a>
            </div>

            <button
              type="button"
              className="md:hidden text-[#F0EBF4] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-[#070407] overflow-y-auto md:hidden"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          <nav
            aria-label="Menu mobile"
            className="min-h-full flex flex-col items-center justify-center gap-8 pt-24 pb-12 px-6"
          >
            {NAV_LINKS.map((link, i) => (
              <div key={link.id} className="flex flex-col items-center gap-4">
                <a
                  href={href(link.id)}
                  onClick={(e) => onAnchor(e, link.id)}
                  className="text-3xl font-syne font-bold text-[#F0EBF4] hover:text-[#C8103C] transition-colors"
                  style={{ animation: `slideUp 0.3s ease ${i * 0.07}s both` }}
                >
                  {link.label}
                </a>
                {link.id === "offres" && (
                  <ul
                    className="flex flex-col items-center gap-2"
                    style={{ animation: `slideUp 0.3s ease ${(i + 0.5) * 0.07}s both` }}
                  >
                    {offers.map((o) => (
                      <li key={o.slug}>
                        <Link
                          href={`/offres/${o.slug}`}
                          className="inline-flex items-center min-h-[44px] text-base text-[#9A8FA5] hover:text-[#F03068] transition-colors"
                        >
                          {o.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <a
              href={href("contact")}
              onClick={(e) => onAnchor(e, "contact")}
              className="mt-4 px-8 py-3 bg-[#C8103C] text-white font-medium rounded-md text-lg"
              style={{ animation: `slideUp 0.3s ease ${NAV_LINKS.length * 0.07}s both` }}
            >
              Nous contacter
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
