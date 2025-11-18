import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IProduto, lista_produtos } from '../../model/produtos';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  produtos: IProduto[] = lista_produtos;

  // Paginação
  paginaAtual: number = 1;    // Página Incial
  itensPorPagina: number = 8; // Total de produtos por página


  // ------------------------------------------
  // QUANTIDADE TOTAL DE PÁGINAS
  // ------------------------------------------
  get totalPaginas(): number {
    return Math.ceil(this.produtos.length / this.itensPorPagina);
  }

  // ------------------------------------------
  // PRODUTOS QUE SERÃO EXIBIDOS NA PÁGINA ATUAL
  // ------------------------------------------
  get produtosPaginados(): IProduto[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.produtos.slice(inicio, fim);
  }

  // ------------------------------------------
  // IR PARA PRÓXIMA PÁGINA
  // ------------------------------------------
  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
    }
  }

  // ------------------------------------------
  // IR PARA PÁGINA ANTERIOR
  // ------------------------------------------
  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  // ------------------------------------------
  // IR PARA UMA PÁGINA ESPECÍFICA (BOTÕES NUMERADOS)
  // ------------------------------------------
  irParaPagina(pagina: number) {
    this.paginaAtual = pagina;
  }

}
