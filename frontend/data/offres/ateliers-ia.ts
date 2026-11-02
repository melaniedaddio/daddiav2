import type { Offer } from "@/types/offer"

// PRD §9.6 — texte validé, transcrit fidèlement.
// Financement : uniquement la phrase neutre validée (PRD §9.6 et §17).
export const ateliersIa: Offer = {
  slug: "ateliers-ia",
  kind: "ponctuel",
  name: "Ateliers IA",
  subtitle: "3 heures pour repartir avec des outils qui marchent, pas avec de la théorie",
  duration: "3 heures",
  cardPitch:
    "Une demi-journée en petit groupe pour apprendre en pratiquant, sur vos propres tâches.",
  cardHighlights: [
    "Groupes de 4 à 12 personnes",
    "Ouvert à tous ou réservé à votre équipe",
    "Support, modèles et replay inclus",
  ],
  hook: "Une demi-journée, un petit groupe, et vous repartez en sachant faire. On ne vous parle pas de l'avenir de l'IA : vous l'utilisez sur vos propres tâches pendant l'atelier.",
  forWhom: [
    "vous voulez découvrir l'IA concrètement sans vous engager sur plusieurs mois",
    "vous voulez que toute votre équipe s'y mette en même temps",
    "vous apprenez mieux en pratiquant qu'en lisant",
  ],
  steps: [],
  visuals: [
    {
      type: "usage-gallery",
      title: "Ce que votre équipe saura faire en repartant",
      intro:
        "Des outils simples que vous avez déjà (ChatGPT, Claude, Gemini, Copilot…), et des usages auxquels on ne pense pas. Chacun les essaie sur ses propres tâches pendant l'atelier.",
      items: [
        {
          name: "Une présentation à vos couleurs",
          icon: "Layers",
          color: "#C8103C",
          gives: ["Charte graphique.pdf", "Logo.png", "Notes de la réunion.docx"],
          request: "Fais-moi une présentation de 6 diapositives pour le point d'équipe de lundi, en respectant notre charte.",
          result: {
            kind: "slides",
            brand: "#0E7C7B",
            slides: [
              { title: "Point d'équipe — lundi", layout: "cover" },
              { title: "La semaine en chiffres", layout: "chart" },
              { title: "Nos 3 priorités", layout: "list" },
            ],
            caption: "6 diapositives, à vos couleurs et avec votre logo, prêtes à retoucher.",
          },
        },
        {
          name: "Le compte-rendu de réunion",
          icon: "Mic",
          color: "#7A28B8",
          gives: ["Enregistrement de la réunion (45 min)"],
          request: "Résume la réunion : les décisions, qui fait quoi, et pour quand.",
          result: {
            kind: "table",
            text: "4 décisions prises. Voici les actions :",
            columns: ["Action", "Qui", "Pour quand"],
            rows: [
              ["Relancer le fournisseur", "Julie", "Mercredi"],
              ["Mettre à jour le planning", "Thomas", "Vendredi"],
              ["Préparer l'offre de rentrée", "Inès", "Dans 2 semaines"],
            ],
          },
        },
        {
          name: "Un fichier Excel qui répond",
          icon: "BarChart3",
          color: "#2460D8",
          gives: ["Ventes 2026.xlsx"],
          request: "Quels produits baissent ce mois-ci par rapport au mois dernier ?",
          result: {
            kind: "chart",
            text: "Deux produits sont en baisse, surtout le n°3. Les deux autres progressent.",
            bars: [
              { label: "Produit 1", value: 78 },
              { label: "Produit 2", value: 64 },
              { label: "Produit 3", value: 31, down: true },
              { label: "Produit 4", value: 52, down: true },
            ],
          },
        },
        {
          name: "Des tickets photographiés",
          icon: "FileText",
          color: "#D98A1E",
          gives: ["12 photos de tickets et factures"],
          request: "Range ces tickets dans un tableau pour la comptabilité.",
          result: {
            kind: "table",
            text: "12 tickets lus. Voici les premiers :",
            columns: ["Date", "Fournisseur", "Catégorie"],
            rows: [
              ["02/10", "Station-service", "Déplacements"],
              ["03/10", "Papeterie du port", "Fournitures"],
              ["05/10", "Restaurant Le Marché", "Repas client"],
            ],
          },
        },
        {
          name: "Le message délicat",
          icon: "MessageCircle",
          color: "#2BB673",
          gives: ["Le mail du client mécontent"],
          request: "Propose-moi trois réponses, de la plus conciliante à la plus ferme.",
          result: {
            kind: "tones",
            options: [
              { label: "Conciliante", text: "Je comprends votre déception et je vous propose de passer dès jeudi pour trouver une solution ensemble." },
              { label: "Équilibrée", text: "Merci pour votre retour. Voici ce que nous pouvons faire, et dans quel délai." },
              { label: "Ferme", text: "Nous avons respecté les termes du devis signé. Nous restons disponibles pour en parler." },
            ],
          },
        },
        {
          name: "Un assistant pour l'équipe",
          icon: "UserCheck",
          color: "#F03068",
          gives: ["Procédures internes.docx", "Livret d'accueil.pdf"],
          request: "Qui dois-je contacter pour avoir accès à l'outil de facturation ?",
          result: {
            kind: "text",
            text: "C'est Julie, à l'administratif. La demande d'accès est expliquée page 6 du livret d'accueil. Je vous prépare le message pour elle ?",
            source: "Livret d'accueil, p. 6",
          },
        },
      ],
      footer: "Et le lendemain, chacun s'en sert sur son propre travail.",
    },
    {
      type: "cards",
      title: "Deux formules",
      items: [
        {
          title: "Ateliers ouverts",
          text: "Vous rejoignez d'autres dirigeants et indépendants. C'est l'occasion idéale pour se lancer et échanger entre pairs.",
          icon: "Users",
        },
        {
          title: "Ateliers en entreprise",
          text: "Une session réservée à votre équipe, avec des exemples adaptés à votre métier.",
          icon: "Building2",
        },
      ],
    },
    {
      type: "timeline",
      title: "Le déroulé d'un atelier",
      variant: "durations",
      items: [
        {
          label: "30 min",
          title: "Comprendre",
          text: "Ce que l'IA sait faire, et ce qu'elle ne sait pas faire.",
          minutes: 30,
          icon: "Lightbulb",
        },
        {
          label: "1 h 30",
          title: "Voir et essayer",
          text: "Des démonstrations en direct, que vous reproduisez sur votre ordinateur.",
          minutes: 90,
          icon: "Sparkles",
        },
        {
          label: "45 min",
          title: "Pratiquer sur vos tâches",
          text: "Vous travaillez sur les 3 tâches répétitives listées avant l'atelier.",
          minutes: 45,
          icon: "Wrench",
        },
        { label: "15 min", title: "Vos questions", text: "", minutes: 15, icon: "MessagesSquare" },
      ],
      footer: "Le lendemain : vous recevez le support, le replay (30 jours) et les modèles utilisés.",
    },
    {
      type: "cards",
      title: "Les thèmes",
      items: [
        {
          title: "Automatiser ses tâches répétitives",
          text: "En repartant, vous saurez repérer ce qui peut être automatisé chez vous et mettre en place votre première automatisation, par exemple une relance de facture ou une réponse type.",
          icon: "Repeat",
        },
        {
          title: "ChatGPT / Claude",
          text: "En repartant, vous saurez rédiger un mail difficile, résumer un contrat de 20 pages ou préparer un rendez-vous client en quelques minutes.",
          icon: "MessageCircle",
        },
        {
          title: "Créer son premier outil IA sans (trop) coder",
          text: "En repartant, vous saurez créer un petit assistant qui répond aux questions à partir de vos propres documents.",
          icon: "Wand2",
        },
        {
          title: "L'IA pour la relation client et la vente",
          text: "En repartant, vous saurez répondre aux avis, personnaliser vos relances et préparer des messages de prospection qui ne sonnent pas “robot”.",
          icon: "TrendingUp",
        },
      ],
    },
  ],
  examples: [],
  included: [
    "La session live de 3 h",
    "Le support PDF",
    "Les modèles utilisés",
    "Le replay pendant 30 jours",
    "L'exercice de préparation envoyé avant l'atelier",
  ],
  excluded: ["Le suivi individuel après l'atelier (voir l'Accompagnement IA)"],
  excludedLinks: { 0: "accompagnement-ia" },
  financing:
    "Pour les ateliers en entreprise, contactez-nous pour étudier les possibilités de financement.",
  faq: [
    { q: "Il faut un ordinateur ?", a: "Oui, pour pratiquer pendant l'atelier." },
    {
      q: "Je n'y connais rien, je vais être perdu ?",
      a: "Non, les groupes sont petits (4 à 12 personnes) et on avance au rythme de chacun.",
    },
    {
      q: "C'est en ligne ou en présentiel ?",
      a: "Les deux sont possibles : présentiel à Nice et en région PACA, ou en visio.",
    },
    {
      q: "Et après ?",
      a: "Si vous voulez aller plus loin, l'Accompagnement ou l'Audit prennent le relais.",
    },
  ],
  cta: { label: "Être prévenu des prochaines dates", href: "/#contact?offre=ateliers-ia" },
  related: ["accompagnement-ia", "audit-ia"],
  seo: {
    title: "Ateliers IA pour dirigeants et équipes — daddIA, Nice",
    description:
      "Une demi-journée en petit groupe pour apprendre en pratiquant, sur vos propres tâches.",
  },
}
