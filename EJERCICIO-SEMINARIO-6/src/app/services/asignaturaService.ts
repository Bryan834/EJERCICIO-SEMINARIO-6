import { Injectable } from '@angular/core';
import { Asignatura } from '../models/asignatura.model';
import { Profesor } from '../models/profesor.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable
({
    providedIn: 'root'
})
export class AsignaturaService{
    private apiURL = 'http://localhost:3000/api/asignaturas';
    constructor(private http: HttpClient) { }
    //1. OBTENER UNA LISTA DE TODAS LAS ASIGNATURAS Y SU INFORMACION (NOMBRE, DESCRIPCION,
    // PROFESORES QUE LA IMPARTEN)
    getAsignaturas() {
        return this.http.get<Asignatura[]>(this.apiURL);
    }
    //2. OBTENER LA INFORMACION DE UNA ASIGNATURA BUSCANDOLA POR SU NOMBRE
    getAsignatura(nombre: string) {
        return this.http.get<Asignatura>(`${this.apiURL}/${nombre}`);
    }
    //3. OBTENER UNA LISTA DE ASIGNATURAS QUE IMPARTE UN PROFESOR EN CONCRETO
    getAsignaturasProfesor(profesor: string) {
        return this.http.get<Asignatura[]>(`${this.apiURL}/profesor/${profesor}`);
    }
    //4. AÑADIR UNA ASIGNATURA A LA LISTA DE ASIGNATURAS Y QUE SE ACTUALICE LA LISTA DE ASIGNATURAS
       addAsignatura(asignatura: Asignatura) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            return this.http.post<Asignatura>(this.apiURL, asignatura);
        }

    //5. BORRAR UNA ASIGNATURA DE LA LISTA DE ASIGNATURAS Y QUE SE ACTUALICE LA LISTA DE ASIGNATURAS
    deleteAsignatura(nombre: string) {
        return this.http.delete(`${this.apiURL}/${nombre}`);
    }
    //6. MODIFICAR EL NOMBRE O LA DESCRIPCION DE UNA ASIGNATURA Y QUE SE ACTUALICE LA LISTA DE ASIGNATURAS
    updateAsignatura(asignatura: Asignatura) {
        return this.http.put(`${this.apiURL}/${asignatura.nombre}`, asignatura);
    }
    
}