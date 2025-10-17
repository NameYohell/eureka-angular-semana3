import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Usuario, UsuarioResponse, CreateUsuarioRequest } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API_URL = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los usuarios
   */
  getUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.API_URL)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene un usuario por ID
   */
  getUsuario(id: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.API_URL}/${id}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Crea un nuevo usuario
   */
  createUsuario(usuario: CreateUsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.API_URL, usuario)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualiza un usuario existente
   */
  updateUsuario(id: number, usuario: Usuario): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.API_URL}/${id}`, usuario)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Elimina un usuario
   */
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Busca usuarios por nombre
   */
  buscarPorNombre(nombre: string): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.API_URL}/buscar?nombre=${nombre}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Verifica si un email existe
   */
  verificarEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/email/existe?email=${email}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Manejo de errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 0:
          errorMessage = 'No se puede conectar al servidor. Verifique que la API esté ejecutándose en http://localhost:8080';
          break;
        case 400:
          errorMessage = 'Datos inválidos enviados al servidor';
          break;
        case 404:
          errorMessage = 'Usuario no encontrado';
          break;
        case 409:
          errorMessage = 'El email ya está registrado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    
    console.error('Error en UsuarioService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}