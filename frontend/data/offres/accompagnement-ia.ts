import type { Offer } from "@/types/offer"

// PRD §9.5 — texte validé, transcrit fidèlement.
export const accompagnementIa: Offer = {
  slug: "accompagnement-ia",
  kind: "abonnement",
  name: "Accompagnement IA",
  subtitle:
    "Apprenez à utiliser l'IA dans votre métier, à votre rythme, avec quelqu'un à vos côtés",
  duration: "3 mois recommandés",
  cardPitch:
    "Deux rendez-vous par mois et un contact WhatsApp pour maîtriser l'IA sur vos vrais sujets. Autonome en 3 mois.",
  cardHighlights: [
    "2 rendez-vous d'une heure par mois",
    "Vos questions sur WhatsApp entre les séances",
    "Un espace personnel avec tous vos modèles",
  ],
  hook: "Vous voulez comprendre et maîtriser l'IA vous-même, pas juste la subir ? Chaque mois, on avance ensemble sur vos vrais sujets du quotidien. En 3 mois, vous êtes autonome.",
  forWhom: [
    "vous avez essayé ChatGPT mais vous ne savez pas en tirer plus que des mails",
    "vous préférez comprendre ce que vous faites plutôt que de tout déléguer",
    "vous voulez quelqu'un à qui poser vos questions au fil de l'eau",
  ],
  steps: [
    {
      title: "Un premier appel offert (30 min)",
      desc: "Pour voir où vous en êtes et ce que vous voulez gagner.",
    },
    {
      title: "Deux rendez-vous par mois (1 h)",
      desc: "En visio ou en présentiel à Nice et en région PACA.",
    },
    {
      title: "Entre les rendez-vous",
      desc: "Vous posez vos questions sur WhatsApp et vous avez une réponse sous 24 h.",
    },
    {
      title: "Après chaque séance",
      desc: "Un compte-rendu est déposé dans votre espace personnel.",
    },
    {
      title: "Au bout de 3 mois",
      desc: "On fait le bilan : vous continuez, vous volez de vos propres ailes, ou on construit un outil pour vous.",
    },
  ],
  visuals: [
    {
      type: "timeline",
      title: "Votre parcours sur 3 mois",
      variant: "journey",
      items: [
        {
          label: "Mois 1",
          title: "Les bases",
          text: "Choisir les bons outils, bien formuler ses demandes, et gagner du temps dès la première semaine.",
          icon: "Lightbulb",
        },
        {
          label: "Mois 2",
          title: "Votre métier",
          text: "Appliquer l'IA à vos tâches précises (devis, mails, contenus, analyse).",
          icon: "Wrench",
        },
        {
          label: "Mois 3",
          title: "L'autonomie",
          text: "Vos propres méthodes, vos modèles réutilisables, et des réflexes acquis.",
          icon: "Rocket",
        },
      ],
    },
    {
      type: "cards",
      title: "Votre espace personnel",
      variant: "folders",
      items: [
        { title: "Comptes-rendus de séance", text: "", icon: "FileText" },
        { title: "Vos modèles de demandes validés", text: "", icon: "Layers" },
        { title: "Les outils recommandés", text: "", icon: "Wrench" },
        { title: "Votre feuille de route", text: "", icon: "Target" },
      ],
      footer: "Tout y est rangé, et ça reste à vous, même après l'accompagnement.",
    },
  ],
  examples: [
    {
      sector: "institut",
      title: "Institut de beauté",
      what: "",
      timeline: [
        {
          label: "M1",
          text: "Elle écrit ses posts Instagram et ses réponses aux avis en 5 minutes au lieu d'une heure.",
          icon: "Timer",
        },
        { label: "M2", text: "Elle crée une newsletter mensuelle pour ses clientes.", icon: "Mail" },
        {
          label: "M3",
          text: "Elle a sa propre bibliothèque de modèles prêts à l'emploi et forme elle-même ses employées.",
          icon: "BookOpen",
        },
      ],
    },
    {
      sector: "immobilier",
      title: "Agence immobilière",
      what: "",
      timeline: [
        {
          label: "M1",
          text: "Il rédige ses annonces en 2 minutes à partir de quelques mots-clés.",
          icon: "Timer",
        },
        {
          label: "M2",
          text: "Il prépare ses estimations en faisant analyser les ventes du quartier par l'IA.",
          icon: "BarChart3",
        },
        {
          label: "M3",
          text: "Il prépare ses rendez-vous vendeurs avec un argumentaire personnalisé à chaque fois.",
          icon: "UserCheck",
        },
      ],
    },
    {
      sector: "btp",
      title: "Artisan BTP",
      what: "",
      timeline: [
        { label: "M1", text: "Il dicte ses mails au lieu de les taper le soir.", icon: "Mic" },
        { label: "M2", text: "Il génère ses devis à partir de ses notes de chantier.", icon: "FileText" },
        {
          label: "M3",
          text: "Il se rend compte que certaines tâches méritent d'être entièrement automatisées, et passe à l'Assistant IA.",
          icon: "Rocket",
        },
      ],
    },
  ],
  compare: {
    title: "Accompagnement ou Assistant IA ?",
    rows: [
      { label: "Accompagnement", text: "vous apprenez à faire" },
      { label: "Assistant IA", text: "on fait pour vous" },
    ],
    note: "Beaucoup de clients commencent par l'un et finissent par combiner les deux.",
  },
  included: [
    "2 rendez-vous d'une heure par mois",
    "Les questions illimitées sur WhatsApp entre les séances",
    "Un compte-rendu après chaque séance",
    "L'espace personnel",
    "L'accès prioritaire aux ateliers",
  ],
  excluded: ["Le développement d'outils (voir les offres dédiées)"],
  faq: [
    {
      q: "Je pars de zéro, c'est trop tôt pour moi ?",
      a: "Non, c'est le meilleur moment pour démarrer.",
    },
    {
      q: "Combien de temps ça me prend par semaine ?",
      a: "Environ 1 à 2 h, rendez-vous compris.",
    },
    {
      q: "Je dois acheter des logiciels ?",
      a: "La plupart des outils sont gratuits ou coûtent quelques euros par mois. On vous dit lesquels valent le coup.",
    },
    {
      q: "Mes employés peuvent participer ?",
      a: "Oui, aux rendez-vous. Pour former toute l'équipe, il y a les Ateliers.",
    },
    {
      q: "Je m'engage pour combien de temps ?",
      a: "On recommande 3 mois pour voir de vrais résultats.",
    },
  ],
  related: ["ateliers-ia", "assistant-ia"],
  seo: {
    title: "Accompagnement IA pour dirigeants — daddIA, Nice",
    description:
      "Deux rendez-vous par mois et un contact WhatsApp pour maîtriser l'IA sur vos vrais sujets. Autonome en 3 mois.",
  },
}
