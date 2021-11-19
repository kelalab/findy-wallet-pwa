FROM node:lts-slim as build
COPY / /app
RUN cd /app && npm i && npm run build

FROM node:lts-slim
COPY --from=build /app/build  /app
RUN npm i -g serve
ENTRYPOINT ["serve", "-s", "/app"]