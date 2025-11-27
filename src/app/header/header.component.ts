import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public carrinhoService: CarrinhoService){}

}
