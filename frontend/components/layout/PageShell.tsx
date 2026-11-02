import Head from "next/head"
import { useRouter } from "next/router"
import type { ReactNode } from "react"

import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { SITE_URL } from "@/lib/site"

/** Gabarit commun : métadonnées SEO (title, description, canonical, Open Graph), navbar, pied de page. */
export function PageShell({
  title,
  description,
  children,
  noindex = false,
}: {
  title: string
  description: string
  children: ReactNode
  noindex?: boolean
}) {
  const { asPath } = useRouter()
  const path = asPath.split(/[?#]/)[0]
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="daddIA" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary" />
        {noindex && <meta name="robots" content="noindex" />}
      </Head>
      <Navbar />
      <main id="contenu">{children}</main>
      <Footer />
    </>
  )
}
