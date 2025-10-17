import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Direccion, DireccionResponse, CreateDireccionRequest } from '../interfaces/direccion.interface';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private readonly API_URL = 'http://localhost:8080/direcciones';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las direcciones
   */
  getDirecciones(): Observable<DireccionResponse[]> {
    return this.http.get<DireccionResponse[]>(this.API_URL)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene una dirección por ID
   */
  getDireccion(id: number): Observable<DireccionResponse> {
    return this.http.get<DireccionResponse>(`${this.API_URL}/${id}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Crea una nueva dirección
   */
  createDireccion(direccion: CreateDireccionRequest): Observable<DireccionResponse> {
    return this.http.post<DireccionResponse>(this.API_URL, direccion)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualiza una dirección existente
   */
  updateDireccion(id: number, direccion: Direccion): Observable<DireccionResponse> {
    return this.http.put<DireccionResponse>(`${this.API_URL}/${id}`, direccion)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Elimina una dirección
   */
  deleteDireccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene direcciones por usuario ID
   */
  getDireccionesPorUsuario(usuarioId: number): Observable<DireccionResponse[]> {
    return this.http.get<DireccionResponse[]>(`${this.API_URL}/usuario/${usuarioId}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Busca direcciones por ciudad
   */
  buscarPorCiudad(ciudad: string): Observable<DireccionResponse[]> {
    return this.http.get<DireccionResponse[]>(`${this.API_URL}/buscar/ciudad?ciudad=${ciudad}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Busca direcciones por código postal
   */
  buscarPorCodigoPostal(codigoPostal: string): Observable<DireccionResponse[]> {
    return this.http.get<DireccionResponse[]>(`${this.API_URL}/buscar/codigo-postal?codigoPostal=${codigoPostal}`)
      .pipe(
        retry(3),
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
          errorMessage = 'Dirección no encontrada';
          break;
        case 409:
          errorMessage = 'Conflicto con los datos de la dirección';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    
    console.error('Error en DireccionService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}