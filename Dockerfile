FROM public.ecr.aws/bitnami/node:17

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install
#RUN npm ci --only=production
RUN npm run build

COPY . .

EXPOSE 8080

CMD [ "node", "./dist/server.js"]