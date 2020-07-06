FROM node:boron
COPY ./package.json .
RUN apt-get update && apt-get install -y mongodb
RUN npm install
COPY . .
ENTRYPOINT [ "npm", "run", "devStart" ]
EXPOSE 5000