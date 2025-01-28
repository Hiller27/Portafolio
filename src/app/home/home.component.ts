import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";
import { ProgrammingLanguagesComponent } from "../programming-languages/programming-languages.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ProfileComponent, ProgrammingLanguagesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private readonly particleCount = 100;
  private maxDistance = 150;
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initializeCanvas();
    this.createParticles();
    this.animate();
  }

  scrollToContent() {
    const element = document.getElementById('languagesSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Dibujar partículas
    for (const particle of this.particles) {
      particle.move(this.canvas.width, this.canvas.height);
      particle.attractTo(this.mouseX, this.mouseY);
      particle.draw(this.ctx);
    }

    // Dibujar líneas entre partículas cercanas
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const distance = this.particles[i].distanceTo(this.particles[j]);
        if (distance < this.maxDistance) {
          this.ctx.strokeStyle = `rgba(200, 200, 200, ${1 - distance / this.maxDistance})`;
          this.ctx.lineWidth = 3;
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

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number = 6;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
  }

  move(canvasWidth: number, canvasHeight: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Rebotar en los bordes
    if (this.x <= 0 || this.x >= canvasWidth) this.vx *= -1;
    if (this.y <= 0 || this.y >= canvasHeight) this.vy *= -1;
  }

  attractTo(mouseX: number, mouseY: number) {
    // Atraer las partículas hacia la posición del cursor
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      const angle = Math.atan2(dy, dx);
      const force = (100 - distance) / 100; // Fuerza de atracción
      this.vx += Math.cos(angle) * force;
      this.vy += Math.sin(angle) * force;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ffffff'; // Color de las partículas: negro
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  distanceTo(other: Particle): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

}
