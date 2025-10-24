# 🚀 Eureka Angular App - Frontend

Una aplicación Angular moderna construida con arquitectura standalone que se conecta con microservicios Spring Boot para gestión de usuarios, direcciones y comentarios.

## 🎯 Características Principales

- ✅ **Angular 18+** - Framework moderno con arquitectura standalone
- ✅ **Tailwind CSS** - Framework CSS para diseño responsivo y moderno
- ✅ **TypeScript** - Tipado fuerte y desarrollo robusto
- ✅ **Reactive Forms** - Formularios reactivos con validaciones avanzadas
- ✅ **HTTP Client** - Integración completa con API REST
- ✅ **Routing** - Navegación SPA con lazy loading
- ✅ **Docker Ready** - Containerización completa para desarrollo y producción
- ✅ **Responsive Design** - Compatible con dispositivos móviles y desktop

## 🏗️ Funcionalidades

### 👥 Gestión de Usuarios
- ✅ Crear usuarios con validación de email duplicado
- ✅ Eliminación de usuarios con confirmación
- ✅ Búsqueda en tiempo real por email
- ✅ Validaciones de formulario (campos requeridos, formato email)

### 📍 Gestión de Direcciones
- ✅ Crear direcciones asociadas a usuarios
- ✅ Campos específicos para Chile (comuna, ciudad, código postal, país)
- ✅ Eliminación individual de direcciones
- ✅ Validación de campos requeridos

### 💬 Gestión de Comentarios
- ✅ Agregar comentarios a usuarios
- ✅ Eliminación individual de comentarios
- ✅ Validación de contenido

### 🔍 Funciones Adicionales
- ✅ Interfaz limpia y moderna
- ✅ Mensajes de éxito y error contextuales
- ✅ Loading states y feedback visual
- ✅ Navegación intuitiva

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Angular | 18+ | Framework principal |
| TypeScript | ~5.5.0 | Lenguaje de programación |
| Tailwind CSS | ^3.4.0 | Framework CSS |
| RxJS | ~7.8.0 | Programación reactiva |
| Docker | - | Containerización |
| Nginx | - | Servidor web (producción) |

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ y npm
- Docker y Docker Compose (opcional)
- Microservicios backend ejecutándose

### 🚀 Método 1: Desarrollo Local

```bash
# Clonar el repositorio
git clone <repository-url>
cd eureka-angular-semana3

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# La aplicación estará disponible en http://localhost:4200
```

### 🐳 Método 2: Docker para Desarrollo

```bash
# Construir y ejecutar contenedor de desarrollo
docker-compose up eureka-dev

# Con reconstrucción
docker-compose up --build eureka-dev

# La aplicación estará disponible en http://localhost:4200
```

### 🌐 Método 3: Docker para Producción

```bash
# Construir y ejecutar contenedor de producción
docker-compose up eureka-app

# Con reconstrucción
docker-compose up --build eureka-app

# La aplicación estará disponible en http://localhost:8080
```

## 🔧 Configuración de Backend

La aplicación se conecta a los siguientes microservicios (asegúrate de que estén ejecutándose):

```typescript
// Endpoints configurados en los servicios
const API_BASE_URL = 'http://localhost:8888/api';

// Microservicios:
// - Gateway: http://localhost:8888
// - Usuarios: http://localhost:8081 (a través del gateway)
// - Direcciones: http://localhost:8082 (a través del gateway)  
// - Comentarios: http://localhost:8083 (a través del gateway)
// - Eureka Server: http://localhost:8761
```

## 📋 Scripts Disponibles

```bash
# Desarrollo
npm start              # Ejecutar en modo desarrollo
npm run build          # Construir para producción
npm run watch          # Construir con observador de cambios
npm run test           # Ejecutar pruebas unitarias

# Docker
docker-compose up eureka-dev    # Desarrollo con hot-reload
docker-compose up eureka-app    # Producción con Nginx
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── interfaces/          # Interfaces TypeScript
│   │   ├── usuario.interface.ts
│   │   ├── direccion.interface.ts
│   │   └── comentario.interface.ts
│   ├── services/           # Servicios HTTP
│   │   ├── usuario.service.ts
│   │   ├── direccion.service.ts
│   │   └── comentario.service.ts
│   ├── pages/              # Componentes de páginas
│   │   ├── home/           # Página de inicio
│   │   ├── usuarios/       # Gestión de usuarios
│   │   └── about/          # Información de la app
│   ├── app.config.ts       # Configuración de la app
│   ├── app.routes.ts       # Definición de rutas
│   ├── app.html           # Template principal con navbar
│   └── app.ts             # Componente raíz
├── styles.css             # Estilos globales
└── main.ts               # Punto de entrada
```

## 🌐 API Endpoints

### Usuarios
```http
GET    /api/usuarios              # Obtener todos los usuarios
POST   /api/usuarios              # Crear usuario
DELETE /api/usuarios/{id}         # Eliminar usuario
```

### Direcciones
```http
GET    /api/direcciones/usuario/{usuarioId}    # Direcciones por usuario
POST   /api/direcciones                        # Crear dirección
DELETE /api/direcciones/{id}                   # Eliminar dirección
```

### Comentarios
```http
GET    /api/comentarios/usuario/{usuarioId}    # Comentarios por usuario
POST   /api/comentarios                        # Crear comentario
DELETE /api/comentarios/{id}                   # Eliminar comentario
```

## 🐛 Solución de Problemas

### Error de conexión con backend
```bash
# Verificar que los microservicios estén ejecutándose
docker-compose ps

# Verificar logs del gateway
docker logs api-gateway
```

### Error de CORS
Los microservicios ya tienen configuración CORS habilitada. Si persiste:
1. Verificar configuración en `ApiGatewayConfig.java`
2. Reiniciar contenedores del backend

### Error de puerto ocupado
```bash
# Encontrar y terminar proceso en puerto 4200
netstat -ano | findstr :4200
taskkill /PID <process_id> /F
```

## 🚀 Despliegue en Producción

### Build de producción
```bash
# Construir aplicación optimizada
npm run build

# Los archivos estarán en dist/eureka-app/
```

### Usando Docker
```bash
# Construir imagen de producción
docker build -t eureka-angular-app .

# Ejecutar contenedor
docker run -p 8080:80 eureka-angular-app
```

## 👥 Contribución

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Soporte

Para reportar bugs o solicitar nuevas características, crear un issue en GitHub.

---

**Desarrollado con ❤️ usando Angular y Tailwind CSS**