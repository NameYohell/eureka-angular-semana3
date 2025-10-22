# 🚀 Eureka App - Angular Standalone Project

Una aplicación Angular moderna construida con arquitectura standalone (sin AppModule) utilizando las últimas versiones del framework y mejores prácticas de desarrollo.

## 📋 Características

- ✅ **Angular 20.3.4** - Última versión estable
- ✅ **Arquitectura Standalone** - Sin dependencia de AppModule tradicional
- ✅ **Tailwind CSS 4.1.14** - Framework CSS moderno para diseño responsivo
- ✅ **TypeScript** - Tipado fuerte y moderno
- ✅ **Routing Configurado** - Navegación mediante provideRouter
- ✅ **Componentes Modulares** - Estructura organizada por funcionalidades
- ✅ **Diseño Responsivo** - Adaptable a diferentes dispositivos
- ✅ **Docker Ready** - Containerización completa con Docker y Docker Compose
- ✅ **Multi-stage Build** - Optimización para producción con Nginx
- ✅ **Hot Reload** - Desarrollo con recarga automática en contenedor

## 🏗️ Estructura del Proyecto

```
eureka-app/
├── src/
│   ├── app/
│   │   ├── app/                    # Componente raíz
│   │   │   ├── app.ts             # Lógica del componente principal
│   │   │   └── app.html           # Template con navegación
│   │   ├── pages/                 # Páginas de la aplicación
│   │   │   ├── home/              # Página de inicio
│   │   │   │   └── home.component.ts
│   │   │   ├── list/              # Página de lista con mock data
│   │   │   │   └── list.component.ts
│   │   │   └── about/             # Página acerca de
│   │   │       └── about.component.ts
│   │   ├── app.config.ts          # Configuración de la aplicación
│   │   └── app.routes.ts          # Definición de rutas
│   ├── main.ts                    # Punto de entrada de la aplicación
│   ├── styles.css                 # Estilos globales con Tailwind
│   └── index.html                 # HTML principal
├── Dockerfile                     # Imagen Docker para producción
├── Dockerfile.dev                 # Imagen Docker para desarrollo
├── docker-compose.yml             # Orquestación de contenedores
├── nginx.conf                     # Configuración del servidor Nginx
├── .dockerignore                  # Archivos ignorados por Docker
├── tailwind.config.ts             # Configuración de Tailwind CSS
├── package.json                   # Dependencias del proyecto
└── README.md                      # Este archivo
```

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Angular | 20.3.4 | Framework principal |
| Angular CLI | 20.3.5 | Herramientas de desarrollo |
| TypeScript | ~5.9.2 | Lenguaje de programación |
| Tailwind CSS | 4.1.14 | Framework CSS |
| Node.js | 22.20.0 | Runtime de JavaScript |
| npm | 10.9.3 | Gestor de paquetes |
| Docker | Latest | Containerización |
| Nginx | Alpine | Servidor web para producción |

## ⚡ Instalación y Configuración

### 🐳 Opción 1: Instalación con Docker (Recomendado)

#### Prerrequisitos
- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

#### 🚀 Ejecutar en Producción
```bash
# Clonar el repositorio
git clone <https://github.com/NameYohell/eureka-angular-semana3.git>
cd eureka-angular-semana3

# Construir y ejecutar con Docker Compose
docker-compose up -d

# La aplicación estará disponible en http://localhost:8080
```

#### 🛠️ Ejecutar en Desarrollo (con hot reload)
```bash
# Ejecutar en modo desarrollo
docker-compose --profile dev up -d

# La aplicación estará disponible en http://localhost:4200
# Los cambios se reflejarán automáticamente
```

#### 📦 Comandos Docker Útiles
```bash
# Ver logs de la aplicación
docker-compose logs -f eureka-app

# Detener los contenedores
docker-compose down

# Reconstruir las imágenes
docker-compose up --build

# Ejecutar comandos dentro del contenedor
docker-compose exec eureka-app sh
```

### 💻 Opción 2: Instalación Local

#### Prerrequisitos
- Node.js 22.20.0 o superior
- npm 10.9.3 o superior

#### 🚀 Pasos de Instalación

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd eureka-angular-semana3
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Verificar Configuración de Tailwind CSS
El proyecto ya incluye Tailwind CSS configurado. Verifica que el archivo `tailwind.config.ts` esté presente:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
```

### 4. Ejecutar la Aplicación
```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

## 📱 Funcionalidades

### 🏠 Página de Inicio (HomeComponent)
- Presentación del proyecto Eureka
- Video/imagen placeholder
- Descripción de características técnicas
- Información sobre la arquitectura

### 📊 Página de Lista (ListComponent)
- Gestión de inventario simulado
- **Mock Data incluido**: 8 productos de ejemplo
- Dashboard con estadísticas
- Tabla responsiva con filtros visuales
- Estados: Activo, Inactivo, Pendiente

### 👤 Página Acerca de (AboutComponent)
- Información del desarrollador
- Habilidades técnicas con barras de progreso
- Experiencia profesional
- Enlaces a redes sociales
- Diseño tipo portfolio

### 🧭 Navegación
- Menú responsive con hamburguesa en móviles
- Navegación sticky en desktop
- Indicadores visuales de página activa
- Footer informativo

## 🔧 Comandos Disponibles

