import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";
import { ProgrammingLanguagesComponent } from "../programming-languages/programming-languages.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProfileComponent, ProgrammingLanguagesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private readonly particleCount = 60;
  private maxDistance = 150;
  private particleImages: HTMLImageElement[] = [];
  showProgrammingLanguages: boolean = false;

  constructor(private el: ElementRef, private router: Router,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadParticleImages();
  }

  project() {
    this.router.navigate(['/projects']);
  }

  private loadParticleImages() {
    const imagePaths = [
      'https://img.icons8.com/?size=100&id=UFXRpPFebwa2&format=png&color=000000',
      'https://img.icons8.com/?size=100&id=71257&format=png&color=000000',
      'https://img.icons8.com/?size=100&id=13441&format=png&color=000000',
      'https://img.icons8.com/?size=100&id=m4XmoQpRVreA&format=png&color=000000',
    ];

    let loadedImages = 0;

    for (const path of imagePaths) {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        loadedImages++;
        this.particleImages.push(img);

        if (loadedImages === imagePaths.length) {
          this.initializeCanvas();
          this.createParticles();
          this.animate();
        }
      };
    }
  }

  scrollToContent() {
    this.showProgrammingLanguages = true; // Activar visibilidad

    // Forzar la detección de cambios en Angular
    this.cdr.detectChanges();

    // Esperar un ciclo de eventos para asegurarse de que el DOM haya actualizado
    setTimeout(() => {
      const element = document.getElementById('languagesSection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  private initializeCanvas() {
    this.canvas = this.el.nativeElement.querySelector('canvas')!;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      const randomImage =
        this.particleImages[
          Math.floor(Math.random() * this.particleImages.length)
        ];
      this.particles.push(new Particle(this.canvas.width, this.canvas.height, randomImage));
    }
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const particle of this.particles) {
      particle.move(this.canvas.width, this.canvas.height);
      particle.draw(this.ctx);
    }

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const distance = this.particles[i].distanceTo(this.particles[j]);
        if (distance < this.maxDistance) {
          this.ctx.strokeStyle = `rgba(200, 200, 200, ${1 - distance / this.maxDistance})`;
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
    this.createParticles();
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number = 36;
  private image: HTMLImageElement;

  constructor(canvasWidth: number, canvasHeight: number, image: HTMLImageElement) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.image = image;
  }

  move(canvasWidth: number, canvasHeight: number) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x >= canvasWidth) this.vx *= -1;
    if (this.y <= 0 || this.y >= canvasHeight) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.image.complete) {
      ctx.drawImage(this.image, this.x - this.radius / 2, this.y - this.radius / 2, this.radius, this.radius);
    }
  }

  distanceTo(other: Particle): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
