# React için Node.js image'ı kullan
FROM node:20 AS build

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package.json package-lock.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm React proje dosyalarını kopyala
COPY ./ ./

# React uygulamasını derle
RUN npm run build

# Üretim için Nginx image'ı kullan
FROM nginx:alpine

# Build edilen React uygulamasını Nginx'in varsayılan sunucu dizinine kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# 80 portunu aç
EXPOSE 80

# Nginx başlat
CMD [ "nginx", "-g", "daemon off;" ]
