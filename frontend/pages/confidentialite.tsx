import Link from "next/link"

import { LegalPage, LegalSection, ToComplete } from "@/components/layout/LegalPage"
import { CONTACT_EMAIL } from "@/lib/site"

const mail = (
  <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#F0EBF4] underline underline-offset-2 hover:text-[#F03068]">
    {CONTACT_EMAIL}
  </a>
)

export default function Confidentialite() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      description="Comment daddIA traite les informations envoyées via le formulaire de contact (RGPD)."
      updated="octobre 2026"
    >
      <LegalSection title="Responsable du traitement">
        <p>
          daddIA, micro-entreprise basée à Nice (06) — <ToComplete>[À COMPLÉTER : prénom et nom de l&apos;entrepreneur]</ToComplete>.
          Contact : {mail}.
        </p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>Via le formulaire de contact, nous collectons uniquement :</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>votre nom ;</li>
          <li>le nom de votre entreprise ;</li>
          <li>votre adresse email ;</li>
          <li>l&apos;offre qui vous intéresse ;</li>
          <li>votre message.</li>
        </ul>
        <p>Votre adresse IP n&apos;est pas enregistrée.</p>
      </LegalSection>

      <LegalSection title="Finalité et base légale">
        <p>Ces informations servent uniquement à vous recontacter au sujet de votre demande.</p>
        <p>Base légale : votre consentement, donné en cochant la case prévue dans le formulaire.</p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>Vos données sont conservées 3 ans après notre dernier contact, puis supprimées.</p>
      </LegalSection>

      <LegalSection title="Destinataires et sous-traitants">
        <p>Vos données sont destinées à daddIA uniquement. Elles ne sont ni vendues, ni louées, ni cédées.</p>
        <p>Elles sont traitées par deux sous-traitants techniques :</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>
            l&apos;hébergeur du site et de la base de données : <ToComplete>[À COMPLÉTER : nom de l&apos;hébergeur]</ToComplete> ;
          </li>
          <li>le service d&apos;envoi d&apos;emails : Resend, utilisé pour l&apos;accusé de réception et la notification interne.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Vous pouvez demander à tout moment l&apos;accès à vos données, leur rectification ou leur suppression, et retirer votre
          consentement, en écrivant à {mail}.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#F0EBF4] underline underline-offset-2 hover:text-[#F03068]">
            cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Le site utilise uniquement des cookies et un stockage local techniques, nécessaires à son fonctionnement (par exemple
          pour mémoriser votre choix sur la bannière d&apos;information). Aucun cookie de suivi ni de mesure d&apos;audience.
        </p>
        <p>
          Retour à l&apos;
          <Link href="/" className="text-[#F0EBF4] underline underline-offset-2 hover:text-[#F03068]">
            accueil
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}
