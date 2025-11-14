import { Routes } from '@angular/router';
import { SobreComponent } from './pages/sobre/sobre.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'sobre', component: SobreComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // rota padrão
    { path: '**', redirectTo: 'home' }, // caso entra em algo inválido - rota 404
];
