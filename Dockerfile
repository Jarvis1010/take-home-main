# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app
COPY . .
# COPY package.json .
# COPY yarn.lock .
# COPY ./backend/ /backend/ ./frontend/ /frontend/
RUN yarn install
CMD ["yarn", "start"]
EXPOSE 3000
