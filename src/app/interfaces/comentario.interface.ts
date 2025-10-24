export interface Comentario {
  id?: number;
  candidato: string;
  textoComentario: string;
  usuarioId: number;
  fechaComentario?: string;
}

export interface ComentarioResponse {
  id: number;
  candidato: string;
  textoComentario: string;
  usuarioId: number;
  fechaComentario: string;
}

export interface CreateComentarioRequest {
  candidato: string;
  textoComentario: string;
  usuarioId: number;
}