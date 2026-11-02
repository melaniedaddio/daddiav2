/*
 * Maquette validée du site daddIA (Claude Design) — code source extrait de design/maquette.html.
 * RÉFÉRENCE VISUELLE pour Claude Code : reproduire ce design fidèlement en Next.js + TypeScript.
 * Les CONTENUS (offres, FAQ, formulaire) de ce fichier sont ceux de la v1 : ceux du PRD v2 les remplacent.
 * Ne pas importer ce fichier dans le build.
 */


/* ===== data.jsx ===== */
// Data layer — copied 1:1 from DaddIA/data/*

window.DATA_FAQ = [
{ q: "Est-ce que l'IA peut vraiment aider mon activité spécifique ?", a: "Oui — et c'est exactement l'objet de l'audit. En 45 minutes, on analyse vos process et on identifie précisément les tâches automatisables dans votre secteur. Si aucune opportunité n'est identifiée, on vous le dit clairement." },
{ q: "Est-ce que je vais comprendre et pouvoir utiliser ce qui est livré ?", a: "Absolument. Chaque outil est livré avec une documentation claire et un appel de prise en main. Vous n'avez pas besoin de compétences techniques — c'est conçu pour être utilisé par des non-développeurs." },
{ q: "Est-ce que ça vaut vraiment le coût ?", a: "Nos clients récupèrent en moyenne 3 à 5 heures par semaine sur des tâches répétitives. Sur un an, c'est entre 150 et 250 heures libérées — bien plus que le coût d'un audit ou d'un développement. Et le diagnostic IA peut être subventionné jusqu'à 40% via Bpifrance." },
{ q: "Par où commencer si je ne sais pas de quoi j'ai besoin ?", a: "L'audit IA one-shot est fait pour ça. On part de zéro ensemble. Un seul appel de découverte suffit pour qu'on identifie les opportunités et vous remette un plan d'action. C'est l'entrée la plus simple et la moins risquée." },
{ q: "Combien de temps faut-il s'impliquer dans un projet ?", a: "Pour l'audit : un appel de 45 min et un appel de restitution de 30 min. Pour le SaaS custom : 2 appels de cadrage et des validations aux étapes clés — vous n'avez pas à gérer le développement." },
{ q: "Vous êtes basés où ? Peut-on se rencontrer ?", a: "On est basés à Nice (06). Le présentiel est possible sur toute la région PACA. Toutes les autres missions se font en visio sans contrainte géographique." },
{ q: "Le code source de l'outil développé m'appartient-il ?", a: "C'est précisé dans le contrat avant tout démarrage. Par défaut, daddIA héberge et maintient l'outil. Si vous souhaitez récupérer le code source, c'est une option discutée et formalisée dans le devis." }];


window.DATA_OFFRES = [
{ id: "audit", anchor: "audit", tag: "ONE-SHOT", tagColor: "crimson", title: "Audit IA",
  desc: "On analyse vos process, on identifie les 3 à 5 opportunités IA à fort impact et on vous livre un plan d'action concret.",
  includes: ["Questionnaire de qualification pré-appel", "Appel de découverte 45–60 min", "Rapport PDF livré sous 1–2 jours", "Appel de restitution inclus", "7 jours de Q&A par email"],
  cta: "Prendre contact", featured: false },
{ id: "saas", anchor: "saas", tag: "ONE-SHOT", tagColor: "crimson", title: "Développement SaaS Custom",
  desc: "On développe votre outil IA sur mesure et on le déploie en production. Application réelle, sécurisée, documentée — pas un prototype.",
  includes: ["Python · Django · Claude API · RAG · SQL", "Hébergé, sécurisé, accessible dès la livraison", "Contrat PDF signé avant démarrage", "Updates réguliers pendant le développement", "30 jours de support post-livraison"],
  cta: "Discutons de votre projet", featured: true },
{ id: "coaching", anchor: "coaching", tag: "RÉCURRENT", tagColor: "violet", title: "Coaching Mensuel",
  desc: "Accompagnement individuel pour intégrer l'IA progressivement dans votre activité. 2 appels par mois, suivi continu.",
  includes: ["2 appels visio de 60 min par mois", "Échanges async (WhatsApp ou email)", "Compte-rendu après chaque appel", "Espace Notion partagé", "Minimum 3 mois recommandé"],
  cta: "Prendre contact", featured: false },
{ id: "ateliers", anchor: "ateliers", tag: "ONE-SHOT", tagColor: "crimson", title: "Ateliers Collectifs",
  desc: "Sessions de formation en groupe (4–12 personnes) sur des thèmes IA concrets. En visio ou présentiel sur Nice et la région PACA.",
  includes: ["Session live de 3h", "Support PDF + replay 30 jours", "Sessions ouvertes ou intra-entreprise", "Finançable OPCO (intra)"],
  cta: "Voir les prochaines dates", featured: false },
{ id: "membership", anchor: "membership", tag: "RÉCURRENT", tagColor: "violet", title: "Membership & Formation",
  desc: "Bibliothèque de formations IA, ressources pratiques chaque mois, communauté pour progresser à votre rythme.",
  includes: ["Formations vidéo en accès illimité", "Prompts, templates, guides PDF", "Communauté + Q&A live mensuel", "Sans engagement"],
  cta: "Rejoindre", featured: false }];


