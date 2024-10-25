import { Injectable } from '@angular/core';
import { Profesor } from '../models/profesor.model';
import { Asignatura } from '../models/asignatura.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiURL = 'http://localhost:3000/api/profesores';

  constructor(private http: HttpClient) { }

  // 1. Obtener una lista de todos los profesores y su informacion (nombre, edad, asignaturas que imparte)
  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiURL);
  }

  // 2. Obtener la informacion de un profesor buscandolo por su nombre
  getProfesor(nombre: string): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.apiURL}/${nombre}`);
  }

  // 3. Obtener una lista de profesores que imparten una asignatura en concreto
  getProfesoresAsignatura(asignatura: string): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.apiURL}/asignatura/${asignatura}`);
  }

  // 4. Añadir un profesor a la lista de profesores y que se actualice la lista de profesores
  addProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.apiURL, profesor);
  }

  // 5. Borrar un profesor de la lista de profesores y que se actualice la lista de profesores
  deleteProfesor(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${nombre}`);
  }

  // 6. Modificar cualquier campo de informacion de un profesor y que se actualice la lista de profesores
  updateProfesor(profesor: Profesor): Observable<void> {
    return this.http.put<void>(`${this.apiURL}/${profesor.nombre}`, profesor);
  }

  // 7. Añadir una asignatura a un profesor y que se actualice la lista de profesores
  addAsignatura(profesor: Profesor, asignatura: Asignatura): Observable<Profesor> {
    return this.http.post<Profesor>(`${this.apiURL}/${profesor.nombre}/asignaturas`, asignatura);
  }

  // 8. Borrar una asignatura de un profesor y que se actualice la lista de profesores
  deleteAsignatura(profesor: Profesor, asignatura: Asignatura): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${profesor.nombre}/asignatura/${asignatura.nombre}`);
  }
}
 