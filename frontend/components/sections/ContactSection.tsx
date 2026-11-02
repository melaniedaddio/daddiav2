import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar, Clock, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { FadeUp } from "@/components/common/FadeUp"
import { SectionHeader } from "@/components/common/SectionHeader"
import { sendContact } from "@/lib/api"
import { type ContactInput, type ContactValues, contactSchema, isOfferId, OFFER_OPTIONS } from "@/lib/contact"
import { CAL_URL, CONTACT_EMAIL } from "@/lib/site"

export const SELECT_OFFER_EVENT = "daddia:select-offer"

/** Lit `?offre=` dans l'URL, qu'il soit dans la query (`/?offre=x#contact`) ou dans le hash (`/#contact?offre=x`). */
export function readOfferFromUrl(): string | null {
  const fromSearch = new URLSearchParams(window.location.search).get("offre")
  if (fromSearch) return fromSearch
  const hash = window.location.hash
  const q = hash.indexOf("?")
  return q >= 0 ? new URLSearchParams(hash.slice(q + 1)).get("offre") : null
}

const inputClass =
  "w-full bg-[#0F0B0F] border border-white/10 text-[#F0EBF4] placeholder:text-[#6B6075] focus:border-[#C8103C]/50 focus:outline-none rounded-lg h-11 px-3 aria-[invalid=true]:border-[#F03068]/60"

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <span id={id} role="alert" className="text-xs text-[#F03068]">
      {message}
    </span>
  )
}

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { nom: "", entreprise: "", email: "", offre: "audit-ia", message: "", website: "" },
  })

  // Pré-remplissage de l'offre depuis l'URL, puis à chaque clic sur « Prendre contact »
  useEffect(() => {
    const apply = (value: string | null) => {
      if (value && isOfferId(value)) setValue("offre", value)
    }
    apply(readOfferFromUrl())
    const onSelect = (e: Event) => apply((e as CustomEvent<string>).detail)
    window.addEventListener(SELECT_OFFER_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_OFFER_EVENT, onSelect)
  }, [setValue])

  const onSubmit = async (values: ContactValues) => {
    setServerError(null)
    const result = await sendContact(values)
    if (result.ok) {
      setSent(true)
      return
    }
    setServerError(
      result.reason === "rate-limit"
        ? "Trop de demandes, réessayez plus tard."
        : `Une erreur est survenue. Vous pouvez aussi nous écrire directement à ${CONTACT_EMAIL}.`,
    )
  }

  return (
    <section id="contact" className="py-24 px-4 scroll-mt-16" aria-labelledby="contact-titre">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          id="contact-titre"
          eyebrow="Contact"
          title="Parlons de votre projet"
          subtitle="Réponse sous 24h en semaine. Pas de pression, pas de démo de 45 minutes — juste une conversation."
          subtitleClassName="max-w-xl"
        />

        <div className="grid lg:grid-cols-2 gap-12">
          <FadeUp>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center" role="status">
                <div className="w-16 h-16 rounded-full bg-[#C8103C]/10 border border-[#C8103C]/30 flex items-center justify-center">
                  <span className="text-2xl" aria-hidden>
                    ✓
                  </span>
                </div>
                <h3 className="font-syne font-bold text-xl text-[#F0EBF4]">Message envoyé !</h3>
                <p className="text-[#9A8FA5]">On vous répond dans les 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative flex flex-col gap-5" aria-label="Formulaire de contact">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="nom" className="text-[#9A8FA5] text-sm">
                      Prénom et nom
                    </label>
                    <input
                      id="nom"
                      autoComplete="name"
                      placeholder="Laurent Martin"
                      className={inputClass}
                      aria-invalid={errors.nom ? true : undefined}
                      aria-describedby={errors.nom ? "nom-err" : undefined}
                      {...register("nom")}
                    />
                    <FieldError id="nom-err" message={errors.nom?.message} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="entreprise" className="text-[#9A8FA5] text-sm">
                      Entreprise
                    </label>
                    <input
                      id="entreprise"
                      autoComplete="organization"
                      placeholder="Mon entreprise"
                      className={inputClass}
                      aria-invalid={errors.entreprise ? true : undefined}
                      aria-describedby={errors.entreprise ? "entreprise-err" : undefined}
                      {...register("entreprise")}
                    />
                    <FieldError id="entreprise-err" message={errors.entreprise?.message} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[#9A8FA5] text-sm">
                    Email professionnel
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="vous@entreprise.fr"
                    className={inputClass}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "email-err" : undefined}
                    {...register("email")}
                  />
                  <FieldError id="email-err" message={errors.email?.message} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="offre" className="text-[#9A8FA5] text-sm">
                    Offre qui vous intéresse
                  </label>
                  <select id="offre" className={`${inputClass} text-sm`} {...register("offre")}>
                    {OFFER_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[#9A8FA5] text-sm">
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Décrivez votre situation, vos tâches répétitives, vos questions..."
                    className={`${inputClass} h-auto resize-none py-3`}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "message-err" : undefined}
                    {...register("message")}
                  />
                  <FieldError id="message-err" message={errors.message?.message} />
                </div>

                {/* Champ piège anti-spam : invisible pour les humains */}
                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="website">Ne pas remplir ce champ</label>
                  <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="consentement" className="flex items-start gap-3 text-sm text-[#9A8FA5] leading-relaxed cursor-pointer">
                    <input
                      id="consentement"
                      type="checkbox"
                      className="daddia-checkbox mt-0.5 shrink-0"
                      aria-invalid={errors.consentement ? true : undefined}
                      aria-describedby={errors.consentement ? "consentement-err" : undefined}
                      {...register("consentement")}
                    />
                    <span>
                      J&apos;accepte que daddIA utilise ces informations pour me recontacter.{" "}
                      <Link href="/confidentialite" className="text-[#F0EBF4] underline underline-offset-2 hover:text-[#F03068]">
                        Politique de confidentialité
                      </Link>
                    </span>
                  </label>
                  <FieldError id="consentement-err" message={errors.consentement?.message} />
                </div>

                {serverError && (
                  <p role="alert" className="text-sm text-[#F03068] bg-[#C8103C]/10 border border-[#C8103C]/30 rounded-lg px-4 py-3">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[44px] bg-[#C8103C] hover:bg-[#F03068] disabled:opacity-60 disabled:cursor-wait text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Envoi en cours…" : "Envoyer →"}
                </button>
              </form>
            )}
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-8">
              <div className="bg-[#18121A] border border-white/7 rounded-xl p-6 flex flex-col gap-4">
                <h3 className="font-syne font-bold text-xl text-[#F0EBF4]">Ou réservez un appel gratuit</h3>
                <p className="text-[#9A8FA5] text-sm">
                  30 minutes pour faire connaissance, comprendre votre activité et voir si on peut vous aider.
                </p>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center justify-center gap-2 border border-white/10 hover:border-[#C8103C]/50 text-[#F0EBF4] rounded-lg transition-colors duration-200 text-sm font-medium px-4 py-3"
                >
                  <Calendar size={16} aria-hidden />
                  Réserver un créneau gratuit
                </a>
              </div>

              <div className="flex items-center gap-4" aria-hidden>
                <div className="flex-1 h-px bg-white/7" />
                <span className="text-xs text-[#6B6075]">ou</span>
                <div className="flex-1 h-px bg-white/7" />
              </div>

              <div className="flex flex-col gap-4">
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-[#9A8FA5] hover:text-[#F0EBF4] transition-colors min-h-[44px]">
                  <Mail size={18} aria-hidden className="text-[#C8103C]" />
                  {CONTACT_EMAIL}
                </a>
                <div className="flex items-center gap-3 text-[#9A8FA5]">
                  <MapPin size={18} aria-hidden className="text-[#C8103C]" />
                  Nice (06) · PACA · France
                </div>
                <div className="flex items-center gap-3 text-[#9A8FA5]">
                  <Clock size={18} aria-hidden className="text-[#C8103C]" />
                  Réponse sous 24h en semaine
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
