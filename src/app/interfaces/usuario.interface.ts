export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  telefono: string;
}

export interface UsuarioResponse {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

export interface CreateUsuarioRequest {
  nombre: string;
  email: string;
  telefono: string;
}