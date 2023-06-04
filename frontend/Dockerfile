FROM node:lts-hydrogen AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.23.4-bullseye AS run

COPY --from=build /app/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]
