FROM node:latest

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./ /app

RUN npm run build
RUN npm install -g serve

LABEL name="cinconecta client"
LABEL version="1.0"

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l",  "5173"]