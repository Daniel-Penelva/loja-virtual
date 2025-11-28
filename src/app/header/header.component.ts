import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CarrinhoService } from '../services/carrinho.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ProdutosService } from '../services/produtos.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  termo: string = '';

  constructor(public carrinhoService: CarrinhoService, private produtosService: ProdutosService){}

  onBuscar(valor: string) {
    this.produtosService.setTermoBusca(valor);
  }

}
