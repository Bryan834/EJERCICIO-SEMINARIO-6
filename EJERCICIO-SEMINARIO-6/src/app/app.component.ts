import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Necesitas importar el RouterOutlet aquí
  template: `<router-outlet></router-outlet>`, // Aquí se renderizarán las rutas
})
export class AppComponent {}
