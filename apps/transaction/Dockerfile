#FROM node:18-alpine

FROM node:18-bullseye


WORKDIR /app

COPY apps/transaction ./

#COPY prisma ./apps/transaction/prisma

#COPY .env .env

RUN npm install

ENV DB_PROVIDER=postgresql

RUN node prisma/set-schema.js


#RUN npx prisma generate --schema=./prisma/schema.prisma

#RUN npx prisma generate --schema=./prisma/schema.prisma
#RUN npx prisma migrate deploy --schema=./prisma/schema.prisma

RUN npm run build

#CMD ["npm", "run", "start"]
