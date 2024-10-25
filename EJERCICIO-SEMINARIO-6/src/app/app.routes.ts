import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfesorComponent} from './componentes/profesor/profesor.component';
import { HomeComponent } from './componentes/home/home.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';
import { AsignaturaComponent } from './componentes/asignatura/asignatura.component';    

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Ruta por defecto que carga HomeComponent
  { path: 'profesor', component: ProfesorComponent },
  { path: 'asignatura', component: AsignaturaComponent },
  { path: 'buscador', component: BuscadorComponent },
    {path : '**', redirectTo: 'home'}//ruta por defecto 


];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],//useHash: true para que funcione en github
    exports: [RouterModule]
})
export class AppRoutingModule {}/*exporta la clase AppRoutingModule para que se pueda utilizar 
                                en otros ficheros de la aplicación*/
