FROM node:latest

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./ /app

LABEL name="cinconecta client"
LABEL version="1.0"

EXPOSE 5173

CMD ["npm", "run", "dev"]