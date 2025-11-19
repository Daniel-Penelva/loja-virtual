import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IProduto, lista_produtos } from '../../model/produtos';
import { RouterLink } from "@angular/router";
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',

  // ============================================================
  // ANIMAÇÕES
  // ============================================================
  animations: [
     // ANIMAÇÃO QUANDO A LISTA DE PRODUTOS TROCA DE PÁGINA
     trigger('listaAnimada', [
      // :enter -> quando os elementos aparecem
      transition(':enter', [
        // Seleciona cada card .product-list__card
        query('.product-list__card', [
          // Começo da animação (opacity 0 e um leve deslocamento)
          style({ opacity: 0, transform: 'translateY(20px)' }), 

          // Intervalo entre um card e outro (efeito cascata)
          stagger(80, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true})
      ])
     ])
  ]
})
export class ProdutosComponent {

  produtos: IProduto[] = lista_produtos;

  // Paginação
  paginaAtual: number = 1;    // Página Incial
  itensPorPagina: number = 4; // Total de produtos por página

  // Barra de carregamento
  isLoading: boolean = true; // Variável de controle do loading


  // ------------------------------------------
  // Simula atraso do carregamento (2 segundos)
  // Pode ser substituído por requisição HTTP
  // ------------------------------------------
  constructor() {
    setTimeout(() => {
      this.produtos = lista_produtos;
      this.isLoading = false;
    }, 2000);
  }


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

  // ============================================================
  // PAGINAÇÃO + CONTADOR "EXIBINDO X–Y de Z"
  // ============================================================
  get inicioExibicao(): number {
    return (this.paginaAtual - 1) * this.itensPorPagina + 1; // Calcula o primeiro item da página atual (ex.: página 2 -> começa no 7)
  }

  get fimExibicao(): number {
    const ultimo = this.paginaAtual * this.itensPorPagina;  // Calcula o último item da página atual (LIMITADO ao total de produtos)
    return ultimo > this.produtos.length ? this.produtos.length : ultimo;
  }

}
