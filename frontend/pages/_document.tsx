import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="theme-color" content="#070407" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <noscript>
          {/* Sans JavaScript : contenu visible, carte animée du hero masquée */}
          <style>{`.gsap-reveal{visibility:visible!important}.hero-card-layer,.cta-final{display:none!important}[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