window.DATA_STEPS = [
{ num: "01", title: "Contact", desc: "Vous nous écrivez. On répond sous 24h." },
{ num: "02", title: "Diagnostic", desc: "On analyse vos process et vos pain points." },
{ num: "03", title: "Recommandations", desc: "Plan d'action clair, priorisé, sans jargon." },
{ num: "04", title: "Développement", desc: "On construit. Vous validez. On déploie en production." },
{ num: "05", title: "Résultats", desc: "L'outil tourne. Vous gagnez du temps. On reste disponibles." }];


window.DATA_STACK = [
"Python", "Django", "FastAPI", "Claude API", "OpenAI API",
"RAG", "LangChain", "PostgreSQL", "SQL", "GitHub",
"N8N", "Make", "VPS Hetzner", "Docker", "Nginx"];


window.DATA_SECTORS = [
{ id: "commerce", label: "Commerce", icon: "shopping",
  useCases: [
  { problem: "Vous envoyez vos relances clients à la main une par une", solution: "Un outil qui détecte les impayés et envoie des relances personnalisées automatiquement", gain: "3h récupérées par semaine" },
  { problem: "Vos devis prennent 30 minutes à rédiger", solution: "Génération automatique de devis à partir d'une description en quelques secondes", gain: "Devis en moins de 2 minutes" }]
},
{ id: "immobilier", label: "Immobilier", icon: "building",
  useCases: [
  { problem: "Vos locataires vous posent toujours les mêmes questions", solution: "Assistant IA qui répond automatiquement aux questions fréquentes 24h/24", gain: "80% des emails traités automatiquement" },
  { problem: "Vos états des lieux prennent 2h à rédiger", solution: "Génération automatique du rapport à partir de photos et notes vocales", gain: "90% de temps gagné sur les rapports" }]
},
{ id: "beaute", label: "Beauté & Bien-Être", icon: "sparkles",
  useCases: [
  { problem: "Vous gérez vos rappels de rendez-vous à la main", solution: "Rappels automatiques par SMS/email avant chaque rendez-vous", gain: "60% de no-shows en moins" },
  { problem: "Vos fiches clients sont éparpillées et incomplètes", solution: "Consolidation automatique des données clients et historique des soins", gain: "Historique complet en 1 clic" }]
},
{ id: "btp", label: "BTP & Artisanat", icon: "hammer",
  useCases: [
  { problem: "Vos chiffrages prennent des heures", solution: "Outil de chiffrage automatique basé sur vos données historiques", gain: "Devis 10× plus rapides" },
  { problem: "Vos rapports de chantier sont toujours en retard", solution: "Dictée vocale + génération automatique du rapport de fin de journée", gain: "45 min gagnées par jour" }]
},
{ id: "services", label: "Services", icon: "briefcase",
  useCases: [
  { problem: "Vous passez des heures à trier et répondre aux emails", solution: "IA qui catégorise, priorise et prépare les réponses à vos emails", gain: "2h récupérées par jour" },
  { problem: "Vos comptes-rendus de réunion prennent du temps à rédiger", solution: "Transcription automatique + compte-rendu structuré généré en 30 secondes", gain: "CR prêt avant de sortir de la salle" }]
}];


/* ===== common.jsx ===== */
// Common components — SplitReveal, SectorSelector, icons, Accordion

const { motion, AnimatePresence, useInView: fmUseInView } = window.Motion || window.framerMotion || {};
const { useState, useEffect, useRef } = React;

// ---- Icons (inline SVG, stroke-based like lucide)
function Icon({ name, size = 16, className = "" }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className };
  switch (name) {
    case "shopping":return <svg {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
    case "building":return <svg {...props}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v8h4" /><path d="M18 9h2a2 2 0 0 1 2 2v11h-4" /><path d="M10 6h4M10 10h4M10 14h4M10 18h4" /></svg>;
    case "sparkles":return <svg {...props}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" /></svg>;
    case "hammer":return <svg {...props}><path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" /><path d="M17.64 15 22 10.64" /><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" /></svg>;
    case "briefcase":return <svg {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
    case "arrow-right":return <svg {...props}><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
    case "check":return <svg {...props}><polyline points="20 6 9 17 4 12" /></svg>;
    case "chevron-down":return <svg {...props}><polyline points="6 9 12 15 18 9" /></svg>;
    case "menu":return <svg {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>;
    case "close":return <svg {...props}><path d="M18 6 6 18M6 6l12 12" /></svg>;
    case "mail":return <svg {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
    case "map-pin":return <svg {...props}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>;
    case "clock":return <svg {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
    case "calendar":return <svg {...props}><path d="M8 2v4M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>;
    default:return null;
  }
}

// ---- useInView (simple)
function useInView(opts = {}) {
  const { once = true, threshold = 0.1, rootMargin = "0px" } = opts;
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {setIsInView(true);if (once) obs.disconnect();} else
      if (!once) setIsInView(false);
    }, { threshold, rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold, rootMargin]);
  return { ref, isInView };
}

// ---- SplitReveal (clip-path sweep)
function SplitReveal({ children, className = "", delay = 0 }) {
  const { ref, isInView } = useInView({ once: true, rootMargin: "-80px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div style={{
        clipPath: isInView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
        transition: `clip-path 0.65s cubic-bezier(0.76,0,0.24,1) ${delay}s`
      }}>
        {children}
      </div>
    </div>);

}

// ---- FadeUp wrapper (replaces framer-motion.motion.div with variants)
function FadeUp({ children, delay = 0, className = "", as: Tag = "div" }) {
  const { ref, isInView } = useInView({ once: true, rootMargin: "-40px" });
  return (
    <Tag ref={ref} className={className} style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`
    }}>{children}</Tag>);

}

// ---- Accordion (single-open)
function Accordion({ items, className = "" }) {
  const [open, setOpen] = useState(null);
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="bg-[#18121A] border border-white/7 rounded-xl px-6 hover:border-white/15 transition-colors">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left font-syne font-semibold text-[#F0EBF4]">
              
              <span className="flex-1">{it.q}</span>
              <Icon name="chevron-down" size={18} className={`text-[#C8103C] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div style={{
              display: "grid",
              gridTemplateRows: isOpen ? "1fr" : "0fr",
              transition: "grid-template-rows 0.3s ease"
            }}>
              <div className="overflow-hidden">
                <p className="text-[#9A8FA5] leading-relaxed pb-5">{it.a}</p>
              </div>
            </div>
          </div>);

      })}
    </div>);

}

