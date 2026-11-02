import type { Offer } from "@/types/offer"

// PRD §9.3 — texte validé, transcrit fidèlement.
export const outilSurMesure: Offer = {
  slug: "outil-sur-mesure",
  kind: "ponctuel",
  name: "Votre outil sur mesure",
  subtitle: "Le logiciel qui colle exactement à votre façon de travailler",
  duration: "2 à 6 semaines",
  cardPitch:
    "On construit l'application qui remplace vos fichiers Excel et vos ressaisies : en ligne, sécurisée, prête à l'emploi.",
  cardHighlights: [
    "Une maquette validée avant de construire",
    "Un outil en ligne, sécurisé, hébergé pour vous",
    "30 jours de support inclus",
  ],
  hook: "Vous jonglez entre Excel, des carnets et trois logiciels qui ne communiquent pas entre eux ? On construit l'outil qui correspond exactement à votre façon de travailler. Il est en ligne, sécurisé et prêt à l'emploi.",
  forWhom: [
    "aucun logiciel du marché ne colle vraiment à votre métier",
    "vous ressaisissez les mêmes informations à plusieurs endroits",
    "votre équipe a besoin d'un outil commun plutôt que de fichiers qui circulent par mail",
  ],
  steps: [
    { title: "Un appel de cadrage", desc: "Pour comprendre comment vous travaillez aujourd'hui." },
    {
      title: "Un devis précis",
      desc: "Ce que fait l'outil, ce qu'il ne fait pas, le délai.",
    },
    { title: "Une maquette à valider", desc: "Avant de construire quoi que ce soit." },
    { title: "La construction", desc: "Avec des points d'étape chaque semaine." },
    {
      title: "La mise en ligne",
      desc: "Et une prise en main de 30 min. Le support est inclus pendant 30 jours.",
    },
  ],
  examples: [
    {
      sector: "institut",
      title: "Institut de beauté",
      before:
        "Un agenda papier, des fiches clientes dans un classeur et les ventes de produits notées sur Excel.",
      beforeIcon: "Notebook",
      whatLabel: "L'outil",
      what: "Un espace unique avec l'agenda de chaque employée, la fiche cliente (historique des soins, allergies, préférences) et le suivi du stock.",
      afterIcon: "LayoutDashboard",
      resultLabel: "Résultat",
      result:
        "Un résumé du mois généré automatiquement (chiffre d'affaires, soins les plus vendus, clientes à relancer).",
    },
    {
      sector: "immobilier",
      title: "Agence immobilière",
      before:
        "Chaque nouveau bien demande de rédiger l'annonce, de remplir la fiche interne et de prévenir les acheteurs intéressés, ce qui fait trois saisies.",
      beforeIcon: "Repeat",
      whatLabel: "L'outil",
      what: "L'agent entre le bien une seule fois avec ses photos. L'outil rédige l'annonce, la classe et envoie automatiquement le bien aux acheteurs dont le profil correspond.",
      afterIcon: "Send",
      gain: { value: 1, unit: "seule saisie au lieu de 3" },
    },
    {
      sector: "btp",
      title: "Artisan BTP",
      before:
        "Les devis se font sur Word, le planning des équipes sur un tableau blanc et les heures sont notées sur papier.",
      beforeIcon: "ClipboardList",
      whatLabel: "L'outil",
      what: "Une application de chantier. Le chef d'équipe saisit ses heures et ses photos depuis son téléphone, les devis se génèrent à partir d'une bibliothèque de prestations, et les factures partent en un clic à la fin du chantier.",
      afterIcon: "LayoutDashboard",
    },
  ],
  visuals: [
    {
      type: "dashboard",
      title: "Aperçu — l'outil de l'artisan",
      appName: "Chantiers — Rénov'Azur",
      widgets: [
        { label: "Chantiers en cours", value: "6", icon: "Hammer" },
        { label: "Devis en attente", value: "4", hint: "dont 2 de plus de 7 jours", icon: "FileText" },
        { label: "Factures impayées", value: "3", icon: "Euro" },
        { label: "Heures saisies cette semaine", value: "212 h", icon: "Clock" },
      ],
      invoices: [
        { client: "M. Garcia", label: "Salle de bain — échue depuis 32 jours", status: "retard" },
        { client: "Mme Durand", label: "Cuisine — relancée le 12/09", status: "relancee" },
        { client: "SCI Les Pins", label: "Façade — échéance dans 5 jours", status: "echeance" },
      ],
    },
  ],
  included: [
    "Un outil en ligne avec une connexion sécurisée pour chaque utilisateur",
    "L'hébergement et la maintenance technique",
    "Un mode d'emploi",
    "Une prise en main de 30 min",
    "30 jours de support",
  ],
  excluded: [
    "Les nouvelles fonctionnalités après la livraison (devis complémentaire)",
    "La cession du code source, possible en option",
  ],
  faq: [
    {
      q: "Je ne sais pas exactement ce que je veux.",
      a: "C'est normal : c'est le rôle de l'appel de cadrage et de la maquette.",
    },
    {
      q: "Et si ça ne me plaît pas en cours de route ?",
      a: "Vous validez la maquette avant toute construction, puis vous voyez l'avancement chaque semaine.",
    },
    {
      q: "Mes données sont-elles en sécurité ?",
      a: "Elles sont hébergées en Europe, avec une connexion chiffrée et des accès par utilisateur.",
    },
    {
      q: "Qui s'en occupe après la livraison ?",
      a: "Le support est inclus 30 jours, puis une maintenance mensuelle est possible.",
    },
    {
      q: "Est-ce que l'outil m'appartient ?",
      a: "Il est réservé à votre entreprise. Le code source peut vous être cédé en option, c'est précisé dans le devis.",
    },
  ],
  related: ["audit-ia", "assistant-ia"],
  seo: {
    title: "Outil métier sur mesure avec IA — daddIA",
    description:
      "On construit l'application qui remplace vos fichiers Excel et vos ressaisies : en ligne, sécurisée, prête à l'emploi.",
  },
}
