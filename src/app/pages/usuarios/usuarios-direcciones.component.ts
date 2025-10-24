import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 
import { UsuarioService } from '../../services/usuario.service';
import { DireccionService } from '../../services/direccion.service';
import { ComentarioService } from '../../services/comentario.service';
import { UsuarioResponse, CreateUsuarioRequest } from '../../interfaces/usuario.interface';
import { DireccionResponse, CreateDireccionRequest } from '../../interfaces/direccion.interface';
import { ComentarioResponse, CreateComentarioRequest } from '../../interfaces/comentario.interface';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios-direcciones',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuarios-direcciones.component.html'
})
export class UsuariosDireccionesComponent implements OnInit {
  usuarios: UsuarioResponse[] = [];
  usuariosFiltrados: UsuarioResponse[] = [];
  searchEmail = '';
  direcciones: { [key: number]: DireccionResponse[] } = {};
  comentarios: { [key: number]: ComentarioResponse[] } = {};
  isLoading = false;
  isSubmitting = false;
  showIntegratedForm = false;
  integratedForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isCreatingAddress = false;
  showAddressForm: number | null = null;
  editingUsuarioId: number | null = null;
  editUsuarioForm: FormGroup;
  
  // Para múltiples direcciones en creación
  tempDirecciones: CreateDireccionRequest[] = [];
  showAddDireccionInCreation = false;

  // Para múltiples comentarios en creación
  tempComentarios: CreateComentarioRequest[] = [];
  showAddComentarioInCreation = false;
  
  newDireccion = {
    calle: '',
    comuna: '',
    ciudad: '',
    codigoPostal: '',
    pais: ''
  };

