import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduto } from '../../model/produtos';
import { ProdutosService } from '../../services/produtos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.css',
})
export class DetalhesProdutoComponent {
  
  idProduto!: number;

  produto: IProduto | undefined;
  quantidade = 1 ;

  quantidadeInvalida: boolean = false;

  testAngularMaterial: string = "add no carrinho";

  constructor(private route: ActivatedRoute, private produtoService: ProdutosService, private snackBar: MatSnackBar) {}

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
    console.log(this.testAngularMaterial);
    this.snackBar.open('Add no carrinho com sucesso', 'Fechar', { duration: 5000 });
  }

}
