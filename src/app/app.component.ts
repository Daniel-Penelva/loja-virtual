import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'loja-virtual';

  isDarkMode = false;    // Estado do botão "Modo claro e escuro" - true = claro | false = escuro
  showBackToTop = false; // Estado do botão "Voltar ao topo" - true = aparece | false = some


  // ===========================================================
  // Monitora o scroll da página
  // Ativa o botão quando o usuário descer 200px
  // ===========================================================
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.showBackToTop = scrollY > 200; // aparece só depois de rolar
  }

  // ===========================================================
  // Função que leva o usuário ao topo com animação suave
  // ===========================================================
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // animação suave
    });
  }


  // ===========================================================
  // Função alterna modo claro para modo escuro
  // ===========================================================
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

}
