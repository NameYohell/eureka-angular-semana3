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

# Remover la configuración por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Crear directorio temporal y copiar archivos compilados
RUN mkdir -p /tmp/dist
COPY --from=build /app/dist/ /tmp/dist/

# Script para encontrar y copiar los archivos correctos
RUN if [ -d "/tmp/dist/eureka-app/browser" ]; then \
        cp -r /tmp/dist/eureka-app/browser/* /usr/share/nginx/html/; \
    elif [ -d "/tmp/dist/eureka-app" ]; then \
        cp -r /tmp/dist/eureka-app/* /usr/share/nginx/html/; \
    else \
        cp -r /tmp/dist/* /usr/share/nginx/html/; \
    fi && \
    rm -rf /tmp/dist

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]