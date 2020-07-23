FROM node:12.14.1-alpine
WORKDIR /app
RUN apk add tzdata &&\
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime &&\
    echo "America/Sao_Paulo" > /etc/timezone

COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3000