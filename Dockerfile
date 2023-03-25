FROM node:18.14.0-alpine AS build

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY tsconfig.json .
COPY ./src ./src
COPY ./vite.config.ts .

RUN npm run build

FROM node:18.14.0-alpine

EXPOSE 5000
WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json

RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

COPY ./.env .

ENTRYPOINT ["node", "dist/index.js"]
