import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit{

  mensagemEnviada: boolean = false; // Variável que controla a exibição da mensagem de sucesso
  contatoForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.contatoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Método chamado ao enviar o formulário
  enviar() {
    if (this.contatoForm.invalid) {
      this.contatoForm.markAllAsTouched(); // força mostrar erros
      return;
    }

    // Simulação de envio bem sucedido
    console.log('Dados do formulário:', this.contatoForm.value);

    // Exibe a mensagem
    this.mensagemEnviada = true;

    // Limpar o formulário
    this.contatoForm.reset();

    // Remove a mensagem após 4 segundos
    setTimeout(() => {
      this.mensagemEnviada = false;
    }, 4000);
  }

}
