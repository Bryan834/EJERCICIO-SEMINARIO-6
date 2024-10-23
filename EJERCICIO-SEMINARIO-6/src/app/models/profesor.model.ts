import { Asignatura } from './asignatura.model';

export interface Profesor {
    nombre: string;
    edad: number;
    asignaturasImparte: Asignatura[];
  }
  