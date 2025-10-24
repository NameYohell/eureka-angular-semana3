@echo off
REM clean-build.bat - Script para Windows
echo 🧹 Limpiando proyecto Angular...

REM Limpiar directorios
echo Eliminando node_modules, dist, .angular...
if exist node_modules rmdir /s /q node_modules
if exist dist rmdir /s /q dist
if exist .angular rmdir /s /q .angular

REM Reinstalar dependencias
echo 📦 Instalando dependencias...
npm install

REM Build de producción
echo 🏗️ Construyendo para producción...
npm run build

REM Verificar build
if exist dist (
    echo ✅ Build completado exitosamente
    echo 📁 Archivos generados en: dist/
) else (
    echo ❌ Error en el build
    exit /b 1
)

echo 🎉 ¡Proyecto listo para despliegue!
pause