// ---- SectorSelector
function SectorSelector() {
  const [active, setActive] = useState(window.DATA_SECTORS[0]);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {window.DATA_SECTORS.map((s) => {
          const isActive = active.id === s.id;
          return (
            <button key={s.id} onClick={() => setActive(s)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
            isActive ? "bg-[#C8103C]/10 border-[#C8103C]/40 text-[#F03068]" : "border-white/10 text-[#9A8FA5] hover:border-white/20 hover:text-[#F0EBF4]"}`
            }>
              <Icon name={s.icon} size={14} />
              {s.label}
            </button>);

        })}
      </div>
      <div key={active.id} className="grid sm:grid-cols-2 gap-4" style={{ animation: "sectorFade 0.3s ease" }}>
        {active.useCases.map((uc, i) =>
        <div key={i} className="bg-[#18121A] border border-white/7 rounded-xl p-6 flex flex-col gap-4 hover:border-[#C8103C]/20 transition-colors">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-[#6B6075] uppercase tracking-wider">Situation actuelle</span>
              <p className="text-[#9A8FA5] text-sm leading-relaxed">{uc.problem}</p>
            </div>
            <Icon name="arrow-right" size={16} className="text-[#C8103C]" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-[#C8103C]/70 uppercase tracking-wider">Solution daddIA</span>
              <p className="text-[#F0EBF4] text-sm leading-relaxed">{uc.solution}</p>
            </div>
            <span className="self-start px-3 py-1 rounded-full bg-green-900/30 border border-green-700/30 text-green-400 text-xs font-medium">
              {uc.gain}
            </span>
          </div>
        )}
      </div>
      <style>{`
        @keyframes sectorFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>);

}

window.Icon = Icon;
window.SplitReveal = SplitReveal;
window.FadeUp = FadeUp;
window.Accordion = Accordion;
window.SectorSelector = SectorSelector;
window.useInView = useInView;

/* ===== hero.jsx ===== */
// Hero cinématique GSAP — reproduction fidèle de HeroSection.tsx

const { useEffect: heroUseEffect, useRef: heroUseRef } = React;

const HERO_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain-daddia {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
  }

  .bg-grid-daddia {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(200,16,60,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(200,16,60,0.05) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-hero-3d {
    color: #F0EBF4;
    text-shadow: 0 10px 30px rgba(200,16,60,0.2), 0 2px 4px rgba(0,0,0,0.4);
  }

  .text-hero-crimson {
    background: linear-gradient(180deg, #F03068 0%, #C8103C 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; transform: translateZ(0);
    filter: drop-shadow(0px 8px 20px rgba(200,16,60,0.3)) drop-shadow(0px 2px 4px rgba(0,0,0,0.5));
  }

  .text-card-white {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; transform: translateZ(0);
    filter: drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .card-daddia {
    background: linear-gradient(145deg, #1A0A14 0%, #070407 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.9),
      0 20px 40px -20px rgba(200,16,60,0.15),
      inset 0 1px 2px rgba(200,16,60,0.15),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(200,16,60,0.12);
  }

  .card-sheen-daddia {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mx, 50%) var(--my, 50%), rgba(200,16,60,0.05) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s;
  }

  .floating-badge-daddia {
    background: linear-gradient(135deg, rgba(200,16,60,0.12) 0%, rgba(122,40,184,0.06) 100%);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 0 0 1px rgba(200,16,60,0.15), 0 25px 50px -12px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.08);
  }

  .btn-daddia-primary {
    background: linear-gradient(180deg, #E01040 0%, #C8103C 100%);
    color: #fff;
    box-shadow: 0 0 0 1px rgba(200,16,60,0.3), 0 2px 4px rgba(0,0,0,0.4), 0 12px 24px -4px rgba(200,16,60,0.4), inset 0 1px 1px rgba(255,255,255,0.15);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-daddia-primary:hover {
    transform: translateY(-3px);
    background: linear-gradient(180deg, #F03068 0%, #E01040 100%);
    box-shadow: 0 0 0 1px rgba(200,16,60,0.4), 0 6px 12px -2px rgba(200,16,60,0.3), 0 20px 32px -6px rgba(200,16,60,0.5), inset 0 1px 1px rgba(255,255,255,0.2);
  }

  .btn-daddia-outline {
    background: rgba(240,235,244,0.04);
    color: #F0EBF4;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.4), 0 12px 24px -4px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-daddia-outline:hover {
    transform: translateY(-3px);
    background: rgba(240,235,244,0.08);
    box-shadow: 0 0 0 1px rgba(200,16,60,0.3), 0 6px 12px -2px rgba(0,0,0,0.3), 0 20px 32px -6px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.08);
  }

  .dashboard-widget {
    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow: 0 8px 16px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.04);
  }

  .task-row { border-bottom: 1px solid rgba(255,255,255,0.04); }
  .task-row:last-child { border-bottom: none; }

  .progress-arc {
    transform: rotate(-90deg); transform-origin: center;
    stroke-dasharray: 314; stroke-dashoffset: 314; stroke-linecap: round;
  }
`;

const HERO_TASKS = [
{ label: "Relances clients", icon: "📧", done: true },
{ label: "Devis auto-générés", icon: "📄", done: true },
{ label: "Rapports hebdo", icon: "📊", done: true },
{ label: "Planning optimisé", icon: "📅", done: false }];


function HeroSection() {
  const containerRef = heroUseRef(null);
  const cardRef = heroUseRef(null);
  const rafRef = heroUseRef(0);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  heroUseEffect(() => {
    const onMove = (e) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        cardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {window.removeEventListener("mousemove", onMove);cancelAnimationFrame(rafRef.current);};
  }, []);

  heroUseEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const { gsap } = window;
    gsap.registerPlugin(window.ScrollTrigger);

    const mobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".hero-tagline1", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".hero-tagline2", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card-daddia", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-col-left", ".card-col-right", ".dashboard-scroll", ".floating-b", ".dash-widget"], { autoAlpha: 0 });
      gsap.set(".cta-final", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const intro = gsap.timeline({ delay: 0.3 });
      intro.
      to(".hero-tagline1", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" }).
      to(".hero-tagline2", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      tl.
      to([".hero-text-wrap", ".bg-grid-daddia"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0).
      to(".main-card-daddia", { y: 0, ease: "power3.inOut", duration: 2 }, 0).
      to(".main-card-daddia", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 }).
      fromTo(".dashboard-scroll",
      { y: 300, z: -500, rotationX: 50, rotationY: -20, autoAlpha: 0, scale: 0.6 },
      { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
      ).
      fromTo(".dash-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5").
      to(".progress-arc", { strokeDashoffset: 40, duration: 2, ease: "power3.inOut" }, "-=1.2").
      to(".counter-h", { innerHTML: 5, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0").
      fromTo(".floating-b", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0").
      fromTo(".card-col-left", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5").
      fromTo(".card-col-right", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<").
      to({}, { duration: 2.5 }).
      set(".hero-text-wrap", { autoAlpha: 0 }).
      set(".cta-final", { autoAlpha: 1 }).
      to({}, { duration: 1.5 }).
      to([".dashboard-scroll", ".floating-b", ".card-col-left", ".card-col-right"], {
        scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05
      }).
      to(".main-card-daddia", {
        width: mobile ? "92vw" : "85vw",
        height: mobile ? "92vh" : "85vh",
        borderRadius: mobile ? "32px" : "40px",
        ease: "expo.inOut",
        duration: 1.8
      }, "pullback").
      to(".cta-final", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback").
      to(".main-card-daddia", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="hero"
    className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#070407] text-[#F0EBF4] antialiased"
    style={{ perspective: "1500px" }}>
      <style dangerouslySetInnerHTML={{ __html: HERO_STYLES }} />
      <div className="film-grain-daddia" aria-hidden />
      <div className="bg-grid-daddia absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden />

      {/* Hero text */}
      <div className="hero-text-wrap absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4">
        <h1 className="hero-tagline1 gsap-reveal text-hero-3d font-syne font-extrabold tracking-tight leading-[1.05] text-5xl md:text-7xl lg:text-[6rem] mb-2">
          Vous perdez des heures
        </h1>
        <h1 className="hero-tagline2 gsap-reveal text-hero-crimson font-syne font-extrabold tracking-tighter leading-[1.05] text-5xl md:text-7xl lg:text-[6rem]" style={{ fontFamily: "system-ui" }}>
          sur des tâches répétitives.
        </h1>
      </div>

      {/* CTA final */}
      <div className="cta-final absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 pointer-events-auto">
        <h2 className="font-syne font-bold text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tight text-hero-crimson gsap-reveal">
          Commençons ensemble.
        </h2>
        <p className="text-[#9A8FA5] text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          Un seul appel de découverte. Un plan d'action concret. Des outils qui tournent en production.
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <button onClick={() => scrollTo("contact")}
          className="btn-daddia-primary px-8 py-4 rounded-[1.25rem] font-syne font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#C8103C] focus:ring-offset-2 focus:ring-offset-[#070407]">
            Nous contacter
          </button>
          <button onClick={() => scrollTo("offres")}
          className="btn-daddia-outline px-8 py-4 rounded-[1.25rem] font-syne font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-white/20">
            Voir les offres
          </button>
        </div>
      </div>

      {/* Main card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div ref={cardRef}
        className="main-card-daddia card-daddia relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]">
          <div className="card-sheen-daddia" aria-hidden />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* Brand */}
            <div className="card-col-right gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="font-syne font-black text-6xl md:text-[6rem] lg:text-[8rem] uppercase tracking-tighter text-card-white">
                dadd<span style={{ color: "rgb(200, 16, 60)" }}>IA</span>
              </h2>
            </div>

            {/* Dashboard mockup */}
            <div className="dashboard-scroll order-2 relative w-full h-[360px] lg:h-[540px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.7] md:scale-90 lg:scale-100">
                <div className="relative w-[300px] h-[520px] rounded-[2rem] overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #1A0F20 0%, #0A0408 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(200,16,60,0.15), 0 40px 80px -15px rgba(0,0,0,0.9), 0 15px 25px -5px rgba(200,16,60,0.1)"
                }}>
                  <div className="absolute inset-0 pointer-events-none z-40" style={{ background: "linear-gradient(110deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 45%)" }} aria-hidden />
                  <div className="relative w-full h-full pt-6 px-5 pb-6 flex flex-col gap-4">
                    <div className="dash-widget flex justify-between items-center">
                      <div>
                        <span className="text-[9px] text-[#9A8FA5] uppercase tracking-widest font-bold">Tableau de bord</span>
                        <p className="text-base font-syne font-bold text-white mt-0.5">Automatisation IA</p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[#C8103C]/10 border border-[#C8103C]/20 flex items-center justify-center text-sm font-bold text-[#C8103C]">AI</div>
                    </div>

                    <div className="dash-widget relative w-36 h-36 mx-auto flex items-center justify-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                      <svg className="absolute inset-0 w-full h-full" aria-hidden>
                        <circle cx="72" cy="72" r="50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
                        <circle className="progress-arc" cx="72" cy="72" r="50" fill="none" stroke="#C8103C" strokeWidth="10" />
                      </svg>
                      <div className="text-center z-10">
                        <span className="counter-h text-3xl font-extrabold tracking-tighter text-white font-syne">0</span>
                        <span className="text-white font-syne font-extrabold text-xl">h</span>
                        <p className="text-[8px] text-[#9A8FA5] uppercase tracking-[0.15em] font-bold mt-0.5">récupérées/semaine</p>
                      </div>
                    </div>

                    <div className="dash-widget dashboard-widget rounded-xl overflow-hidden">
                      {HERO_TASKS.map((t, i) =>
                      <div key={i} className="task-row flex items-center gap-3 px-4 py-2.5">
                          <span className="text-sm" aria-hidden>{t.icon}</span>
                          <span className="flex-1 text-xs text-[#9A8FA5]">{t.label}</span>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${t.done ? "bg-green-500/20 border border-green-500/30" : "border border-white/10"}`}>
                            {t.done &&
                          <svg className="w-2.5 h-2.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                          }
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="dash-widget mt-auto flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ background: "rgba(200,16,60,0.08)", border: "1px solid rgba(200,16,60,0.15)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] text-[#9A8FA5]">3 outils actifs en production</span>
                    </div>
                  </div>
                </div>

                <div className="floating-b absolute flex top-6 lg:top-10 left-[-20px] lg:left-[-90px] floating-badge-daddia rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(200,16,60,0.15)", border: "1px solid rgba(200,16,60,0.25)" }}>
                    <span className="text-sm" aria-hidden>⚡</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-syne font-bold tracking-tight">Email automatisé</p>
                    <p className="text-[#9A8FA5] text-[10px]">Relance envoyée · il y a 2 min</p>
                  </div>
                </div>

                <div className="floating-b absolute flex bottom-10 lg:bottom-16 right-[-20px] lg:right-[-90px] floating-badge-daddia rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(122,40,184,0.15)", border: "1px solid rgba(122,40,184,0.25)" }}>
                    <span className="text-sm" aria-hidden>📄</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-syne font-bold tracking-tight">Devis généré</p>
                    <p className="text-[#9A8FA5] text-[10px]">En 47 secondes · 100% auto</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className="card-col-left gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="text-white font-syne font-bold text-2xl md:text-3xl lg:text-4xl mb-4 tracking-tight">
                Pas de promesses.
                <br />
                <span style={{ color: "#C8103C" }}>Des outils qui tournent.</span>
              </h3>
              <p className="hidden md:block text-[#9A8FA5] text-sm lg:text-base leading-relaxed max-w-sm">
                <span className="text-white font-semibold font-syne">daddIA</span> déploie des automatisations IA concrètes dans votre activité — intégrations, scripts, SaaS custom. Basés à Nice, disponibles partout en France.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>);

}

window.HeroSection = HeroSection;

/* ===== sections.jsx ===== */
// All sections: WhatIACanDo, Process, Offres, Stack, FAQ, Contact, Footer

const { useState: secUseState } = React;

function SectionEyebrow({ children }) {
  return <span className="text-xs font-medium tracking-widest uppercase text-[#C8103C]">{children}</span>;
}

// ---- What IA Can Do
function WhatIACanDo() {
  return (
    <section id="ia-pour-vous" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <FadeUp><SectionEyebrow>Ce que l'IA peut faire pour vous</SectionEyebrow></FadeUp>
          <SplitReveal className="w-full">
            <h2 className="font-syne font-bold text-4xl sm:text-5xl text-[#F0EBF4] leading-tight">
              Votre secteur. Vos problèmes.
              <br />
              <span className="text-[#C8103C]">Des solutions concrètes.</span>
            </h2>
          </SplitReveal>
          <FadeUp delay={0.1}>
            <p className="text-[#9A8FA5] max-w-xl text-lg leading-relaxed">
              Sélectionnez votre secteur et découvrez comment l'IA peut s'intégrer dans votre quotidien dès maintenant.
            </p>
          </FadeUp>
        </div>
        <SectorSelector />
      </div>
    </section>);

}

// ---- Process
function ProcessSection() {
  return (
    <section id="processus" className="py-24 px-4 bg-[#0F0B0F]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <SectionEyebrow>Comment ça marche</SectionEyebrow>
          <SplitReveal>
            <h2 className="font-syne font-bold text-4xl sm:text-5xl text-[#F0EBF4]">De zéro à l'outil en production</h2>
          </SplitReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-0 relative">
          {window.DATA_STEPS.map((step, i) =>
          <FadeUp key={step.num} delay={i * 0.1}>
              <div className="relative flex flex-col items-center text-center gap-4 px-4">
                {i < window.DATA_STEPS.length - 1 &&
              <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-[#C8103C]/20 to-transparent" />
              }
                <div className="relative z-10 w-16 h-16 rounded-full bg-[#18121A] border border-[#C8103C]/20 flex items-center justify-center">
                  <span className="font-syne font-bold text-lg text-[#C8103C]">{step.num}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-syne font-bold text-lg text-[#F0EBF4]">{step.title}</h3>
                  <p className="text-sm text-[#9A8FA5] leading-relaxed">{step.desc}</p>
                </div>
                {i < window.DATA_STEPS.length - 1 &&
              <div className="lg:hidden w-px h-8 bg-gradient-to-b from-[#C8103C]/20 to-transparent" />
              }
              </div>
            </FadeUp>
          )}
        </div>
      </div>
    </section>);

}

// ---- Offres
function OffreCard({ offre }) {
  const [open, setOpen] = secUseState(false);
  const tagColor = offre.tagColor === "crimson" ?
  "bg-[#C8103C]/10 text-[#F03068] border-[#C8103C]/30" :
  "bg-[#7A28B8]/10 text-[#A060E0] border-[#7A28B8]/30";

  const handleCta = () => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    contact.scrollIntoView({ behavior: "smooth" });
    const sel = document.querySelector('select[name="offre"]');
    if (sel) {sel.value = offre.id;sel.dispatchEvent(new Event("change", { bubbles: true }));}
  };

  return (
    <div id={offre.anchor}
    className={`flex flex-col gap-5 rounded-2xl p-6 border transition-all duration-300 h-full ${
    offre.featured ?
    "bg-[#18121A] border-[#C8103C]/30 shadow-[0_0_40px_rgba(200,16,60,0.08)] hover:shadow-[0_0_60px_rgba(200,16,60,0.14)]" :
    "bg-[#18121A] border-white/7 hover:border-white/15"}`
    }>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${tagColor}`}>{offre.tag}</span>
        {offre.featured &&
        <span className="text-xs font-medium text-[#C8103C] border border-[#C8103C]/30 px-2.5 py-1 rounded-full">Recommandé</span>
        }
      </div>

      <div>
        <h3 className="font-syne font-bold text-xl text-[#F0EBF4] mb-2">{offre.title}</h3>
        <p className="text-[#9A8FA5] text-sm leading-relaxed">{offre.desc}</p>
      </div>

      <div className="border-t border-white/10">
        <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-sm text-[#9A8FA5] hover:text-[#F0EBF4] transition-colors">
          <span>Ce qui est inclus</span>
          <Icon name="chevron-down" size={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        <div style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s ease"
        }}>
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-2 pt-1 pb-3">
              {offre.includes.map((item, i) =>
              <li key={i} className="flex items-start gap-2 text-sm text-[#9A8FA5]">
                  <Icon name="check" size={14} className="text-[#C8103C] mt-0.5 shrink-0" />
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <button onClick={handleCta}
      className={`mt-auto min-h-[44px] w-full py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
      offre.featured ? "bg-[#C8103C] hover:bg-[#F03068] text-white" : "border border-white/10 hover:border-[#C8103C]/50 text-[#F0EBF4]"}`
      }>
        {offre.cta}
      </button>
    </div>);

}

function OffresSection() {
  const firstRow = window.DATA_OFFRES.slice(0, 3);
  const secondRow = window.DATA_OFFRES.slice(3);

  return (
    <section id="offres" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <SectionEyebrow>Nos offres</SectionEyebrow>
          <SplitReveal>
            <h2 className="font-syne font-bold text-4xl sm:text-5xl text-[#F0EBF4]">Commencez où vous êtes</h2>
          </SplitReveal>
          <p className="text-[#9A8FA5] max-w-xl text-lg">
            Cinq façons de travailler ensemble. Pas d'engagement minimum sur la plupart.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {firstRow.map((offre, i) =>
            <FadeUp key={offre.id} delay={i * 0.08}><OffreCard offre={offre} /></FadeUp>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-4 lg:w-2/3 lg:mx-auto">
            {secondRow.map((offre, i) =>
            <FadeUp key={offre.id} delay={(i + 3) * 0.08}><OffreCard offre={offre} /></FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ---- Stack
function StackSection() {
  return (
    <section className="py-24 px-4 bg-[#0F0B0F]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center gap-4 mb-12">
          <SectionEyebrow>Stack technique</SectionEyebrow>
          <SplitReveal>
            <h2 className="font-syne font-bold text-4xl sm:text-5xl text-[#F0EBF4]">Des outils éprouvés</h2>
          </SplitReveal>
          <p className="text-[#9A8FA5] max-w-md">
            On utilise les meilleures technologies disponibles. Pas des frameworks exotiques — des outils fiables, maintenables, en production.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {window.DATA_STACK.map((tech, i) =>
          <FadeUp key={tech} delay={i * 0.04} as="span">
              <span className="inline-block px-4 py-2 rounded-full border border-white/10 text-sm text-[#9A8FA5] font-medium hover:border-[#C8103C]/50 hover:text-[#F0EBF4] transition-colors duration-200">
                {tech}
              </span>
            </FadeUp>
          )}
        </div>
      </div>
    </section>);

}

// ---- FAQ
function FAQSection() {
  return (
    <section id="faq" className="py-24 px-4 bg-[#0F0B0F]">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <SectionEyebrow>Questions fréquentes</SectionEyebrow>
          <SplitReveal>
            <h2 className="font-syne font-bold text-4xl sm:text-5xl text-[#F0EBF4]">Vos questions, nos réponses</h2>
          </SplitReveal>
        </div>
        <Accordion items={window.DATA_FAQ} />
      </div>
    </section>);

}

// ---- Contact
function ContactSection() {
  const [form, setForm] = secUseState({ nom: "", entreprise: "", email: "", offre: "audit", message: "" });
  const [sent, setSent] = secUseState(false);
  const [errors, setErrors] = secUseState({});

  const inputClass = "bg-[#0F0B0F] border border-white/10 text-[#F0EBF4] placeholder:text-[#6B6075] focus:border-[#C8103C]/50 focus:outline-none rounded-lg h-11 px-3";

  const validate = () => {
    const e = {};
    if (form.nom.length < 2) e.nom = "Nom requis";
    if (form.entreprise.length < 1) e.entreprise = "Entreprise requise";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide";
    if (form.message.length < 10) e.message = "Message trop court";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <SectionEyebrow>Contact</SectionEyebrow>
          <SplitReveal>
            <h2 className="font-syne font-bold text-4xl sm:text-5xl text-[#F0EBF4]">Parlons de votre projet</h2>
          </SplitReveal>
          <p className="text-[#9A8FA5] max-w-xl">
            Réponse garantie sous 24h. Pas de pression, pas de démo de 45 minutes — juste une conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <FadeUp>
            {sent ?
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#C8103C]/10 border border-[#C8103C]/30 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="font-syne font-bold text-xl text-[#F0EBF4]">Message envoyé !</h3>
                <p className="text-[#9A8FA5]">On vous répond dans les 24h.</p>
              </div> :

            <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#9A8FA5] text-sm">Prénom / Nom</label>
                    <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Laurent Martin" className={inputClass} />
                    {errors.nom && <span className="text-xs text-[#F03068]">{errors.nom}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#9A8FA5] text-sm">Entreprise</label>
                    <input value={form.entreprise} onChange={(e) => setForm({ ...form, entreprise: e.target.value })} placeholder="Mon entreprise" className={inputClass} />
                    {errors.entreprise && <span className="text-xs text-[#F03068]">{errors.entreprise}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#9A8FA5] text-sm">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="vous@entreprise.fr" className={inputClass} />
                  {errors.email && <span className="text-xs text-[#F03068]">{errors.email}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#9A8FA5] text-sm">Offre qui vous intéresse</label>
                  <select name="offre" value={form.offre} onChange={(e) => setForm({ ...form, offre: e.target.value })} className={`${inputClass} text-sm`}>
                    <option value="audit">Audit IA</option>
                    <option value="saas">Développement SaaS Custom</option>
                    <option value="coaching">Coaching Mensuel</option>
                    <option value="ateliers">Ateliers Collectifs</option>
                    <option value="membership">Membership & Formation</option>
                    <option value="autre">Autre / Je ne sais pas encore</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#9A8FA5] text-sm">Votre message</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Décrivez votre situation, vos tâches répétitives, vos questions..."
                className={`${inputClass} h-auto resize-none py-3`} />
                  {errors.message && <span className="text-xs text-[#F03068]">{errors.message}</span>}
                </div>
                <button type="submit"
              className="min-h-[44px] bg-[#C8103C] hover:bg-[#F03068] text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                  Envoyer →
                </button>
              </form>
            }
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-8">
              <div className="bg-[#18121A] border border-white/7 rounded-xl p-6 flex flex-col gap-4">
                <h3 className="font-syne font-bold text-xl text-[#F0EBF4]">Ou réservez un appel gratuit</h3>
                <p className="text-[#9A8FA5] text-sm">
                  30 minutes pour faire connaissance, comprendre votre activité et voir si on peut vous aider.
                </p>
                <a href="#" target="_blank" rel="noopener noreferrer"
                className="min-h-[44px] flex items-center justify-center gap-2 border border-white/10 hover:border-[#C8103C]/50 text-[#F0EBF4] rounded-lg transition-colors duration-200 text-sm font-medium px-4 py-3">
                  <Icon name="calendar" size={16} />
                  Réserver un créneau gratuit
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/7" />
                <span className="text-xs text-[#6B6075]">ou</span>
                <div className="flex-1 h-px bg-white/7" />
              </div>

              <div className="flex flex-col gap-4">
                <a href="mailto:contact@daddia.fr" className="flex items-center gap-3 text-[#9A8FA5] hover:text-[#F0EBF4] transition-colors">
                  <Icon name="mail" size={18} className="text-[#C8103C]" />
                  contact@daddia.fr
                </a>
                <div className="flex items-center gap-3 text-[#9A8FA5]">
                  <Icon name="map-pin" size={18} className="text-[#C8103C]" />
                  Nice (06) · PACA · France
                </div>
                <div className="flex items-center gap-3 text-[#9A8FA5]">
                  <Icon name="clock" size={18} className="text-[#C8103C]" />
                  Réponse garantie sous 24h
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>);

}

// ---- Footer
function Footer() {
  return (
    <footer className="border-t border-white/7 py-12 px-4 bg-[#070407]">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
        <span className="font-syne font-extrabold text-2xl tracking-tight">
          <span className="text-[#F0EBF4]">dadd</span>
          <span className="text-[#C8103C]">IA</span>
        </span>
        <p className="text-[#6B6075] text-sm italic">"Pas de promesses. Des outils qui tournent."</p>
        <p className="text-[#6B6075] text-sm">Nice (06) · PACA · France</p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[#6B6075] hover:text-[#F0EBF4] transition-colors text-xs font-medium tracking-wide">LinkedIn</a>
          <a href="#" className="text-[#6B6075] hover:text-[#F0EBF4] transition-colors text-xs font-medium tracking-wide">YouTube</a>
          <a href="mailto:contact@daddia.fr" className="text-[#6B6075] hover:text-[#F0EBF4] transition-colors">
            <Icon name="mail" size={18} />
          </a>
        </div>
        <p className="text-[#6B6075] text-xs border-t border-white/5 pt-6 w-full">© 2026 daddIA — Micro-entreprise</p>
      </div>
    </footer>);

}

Object.assign(window, { WhatIACanDo, ProcessSection, OffresSection, StackSection, FAQSection, ContactSection, Footer });

/* ===== navbar.jsx ===== */
// Navbar + App root

const { useState: navUseState, useEffect: navUseEffect } = React;

const NAV_LINKS = [
{ label: "L'IA pour vous", href: "ia-pour-vous" },
{ label: "Processus", href: "processus" },
{ label: "Offres", href: "offres" },
{ label: "FAQ", href: "faq" }];


function useScrollSpy(ids) {
  const [active, setActive] = navUseState(null);
  navUseEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
    ids.forEach((id) => {const el = document.getElementById(id);if (el) obs.observe(el);});
    return () => obs.disconnect();
  }, [ids.join(",")]);
  return active;
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = navUseState(false);
  const [scrolled, setScrolled] = navUseState(false);
  const active = useScrollSpy(NAV_LINKS.map((l) => l.href));

  navUseEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#070407]/90 backdrop-blur-md border-b border-white/7" : "bg-transparent"}`
      }>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#hero" onClick={(e) => {e.preventDefault();go("hero");}} className="flex items-center">
              <span className="font-syne font-extrabold text-2xl tracking-tight">
                <span className="text-[#F0EBF4]">Dadd</span>
                <span className="text-[#C8103C]">IA</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href;
                return (
                  <button key={link.href} onClick={() => go(link.href)}
                  className="relative text-sm font-medium text-[#9A8FA5] hover:text-[#F0EBF4] transition-colors duration-200 pb-1">
                    {link.label}
                    {isActive && <span className="absolute bottom-0 left-0 right-0 h-px bg-[#C8103C]" />}
                  </button>);

              })}
            </nav>

            <div className="hidden md:flex items-center">
              <button onClick={() => go("contact")}
              className="px-4 py-2 text-sm font-medium bg-[#C8103C] hover:bg-[#F03068] text-white rounded-md transition-colors duration-200">
                Nous contacter
              </button>
            </div>

            <button className="md:hidden text-[#F0EBF4] p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              <Icon name={mobileOpen ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen &&
      <div className="fixed inset-0 z-40 bg-[#070407] flex flex-col items-center justify-center gap-10" style={{ animation: "fadeIn 0.2s ease" }}>
          {NAV_LINKS.map((link, i) =>
        <button key={link.href} onClick={() => go(link.href)}
        className="text-3xl font-syne font-bold text-[#F0EBF4] hover:text-[#C8103C] transition-colors"
        style={{ animation: `slideUp 0.3s ease ${i * 0.07}s both` }}>
              {link.label}
            </button>
        )}
          <button onClick={() => go("contact")}
        className="mt-4 px-8 py-3 bg-[#C8103C] text-white font-medium rounded-md text-lg"
        style={{ animation: `slideUp 0.3s ease ${NAV_LINKS.length * 0.07}s both` }}>
            Nous contacter
          </button>
          <style>{`
            @keyframes fadeIn { from {opacity:0} to {opacity:1} }
            @keyframes slideUp { from {opacity:0; transform:translateY(20px)} to {opacity:1; transform:translateY(0)} }
          `}</style>
        </div>
      }
    </>);

}

window.Navbar = Navbar;

/* ===== app.jsx ===== */
// App root

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhatIACanDo />
        <ProcessSection />
        <OffresSection />
        <StackSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
