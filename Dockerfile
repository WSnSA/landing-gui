# ---------- build stage ----------
FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . .
RUN pnpm run build

# ---------- runtime stage ----------
FROM nginx:1.27-alpine

# nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# static files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
