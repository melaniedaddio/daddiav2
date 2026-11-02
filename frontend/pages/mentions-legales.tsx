import Link from "next/link"

import { LegalPage, LegalSection, ToComplete } from "@/components/layout/LegalPage"
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site"

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" description="Mentions légales du site daddIA : éditeur, hébergeur, directeur de publication." updated="octobre 2026">
      <LegalSection title="Éditeur du site">
        <ul className="flex flex-col gap-1.5">
          <li>
            Nom commercial : <span className="text-[#F0EBF4]">daddIA</span>
          </li>
          <li>
            Responsable : <ToComplete>[À COMPLÉTER : prénom et nom de l&apos;entrepreneur]</ToComplete>
          </li>
          <li>Statut : micro-entreprise (entrepreneur individuel)</li>
          <li>
            SIRET : <ToComplete>[À COMPLÉTER : numéro SIRET]</ToComplete>
          </li>
          <li>
            Adresse de contact : <ToComplete>[À COMPLÉTER : adresse postale]</ToComplete>, Nice (06)
          </li>
          <li>
            Email :{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#F0EBF4] underline underline-offset-2 hover:text-[#F03068]">
              {CONTACT_EMAIL}
            </a>
          </li>
          <li>TVA non applicable, art. 293 B du CGI.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Directeur de la publication">
        <p>
          <ToComplete>[À COMPLÉTER : prénom et nom du directeur de la publication]</ToComplete>
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <ul className="flex flex-col gap-1.5">
          <li>
            Hébergeur : <ToComplete>[À COMPLÉTER : nom de l&apos;hébergeur du VPS]</ToComplete>
          </li>
          <li>
            Adresse : <ToComplete>[À COMPLÉTER : adresse de l&apos;hébergeur]</ToComplete>
          </li>
          <li>
            Téléphone : <ToComplete>[À COMPLÉTER : téléphone de l&apos;hébergeur]</ToComplete>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus du site {SITE_URL.replace(/^https?:\/\//, "")} (textes, mise en page, éléments graphiques) est
          la propriété de daddIA, sauf mention contraire. Toute reproduction sans autorisation préalable est interdite.
        </p>
        <p>
          Les exemples présentés sur le site (personnages, entreprises, conversations, chiffres) sont illustratifs : ils ne
          décrivent pas de clients réels.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Le traitement des informations envoyées via le formulaire de contact est décrit dans la{" "}
          <Link href="/confidentialite" className="text-[#F0EBF4] underline underline-offset-2 hover:text-[#F03068]">
            politique de confidentialité
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}
