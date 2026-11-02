import type { NextConfig } from "next"

// En développement, le backend FastAPI tourne sur :8000. On relaie /api/* vers lui pour que
// le formulaire fonctionne avec NEXT_PUBLIC_API_BASE=/api sans configuration CORS.
// En production, c'est Nginx qui route /api/* vers le backend (deploy/nginx/daddia.conf).
const devApiTarget = process.env.DEV_API_PROXY ?? "http://localhost:8000"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  poweredByHeader: false,
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return []
    return [{ source: "/api/:path*", destination: `${devApiTarget}/api/:path*` }]
  },
}

export default nextConfig
