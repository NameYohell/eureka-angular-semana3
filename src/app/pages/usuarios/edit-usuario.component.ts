import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service.js';
import { UsuarioResponse } from '../../interfaces/usuario.interface.js';

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Editar Usuario
                <span *ngIf="usuario" class="text-gray-600 font-normal">#{{ usuario.id }}</span>
              </h1>
              <p class="mt-1 text-sm text-gray-600">
                Modifica la información del usuario seleccionado
              </p>
            </div>
            <a
              routerLink="/usuarios"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Volver a Lista
            </a>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoadingUser" class="bg-white rounded-lg shadow-sm p-8">
          <div class="flex items-center justify-center">
            <svg class="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="ml-2 text-gray-600">Cargando información del usuario...</span>
          </div>
        </div>

        <!-- Error State -->
        <div *ngIf="loadError && !isLoadingUser" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div class="flex">
            <div class="shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error al cargar usuario</h3>
              <p class="mt-1 text-sm text-red-700">{{ loadError }}</p>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div *ngIf="showSuccessMessage" class="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <div class="flex">
            <div class="shrink-0">
              <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">¡Usuario actualizado exitosamente!</h3>
              <p class="mt-1 text-sm text-green-700">Los cambios han sido guardados correctamente.</p>
            </div>
          </div>
        </div>

        <!-- Update Error Message -->
        <div *ngIf="updateError" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div class="flex">
            <div class="shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error al actualizar usuario</h3>
              <p class="mt-1 text-sm text-red-700">{{ updateError }}</p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div *ngIf="usuario && !isLoadingUser" class="bg-white rounded-lg shadow-sm p-6">
          <form [formGroup]="usuarioForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Current User Info -->
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 class="text-sm font-medium text-gray-900 mb-2">Usuario Actual</h3>
              <div class="flex items-center">
                <div class="h-12 w-12 shrink-0">
                  <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-lg font-medium text-blue-600">{{ getInitials(usuario.nombre) }}</span>
                  </div>
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-gray-900">{{ usuario.nombre }}</div>
                  <div class="text-sm text-gray-500">{{ usuario.email }} • {{ usuario.telefono }}</div>
                </div>
              </div>
            </div>

            <!-- Form Fields -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Información a Modificar</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nombre -->
                <div>
                  <label for="nombre" class="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    formControlName="nombre"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    [class.border-red-500]="usuarioForm.get('nombre')?.invalid && usuarioForm.get('nombre')?.touched"
                    placeholder="Ingrese el nombre completo"
                  >
                  <div *ngIf="usuarioForm.get('nombre')?.invalid && usuarioForm.get('nombre')?.touched" class="mt-1 text-sm text-red-600">
                    <div *ngIf="usuarioForm.get('nombre')?.errors?.['required']">El nombre es obligatorio</div>
                    <div *ngIf="usuarioForm.get('nombre')?.errors?.['minlength']">El nombre debe tener al menos 2 caracteres</div>
                    <div *ngIf="usuarioForm.get('nombre')?.errors?.['maxlength']">El nombre no puede exceder 50 caracteres</div>
                  </div>
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    formControlName="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    [class.border-red-500]="usuarioForm.get('email')?.invalid && usuarioForm.get('email')?.touched"
                    placeholder="ejemplo@correo.com"
                  >
                  <div *ngIf="usuarioForm.get('email')?.invalid && usuarioForm.get('email')?.touched" class="mt-1 text-sm text-red-600">
                    <div *ngIf="usuarioForm.get('email')?.errors?.['required']">El email es obligatorio</div>
                    <div *ngIf="usuarioForm.get('email')?.errors?.['email']">Formato de email inválido</div>
                  </div>
                  <div *ngIf="emailExistsError" class="mt-1 text-sm text-red-600">
                    Este email ya está registrado por otro usuario
                  </div>
                </div>
              </div>

              <!-- Teléfono -->
              <div class="mt-6">
                <label for="telefono" class="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  formControlName="telefono"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  [class.border-red-500]="usuarioForm.get('telefono')?.invalid && usuarioForm.get('telefono')?.touched"
                  placeholder="+1234567890 o 1234567890"
                >
                <div *ngIf="usuarioForm.get('telefono')?.invalid && usuarioForm.get('telefono')?.touched" class="mt-1 text-sm text-red-600">
                  <div *ngIf="usuarioForm.get('telefono')?.errors?.['required']">El teléfono es obligatorio</div>
                  <div *ngIf="usuarioForm.get('telefono')?.errors?.['pattern']">Formato de teléfono inválido</div>
                  <div *ngIf="usuarioForm.get('telefono')?.errors?.['minlength']">El teléfono debe tener al menos 10 dígitos</div>
                </div>
              </div>
            </div>

            <!-- Change Detection -->
            <div *ngIf="hasUnsavedChanges" class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div class="flex">
                <div class="shrink-0">
                  <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/>
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-yellow-800">
                    <strong>Tienes cambios sin guardar.</strong> Recuerda hacer clic en "Actualizar Usuario" para guardar los cambios.
                  </p>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                [disabled]="usuarioForm.invalid || isSubmitting || !hasUnsavedChanges || emailExistsError"
                class="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg *ngIf="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg *ngIf="!isSubmitting" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ isSubmitting ? 'Actualizando...' : 'Actualizar Usuario' }}
              </button>

              <button
                type="button"
                (click)="resetForm()"
                class="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Restablecer Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class EditUsuarioComponent implements OnInit {
  usuario: UsuarioResponse | null = null;
  usuarioForm!: FormGroup;
  isLoadingUser = false;
  isSubmitting = false;
  showSuccessMessage = false;
  loadError = '';
  updateError = '';
  emailExistsError = false;
  usuarioId: number = 0;
  originalFormValue: any = {};

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUsuario();
  }

  initializeForm(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[\+]?[\d\s\-\(\)]{10,}$/),
        Validators.minLength(10)
      ]]
    });

    // Validación en tiempo real del email
    this.usuarioForm.get('email')?.valueChanges.subscribe(email => {
      if (email && this.usuarioForm.get('email')?.valid && this.usuario && email !== this.usuario.email) {
        this.checkEmailExists(email);
      } else {
        this.emailExistsError = false;
      }
    });
  }

  loadUsuario(): void {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!this.usuarioId || isNaN(this.usuarioId)) {
      this.loadError = 'ID de usuario inválido';
      return;
    }

    this.isLoadingUser = true;
    this.loadError = '';

    this.usuarioService.getUsuario(this.usuarioId).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.populateForm(usuario);
        this.isLoadingUser = false;
      },
      error: (error) => {
        this.loadError = error.message || 'Error al cargar el usuario';
        this.isLoadingUser = false;
      }
    });
  }

  populateForm(usuario: UsuarioResponse): void {
    const formData = {
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono
    };

    this.usuarioForm.patchValue(formData);
    this.originalFormValue = { ...formData };
  }

  checkEmailExists(email: string): void {
    this.usuarioService.verificarEmail(email).subscribe({
      next: (exists) => {
        this.emailExistsError = exists;
      },
      error: () => {
        this.emailExistsError = false;
      }
    });
  }

  get hasUnsavedChanges(): boolean {
    if (!this.originalFormValue) return false;
    
    const currentValue = this.usuarioForm.value;
    return JSON.stringify(this.originalFormValue) !== JSON.stringify(currentValue);
  }

  getInitials(nombre: string): string {
    return nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  onSubmit(): void {
    if (this.usuarioForm.valid && !this.emailExistsError && this.hasUnsavedChanges) {
      this.isSubmitting = true;
      this.updateError = '';
      
      const usuarioData = {
        id: this.usuarioId,
        nombre: this.usuarioForm.value.nombre.trim(),
        email: this.usuarioForm.value.email.trim().toLowerCase(),
        telefono: this.usuarioForm.value.telefono.trim()
      };

      this.usuarioService.updateUsuario(this.usuarioId, usuarioData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.showSuccessMessage = true;
          this.usuario = response;
          this.originalFormValue = { ...this.usuarioForm.value };
          
          // Auto-hide success message and navigate back
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/usuarios']);
          }, 2000);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.updateError = error.message || 'Error al actualizar el usuario';
        }
      });
    }
  }

  resetForm(): void {
    if (this.usuario) {
      this.populateForm(this.usuario);
      this.updateError = '';
      this.emailExistsError = false;
    }
  }
}