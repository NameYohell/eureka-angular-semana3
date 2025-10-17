import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- titulos de home -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Sistema de Microservicios
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Frontend Angular integrado con API de microservicios Spring Boot - Gestión de Usuarios y Direcciones
          </p>
        </div>

        <!-- Sección de Video/Imagen -->
        <div class="mb-12">
          <div class="relative rounded-lg overflow-hidden shadow-lg bg-white">
            <div class="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden flex items-center justify-center p-6 hover:from-blue-100 hover:to-indigo-200 transition-all duration-300">
              <img 
                src="/fotohome.png" 
                alt="Proyecto Base Angular"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              >
            </div>
          </div>
        </div>

        <!-- Descripción del Proyecto -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Acerca del Proyecto</h2>
          <div class="space-y-4 text-gray-600">
            <p class="text-lg">
              <strong>Continuación del Proyecto Semana 2:</strong> Este frontend Angular se conecta directamente con la 
              API de microservicios desarrollada en Spring Boot, creando una solución full-stack completa para la gestión 
              de usuarios y direcciones.
            </p>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Frontend (Angular 20)</h3>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Angular 20.3.4 Standalone
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Tailwind CSS 4.1.14
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    HttpClient para API calls
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Servicios e Interfaces TypeScript
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3">Backend (Microservicios)</h3>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Spring Boot 3.2.12 + Java 21
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Eureka Server (Service Discovery)
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    API Gateway (Puerto 8080)
                  </li>
                  <li class="flex items-center">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    MySQL 8 + Docker Compose
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección de Integración de API -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Integración de API</h2>
          <div class="space-y-6">
            <div class="border-l-4 border-blue-500 pl-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Microservicio de Usuarios</h3>
              <p class="text-gray-600 mb-3">
                Gestión completa de usuarios con operaciones CRUD, validaciones y búsquedas.
              </p>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-2">Endpoints Principales:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li><code class="bg-gray-200 px-1 rounded">GET /usuarios</code> - Listar todos los usuarios</li>
                  <li><code class="bg-gray-200 px-1 rounded">POST /usuarios</code> - Crear nuevo usuario</li>
                  <li><code class="bg-gray-200 px-1 rounded">PUT /usuarios/{{ '{' }}id{{ '}' }}</code> - Actualizar usuario</li>
                  <li><code class="bg-gray-200 px-1 rounded">DELETE /usuarios/{{ '{' }}id{{ '}' }}</code> - Eliminar usuario</li>
                </ul>
              </div>
            </div>

            <div class="border-l-4 border-green-500 pl-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Microservicio de Direcciones</h3>
              <p class="text-gray-600 mb-3">
                Manejo de direcciones vinculadas a usuarios, con búsquedas por ciudad y código postal.
              </p>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-2">Endpoints Principales:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li><code class="bg-gray-200 px-1 rounded">GET /direcciones</code> - Listar todas las direcciones</li>
                  <li><code class="bg-gray-200 px-1 rounded">GET /direcciones/usuario/{{ '{' }}id{{ '}' }}</code> - Direcciones por usuario</li>
                  <li><code class="bg-gray-200 px-1 rounded">POST /direcciones</code> - Crear nueva dirección</li>
                  <li><code class="bg-gray-200 px-1 rounded">PUT /direcciones/{{ '{' }}id{{ '}' }}</code> - Actualizar dirección</li>
                </ul>
              </div>
            </div>

            <div class="border-l-4 border-purple-500 pl-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Arquitectura de Integración</h3>
              <p class="text-gray-600 mb-3">
                El frontend Angular se comunica con el API Gateway que distribuye las peticiones a los microservicios correspondientes.
              </p>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-2">Flujo de Comunicación:</h4>
                <div class="text-sm text-gray-600">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Angular Frontend</span>
                    <span>→</span>
                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">API Gateway :8080</span>
                    <span>→</span>
                    <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Microservicios</span>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">
                    • Eureka Server para service discovery<br>
                    • Load balancing automático<br>
                    • Manejo de errores y reintentos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}