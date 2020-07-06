FROM node:latest
COPY ./package.json .
RUN echo fs.inotify.max_user_watches=524288
RUN npm install
COPY . .
ENTRYPOINT ["node","server.js"]
EXPOSE 5000