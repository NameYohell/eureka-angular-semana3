export interface Direccion {
  id?: number;
  calle: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  pais: string;
  usuarioId: number;
}

export interface DireccionResponse {
  id: number;
  calle: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  pais: string;
  usuarioId: number;
}

export interface CreateDireccionRequest {
  calle: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  pais: string;
  usuarioId: number;
}