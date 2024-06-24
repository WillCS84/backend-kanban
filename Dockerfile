FROM node:alpine

WORKDIR /src/

COPY . .
COPY package*.json /.
COPY /prisma/ ./

# RUN rm -rf node_modules
RUN npm install
RUN npx prisma generate

EXPOSE 8081

CMD ["npx", "prisma", "db", "push" ,"&&","npm", "run", "start"]