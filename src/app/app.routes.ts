import { Routes } from '@angular/router';
import { ContatoComponent } from './pages/contato/contato.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';

export const routes: Routes = [
    { path: 'sobre', component: SobreComponent },
    { path: 'home', component: HomeComponent },
    { path: 'contato', component: ContatoComponent}, 
    { path: 'produtos', component: ProdutosComponent}, 
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // rota padrão
    { path: '**', redirectTo: 'home' }, // caso entra em algo inválido - rota 404
];
