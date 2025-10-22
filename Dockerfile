# Multi-stage build para optimizar el tamaño de la imagen

# Etapa 1: Build de la aplicación
FROM node:22-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --silent

# Copiar código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servidor nginx para servir la aplicación
FROM nginx:alpine

# Copiar archivos compilados desde la etapa de build
COPY --from=build /app/dist/eureka-app /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]