### 🐳 Comandos Docker
```bash
# Producción
docker-compose up -d                    # Ejecutar en producción (puerto 8080)
docker-compose down                     # Detener contenedores
docker-compose up --build              # Reconstruir y ejecutar
docker-compose logs -f eureka-app       # Ver logs en tiempo real

# Desarrollo
docker-compose --profile dev up -d      # Ejecutar en desarrollo (puerto 4200)
docker-compose --profile dev down       # Detener desarrollo

# Gestión de imágenes
docker build -t eureka-app .            # Construir imagen manualmente
docker run -p 8080:80 eureka-app        # Ejecutar contenedor manualmente
```

### 💻 Comandos Locales
```bash
# Desarrollo
npm start                 # Inicia servidor de desarrollo (puerto 4200)
npm run build            # Construye para producción
npm run watch            # Construye en modo watch
npm test                 # Ejecuta pruebas unitarias

# Angular CLI
ng serve                 # Servidor de desarrollo
ng build                 # Construcción de producción
ng test                  # Pruebas unitarias
ng generate component <name> --standalone  # Generar componente standalone
```

## 🚀 Creación de Componentes Standalone

Para crear nuevos componentes standalone (recomendado para este proyecto):

```bash
# Generar componente standalone
ng generate component pages/nueva-pagina --standalone

# Generar servicio
ng generate service services/mi-servicio

# Generar guardia de ruta
ng generate guard guards/mi-guard
```

## 🎨 Personalización de Estilos

### Usando Tailwind CSS
El proyecto utiliza Tailwind CSS. Puedes personalizar:

1. **Colores personalizados** en `tailwind.config.ts`
2. **Clases utilitarias** directamente en los templates
3. **Componentes reutilizables** en `styles.css`

### Ejemplo de personalización:
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'brand-blue': '#1e40af',
      'brand-green': '#059669',
    }
  }
}
```

## 📚 Arquitectura Standalone

Este proyecto utiliza la nueva arquitectura standalone de Angular 20:

### ✅ Ventajas
- **Sin AppModule**: Eliminación del módulo raíz tradicional
- **Lazy Loading Nativo**: Carga diferida mejorada
- **Bundle Size Menor**: Aplicación más ligera
- **Tree Shaking Mejorado**: Eliminación de código no utilizado
- **Configuración Simplificada**: Menos boilerplate

### 🔧 Configuración Principal

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

```typescript
// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
```

## 🌐 Rutas y Navegación

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent) 
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list/list.component')
      .then(m => m.ListComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component')
      .then(m => m.AboutComponent)
  },
  { path: '**', redirectTo: '/home' }
];
```

## 🔍 Datos Simulados (Mock Data)

El `ListComponent` incluye un array de productos simulados:

```typescript
// Ejemplo de estructura de datos
interface Item {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## � Información Detallada de Docker

### 📁 Archivos Docker
- **`Dockerfile`**: Imagen multi-etapa para producción con Nginx
- **`Dockerfile.dev`**: Imagen para desarrollo con hot reload
- **`docker-compose.yml`**: Orquestación completa de servicios
- **`nginx.conf`**: Configuración optimizada de Nginx para SPA
- **`.dockerignore`**: Archivos excluidos del contexto de Docker

### 🏗️ Arquitectura Multi-Stage Build
1. **Etapa Build**: Node.js Alpine para compilar la aplicación
2. **Etapa Producción**: Nginx Alpine para servir archivos estáticos

### 🚀 Características de la Imagen Docker
- **Tamaño optimizado**: ~50MB (imagen final)
- **Seguridad**: Basada en Alpine Linux
- **Performance**: Nginx con compresión gzip habilitada
- **SPA Support**: Configuración para Single Page Applications
- **Cache**: Headers optimizados para archivos estáticos

### 🌐 Puertos y Servicios
- **Producción**: `http://localhost:8080`
- **Desarrollo**: `http://localhost:4200`

### 🔧 Variables de Entorno (Desarrollo)
- `CHOKIDAR_USEPOLLING=true`: Habilita polling para file watching en contenedores

## �👨‍💻 Autor

**Yohel Vasquez**
- Portfolio: [tu-portfolio.com](#)
- GitHub: [@tu-usuario](#)
- LinkedIn: [Yohel Vasquez](#)

## 🆘 Solución de Problemas

### Problemas con Docker
```bash
# Error de permisos en Windows
docker-compose down
docker system prune -a
docker-compose up --build

# Ver logs detallados
docker-compose logs -f

# Acceder al contenedor
docker-compose exec eureka-app sh
```

### Problema: Error al iniciar la aplicación
```bash
# Limpiar cache de npm
npm cache clean --force
npm install

# Reinstalar Angular CLI
npm uninstall -g @angular/cli
npm install -g @angular/cli@20.3.5
```

### Problema: Estilos de Tailwind no se aplican
```bash
# Verificar configuración
cat tailwind.config.ts

# Reconstruir el proyecto
npm run build
```

### Problema: Errores de TypeScript
```bash
# Verificar versión
npx tsc --version

# Limpiar y reconstruir
rm -rf node_modules
npm install
ng build
```

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda:

1. Revisa la [documentación oficial de Angular](https://angular.dev)
2. Consulta la [documentación de Tailwind CSS](https://tailwindcss.com/docs)
3. Abre un [issue en GitHub](link-to-issues)

---

⭐ **¡Si este proyecto te fue útil, no olvides darle una estrella!** ⭐