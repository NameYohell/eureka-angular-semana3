#!/bin/bash
# clean-build.sh - Script para limpiar y construir el proyecto Angular

echo "🧹 Limpiando proyecto Angular..."

# Limpiar directorios de build
echo "Eliminando node_modules, dist, .angular..."
rm -rf node_modules dist .angular

# Reinstalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Build de producción
echo "🏗️ Construyendo para producción..."
npm run build

# Verificar build
if [ -d "dist" ]; then
    echo "✅ Build completado exitosamente"
    echo "📁 Archivos generados en: dist/"
else
    echo "❌ Error en el build"
    exit 1
fi

echo "🎉 ¡Proyecto listo para despliegue!"