  newComentario = {
    candidato: '',
    textoComentario: ''
  };

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private direccionService: DireccionService,
    private comentarioService: ComentarioService,
    private router: Router
  ) {
    this.integratedForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]]
    });

    this.editUsuarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      comuna: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      direccionId: [null]
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.isLoading = true;
    this.usuarioService.getUsuarios()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (usuarios) => {
          this.usuarios = usuarios;
          this.usuariosFiltrados = usuarios; // Inicializar lista filtrada
          usuarios.forEach(usuario => {
            this.loadDireccionesForUsuario(usuario.id);
            this.loadComentariosForUsuario(usuario.id);
          });
        },
        error: (error) => console.error('Error al cargar usuarios:', error)
      });
  }

  loadDireccionesForUsuario(usuarioId: number): void {
    this.direccionService.getDireccionesPorUsuario(usuarioId)
      .subscribe({
        next: (direcciones: DireccionResponse[]) => {
          this.direcciones[usuarioId] = direcciones;
        },
        error: (error: any) => console.error('Error al cargar direcciones:', error)
      });
  }

  loadComentariosForUsuario(usuarioId: number): void {
    this.comentarioService.getComentariosByUsuarioId(usuarioId)
      .subscribe({
        next: (comentarios: ComentarioResponse[]) => {
          this.comentarios[usuarioId] = comentarios;
        },
        error: (error: any) => console.error('Error al cargar comentarios:', error)
      });
  }

  onSearchEmailChange(): void {
    const searchTerm = this.searchEmail.toLowerCase().trim();
    
    if (searchTerm === '') {
      // Si no hay término de búsqueda, mostrar todos los usuarios
      this.usuariosFiltrados = this.usuarios;
    } else {
      // Filtrar usuarios por email que contenga el término de búsqueda
      this.usuariosFiltrados = this.usuarios.filter(usuario => 
        usuario.email.toLowerCase().includes(searchTerm)
      );
    }
  }

  clearSearch(): void {
    this.searchEmail = '';
    this.usuariosFiltrados = this.usuarios;
  }

  onIntegratedSubmit(): void {
    console.log('Formulario válido:', this.integratedForm.valid);
    console.log('Direcciones temporales:', this.tempDirecciones);
    console.log('Comentarios temporales:', this.tempComentarios);
    
    if (this.integratedForm.valid && this.tempDirecciones.length > 0) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';
      const formValue = this.integratedForm.value;
      console.log('Datos del formulario:', formValue);

      const usuarioRequest: CreateUsuarioRequest = {
        nombre: formValue.nombre,
        email: formValue.email,
        telefono: formValue.telefono
      };
      console.log('Enviando usuario:', usuarioRequest);

      this.usuarioService.createUsuario(usuarioRequest)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe({
          next: (usuario) => {
            // Crear todas las direcciones para el usuario
            const direccionesConUsuarioId = this.tempDirecciones.map(dir => ({
              ...dir,
              usuarioId: usuario.id
            }));

            // Crear direcciones y comentarios
            let direccionesCreadas = 0;
            let comentariosCreados = 0;
            const direccionesResponse: DireccionResponse[] = [];
            const comentariosResponse: ComentarioResponse[] = [];
            
            const totalDirecciones = direccionesConUsuarioId.length;
            const totalComentarios = this.tempComentarios.length;
            
            // Función para verificar si todo está completo
            const verificarCompletion = () => {
              if (direccionesCreadas === totalDirecciones && comentariosCreados === totalComentarios) {
                // Agregar el usuario a la lista
                this.usuarios.push(usuario);
                // Actualizar lista filtrada si corresponde
                this.onSearchEmailChange();
                
                // Agregar las direcciones y comentarios a las listas
                this.direcciones[usuario.id] = direccionesResponse;
                this.comentarios[usuario.id] = comentariosResponse;
                
                // Mostrar mensaje de éxito
                const mensajeDirecciones = totalDirecciones > 0 ? `${totalDirecciones} dirección(es)` : '';
                const mensajeComentarios = totalComentarios > 0 ? `${totalComentarios} comentario(s)` : '';
                const items = [mensajeDirecciones, mensajeComentarios].filter(m => m).join(' y ');
                
                this.successMessage = `Usuario "${usuario.nombre}" creado con ${items} exitosamente`;
                
                // Limpiar y ocultar el formulario
                this.cancelCreateUsuario();
                
                setTimeout(() => {
                  this.successMessage = '';
                }, 5000);
              }
            };

            // Crear todas las direcciones
            if (totalDirecciones > 0) {
              direccionesConUsuarioId.forEach((direccion) => {
                this.direccionService.createDireccion(direccion).subscribe({
                  next: (direccionCreada) => {
                    direccionesResponse.push(direccionCreada);
                    direccionesCreadas++;
                    verificarCompletion();
                  },
                  error: (error: any) => {
                    this.errorMessage = error.message || 'Error al crear las direcciones';
                  }
                });
              });
            } else {
              direccionesCreadas = totalDirecciones; // 0
            }

            // Crear todos los comentarios
            if (totalComentarios > 0) {
              const comentariosConUsuarioId = this.tempComentarios.map(com => ({
                ...com,
                usuarioId: usuario.id
              }));

              comentariosConUsuarioId.forEach((comentario) => {
                console.log('Enviando comentario:', comentario);
                this.comentarioService.createComentario(comentario).subscribe({
                  next: (comentarioCreado) => {
                    console.log('Comentario creado exitosamente:', comentarioCreado);
                    comentariosResponse.push(comentarioCreado);
                    comentariosCreados++;
                    verificarCompletion();
                  },
                  error: (error: any) => {
                    console.error('Error completo al crear comentario:', error);
                    console.error('Status:', error.status);
                    console.error('Error message:', error.message);
                    console.error('Error details:', error.error);
                    this.errorMessage = 'Error al crear los comentarios: ' + (error.error?.message || error.message || 'Error desconocido');
                    this.isSubmitting = false;
                  }
                });
              });
            } else {
              console.log('No hay comentarios para crear');
              comentariosCreados = totalComentarios; // 0
            }

            // Llamar verificarCompletion para manejar el caso sin direcciones ni comentarios
            verificarCompletion();
          },
          error: (error: any) => {
            console.error('Error al crear usuario:', error);
            
            // Manejar error de email duplicado (status 409)
            if (error.status === 409 && error.error?.codigo === 'EMAIL_DUPLICADO') {
              this.errorMessage = error.error.mensaje;
            } else if (error.status === 409) {
              this.errorMessage = 'El email ya está registrado. Por favor use un email diferente.';
            } else if (error.status === 400) {
              this.errorMessage = 'Datos inválidos. Verifique la información ingresada.';
            } else {
              this.errorMessage = error.error?.mensaje || error.message || 'Error al crear el usuario';
            }
          }
        });
    } else if (this.tempDirecciones.length === 0) {
      this.errorMessage = 'Debe agregar al menos una dirección';
    }
  }

  getUserDireccionCount(userId: number): number {
    return this.direcciones[userId]?.length || 0;
  }

  isValidNewDireccion(): boolean {
    return !!(
      this.newDireccion.calle && 
      this.newDireccion.comuna && 
      this.newDireccion.ciudad && 
      this.newDireccion.codigoPostal && 
      this.newDireccion.pais
    );
  }

  // Métodos para manejar direcciones temporales en creación
  addTempDireccion(): void {
    if (this.isValidNewDireccion()) {
      this.tempDirecciones.push({
        calle: this.newDireccion.calle,
        comuna: this.newDireccion.comuna,
        ciudad: this.newDireccion.ciudad,
        codigoPostal: this.newDireccion.codigoPostal,
        pais: this.newDireccion.pais,
        usuarioId: 0 // Se asignará cuando se cree el usuario
      });
      this.resetNewDireccion();
      this.showAddDireccionInCreation = false;
    }
  }

  removeTempDireccion(index: number): void {
    this.tempDirecciones.splice(index, 1);
  }

  cancelAddTempDireccion(): void {
    this.resetNewDireccion();
    this.showAddDireccionInCreation = false;
  }

  toggleIntegratedForm(): void {
    if (this.showIntegratedForm) {
      // Si está abierto, cancelar (que limpia todo)
      this.cancelCreateUsuario();
    } else {
      // Si está cerrado, abrir y limpiar mensajes
      this.showIntegratedForm = true;
      this.errorMessage = '';
      this.successMessage = '';
    }
  }

  cancelCreateUsuario(): void {
    this.integratedForm.reset();
    this.tempDirecciones = [];
    this.tempComentarios = [];
    this.showIntegratedForm = false;
    this.showAddDireccionInCreation = false;
    this.showAddComentarioInCreation = false;
    this.resetNewDireccion();
    this.resetNewComentario();
    
    // Limpiar mensajes de error y éxito
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Métodos para manejar comentarios temporales en creación
  isValidNewComentario(): boolean {
    return !!(
      this.newComentario.candidato && 
      this.newComentario.textoComentario
    );
  }

  addTempComentario(): void {
    if (this.isValidNewComentario()) {
      this.tempComentarios.push({
        candidato: this.newComentario.candidato,
        textoComentario: this.newComentario.textoComentario,
        usuarioId: 0 // Se asignará cuando se cree el usuario
      });
      this.resetNewComentario();
      this.showAddComentarioInCreation = false;
    }
  }

  removeTempComentario(index: number): void {
    this.tempComentarios.splice(index, 1);
  }

  cancelAddTempComentario(): void {
    this.resetNewComentario();
    this.showAddComentarioInCreation = false;
  }

  resetNewComentario(): void {
    this.newComentario = {
      candidato: '',
      textoComentario: ''
    };
  }

  getInitials(nombre: string): string {
    return nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  trackByUsuario(index: number, usuario: UsuarioResponse): number {
    return usuario.id;
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

  createDireccion(usuarioId: number): void {
    if (!this.isValidNewDireccion()) return;

    this.isCreatingAddress = true;
    this.errorMessage = '';

    const direccionData: CreateDireccionRequest = {
      ...this.newDireccion,
      usuarioId
    };

    this.direccionService.createDireccion(direccionData).subscribe({
      next: (response: any) => {
        this.successMessage = 'Dirección agregada exitosamente';
        if (!this.direcciones[usuarioId]) {
          this.direcciones[usuarioId] = [];
        }
        this.direcciones[usuarioId].push(response);
        this.resetNewDireccion();
        this.showAddressForm = null;
        this.isCreatingAddress = false;
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error: any) => {
        this.errorMessage = error.message || 'Error al crear la dirección';
        this.isCreatingAddress = false;
      }
    });
  }

  cancelAddAddress(): void {
    this.resetNewDireccion();
    this.showAddressForm = null;
  }

  editUsuario(usuario: UsuarioResponse): void {
    this.editingUsuarioId = usuario.id;
    
    // Obtener la primera dirección del usuario (si existe)
    const direccion = this.direcciones[usuario.id]?.[0];
    
    this.editUsuarioForm.patchValue({
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      calle: direccion?.calle || '',
      comuna: direccion?.comuna || '',
      ciudad: direccion?.ciudad || '',
      codigoPostal: direccion?.codigoPostal || '',
      pais: direccion?.pais || '',
      direccionId: direccion?.id || null
    });
  }

  cancelEditUsuario(): void {
    this.editingUsuarioId = null;
    this.editUsuarioForm.reset();
  }

  saveUsuarioChanges(usuarioId: number): void {
    if (this.editUsuarioForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      
      const formValue = this.editUsuarioForm.value;
      const usuarioData = {
        id: usuarioId,
        nombre: formValue.nombre,
        email: formValue.email,
        telefono: formValue.telefono
      };

      // Primero actualizar el usuario
      this.usuarioService.updateUsuario(usuarioId, usuarioData)
        .subscribe({
          next: (usuarioActualizado) => {
            // Actualizar el usuario en la lista
            const index = this.usuarios.findIndex(u => u.id === usuarioId);
            if (index !== -1) {
              this.usuarios[index] = usuarioActualizado;
            }
            
            // Ahora actualizar o crear la dirección
            const direccionData = {
              calle: formValue.calle,
              comuna: formValue.comuna,
              ciudad: formValue.ciudad,
              codigoPostal: formValue.codigoPostal,
              pais: formValue.pais,
              usuarioId: usuarioId
            };

            const direccionId = formValue.direccionId;
            
            if (direccionId) {
              // Actualizar dirección existente
              this.direccionService.updateDireccion(direccionId, { ...direccionData, id: direccionId })
                .pipe(finalize(() => this.isSubmitting = false))
                .subscribe({
                  next: (direccionActualizada) => {
                    // Actualizar la dirección en la lista
                    if (this.direcciones[usuarioId]) {
                      const dirIndex = this.direcciones[usuarioId].findIndex(d => d.id === direccionId);
                      if (dirIndex !== -1) {
                        this.direcciones[usuarioId][dirIndex] = direccionActualizada;
                      }
                    }
                    
                    this.successMessage = 'Usuario y dirección actualizados exitosamente';
                    this.editingUsuarioId = null;
                    this.editUsuarioForm.reset();
                    
                    setTimeout(() => {
                      this.successMessage = '';
                    }, 5000);
                  },
                  error: (error: any) => {
                    this.errorMessage = error.message || 'Error al actualizar la dirección';
                  }
                });
            } else {
              // Crear nueva dirección
              this.direccionService.createDireccion(direccionData)
                .pipe(finalize(() => this.isSubmitting = false))
                .subscribe({
                  next: (nuevaDireccion) => {
                    // Agregar la nueva dirección a la lista
                    if (!this.direcciones[usuarioId]) {
                      this.direcciones[usuarioId] = [];
                    }
                    this.direcciones[usuarioId].push(nuevaDireccion);
                    
                    this.successMessage = 'Usuario actualizado y dirección creada exitosamente';
                    this.editingUsuarioId = null;
                    this.editUsuarioForm.reset();
                    
                    setTimeout(() => {
                      this.successMessage = '';
                    }, 5000);
                  },
                  error: (error: any) => {
                    this.errorMessage = error.message || 'Error al crear la dirección';
                  }
                });
            }
          },
          error: (error: any) => {
            console.error('Error al crear usuario:', error);
            this.errorMessage = 'Datos inválidos enviados al servidor';
            this.isSubmitting = false;
          }
        });
    }
  }

  editDireccion(direccion: DireccionResponse): void {
    alert('Funcionalidad de edición para la dirección #' + direccion.id + ' se implementará próximamente');
  }

  deleteUsuario(usuario: UsuarioResponse): void {
    if (confirm('¿Está seguro que desea eliminar el usuario "' + usuario.nombre + '" y todas sus direcciones?')) {
      this.usuarioService.deleteUsuario(usuario.id).subscribe({
        next: () => {
          this.successMessage = 'Usuario "' + usuario.nombre + '" eliminado correctamente';
          // Eliminar de la lista principal de usuarios
          this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
          // Actualizar la lista filtrada
          this.usuariosFiltrados = this.usuariosFiltrados.filter(u => u.id !== usuario.id);
          // Eliminar direcciones y comentarios asociados
          delete this.direcciones[usuario.id];
          delete this.comentarios[usuario.id];
          
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        error: (error: any) => {
          this.errorMessage = error.message || 'Error al eliminar el usuario';
        }
      });
    }
  }

  deleteDireccion(direccion: DireccionResponse, usuarioId: number): void {
    if (confirm('¿Está seguro que desea eliminar la dirección "' + direccion.calle + '"?')) {
      this.direccionService.deleteDireccion(direccion.id).subscribe({
        next: () => {
          this.successMessage = 'Dirección eliminada exitosamente';
          this.direcciones[usuarioId] = this.direcciones[usuarioId].filter(d => d.id !== direccion.id);
          
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error: any) => {
          this.errorMessage = error.message || 'Error al eliminar la dirección';
        }
      });
    }
  }

  // Métodos para gestionar comentarios de usuarios existentes
  getUserComentarioCount(usuarioId: number): number {
    return this.comentarios[usuarioId]?.length || 0;
  }

  createComentario(usuarioId: number): void {
    if (!this.isValidNewComentario()) return;

    this.isCreatingAddress = true; // Reutilizar esta bandera
    this.errorMessage = '';

    const comentarioData: CreateComentarioRequest = {
      ...this.newComentario,
      usuarioId
    };

    this.comentarioService.createComentario(comentarioData).subscribe({
      next: (response: any) => {
        this.successMessage = 'Comentario agregado exitosamente';
        if (!this.comentarios[usuarioId]) {
          this.comentarios[usuarioId] = [];
        }
        this.comentarios[usuarioId].push(response);
        this.resetNewComentario();
        this.showAddressForm = null; // Reutilizar esta variable
        this.isCreatingAddress = false;
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error: any) => {
        this.errorMessage = error.message || 'Error al crear el comentario';
        this.isCreatingAddress = false;
      }
    });
  }

  deleteComentario(comentario: ComentarioResponse, usuarioId: number): void {
    if (confirm('¿Está seguro que desea eliminar el comentario "' + comentario.candidato + '"?')) {
      this.comentarioService.deleteComentario(comentario.id).subscribe({
        next: () => {
          this.successMessage = 'Comentario eliminado exitosamente';
          this.comentarios[usuarioId] = this.comentarios[usuarioId].filter(c => c.id !== comentario.id);
          
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error: any) => {
          this.errorMessage = error.message || 'Error al eliminar el comentario';
        }
      });
    }
  }
}