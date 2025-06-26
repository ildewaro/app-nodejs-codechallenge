FROM node:18-alpine

WORKDIR /app

COPY apps/antifraud ./

COPY prisma ./prisma

RUN npm install

ENV DB_PROVIDER=postgresql

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start"]
