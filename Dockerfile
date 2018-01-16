FROM "node:alpine"

RUN mkdir -p home/node/api

WORKDIR home/node/api

COPY . .

RUN npm install

CMD ["npm", "run", "start"]

EXPOSE 3000