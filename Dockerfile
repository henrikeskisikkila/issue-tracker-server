FROM public.ecr.aws/bitnami/node:17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "node", "./dist/server.js"]