import type { Offer } from "@/types/offer"

// PRD §9.2 — texte validé, transcrit fidèlement.
export const chatbotIa: Offer = {
  slug: "chatbot-ia",
  kind: "ponctuel",
  name: "Chatbot IA personnalisé",
  subtitle: "Un assistant qui répond à vos clients, jour et nuit",
  duration: "7 à 10 jours",
  cardPitch:
    "Un assistant sur votre site ou WhatsApp qui répond aux questions, trie les demandes et prend les rendez-vous.",
  cardHighlights: [
    "Répond 24h/24 aux questions fréquentes",
    "Ne vous transmet que les demandes sérieuses",
    "Prend les rendez-vous dans votre agenda",
  ],
  hook: "Vos clients posent toujours les mêmes questions, souvent le soir ou pendant que vous travaillez. Un assistant leur répond à votre place, 24 h sur 24, et vous transmet uniquement les demandes sérieuses, avec le rendez-vous déjà pris.",
  forWhom: [
    "vous répondez dix fois par jour aux mêmes questions (horaires, tarifs, délais, zone d'intervention)",
    "vous perdez des clients parce que vous répondez trop tard",
    "vous passez du temps au téléphone avec des gens qui ne donnent jamais suite",
  ],
  steps: [
    {
      title: "Un appel de 30 min",
      desc: "Vous nous dites quelles questions on vous pose et ce que vous voulez savoir d'un client avant de le rencontrer.",
    },
    { title: "On construit l'assistant", desc: "Avec vos informations." },
    { title: "Vous le testez", desc: "On ajuste." },
    {
      title: "Mise en ligne",
      desc: "Sur votre site ou votre WhatsApp, avec une prise en main de 20 min, où on vous montre aussi comment modifier les réponses vous-même.",
    },
    { title: "15 jours d'ajustements offerts", desc: "" },
  ],
  examples: [
    {
      sector: "institut",
      title: "Institut de beauté",
      beforeIcon: "Moon",
      whatLabel: "La situation",
      what: "Une cliente écrit à 23 h sur WhatsApp : “Vous faites les extensions de cils ? C'est combien ?” L'assistant répond avec les tarifs, propose les créneaux libres et réserve le rendez-vous.",
      afterIcon: "CalendarCheck",
      resultLabel: "Résultat",
      result: "Le lendemain matin, la gérante trouve 3 rendez-vous pris pendant la nuit.",
      gain: { value: 3, unit: "rendez-vous pris la nuit" },
    },
    {
      sector: "immobilier",
      title: "Agence immobilière",
      beforeIcon: "MessageCircle",
      whatLabel: "La situation",
      what: "Un visiteur du site demande à voir un T3. L'assistant lui demande s'il veut acheter ou louer, son budget, son secteur et si son financement est validé. Si le profil est sérieux, il propose une visite. Sinon, il lui envoie des biens plus adaptés.",
      afterIcon: "UserCheck",
      resultLabel: "Résultat",
      result: "L'agent ne reçoit que des demandes qualifiées.",
    },
    {
      sector: "btp",
      title: "Artisan BTP",
      beforeIcon: "MessageCircle",
      whatLabel: "La situation",
      what: "Un particulier demande “Vous faites les salles de bain ?”. L'assistant confirme, demande la ville, la surface et des photos, puis propose un créneau pour une visite de métré.",
      afterIcon: "ClipboardList",
      resultLabel: "Résultat",
      result: "L'artisan arrive sur place en sachant déjà de quoi il s'agit.",
    },
  ],
  visuals: [
    {
      type: "chat",
      title: "Un exemple de conversation",
      contact: "Assistant — Rénov'Azur",
      messages: [
        { from: "client", time: "21:04", text: "Bonjour, vous intervenez sur Antibes ?" },
        {
          from: "bot",
          time: "21:04",
          text: "Oui, nous intervenons sur tout le secteur Nice–Antibes. C'est pour quel type de travaux ?",
        },
        { from: "client", time: "21:05", text: "Refaire une salle de bain" },
        {
          from: "bot",
          time: "21:05",
          text: "Parfait. Pouvez-vous m'envoyer une ou deux photos ? Je vous propose ensuite un créneau pour une visite gratuite.",
        },
        { from: "client", time: "21:07", text: "", attachment: { kind: "photos", label: "2 photos" } },
      ],
    },
  ],
  included: [
    "La réponse aux questions fréquentes",
    "Les questions pour qualifier chaque demande",
    "La prise de rendez-vous",
    "L'installation sur votre site ou votre WhatsApp",
    "Un espace pour modifier vous-même les réponses",
    "Un mini mode d'emploi",
    "15 jours d'ajustements",
  ],
  excluded: [
    "La connexion à votre logiciel de gestion",
    "La logique métier complexe. Pour ces besoins, voir Votre outil sur mesure",
  ],
  excludedLinks: { 1: "outil-sur-mesure" },
  faq: [
    {
      q: "Et s'il répond n'importe quoi ?",
      a: "Il ne répond qu'à partir de vos informations. S'il ne sait pas, il vous transmet la demande.",
    },
    {
      q: "Mes clients vont savoir que c'est un robot ?",
      a: "Oui, il se présente comme votre assistant. C'est plus honnête, et vos clients l'acceptent très bien.",
    },
    {
      q: "Je dois refaire mon site ?",
      a: "Non, il s'ajoute en quelques lignes à votre site actuel.",
    },
    {
      q: "Je peux modifier ses réponses moi-même ?",
      a: "Oui. Vous avez un petit espace en ligne pour changer vous-même vos horaires, tarifs ou questions fréquentes. Les modifications sont prises en compte immédiatement, sans rien demander à personne.",
    },
  ],
  related: ["assistant-ia", "outil-sur-mesure"],
  seo: {
    title: "Chatbot IA pour site web et WhatsApp — daddIA",
    description:
      "Un assistant sur votre site ou WhatsApp qui répond aux questions, trie les demandes et prend les rendez-vous.",
  },
}
