import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComentarioResponse, CreateComentarioRequest } from '../interfaces/comentario.interface';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private baseUrl = 'http://localhost:8888/api/comentarios';

  constructor(private http: HttpClient) {}

  // Obtener todos los comentarios de un usuario
  getComentariosByUsuarioId(usuarioId: number): Observable<ComentarioResponse[]> {
    return this.http.get<ComentarioResponse[]>(`${this.baseUrl}/usuario/${usuarioId}`);
  }

  // Crear un nuevo comentario
  createComentario(comentario: CreateComentarioRequest): Observable<ComentarioResponse> {
    console.log('ComentarioService: Enviando POST a', this.baseUrl);
    console.log('ComentarioService: Datos del comentario:', comentario);
    return this.http.post<ComentarioResponse>(this.baseUrl, comentario);
  }

  // Eliminar un comentario
  deleteComentario(comentarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${comentarioId}`);
  }

  // Obtener comentario por ID
  getComentarioById(comentarioId: number): Observable<ComentarioResponse> {
    return this.http.get<ComentarioResponse>(`${this.baseUrl}/${comentarioId}`);
  }

  // Actualizar comentario
  updateComentario(comentarioId: number, comentario: CreateComentarioRequest): Observable<ComentarioResponse> {
    return this.http.put<ComentarioResponse>(`${this.baseUrl}/${comentarioId}`, comentario);
  }
}