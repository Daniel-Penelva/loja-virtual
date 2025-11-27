import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduto, IProdutoCarrinho } from '../../model/produtos';
import { ProdutosService } from '../../services/produtos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificacaoService } from '../../services/notificacao.service';
import { CarrinhoService } from '../../services/carrinho.service';


@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.css',
})
export class DetalhesProdutoComponent {
  
  idProduto!: number;

  produto: IProduto | undefined;
  quantidade = 1 ;

  quantidadeInvalida: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private produtoService: ProdutosService, 
    private notificacaoService: NotificacaoService,
    private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    // testando no console
    this.idProduto = Number(this.route.snapshot.paramMap.get('id'));
    
    this.produto = this.produtoService.getOne(this.idProduto);

    console.log("ID do produto: ", this.idProduto);
  }

  validarQuantidade() {
    if (!this.produto) return;

    this.quantidadeInvalida = this.quantidade > this.produto.quantidadeEstoque;

    // Evita valores abaixo de 1
    if (this.quantidade < 1) {
      this.quantidade = 1;
      this.quantidadeInvalida = false;
    }
  }

  addCarrinho() {
    const produto: IProdutoCarrinho = { ...this.produto!, quantidadeCarrinho: this.quantidade} 
    this.carrinhoService.adicionarCarrinho(produto);
    this.notificacaoService.notificar("Carrinho adicionado com Sucesso!");
  }

}
