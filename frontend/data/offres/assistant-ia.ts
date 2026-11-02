import type { Offer } from "@/types/offer"

// PRD §9.4 — texte validé, transcrit fidèlement.
// Ne jamais mentionner de nom d'agent, d'outil ou de projet interne : on parle de « votre assistant ».
export const assistantIa: Offer = {
  slug: "assistant-ia",
  kind: "abonnement",
  name: "Votre assistant IA",
  subtitle: "Un collaborateur qui travaille pour vous, tous les jours",
  duration: "Mise en place en 1 à 2 semaines",
  cardPitch:
    "Votre propre IA privée, dans une interface à votre nom : vous lui demandez tout, emails, dossiers, relances, prospection. Elle s'en occupe et apprend de vous.",
  cardHighlights: [
    "Emails, dossiers, relances, prospection",
    "Retient tout, s'améliore avec le temps",
    "Vous demande votre accord sur l'important",
  ],
  hook: "Imaginez un assistant à qui vous pouvez tout demander, dans votre propre interface, à votre nom : “Relance les devis non signés”, “Prépare-moi le dossier Dupont”, “Trouve-moi des prospects à Cannes”. Il ne se contente pas de répondre : il s'en occupe, et il vous demande votre accord avant tout ce qui compte.",
  compare: {
    title: "Chatbot ou assistant ?",
    rows: [
      { label: "Le Chatbot", text: "parle à vos clients" },
      { label: "L'Assistant", text: "travaille pour vous" },
    ],
  },
  forWhom: [
    "vos journées sont mangées par les emails, les relances et l'administratif",
    "vous n'avez pas le temps (ou le budget) d'embaucher un assistant",
    "vous voulez déléguer, pas apprendre un nouveau logiciel",
  ],
  capabilities: [
    {
      icon: "Mail",
      title: "Vos emails",
      items: [
        "Chaque matin, il trie la boîte mail et vous résume : « 3 urgents, 5 à traiter, le reste est classé ».",
        "Il prépare des brouillons de réponse, que vous validez d'un clic.",
        "Il relance automatiquement les gens qui ne vous ont pas répondu.",
      ],
      example: "Bonjour ! Ce matin : 3 urgents, 5 à traiter, le reste est classé.",
    },
    {
      icon: "FolderOpen",
      title: "Vos dossiers",
      items: [
        "Il rassemble les pièces d'un dossier client, repère ce qui manque et le réclame poliment.",
        "Il classe les factures fournisseurs et prépare l'envoi au comptable en fin de mois.",
        "Il vous alerte avant les échéances : contrats, assurances, garanties, contrôles.",
      ],
      example: "Dossier Dupont : il manque l'attestation d'assurance, je la réclame ?",
    },
    {
      icon: "Euro",
      title: "Votre argent",
      items: [
        "Il relance les impayés par étapes : aimable, puis ferme, puis il vous prévient.",
        "Il relance les devis non signés 7 jours après leur envoi.",
        "Chaque lundi, il vous envoie un point : ce qui est encaissé, ce qui est en attente, ce qui est en retard.",
      ],
      example: "Point du lundi : 2 factures encaissées, 3 en attente, 1 en retard.",
    },
    {
      icon: "Target",
      title: "Votre prospection",
      items: [
        "Il se connecte aux bases d'entreprises françaises (comme Pappers) pour trouver les sociétés qui correspondent à votre cible : secteur, taille, zone, entreprises récemment créées.",
        "Il repère aussi d'autres signaux : permis de construire déposés, appels d'offres publics.",
        "Il prospecte à votre place : il prépare des messages d'approche personnalisés, les envoie après votre validation et suit qui a répondu, et qui relancer et quand.",
      ],
      example: "J'ai trouvé 12 entreprises qui correspondent à votre cible. Messages prêts à valider.",
    },
    {
      icon: "Star",
      title: "Vos clients",
      items: [
        "Après chaque prestation, il demande un avis Google et prépare les réponses aux avis reçus.",
        "Il repère les clients qui ne sont pas revenus depuis longtemps et propose une relance.",
      ],
      example: "2 nouveaux avis Google cette semaine, j'ai préparé les réponses.",
    },
    {
      icon: "Radar",
      title: "Votre veille",
      items: [
        "Il surveille vos concurrents, les prix de vos fournisseurs et les nouvelles règles de votre secteur, et vous résume l'essentiel en 5 lignes.",
      ],
      example: "Votre veille de la semaine, en 5 lignes.",
    },
    {
      icon: "Mic",
      title: "Vos notes vocales",
      items: [
        "En voiture, vous dictez « Devis pour Mme Martin, salle de bain 6 m², faïence haut de gamme ». À votre arrivée, le brouillon de devis est prêt.",
      ],
      example: "Brouillon de devis prêt pour Mme Martin, salle de bain 6 m².",
    },
  ],
  featureSections: [
    {
      id: "interface-privee",
      eyebrow: "Votre interface privée",
      title: "Votre propre ChatGPT, mais pour votre entreprise",
      intro:
        "On vous crée une interface rien qu'à vous, à votre nom et à vos couleurs. Vous lui posez toutes vos questions comme à ChatGPT, sauf qu'elle connaît votre entreprise par cœur.",
      points: [
        {
          title: "Elle a accès à ce que vous choisissez",
          text: "Vos emails, vos documents, votre agenda, vos fichiers clients, vos devis et factures, vos procédures internes. Vous décidez source par source, et vous pouvez retirer un accès à tout moment.",
        },
        {
          title: "Vous pouvez tout lui apprendre",
          text: "Déposez vos tarifs, vos contrats types, vos fiches produits ou vos méthodes de travail. Ou dites-lui simplement « retiens que… ». Elle s'en sert ensuite dans toutes ses réponses.",
        },
        {
          title: "Pour votre équipe aussi",
          text: "Chaque collaborateur peut avoir son propre accès, avec uniquement les informations qui le concernent. Par exemple, l'assistante voit l'agenda mais pas la comptabilité.",
        },
      ],
      visual: {
        type: "private-ai",
        brandName: "Assistant — Rénov'Azur",
        brandInitials: "RA",
        sources: [
          { label: "Emails", enabled: true },
          { label: "Agenda", enabled: true },
          { label: "Documents", enabled: true },
          { label: "Devis & factures", enabled: true },
          { label: "Comptabilité", enabled: false },
        ],
        suggestions: [
          "Combien m'a rapporté M. Rossi depuis le début de l'année ?",
          "Quels devis envoyés le mois dernier n'ont pas encore été signés ?",
          "Retrouve-moi le contrat du fournisseur de carrelage et résume les conditions de retard.",
          "Prépare mon rendez-vous de demain avec Mme Durand : historique, derniers échanges, points à aborder.",
          "Rédige une réponse à ce client mécontent, avec mon ton habituel.",
        ],
        messages: [],
        answers: [
          {
            text: "Depuis janvier, M. Rossi vous a confié 3 chantiers. Les deux premiers sont réglés, le troisième est en cours.",
            sources: ["📄 Factures 2026", "✉️ Mail du 12/09"],
            table: {
              columns: ["Chantier", "Date", "Statut"],
              rows: [
                ["Cuisine", "Février", "Réglé"],
                ["Terrasse", "Mai", "Réglé"],
                ["Salle d'eau", "Septembre", "En cours"],
              ],
            },
          },
          {
            text: "3 devis envoyés le mois dernier ne sont pas encore signés. Je peux préparer une relance pour chacun.",
            sources: ["📄 Devis envoyés — août", "✉️ Mail du 12/09"],
            table: {
              columns: ["Client", "Envoyé le", "Relancé"],
              rows: [
                ["Mme Durand", "04/08", "Non"],
                ["M. Garcia", "11/08", "Oui, le 25/08"],
                ["SCI Les Pins", "22/08", "Non"],
              ],
            },
          },
          {
            text: "Voici l'essentiel du contrat avec votre fournisseur de carrelage : en cas de retard de livraison de plus de 10 jours, vous pouvez annuler la commande sans frais.",
            sources: ["📄 Contrat fournisseur.pdf"],
          },
          {
            text: "Mme Durand est cliente depuis 2024. Dernier échange : elle attend votre retour sur le devis cuisine. Points à aborder : le délai de pose et le choix de la crédence. Rappel : elle préfère être appelée.",
            sources: ["📅 Agenda", "✉️ Mail du 12/09", "📄 Devis cuisine.pdf"],
          },
          {
            text: "Voici une proposition, avec votre ton habituel : « Bonjour Monsieur, je comprends votre agacement et je vous remercie de me l'avoir signalé. Je passe vous voir jeudi pour trouver une solution ensemble. »",
            sources: ["✉️ Vos 20 derniers mails clients"],
          },
        ],
      },
    },
    {
      id: "memoire",
      eyebrow: "Il apprend et se souvient de tout",
      title: "Plus il travaille avec vous, meilleur il devient",
      points: [
        {
          title: "Il retient tout",
          text: "Vos clients, leur historique, vos fournisseurs, vos tarifs, vos habitudes. Vous n'avez jamais à lui réexpliquer quelque chose.",
        },
        {
          title: "Il apprend de vos corrections",
          text: "Vous modifiez un brouillon de mail ? La prochaine fois, il écrit directement comme vous.",
        },
        {
          title: "Il comprend vos préférences",
          text: "« Mme Durand préfère être appelée », « on ne relance jamais avant le 10 du mois », « ce fournisseur est toujours en retard ». Il l'intègre et l'applique ensuite tout seul.",
        },
        {
          title: "Il propose ses propres améliorations",
          text: "« Je remarque que vous relancez souvent ce type de devis à la main, voulez-vous que je m'en charge ? »",
        },
      ],
      visual: {
        type: "before-after",
        title: "Sa mémoire, semaine après semaine",
        variant: "phones",
        before: {
          label: "Semaine 1",
          text: "Je relance M. Garcia pour sa facture, quel ton j'adopte ?",
        },
        after: {
          label: "Mois 3",
          text: "J'ai relancé M. Garcia comme d'habitude (ton amical, il paie toujours après un rappel). Facture réglée ce matin.",
        },
        gauge: {
          label: "Ce qu'il connaît de vous",
          items: [
            { label: "Clients", value: 92 },
            { label: "Tarifs", value: 85 },
            { label: "Habitudes", value: 78 },
            { label: "Préférences", value: 70 },
          ],
        },
      },
      reassurance: [
        "Sa mémoire vous appartient : vous pouvez consulter ce qu'il sait, le corriger ou lui demander d'oublier quelque chose.",
        "Elle reste chez vous : elle n'est jamais partagée avec d'autres clients ni utilisée ailleurs.",
      ],
    },
  ],
  examples: [],
  visuals: [
    {
      type: "message-thread",
      title: "Une journée avec votre assistant",
      bySector: {
        btp: [
          {
            time: "7h30",
            from: "assistant",
            text: "Bonjour Karim. 2 mails urgents (un fournisseur en retard, une réclamation client). 1 facture impayée depuis 30 jours, je relance ?",
          },
          { time: "7h32", from: "user", text: "Oui relance." },
          {
            time: "12h15",
            from: "user",
            text: "Note vocale : devis cuisine M. Rossi",
            voice: { duration: "0:42" },
          },
          {
            time: "12h20",
            from: "assistant",
            text: "Brouillon de devis prêt, 4 850 € HT. Je l'envoie ?",
            attachment: { kind: "document", label: "Devis — cuisine M. Rossi.pdf" },
          },
          {
            time: "18h00",
            from: "assistant",
            text: "3 permis de construire déposés cette semaine à Antibes, je t'ai préparé un message pour chacun.",
          },
        ],
        institut: [
          {
            time: "8h00",
            from: "assistant",
            text: "Bonjour Sophie. 4 nouveaux avis Google cette semaine, j'ai préparé les réponses. 2 rendez-vous de cet après-midi non confirmés, je leur envoie un rappel ?",
          },
          { time: "8h02", from: "user", text: "Oui pour les deux." },
          { time: "13h10", from: "user", text: "Il reste combien de sérum vitamine C ?" },
          {
            time: "13h11",
            from: "assistant",
            text: "3 flacons. Au rythme actuel, rupture dans 10 jours. Je prépare la commande fournisseur ?",
          },
          {
            time: "19h00",
            from: "assistant",
            text: "12 clientes ne sont pas revenues depuis 3 mois. Je t'ai préparé un message personnalisé pour chacune, à valider.",
          },
        ],
        immobilier: [
          {
            time: "7h45",
            from: "assistant",
            text: "Bonjour Marc. 9 nouvelles demandes cette nuit : 3 sérieuses (financement validé), je les ai mises en tête. 1 dossier locataire incomplet, il manque l'avis d'imposition, je le réclame ?",
          },
          { time: "7h47", from: "user", text: "Oui." },
          {
            time: "15h30",
            from: "user",
            text: "Note vocale : compte-rendu visite T3 rue de France",
            voice: { duration: "1:12" },
          },
          {
            time: "15h34",
            from: "assistant",
            text: "Compte-rendu prêt et envoyé au propriétaire en brouillon. Je le valide ?",
            attachment: { kind: "document", label: "CR visite — T3 rue de France.pdf" },
          },
          {
            time: "18h30",
            from: "assistant",
            text: "5 nouvelles SCI créées ce mois-ci à Nice. Je t'ai préparé une approche pour chacune.",
          },
        ],
      },
    },
    {
      type: "security-grid",
      title: "Vos données sont protégées",
      items: [
        {
          icon: "Server",
          title: "Hébergé en Europe",
          text: "Vos données restent sur des serveurs situés dans l'Union européenne, soumis au RGPD.",
        },
        {
          icon: "Box",
          title: "Un espace rien qu'à vous",
          text: "Chaque client a son propre environnement isolé. Vos données ne sont jamais mélangées avec celles d'une autre entreprise.",
        },
        {
          icon: "Lock",
          title: "Chiffré de bout en bout",
          text: "Vos données sont chiffrées pendant leur transfert et pendant leur stockage.",
        },
        {
          icon: "KeyRound",
          title: "Vous choisissez les accès",
          text: "L'assistant ne voit que les sources que vous avez autorisées. Chaque accès peut être retiré en un clic. Pour l'interface, la connexion est personnelle et protégée par une double authentification.",
        },
        {
          icon: "Users",
          title: "Des droits par personne",
          text: "Chaque membre de l'équipe ne voit que ce qui le concerne.",
        },
        {
          icon: "ShieldCheck",
          title: "Rien d'important sans votre accord",
          text: "Envoi d'emails sensibles, paiement, suppression… Il demande toujours votre validation avant d'agir.",
        },
        {
          icon: "ScrollText",
          title: "Tout est tracé",
          text: "Un journal enregistre chaque action de l'assistant. Vous savez toujours ce qu'il a fait, quand et pourquoi.",
        },
        {
          icon: "BrainCircuit",
          title: "Vos données ne servent qu'à vous",
          text: "Elles ne sont ni revendues, ni partagées, ni utilisées pour entraîner des modèles d'IA publics. Nous travaillons avec des fournisseurs d'IA qui s'y engagent contractuellement.",
        },
      ],
      footer:
        "Vous restez propriétaire de tout : à la fin du contrat, vous récupérez vos données si vous le souhaitez, puis elles sont définitivement supprimées.",
    },
  ],
  reassurance: {
    title: "Vous gardez la main",
    items: [
      "Il ne fait rien d'important sans votre accord : envoi d'un mail sensible, paiement, suppression.",
      "Quand il ne sait pas, il vous pose la question au lieu d'inventer.",
      "Chaque mois, vous recevez un bilan : ce qu'il a fait, le temps gagné, les points à ajuster.",
    ],
  },
  steps: [
    { title: "Un appel", desc: "Pour repérer ce qui vous prend le plus de temps." },
    { title: "On choisit 2 ou 3 premières missions", desc: "" },
    {
      title: "La mise en place",
      desc: "Elle prend 1 à 2 semaines. On connecte vos outils (email, agenda, dossiers) et on crée votre interface privée, à votre nom.",
    },
    { title: "Il travaille", desc: "On le surveille et on l'ajuste en continu." },
    {
      title: "Chaque mois",
      desc: "On fait le point et vous pouvez lui confier de nouvelles missions.",
    },
  ],
  included: [
    "La mise en place et la connexion à vos outils",
    "Une interface privée à votre nom, avec des accès pour votre équipe",
    "En complément, l'accès par WhatsApp, Telegram ou email",
    "L'hébergement sécurisé en Europe, dans un espace isolé",
    "La supervision et les ajustements continus",
    "Le bilan mensuel",
    "L'ajout progressif de nouvelles missions",
  ],
  excluded: ["La création d'une application complète (voir Votre outil sur mesure)"],
  excludedLinks: { 0: "outil-sur-mesure" },
  faq: [
    {
      q: "Il a accès à mes mails, c'est sûr ?",
      a: "L'accès est limité à ce dont il a besoin, l'hébergement est sécurisé en Europe, et vous pouvez révoquer l'accès à tout moment.",
    },
    {
      q: "Et s'il fait une erreur ?",
      a: "Il demande votre validation pour tout ce qui compte, et on surveille son activité en continu.",
    },
    {
      q: "Il remplace un salarié ?",
      a: "Non. Il prend les tâches répétitives pour que vous et votre équipe vous concentriez sur l'essentiel.",
    },
    {
      q: "Je dois apprendre un logiciel ?",
      a: "Non, vous lui écrivez comme à un collègue, dans votre interface, ou sur WhatsApp ou Telegram si vous préférez.",
    },
    {
      q: "Est-ce qu'il oublie ce que je lui dis ?",
      a: "Non, il retient tout ce qui est utile à votre activité, d'une semaine à l'autre.",
    },
    {
      q: "Et s'il retient une mauvaise information ?",
      a: "Vous le corrigez simplement (“non, c'est faux, en fait…”) et il met sa mémoire à jour.",
    },
    {
      q: "Quelle différence avec l'Accompagnement ?",
      a: "L'Accompagnement vous apprend à faire. L'assistant fait pour vous.",
    },
    {
      q: "C'est comme ChatGPT ?",
      a: "Oui pour la façon de l'utiliser : vous lui posez vos questions librement. Mais il connaît votre entreprise, il a accès à vos outils, il agit pour vous, et vos données restent privées.",
    },
    {
      q: "Qu'est-ce que je peux lui apprendre ?",
      a: "Tout ce qui est utile à votre activité : tarifs, procédures, contrats types, habitudes de vos clients… Vous déposez un document ou vous lui dites “retiens que…”.",
    },
    {
      q: "Qui d'autre peut voir mes données ?",
      a: "Personne en dehors des personnes que vous autorisez. Votre espace est isolé, chiffré et hébergé en Europe.",
    },
    {
      q: "Et si j'arrête ?",
      a: "Vous récupérez vos données si vous le souhaitez, puis elles sont définitivement supprimées.",
    },
  ],
  related: ["chatbot-ia", "accompagnement-ia"],
  seo: {
    title: "Assistant IA pour dirigeants de TPE et PME — daddIA",
    description:
      "Votre propre IA privée, dans une interface à votre nom : vous lui demandez tout, emails, dossiers, relances, prospection. Elle s'en occupe et apprend de vous.",
  },
}
