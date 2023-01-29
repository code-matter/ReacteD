FROM node:18-alpine

RUN mkdir -p /usr/app/
WORKDIR /usr/app/
copy package.json ./
RUN yarn install
COPY . .
RUN yarn build
# ENV NODE_ENV dev

EXPOSE 3000
CMD yarn start
