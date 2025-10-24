export interface Direccion {
  id?: number;
  calle: string;
  comuna: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  usuarioId: number;
}

export interface DireccionResponse {
  id: number;
  calle: string;
  comuna: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  usuarioId: number;
}

export interface CreateDireccionRequest {
  calle: string;
  comuna: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  usuarioId: number;
}