FROM node:20-alpine AS builder
WORKDIR /app
# Les variables NEXT_PUBLIC_* sont intégrées au moment du build.
ARG NEXT_PUBLIC_CAL_URL=https://cal.com/daddia/decouverte
ARG NEXT_PUBLIC_SITE_URL=https://daddia.fr
ARG NEXT_PUBLIC_API_BASE=/api
ENV NEXT_PUBLIC_CAL_URL=$NEXT_PUBLIC_CAL_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE \
    NEXT_TELEMETRY_DISABLED=1
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
RUN adduser -D app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
USER app
EXPOSE 3000
CMD ["node", "server.js"]
