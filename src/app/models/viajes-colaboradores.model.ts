import { Colaborador } from './colaborador.model';

export interface Viajes {
  colaboradores: Colaborador[];
  fecha: string;
  transportista: number;
  usuario: number;
}
