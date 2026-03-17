FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . .
RUN pnpm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html

RUN printf '%s\n' \
'server {' \
'    listen 80;' \
'    server_name _;' \
'' \
'    root /usr/share/nginx/html;' \
'    index index.html;' \
'' \
'    location / {' \
'        try_files $uri $uri/ /index.html;' \
'    }' \
'' \
'    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {' \
'        expires 1y;' \
'        add_header Cache-Control "public, immutable";' \
'    }' \
'' \
'    gzip on;' \
'    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;' \
'}' \
> /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]