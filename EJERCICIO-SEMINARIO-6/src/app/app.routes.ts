import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfesorComponent} from './componentes/profesor/profesor.component';
import { HomeComponent } from './componentes/home/home.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';

export const routes: Routes = [
    //ruta por defecto
    {path: '',redirectTo:'home', pathMatch: 'full'},//ruta por defecto
    {path: 'home', component: HomeComponent},//ruta a home
    {path: 'profesor', component: ProfesorComponent}, //ruta a profesor
    { path: 'buscador', component: BuscadorComponent },//ruta a buscador
    {path : '**', redirectTo: 'home'}//ruta por defecto


];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],//useHash: true para que funcione en github
    exports: [RouterModule]
})
export class AppRoutingModule {}/*exporta la clase AppRoutingModule para que se pueda utilizar 
                                en otros ficheros de la aplicación*/
