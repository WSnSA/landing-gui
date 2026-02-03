FROM node:22-alpine

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . .
RUN pnpm run build

EXPOSE 5173
CMD ["pnpm", "exec", "vite", "preview", "--host"]
