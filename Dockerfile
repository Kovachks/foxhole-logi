FROM node:12.22

WORKDIR /opt/fhghq

RUN mkdir .data

COPY ["package.json", "./"]
RUN npm install

ADD conf conf
ADD src src
ADD views views

COPY [ ".babelrc", "dbfunctions.js", "discordbot.js", "onetimers.js", "server.js", "socket.js", "warapi.js", "webpack.config.js", "./" ]

COPY [ ".glitch-assets", "0.26 Town List.md", "./" ]
RUN npm run-script build

ENTRYPOINT ["npm", "start"]
