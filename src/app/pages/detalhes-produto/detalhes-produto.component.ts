import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.css',
})
export class DetalhesProdutoComponent {
  idProduto!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // testando no console
    this.idProduto = Number(this.route.snapshot.paramMap.get('id'));
    console.log("ID do produto: ", this.idProduto);
  }
}
