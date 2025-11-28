import { Injectable } from '@angular/core';
import { IProduto, lista_produtos } from '../model/produtos';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtos: IProduto[] = lista_produtos;

  private termoBuscaSubject = new BehaviorSubject<string>('');  // termo inicial vazio
  termoBusca$ = this.termoBuscaSubject.asObservable();  // Observable público para outros componentes se inscreverem no termo de busca. 

  constructor() { }

  getAll() {
    return this.produtos;
  }

  getOne(produtoId: number) {
    return this.produtos.find(produto => produto.id === produtoId);
  }

  // Método chamado pelo Header para atualizar o termo de busca
  setTermoBusca(termo: string) {
    this.termoBuscaSubject.next(termo);
  }

}

/*
ATENÇÃO! Explicaação do funcionamento da busca entre componentes via serviço compartilhado:
1. No ProdutosService, foi criado um BehaviorSubject chamado termoBuscaSubject para armazenar o termo de busca atual. Inicialmente, ele é 
vazio ('').

2. Também foi criado um Observable público termoBusca$ que outros componentes podem se inscrever para receber atualizações do termo de busca.
O uso do $ significa que está variável é um Observable, é uma forma de identificar rapidamente que é um Observable e que deve usar subscribe() 
ou async pipe nela.
Melhor Entendimento: https://angular.io/guide/observables-in-angular#naming-conventions-for-observables
Sobre BehaviorSubject: https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject
Sobre Subject: https://www.learnrxjs.io/learn-rxjs/subjects/subject

O subject é uma forma de emitir eventos que outros componentes podem ouvir. No caso, o BehaviorSubject mantém o valor atual do termo de busca e 
emite esse valor sempre que ele é atualizado. Ele também armazena o último valor emitido, então novos inscritos recebem imediatamente o valor 
atual. O Observable termoBusca$ é usado para que outros componentes possam se inscrever e reagir às mudanças no termo de busca. Ele vai escutar
as atualizações do BehaviorSubject e notificar os inscritos sempre que o termo de busca mudar.

Ou seja, o Subject é a fonte de eventos, e o Observable é a forma como outros componentes ouvem esses eventos. Seguinte analogia: O subject
funciona como um megafone no serviço, e qualquer componente pode emitir algo setFiltroBusca("mouse") pelo megafone. Outros componentes que 
escutar as mudanças no megafone (Observable - produtosService.filtroBusca$.subscribe(texto => ...)) vão receber a mensagem emitida.


3. No HeaderComponent, foi injetado o ProdutosService e chamado o método setTermoBusca() sempre que o usuário digita algo no campo de busca. 
Isso atualiza o BehaviorSubject com o novo termo.

4. No ProdutosComponent, também foi injetado o ProdutosService e nos inscrevemos no Observable termoBusca$ no ngOnInit(). Sempre que o termo de 
busca é atualizado pelo Header, o ProdutosComponent recebe a notificação e atualiza sua variável termoBusca.

5. Com isso, o ProdutosComponent pode filtrar a lista de produtos com base no termo de busca atualizado em tempo real.

*/