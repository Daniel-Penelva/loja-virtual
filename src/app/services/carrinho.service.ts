import { Injectable } from '@angular/core';
import { IProdutoCarrinho } from '../model/produtos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  itens: IProdutoCarrinho[] = [];

  constructor() { }

  obtemCarrinho() {
    this.itens = JSON.parse(localStorage.getItem("carrinho") || "[]");  // Obtém os itens do carrinho CONVERTENDO JSON para array de objeto JS - JSON.parse()
    return this.itens;
  }

  adicionarCarrinho(produto: IProdutoCarrinho) {
    this.itens.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(this.itens)); // Add o item no carrinho CONVERTENDO PARA STRING - JSON.stringify()
  }

  removerProdutoCarrinho(produtoId: number) {
    this.itens = this.itens.filter(item => item.id !== produtoId); // filtra o array removendo o item que possui o id igual ao produtoId passado.
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

  limparCarrinho() {
    this.itens = [];
    localStorage.clear();
  }
}
