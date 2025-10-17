import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

// Importar servicios e interfaces
import { UsuarioService } from '../../services/usuario.service';
import { DireccionService } from '../../services/direccion.service';
import { UsuarioResponse } from '../../interfaces/usuario.interface';
import { DireccionResponse } from '../../interfaces/direccion.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">
        Datos de la API Microservicios
      </h1>
      
      <!-- Indicador de carga -->
      <div *ngIf="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600">Cargando datos de la API...</p>
      </div>

      <!-- Mensaje de error -->
      <div *ngIf="error && !loading" class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
        <h3 class="font-bold mb-2">Error al cargar datos:</h3>
        <p>{{ error }}</p>
        <p class="mt-2 text-sm">
          Asegúrate de que la API esté ejecutándose en 
          <code class="bg-red-200 px-2 py-1 rounded">http://localhost:8080</code>
        </p>
        <button 
          (click)="loadData()" 
          class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>

      <!-- Contenido principal -->
      <div *ngIf="!loading && !error">
        <!-- Navegación por pestañas -->
        <div class="mb-6">
          <div class="flex border-b">
            <button 
              (click)="selectedTab = 'usuarios'"
              [class]="selectedTab === 'usuarios' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'"
              class="py-2 px-4 border-b-2 font-medium text-sm transition-colors"
            >
              Usuarios ({{ usuarios.length }})
            </button>
            <button 
              (click)="selectedTab = 'direcciones'"
              [class]="selectedTab === 'direcciones' ? 'border-blue-500 text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'"
              class="py-2 px-4 border-b-2 font-medium text-sm transition-colors"
            >
              Direcciones ({{ direcciones.length }})
            </button>
          </div>
        </div>

        <!-- Pestaña de Usuarios -->
        <div *ngIf="selectedTab === 'usuarios'">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Lista de Usuarios</h2>
          
          <div *ngIf="usuarios.length === 0" class="text-center py-8 text-gray-500">
            No hay usuarios disponibles
          </div>
          
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div 
              *ngFor="let usuario of usuarios" 
              class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {{ usuario.nombre.charAt(0) || 'U' }}
                </div>
                <div class="ml-3">
                  <h3 class="font-semibold text-gray-900">{{ usuario.nombre }}</h3>
                  <p class="text-sm text-gray-500">ID: {{ usuario.id }}</p>
                </div>
              </div>
              
              <div class="space-y-2 text-sm">
                <div class="flex items-center text-gray-600">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  {{ usuario.email }}
                </div>
                
                <div class="flex items-center text-gray-600" *ngIf="usuario.telefono">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  {{ usuario.telefono }}
                </div>
                
                <div class="flex items-center text-blue-600 font-medium">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                  {{ getDireccionesCount(usuario.id) }} direcciones
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pestaña de Direcciones -->
        <div *ngIf="selectedTab === 'direcciones'">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Lista de Direcciones</h2>
          
          <div *ngIf="direcciones.length === 0" class="text-center py-8 text-gray-500">
            No hay direcciones disponibles
          </div>
          
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div 
              *ngFor="let direccion of direcciones" 
              class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div class="flex items-start mb-4">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {{ direccion.ciudad.charAt(0) || 'D' }}
                </div>
                <div class="ml-3 flex-1">
                  <h3 class="font-semibold text-gray-900">{{ direccion.calle }}</h3>
                  <p class="text-sm text-gray-500">
                    Para: {{ getUsuarioName(direccion.usuarioId) }}
                  </p>
                </div>
              </div>
              
              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                  {{ direccion.ciudad }}, {{ direccion.estado }}
                </div>
                
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" clip-rule="evenodd"/>
                  </svg>
                  CP: {{ direccion.codigoPostal }}
                </div>
                
                <div class="flex items-center font-medium text-blue-600">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 4l-3.13-1.63a1 1 0 00-.74 0L9 8.5l-3.13-1.63a1 1 0 00-.74 0L2 8.5V6l3.13-1.63a1 1 0 01.74 0L9 6.5l3.13-1.63a1 1 0 01.74 0L16 6v2.5z" clip-rule="evenodd"/>
                  </svg>
                  {{ direccion.pais }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Estadísticas generales -->
        <div class="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-800">Estadísticas de la API</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div class="bg-white rounded-lg p-4">
              <div class="text-2xl font-bold text-blue-600">{{ usuarios.length }}</div>
              <div class="text-gray-600">Total Usuarios</div>
            </div>
            <div class="bg-white rounded-lg p-4">
              <div class="text-2xl font-bold text-green-600">{{ direcciones.length }}</div>
              <div class="text-gray-600">Total Direcciones</div>
            </div>
            <div class="bg-white rounded-lg p-4">
              <div class="text-2xl font-bold text-purple-600">
                {{ usuarios.length > 0 ? (direcciones.length / usuarios.length).toFixed(1) : '0' }}
              </div>
              <div class="text-gray-600">Promedio Dir/Usuario</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-spin {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class ListComponent implements OnInit, OnDestroy {
  usuarios: UsuarioResponse[] = [];
  direcciones: DireccionResponse[] = [];
  loading = true;
  error: string | null = null;
  selectedTab: 'usuarios' | 'direcciones' = 'usuarios';
  
  private destroy$ = new Subject<void>();

  constructor(
    private usuarioService: UsuarioService,
    private direccionService: DireccionService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    // Cargar usuarios y direcciones en paralelo
    combineLatest([
      this.usuarioService.getUsuarios().pipe(
        catchError(error => {
          console.error('Error cargando usuarios:', error);
          return of([]);
        })
      ),
      this.direccionService.getDirecciones().pipe(
        catchError(error => {
          console.error('Error cargando direcciones:', error);
          return of([]);
        })
      )
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ([usuarios, direcciones]) => {
        this.usuarios = usuarios;
        this.direcciones = direcciones;
        this.loading = false;
        
        if (usuarios.length === 0 && direcciones.length === 0) {
          this.error = 'No se pudieron cargar los datos. Verifique que la API esté ejecutándose en http://localhost:8080';
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message || 'Error desconocido al cargar los datos';
        console.error('Error en loadData:', error);
      }
    });
  }

  getDireccionesCount(usuarioId: number): number {
    return this.direcciones.filter(d => d.usuarioId === usuarioId).length;
  }

  getUsuarioName(usuarioId: number): string {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.nombre : `Usuario ${usuarioId}`;
  }
}