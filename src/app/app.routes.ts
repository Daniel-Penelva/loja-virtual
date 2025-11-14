import { Routes } from '@angular/router';
import { SobreComponent } from './pages/sobre/sobre.component';

export const routes: Routes = [
    { path: 'sobre', component: SobreComponent },
    { path: '', redirectTo: 'sobre', pathMatch: 'full' }, // rota padrão
    { path: '**', redirectTo: 'sobre' }, // caso entra em algo inválido - rota 404
];
