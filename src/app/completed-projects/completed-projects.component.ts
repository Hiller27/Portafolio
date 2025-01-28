import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-completed-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './completed-projects.component.html',
  styleUrl: './completed-projects.component.css'
})
export class CompletedProjectsComponent {
  projects = [
  {
    name: 'Servimax',
    phone: '317 3696744',
    website: 'https://servimax.co/#/dashboard',
    imageUrl: 'https://lirp.cdn-website.com/f167db5d/dms3rep/multi/opt/SERVIMAX+LOGO+NUEVO+ALTO+RELIEVE+HORIZONTAL-1920w.png',
    alt: 'Proyecto 1'
  },
  {
    name: 'Servimax',
    phone: '317 3696744',
    website: 'https://servimax.co/#/dashboard',
    imageUrl: 'https://www.valoraanalitik.com/wp-content/uploads/2023/03/Mercado-Libre-1-696x406.jpg',
    alt: 'Proyecto 1'
  },
  {
    name: 'Servimax',
    phone: '317 3696744',
    website: 'https://servimax.co/#/dashboard',
    imageUrl: 'https://lirp.cdn-website.com/f167db5d/dms3rep/multi/opt/SERVIMAX+LOGO+NUEVO+ALTO+RELIEVE+HORIZONTAL-1920w.png',
    alt: 'Proyecto 1'
  },

];
}
