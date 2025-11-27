import { Component } from '@angular/core';
import { IProdutoCarrinho } from '../../model/produtos';
import { CarrinhoService } from '../../services/carrinho.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificacaoService } from '../../services/notificacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {

  itensCarrinho: IProdutoCarrinho[] = [];
  total = 0;

  constructor(
    public carrinhoService: CarrinhoService, 
    private notificacaoService: NotificacaoService,
    private router: Router) {}

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();  // Obtém os itens (os produtos) do carrinho    

    this.calcularTotal(); // chamando o método calcular total dos produtos no carrinho
  }

  calcularTotal() {
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidadeCarrinho), 0);
  }

  removerProdutoCarrinho(produtoId: number) {
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calcularTotal();
  }

  comprar() {
    this.carrinhoService.limparCarrinho();
    this.notificacaoService.notificar("Parabéns, você finalizou sua compra!");
    this.router.navigate(["/home"]);
  }

  limparCarrinho () {
    this.carrinhoService.limparCarrinho();
    this.itensCarrinho = [];
    this.calcularTotal();
  }

}
