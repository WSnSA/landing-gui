# =========================
# Build stage
# =========================
FROM node:22-alpine AS build

WORKDIR /app

# pnpm ашиглана (vite 6, dependency олон тул хурдан)
RUN corepack enable

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . .
RUN pnpm run build

# =========================
# Runtime stage (nginx)
# =========================
FROM nginx:1.27-alpine

# nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
