import "@/styles/globals.css"

import type { AppProps } from "next/app"
import { DM_Sans, Syne } from "next/font/google"

import { CookieBanner } from "@/components/common/CookieBanner"
import { CustomCursor } from "@/components/common/CustomCursor"

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-syne", display: "swap" })
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-dm-sans", display: "swap" })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${syne.variable} ${dmSans.variable} font-dm-sans`}>
      <Component {...pageProps} />
      <CustomCursor />
      <CookieBanner />
    </div>
  )
}
