FROM node:18.16.0-alpine as builder

WORKDIR /app
COPY . .

#COPY package.json ./
#COPY yarn.lock ./
#COPY codegen.yml ./
#COPY tsconfig.json ./
#COPY src ./src
#COPY public ./public


RUN apk add --no-cache libc6-compat git \
 && yarn install --frozen-lockfile \
 && yarn build

FROM nginx:1.19-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/build /usr/share/nginx/html
