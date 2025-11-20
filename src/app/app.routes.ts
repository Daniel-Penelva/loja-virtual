import { Routes } from '@angular/router';
import { ContatoComponent } from './pages/contato/contato.component';
import { DetalhesProdutoComponent } from './pages/detalhes-produto/detalhes-produto.component';
import { HomeComponent } from './pages/home/home.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { SobreComponent } from './pages/sobre/sobre.component';

export const routes: Routes = [
    { path: 'sobre', component: SobreComponent },
    { path: 'home', component: HomeComponent },
    { path: 'contato', component: ContatoComponent}, 
    { path: 'produtos', component: ProdutosComponent},
    { path: 'produtos/:id', component: DetalhesProdutoComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // rota padrão
    { path: '**', component: PaginaNaoEncontradaComponent }, // caso entra em algo inválido - rota 404
];
