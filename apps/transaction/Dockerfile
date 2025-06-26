FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache openssl python3 make g++

COPY apps/transaction ./

COPY prisma ./prisma

RUN npm install

ENV DB_PROVIDER=postgresql

RUN npx prisma generate

#RUN npx prisma migrate deploy

RUN npm run build

CMD ["npm", "run", "start"]