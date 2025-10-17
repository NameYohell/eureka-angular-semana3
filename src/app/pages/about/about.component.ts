import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- seccion de headers -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Acerca del Desarrollador</h1>
          <p class="text-lg text-gray-600">Conoce al creador detrás de este proyecto</p>
        </div>

        <!-- Card del perfil -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div class="md:flex">
            <!-- imagen de perfil -->
            <div class="md:w-1/3">
              <div class="h-64 md:h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4">
                <img 
                  src="/fotoperfil.jpg" 
                  alt="Yohel Vasquez - Desarrollador Full Stack"
                  class="w-full h-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
              </div>
            </div>
            
            <!-- iNFO de perfil-->
            <div class="md:w-2/3 p-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Yohel Vasquez</h2>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Desarrollador Full Stack especializado en tecnologías modernas de JavaScript y .NET. 
                Con experiencia en Angular, React, Node.js y C#. Apasionado por crear aplicaciones 
                web escalables y mantener las mejores prácticas de desarrollo.
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Información Personal</h3>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      yohel.vasquez@3it.cl
                    </li>
                    <li class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                      </svg>
                      Santiago, Chile
                    </li>
                    <li class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                      </svg>
                      Desarrollador Full Stack
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Enlaces</h3>
                  <div class="space-y-2">
                    <a href="https://github.com/NameYohell" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"/>
                      </svg>
                      Portfolio
                    </a>
                    <a href="https://github.com/NameYohell/eureka-angular-semana3.git" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
                      </svg>
                      GitHub
                    </a>
                    <a href="https://cl.linkedin.com/in/yohelvasquez" class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tecnologías USADAS -->
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Tecnologías Frontend</h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">Angular</span>
                  <span class="text-sm text-gray-500">95%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-red-600 h-2 rounded-full" style="width: 95%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">TypeScript</span>
                  <span class="text-sm text-gray-500">90%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 90%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">Tailwind CSS</span>
                  <span class="text-sm text-gray-500">85%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-teal-600 h-2 rounded-full" style="width: 85%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">React</span>
                  <span class="text-sm text-gray-500">80%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-cyan-600 h-2 rounded-full" style="width: 80%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Tecnologías Backend</h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">Node.js</span>
                  <span class="text-sm text-gray-500">88%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full" style="width: 88%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">C# / .NET</span>
                  <span class="text-sm text-gray-500">85%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-purple-600 h-2 rounded-full" style="width: 85%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">MongoDB</span>
                  <span class="text-sm text-gray-500">75%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-800 h-2 rounded-full" style="width: 75%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700">SQL Server</span>
                  <span class="text-sm text-gray-500">80%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-orange-600 h-2 rounded-full" style="width: 80%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- seccion de experiencia -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Experiencia y Proyectos</h3>
          
          <div class="space-y-6">
            <div class="border-l-4 border-blue-500 pl-6">
              <h4 class="text-lg font-semibold text-gray-900">Proyecto Eureka Angular</h4>
              <p class="text-gray-600 mb-2">Octubre 2025</p>
              <p class="text-gray-700">
                Desarrollo de aplicación Angular standalone utilizando las últimas versiones del framework. 
                Implementación de arquitectura moderna sin módulos tradicionales y uso de Tailwind CSS 
                para el diseño responsivo.
              </p>
            </div>
            
            <div class="border-l-4 border-green-500 pl-6">
              <h4 class="text-lg font-semibold text-gray-900">Experiencia</h4>
              <p class="text-gray-600 mb-2">2023 - 2025</p>
              <p class="text-gray-700">
                Cuenta con más de un año de experiencia en desarrollo backend, trabajando con microservicios en JavaScript utilizando Node.js.. Durante este tiempo, ha explorado conceptos como diseño de APIs REST y herramientas de control de versiones como Git y GitHub, aplicándolos en entornos de aprendizaje y desarrollo práctico.
              </p>
            </div>
            
            <div class="border-l-4 border-purple-500 pl-6">
              <h4 class="text-lg font-semibold text-gray-900">Actual</h4>
              <p class="text-gray-600 mb-2">2025</p>
              <p class="text-gray-700">Actualmente se encuentra en proceso de formación en tecnologías modernas de desarrollo web, tanto en el frontend como en el backend. En el lado del cliente, está explorando Angular en profundidad, abordando su estructura clásica y moderna, incluyendo conceptos como Signals y zoneless architecture. En paralelo, continúa perfeccionando sus conocimientos en Spring Boot, con énfasis en el diseño de APIs REST y arquitectura de microservicios. Este enfoque integral le permite adquirir nuevas habilidades y desarrollar criterio para tomar decisiones fundamentadas, consolidando su perfil como desarrollador full stack.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}