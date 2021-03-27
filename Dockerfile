FROM node:14-alpine3.13

WORKDIR /fieldday

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:server"]