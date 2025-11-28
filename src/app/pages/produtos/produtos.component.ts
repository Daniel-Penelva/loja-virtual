import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IProduto, lista_produtos } from '../../model/produtos';
import { RouterLink } from "@angular/router";
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ProdutosService } from '../../services/produtos.service';


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

  termoBusca: string = ''; // Termo de busca (inicialmente vazio)


  // ------------------------------------------
  // Simula atraso do carregamento (2 segundos)
  // Pode ser substituído por requisição HTTP
  // ------------------------------------------
  constructor(private produtosService: ProdutosService) {
    setTimeout(() => {
      this.produtos = lista_produtos;
      this.isLoading = false;
    }, 2000);
  }

  ngOnInit(): void {
    this.produtos = this.produtosService.getAll();
    
    // Inscreve-se no Observable do termo de busca para atualizar a lista de produtos conforme o usuário  digita
    this.produtosService.termoBusca$.subscribe(termo => {
      this.termoBusca = termo;
      this.paginaAtual = 1; // Reseta para a primeira página ao buscar um novo termo.
    });
  }


  // ------------------------------------------
  // QUANTIDADE TOTAL DE PÁGINAS
  // ------------------------------------------
  get totalPaginas(): number {
    return Math.ceil(this.produtos.length / this.itensPorPagina);
  }

  // ------------------------------------------
  // PRODUTOS QUE SERÃO EXIBIDOS NA PÁGINA ATUAL. ALÉM DISSO, USA produtosFiltrados PARA PAGINAÇÃO APÓS A BUSCA.
  // ------------------------------------------
  get produtosPaginados(): IProduto[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.produtosFiltrados.slice(inicio, fim); // linha modificada para usar produtosFiltrados
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


  // ============================================================
  // GETTER QUE FILTRA OS PRODUTOS COM BASE NO TERMO DE BUSCA
  // ============================================================
  get produtosFiltrados(): IProduto[] {
    if (!this.termoBusca.trim()) {  // Se o termo de busca estiver vazio, retorna todos os produtos 
      return this.produtos;
    }

    const termo = this.termoBusca.toLowerCase();

    // Filtra os produtos cujo nome ou descrição contenha o termo de busca (case insensitive) 
    return this.produtos.filter(produto => 
      produto.descricao.toLowerCase().includes(termo)
    );
  }
}
