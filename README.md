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

## ⚡ Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd eureka-app
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

```bash
# Desarrollo
npm start                 # Inicia servidor de desarrollo
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

## 👨‍💻 Autor

**Yohel Vasquez**
- Portfolio: [tu-portfolio.com](#)
- GitHub: [@tu-usuario](#)
- LinkedIn: [Yohel Vasquez](#)

## 🆘 Solución de Problemas

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