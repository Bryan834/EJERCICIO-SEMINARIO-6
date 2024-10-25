import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../models/profesor.model';
import { Asignatura } from '../../models/asignatura.model';
import { ProfesorService } from '../../services/profesorService';
import { AsignaturaService } from '../../services/asignaturaService';
import { catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClient

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css'],
  providers: [ProfesorService, AsignaturaService],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule] // Asegúrate de importar FormsModule y HttpClientModule
})
export class ProfesorComponent implements OnInit {
  profesores: Profesor[] = [];
  asignaturas: Asignatura[] = [];
  asignaturasImparte: Asignatura[] = [];
  profesoresAsignatura: Profesor[] = [];

  nuevoProfesor: Profesor = {
    nombre: '',
    edad: 0,
    asignaturasImparte: []
  };

  nombreBusqueda: string = '';
  asignaturaSeleccionada: Asignatura | null = null;

  constructor(
    private profesorService: ProfesorService, 
    private asignaturaService: AsignaturaService
  ) {}

  ngOnInit(): void {
    this.refreshProfesores();
    this.cargarAsignaturas();
  }

  cargarAsignaturas() {
    this.asignaturaService.getAsignaturas().pipe(
      catchError(error => {
        console.error('Error al cargar asignaturas', error);
        return of([]); // En caso de error, devolver una lista vacía
      })
    ).subscribe(asignaturas => {
      this.asignaturas = asignaturas;
    });
  }

  addProfesor() {
    if (this.nuevoProfesor.edad >= 0 && this.nuevoProfesor.nombre.length >= 3) {
      this.profesorService.addProfesor(this.nuevoProfesor).pipe(
        catchError(error => {
          console.error('Error al añadir profesor', error);
          return of(null);
        })
      ).subscribe(() => {
        this.nuevoProfesor = { nombre: '', edad: 0, asignaturasImparte: [] }; // Limpiar formulario
        this.refreshProfesores();
      });
    } else {
      console.error("La edad no puede ser negativa y el nombre debe tener al menos 3 caracteres.");
    }
  }

  deleteProfesor(profesor: Profesor) {
    if (profesor && profesor.nombre) {
      if (confirm(`¿Está seguro que desea eliminar al profesor ${profesor.nombre}?`)) {
        this.profesorService.deleteProfesor(profesor.nombre).pipe(
          catchError(error => {
            console.error('Error al eliminar profesor', error);
            return of(null);
          })
        ).subscribe(() => {
          this.refreshProfesores();
        });
      }
    } else {
      console.error("Por favor, selecciona un profesor válido.");
    }
  }

  addAsignatura(profesor: Profesor): void {
    if (this.asignaturaSeleccionada) {
      this.profesorService.addAsignatura(profesor, this.asignaturaSeleccionada).pipe(
        catchError(error => {
          console.error('Error añadiendo asignatura al profesor', error);
          return of(null);
        })
      ).subscribe((updatedProfesor: Profesor | null) => {
        if (updatedProfesor) {
          const index = this.profesores.findIndex(p => p.nombre === updatedProfesor.nombre);
          if (index !== -1) {
            this.profesores[index] = updatedProfesor; // Actualizar la lista de profesores con el actualizado
          }
          this.asignaturaSeleccionada = null; // Limpiar selección
        }
      });
    } else {
      console.error("Por favor, selecciona una asignatura válida.");
    }
  }

  deleteAsignatura(profesor: Profesor, asignatura: Asignatura) {
    if (!profesor || !asignatura) return;
    
    this.profesorService.deleteAsignatura(profesor, asignatura).pipe(
      catchError(error => {
        console.error('Error al eliminar asignatura', error);
        return of(null);
      })
    ).subscribe(() => {
      this.refreshProfesores(); // Actualizar la lista tras eliminar asignatura
    });
  }

  buscarProfesor() {
    if (this.nombreBusqueda && this.nombreBusqueda.length >= 3) {
      this.profesorService.getProfesor(this.nombreBusqueda).pipe(
        catchError(error => {
          console.error('Error al buscar profesor', error);
          return of(null);
        })
      ).subscribe(profesor => {
        if (profesor) {
          this.profesores = [profesor];
        } else {
          console.log('Profesor no encontrado');
          this.profesores = []; // Vaciar la lista si no hay resultados
        }
      });
    } else {
      console.log('Por favor, introduce al menos 3 caracteres para buscar');
      this.refreshProfesores();
    }
  }

  getProfesoresAsignatura(asignatura: Asignatura) {
    if (!asignatura) return;
    
    this.profesorService.getProfesoresAsignatura(asignatura.nombre).pipe(
      catchError(error => {
        console.error('Error al buscar profesores por asignatura', error);
        return of([]); // Devolver una lista vacía en caso de error
      })
    ).subscribe(profesores => {
      this.profesoresAsignatura = profesores;
    });
  }

  updateProfesor(profesor: Profesor) {
    if (profesor.edad >= 0 && profesor.nombre.length >= 3) {
      this.profesorService.updateProfesor(profesor).pipe(
        catchError(error => {
          console.error('Error al actualizar profesor', error);
          return of(null);
        })
      ).subscribe(() => {
        this.refreshProfesores();
      });
    } else {
      console.error("La edad no puede ser negativa y el nombre debe tener al menos 3 caracteres.");
    }
  }

  confirmarEliminacion(profesor: Profesor) {
    if (profesor && profesor.nombre) {
      if (confirm(`¿Está seguro que desea eliminar al profesor ${profesor.nombre}?`)) {
        this.deleteProfesor(profesor); // Llama a deleteProfesor para eliminar al profesor
      }
    }
  }
  
  private refreshProfesores() {
    this.profesorService.getProfesores().pipe(
      catchError(error => {
        console.error('Error al cargar profesores', error);
        return of([]); // Devolver una lista vacía en caso de error
      })
    ).subscribe(profesores => {
      this.profesores = profesores;
    });
  }
}
