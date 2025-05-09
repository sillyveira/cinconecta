FROM node:21.7.1

WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./ /app

LABEL name="cinconecta"
LABEL version="1.0"

EXPOSE 3000

CMD ["node", "server.js"]

##Não está pronto para produção, ainda em nível de testes