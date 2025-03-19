# react için node image gerekli
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

# bağımlılıkları yüklüyoruz
RUN npm install

# react uygulamasını derle
COPY . ./
RUN npm run build

# üretim için bir nginx serveri kullanıyoruz
FROM nginx:alpine

# nginx ile build edilen React uygulamasını sunuyoruz
COPY --from=build /app/dist /usr/share/nginx/html 

# 80 portunu açıyoruz
EXPOSE 80

# Uygulamayı başlatıyoruz
CMD [ "nginx","-g","daemon off;"]