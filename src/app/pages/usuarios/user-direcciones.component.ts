import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { DireccionService } from '../../services/direccion.service.js';
import { UsuarioService } from '../../services/usuario.service.js';
import { DireccionResponse } from '../../interfaces/direccion.interface.js';
import { UsuarioResponse } from '../../interfaces/usuario.interface.js';

@Component({
  selector: 'app-user-direcciones',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Direcciones del Usuario
                <span *ngIf="usuario" class="text-blue-600">#{{ usuario.id }}</span>
              </h1>
              <div *ngIf="usuario" class="mt-2 flex items-center">
                <div class="h-8 w-8 shrink-0">
                  <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-sm font-medium text-blue-600">{{ getInitials(usuario.nombre) }}</span>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">{{ usuario.nombre }}</p>
                  <p class="text-xs text-gray-500">{{ usuario.email }}</p>
                </div>
              </div>
            </div>
            <div class="mt-4 sm:mt-0 flex gap-3">
              <button
                (click)="toggleCreateForm()"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                {{ showCreateForm ? 'Cancelar' : 'Agregar Dirección' }}
              </button>
              <a
                routerLink="/usuarios"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Volver a Usuarios
              </a>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="bg-white rounded-lg shadow-sm p-8">
          <div class="flex items-center justify-center">
            <svg class="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="ml-2 text-gray-600">Cargando direcciones...</span>
          </div>
        </div>

        <!-- Error Messages -->
        <div *ngIf="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div class="flex">
            <div class="shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
            </div>
          </div>
        </div>

        <!-- Success Messages -->
        <div *ngIf="successMessage" class="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <div class="flex">
            <div class="shrink-0">
              <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
            </div>
            <div class="ml-auto pl-3">
              <button (click)="successMessage = ''" class="text-green-600 hover:text-green-500">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Create Form -->
        <div *ngIf="showCreateForm" class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Agregar Nueva Dirección</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Calle *</label>
              <input
                [(ngModel)]="newDireccion.calle"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese la calle y número"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Comuna *</label>
              <input
                [(ngModel)]="newDireccion.comuna"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre de la comuna"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ciudad *</label>
              <input
                [(ngModel)]="newDireccion.ciudad"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre de la ciudad"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Código Postal *</label>
              <input
                [(ngModel)]="newDireccion.codigoPostal"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12345"
              >
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">País *</label>
              <input
                [(ngModel)]="newDireccion.pais"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre del país"
              >
            </div>
          </div>
          <div class="mt-6 flex gap-3">
            <button
              (click)="createDireccion()"
              [disabled]="isCreating || !isValidDireccion()"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg *ngIf="isCreating" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isCreating ? 'Guardando...' : 'Guardar Dirección' }}
            </button>
            <button
              (click)="cancelCreate()"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="!isLoading && direcciones.length === 0 && !errorMessage && !showCreateForm" class="bg-white rounded-lg shadow-sm p-8">
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No hay direcciones registradas</h3>
            <p class="mt-1 text-sm text-gray-500">Comienza agregando la primera dirección para este usuario.</p>
            <div class="mt-6">
              <button
                (click)="toggleCreateForm()"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Agregar Primera Dirección
              </button>
            </div>
          </div>
        </div>

        <!-- Direcciones List -->
        <div *ngIf="!isLoading && direcciones.length > 0" class="space-y-4">
          <div *ngFor="let direccion of direcciones; trackBy: trackByDireccion" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center mb-3">
                  <svg class="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900">Dirección #{{ direccion.id }}</h3>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span class="font-medium text-gray-900">Calle:</span> {{ direccion.calle }}
                  </div>
                  <div>
                    <span class="font-medium text-gray-900">Comuna:</span> {{ direccion.comuna }}
                  </div>
                  <div>
                    <span class="font-medium text-gray-900">Ciudad:</span> {{ direccion.ciudad }}
                  </div>
                  <div>
                    <span class="font-medium text-gray-900">Código Postal:</span> {{ direccion.codigoPostal }}
                  </div>
                  <div class="md:col-span-2">
                    <span class="font-medium text-gray-900">País:</span> {{ direccion.pais }}
                  </div>
                </div>
                
                <!-- Full Address -->
                <div class="mt-4 p-3 bg-gray-50 rounded-md">
                  <p class="text-sm text-gray-700">
                    <span class="font-medium">Dirección completa:</span><br>
                    {{ getFullAddress(direccion) }}
                  </p>
                </div>
              </div>
              
              <div class="ml-4 flex space-x-2">
                <button
                  (click)="editDireccion(direccion)"
                  class="text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-50 transition-colors"
                  title="Editar dirección"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button
                  (click)="confirmDeleteDireccion(direccion)"
                  class="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                  title="Eliminar dirección"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserDireccionesComponent implements OnInit {
  usuario: UsuarioResponse | null = null;
  direcciones: DireccionResponse[] = [];
  usuarioId: number = 0;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showCreateForm = false;
  isCreating = false;
  
  newDireccion = {
    calle: '',
    comuna: '',
    ciudad: '',
    codigoPostal: '',
    pais: ''
  };

  constructor(
    private direccionService: DireccionService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.usuarioId || isNaN(this.usuarioId)) {
      this.errorMessage = 'ID de usuario inválido';
      return;
    }
    
    this.loadUsuario();
    this.loadDirecciones();
  }

  loadUsuario(): void {
    this.usuarioService.getUsuario(this.usuarioId).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar la información del usuario';
      }
    });
  }

  loadDirecciones(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.direccionService.getDireccionesPorUsuario(this.usuarioId).subscribe({
      next: (direcciones) => {
        this.direcciones = direcciones;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error al cargar las direcciones';
        this.isLoading = false;
      }
    });
  }

  getInitials(nombre: string): string {
    return nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getFullAddress(direccion: DireccionResponse): string {
    return `${direccion.calle}, ${direccion.comuna}, ${direccion.ciudad} ${direccion.codigoPostal}, ${direccion.pais}`;
  }

  trackByDireccion(index: number, direccion: DireccionResponse): number {
    return direccion.id;
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.resetNewDireccion();
    }
  }

  isValidDireccion(): boolean {
    return !!(
      this.newDireccion.calle.trim() &&
      this.newDireccion.comuna.trim() &&
      this.newDireccion.ciudad.trim() &&
      this.newDireccion.codigoPostal.trim() &&
      this.newDireccion.pais.trim()
    );
  }

  createDireccion(): void {
    if (!this.isValidDireccion()) return;

    this.isCreating = true;
    this.errorMessage = '';

    const direccionData = {
      ...this.newDireccion,
      usuarioId: this.usuarioId
    };

    this.direccionService.createDireccion(direccionData).subscribe({
      next: (response) => {
        this.successMessage = 'Dirección creada exitosamente';
        this.direcciones.push(response);
        this.resetNewDireccion();
        this.showCreateForm = false;
        this.isCreating = false;
        
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error al crear la dirección';
        this.isCreating = false;
      }
    });
  }

  resetNewDireccion(): void {
    this.newDireccion = {
      calle: '',
      comuna: '',
      ciudad: '',
      codigoPostal: '',
      pais: ''
    };
  }

  cancelCreate(): void {
    this.resetNewDireccion();
    this.showCreateForm = false;
  }

  editDireccion(direccion: DireccionResponse): void {
    // Por ahora, vamos a mostrar un alert con la funcionalidad
    alert(`Funcionalidad de edición para la dirección #${direccion.id} se implementará próximamente`);
  }

  confirmDeleteDireccion(direccion: DireccionResponse): void {
    if (confirm(`¿Está seguro que desea eliminar la dirección "${this.getFullAddress(direccion)}"?`)) {
      this.deleteDireccion(direccion.id);
    }
  }

  deleteDireccion(direccionId: number): void {
    this.direccionService.deleteDireccion(direccionId).subscribe({
      next: () => {
        this.successMessage = 'Dirección eliminada exitosamente';
        this.direcciones = this.direcciones.filter(d => d.id !== direccionId);
        
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error al eliminar la dirección';
      }
    });
  }
}