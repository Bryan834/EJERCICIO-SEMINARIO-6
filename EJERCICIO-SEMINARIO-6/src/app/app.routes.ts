import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfesorComponent} from './componentes/profesor/profesor.component';
import { HomeComponent } from './componentes/home/home.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';

export const routes: Routes = [
    //ruta por defecto
    {path: '',redirectTo:'home', pathMatch: 'full'},//ruta por defecto
    {path: 'home', component: HomeComponent},
    {path: 'profesor', component: ProfesorComponent},
    { path: 'buscador', component: BuscadorComponent },
    {path : '**', redirectTo: 'home'}//ruta por defecto


];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],//useHash: true para que funcione en github
    exports: [RouterModule]
})
export class AppRoutingModule {}
