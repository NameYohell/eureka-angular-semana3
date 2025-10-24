import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service.js';
import { DireccionService } from '../../services/direccion.service.js';
import { CreateUsuarioRequest } from '../../interfaces/usuario.interface.js';

@Component({
  selector: 'app-create-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Crear Nuevo Usuario</h1>
              <p class="mt-1 text-sm text-gray-600">
                Complete todos los campos para registrar un nuevo usuario en el sistema
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

        <!-- Alert Messages -->
        <div *ngIf="showSuccessMessage" class="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">¡Usuario creado exitosamente!</h3>
              <p class="mt-1 text-sm text-green-700">El usuario ha sido registrado correctamente en el sistema.</p>
            </div>
          </div>
        </div>

        <div *ngIf="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error al crear usuario</h3>
              <p class="mt-1 text-sm text-red-700">{{ errorMessage }}</p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <form [formGroup]="usuarioForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Información Personal -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Información Personal</h3>
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
                    Este email ya está registrado en el sistema
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
                  <div *ngIf="usuarioForm.get('telefono')?.errors?.['pattern']">Formato de teléfono inválido (solo números, +, -, espacios y paréntesis)</div>
                  <div *ngIf="usuarioForm.get('telefono')?.errors?.['minlength']">El teléfono debe tener al menos 10 dígitos</div>
                </div>
              </div>
            </div>

            <!-- Información Adicional -->
            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
                </svg>
                <div class="text-sm text-blue-800">
                  <strong>Nota:</strong> Después de crear el usuario, podrás agregar direcciones desde la lista de usuarios.
                </div>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                [disabled]="usuarioForm.invalid || isSubmitting"
                class="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg *ngIf="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg *ngIf="!isSubmitting" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                {{ isSubmitting ? 'Creando Usuario...' : 'Crear Usuario' }}
              </button>

              <button
                type="button"
                (click)="resetForm()"
                class="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Limpiar Formulario
              </button>
            </div>
          </form>
        </div>

        <!-- Form Validation Status -->
        <div class="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Estado del Formulario:</h4>
          <div class="text-xs text-gray-600 space-y-1">
            <div>Estado: <span class="font-mono">{{ usuarioForm.valid ? 'Válido' : 'Inválido' }}</span></div>
            <div>Campos tocados: <span class="font-mono">{{ usuarioForm.touched ? 'Sí' : 'No' }}</span></div>
            <div>Formulario sucio: <span class="font-mono">{{ usuarioForm.dirty ? 'Sí' : 'No' }}</span></div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CreateUsuarioComponent implements OnInit {
  usuarioForm!: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;
  errorMessage = '';
  emailExistsError = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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
      if (email && this.usuarioForm.get('email')?.valid) {
        this.checkEmailExists(email);
      } else {
        this.emailExistsError = false;
      }
    });
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

  onSubmit(): void {
    if (this.usuarioForm.valid && !this.emailExistsError) {
      this.isSubmitting = true;
      this.errorMessage = '';
      
      const usuarioData: CreateUsuarioRequest = {
        nombre: this.usuarioForm.value.nombre.trim(),
        email: this.usuarioForm.value.email.trim().toLowerCase(),
        telefono: this.usuarioForm.value.telefono.trim()
      };

      this.usuarioService.createUsuario(usuarioData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.showSuccessMessage = true;
          this.resetForm();
          
          // Ocultar mensaje de éxito después de 3 segundos y navegar
          setTimeout(() => {
            this.showSuccessMessage = false;
            // Preguntar si quiere agregar direcciones
            if (confirm('¿Deseas agregar direcciones para este usuario ahora?')) {
              this.router.navigate(['/usuarios', response.id, 'direcciones']);
            } else {
              this.router.navigate(['/usuarios']);
            }
          }, 2000);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = error.message || 'Error al crear el usuario. Por favor, intente nuevamente.';
        }
      });
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.usuarioForm.controls).forEach(key => {
        const control = this.usuarioForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  resetForm(): void {
    this.usuarioForm.reset();
    this.errorMessage = '';
    this.showSuccessMessage = false;
    this.emailExistsError = false;
  }
}