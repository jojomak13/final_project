FROM node:alpine
WORKDIR /app
ENV PORT 3000
ENV NODE_ENV development
COPY package.json .
RUN npm install
COPY . .
CMD npm start