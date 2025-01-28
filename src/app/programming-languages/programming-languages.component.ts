import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-programming-languages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programming-languages.component.html',
  styleUrl: './programming-languages.component.css'
})
export class ProgrammingLanguagesComponent implements OnInit, OnDestroy {
  languages = [
    { name: 'JavaScript', icon: 'https://img.icons8.com/?size=100&id=Nkym0Ujb8VGI&format=png&color=000000' },
    { name: 'Python', icon: 'https://img.icons8.com/?size=100&id=W3gfKnMhfM6h&format=png&color=000000' },
    { name: 'Angular', icon: 'https://img.icons8.com/?size=100&id=71257&format=png&color=000000' },
    { name: 'HTML', icon: 'https://img.icons8.com/?size=100&id=zRvbzAjx4VWY&format=png&color=000000' },
    { name: 'TypeScript', icon: 'https://img.icons8.com/?size=100&id=wpZmKzk11AzJ&format=png&color=000000' },
    { name: 'CSS', icon: 'https://img.icons8.com/?size=100&id=7gdY5qNXaKC0&format=png&color=000000' },
    { name: 'Mysql', icon: 'https://img.icons8.com/?size=100&id=9nLaR5KFGjN0&format=png&color=000000' },
    { name: 'GIT', icon: 'https://img.icons8.com/?size=100&id=8verEw3iUvx0&format=png&color=000000' },
  ];
  private intervalId: any;

  constructor() {}

  ngOnInit() {
    this.startAnimationLoop();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Detener el intervalo cuando el componente se destruya
  }

  // Función que inicia el ciclo de animación infinita
  startAnimationLoop() {
    let count = 0;
    this.intervalId = setInterval(() => {
      this.resetAnimations();
      count++;
    }, 4000); // Cambiar animaciones cada 3 segundos
  }

  // Función que aplica la animación a cada tarjeta
  resetAnimations() {
    const cards = document.querySelectorAll('.card-animate');
    cards.forEach((card: any) => {
      // Quitar la clase 'reanimate' si ya está presente
      card.classList.remove('reanimate');

      // Forzar un pequeño retraso antes de volver a añadir la clase 'reanimate'
      void card.offsetWidth; // Esto asegura que el navegador detecte el cambio
      card.classList.add('reanimate');
    });
  }

  // Obtener un retraso dinámico para las animaciones (en función del índice de la tarjeta)
  getAnimationDelay(index: number): string {
    return `${index * 0.2}s`; // Retraso basado en el índice
  }
}
