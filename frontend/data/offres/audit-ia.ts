import type { Offer } from "@/types/offer"

// PRD §9.1 — texte validé, transcrit fidèlement.
export const auditIa: Offer = {
  slug: "audit-ia",
  kind: "ponctuel",
  name: "Audit IA",
  subtitle: "Savoir exactement où l'IA peut vous faire gagner du temps",
  duration: "Environ une semaine",
  cardPitch:
    "On analyse votre activité et on vous dit précisément où, comment et combien de temps l'IA peut vous faire gagner.",
  cardHighlights: [
    "Un appel pour comprendre votre activité",
    "Un rapport clair avec 3 à 5 pistes chiffrées",
    "Un appel pour tout vous expliquer",
  ],
  hook: "Vous sentez que l'IA pourrait vous faire gagner du temps, mais vous ne savez pas par où commencer. En une semaine, on vous dit exactement où, comment, et combien de temps vous allez récupérer.",
  forWhom: [
    "vous refaites les mêmes tâches chaque semaine (relances, devis, réponses aux emails)",
    "vous entendez parler d'IA partout sans savoir ce que ça change pour vous",
    "vous voulez y voir clair avant de dépenser dans un outil",
  ],
  steps: [
    { title: "Un court questionnaire", desc: "5 questions pour préparer l'échange." },
    {
      title: "Un appel de découverte (45 à 60 min)",
      desc: "Vous nous expliquez votre quotidien, on repère ce qui vous fait perdre du temps.",
    },
    { title: "L'analyse", desc: "En 3 à 5 jours, on étudie vos process et on chiffre chaque piste." },
    {
      title: "L'appel de restitution",
      desc: "On vous présente le rapport et on répond à toutes vos questions.",
    },
    { title: "7 jours de questions", desc: "Vous pouvez nous écrire, on répond sous 24 h." },
  ],
  examples: [
    {
      sector: "institut",
      title: "Institut de beauté, 4 employées.",
      before:
        "Les rendez-vous se prennent au téléphone pendant les soins, les rappels sont faits à la main et les absences coûtent cher.",
      beforeIcon: "PhoneCall",
      whatLabel: "Ce que l'audit identifie",
      what: "Des rappels SMS automatiques, des réponses automatiques aux questions sur Instagram et une relance des clientes qui ne sont pas revenues depuis 3 mois.",
      afterIcon: "BellRing",
      resultLabel: "Gain estimé",
      result: "Environ 5 h par semaine et nettement moins d'absences.",
      gain: { value: 5, prefix: "~", unit: "h / semaine" },
    },
    {
      sector: "immobilier",
      title: "Agence immobilière, 3 agents.",
      before:
        "Une quarantaine de mails de demandes de visite par semaine, triés à la main, et des comptes-rendus de visite rédigés le soir.",
      beforeIcon: "Inbox",
      whatLabel: "Ce que l'audit identifie",
      what: "Un tri automatique des demandes (sérieuses ou non, budget, secteur) et un compte-rendu généré à partir d'une note vocale de 2 minutes.",
      afterIcon: "Mic",
      resultLabel: "Gain estimé",
      result: "Environ 6 h par semaine.",
      gain: { value: 6, prefix: "~", unit: "h / semaine" },
    },
    {
      sector: "btp",
      title: "Artisan BTP, 8 salariés.",
      before: "Les devis sont faits le dimanche soir et 15 factures attendent d'être relancées.",
      beforeIcon: "Moon",
      whatLabel: "Ce que l'audit identifie",
      what: "Un devis pré-rempli à partir des notes de chantier et des relances de paiement automatiques et polies.",
      afterIcon: "FileText",
      resultLabel: "Gain estimé",
      result: "Environ 4 h par semaine, et la trésorerie rentre plus vite.",
      gain: { value: 4, prefix: "~", unit: "h / semaine" },
    },
  ],
  visuals: [
    {
      type: "report-excerpt",
      title: "Aperçu du rapport",
      lines: [
        "Opportunité n°2 — Relances de factures automatiques",
        "Aujourd'hui : 3 h par semaine",
        "Demain : 15 min de vérification",
        "Difficulté : faible",
        "Mise en place : moins d'une semaine",
      ],
      bars: [
        { label: "Aujourd'hui", text: "3 h par semaine", minutes: 180 },
        { label: "Demain", text: "15 min de vérification", minutes: 15 },
      ],
      difficulty: "faible",
    },
  ],
  included: [
    "L'appel de découverte",
    "Un rapport clair en 5 parties (votre situation, le diagnostic, les pistes IA, le plan d'action, les prochaines étapes)",
    "L'appel de restitution",
    "7 jours de questions par email",
    "Une proposition de suite si c'est pertinent",
  ],
  excluded: [
    "Le développement des outils",
    "Le suivi au-delà de 7 jours",
    "La formation des équipes",
  ],
  faq: [
    {
      q: "Je n'utilise même pas ChatGPT, c'est grave ?",
      a: "Non, c'est justement pour ça que l'audit existe. On part de votre quotidien, pas de la technologie.",
    },
    {
      q: "Et si vous ne trouvez rien d'utile pour moi ?",
      a: "On vous le dit franchement lors de l'appel de découverte, avant que vous ne vous engagiez.",
    },
    {
      q: "Est-ce que je suis obligé de faire développer quelque chose ensuite ?",
      a: "Non. Le rapport vous appartient : vous pouvez l'appliquer seul, avec nous, ou avec quelqu'un d'autre.",
    },
    {
      q: "Que faites-vous de mes données ?",
      a: "Elles servent uniquement à préparer votre rapport. Elles restent confidentielles et ne sont jamais partagées.",
    },
  ],
  related: ["assistant-ia", "outil-sur-mesure"],
  seo: {
    title: "Audit IA pour TPE et PME — daddIA, Nice",
    description:
      "On analyse votre activité et on vous dit précisément où, comment et combien de temps l'IA peut vous faire gagner.",
  },
}
