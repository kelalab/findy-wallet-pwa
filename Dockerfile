FROM node:lts-slim as build
COPY / /app
RUN cd /app && npm i && npm run build

FROM node:lts-slim as build-server
COPY /server /app
WORKDIR /app
RUN ls -lha
RUN npm i && ls -lha && npm run build

FROM node:lts-slim
COPY --from=build-server /app /app
COPY --from=build /app/build /app/static
WORKDIR /app
ENTRYPOINT ["npm", "run" ,"start"]