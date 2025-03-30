FROM node:latest AS build

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./ /app
RUN npm run build

LABEL name="cinconecta client"
LABEL version="1.0"

EXPOSE 5173

CMD ["npm", "run", "dev"]

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html/cinconecta
RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx/default.conf /etc/nginx/conf.d
