import particlePng from '../assets/Dust Particle.png';
import { Sprite } from './Sprite';

interface Particle {
  position: DOMPoint;
  vector: DOMPoint;
  speed: number;
  sprite: Sprite;
}

const lerp = (x: number, y: number, a: number): number => x * (1 - a) + y * a;

export class Particles {
  private pool: Array<Particle> = [];
  private time: number;

  constructor(
    private src = particlePng,
    private count = 5,
    private length = 1000
  ) {
    this.time = Date.now();
  }

  public start(pos: DOMPoint) {
    this.time = Date.now();
    this.pool = [];
    for (let i = 0; i < this.count; i++) {
      const vX = Math.cos(Math.random() * Math.PI * 2) * 1.5;
      const vY = -Math.abs(Math.sin(Math.random() * Math.PI * 2)) - 2;
      const vector = new DOMPoint(vX, vY);
      const speed = Math.random() / 3;
      const sprite = new Sprite(this.src);
      const scale = 1.25 / 1.25 - Math.random() * 1.25;
      sprite.setScale(scale);
      const position = new DOMPoint(pos.x + i, pos.y);
      this.pool.push({ position, vector, speed, sprite });
    }
  }

  public update() {
    const withinTime = Date.now() < this.time + this.length;
    if (!withinTime && this.pool.length > 0) {
      this.pool = [];
    }
    const deltaT = Date.now() - this.time;
    for (const particle of this.pool) {
      particle.position.x =
        particle.position.x + particle.vector.x * particle.speed;
      particle.position.y =
        particle.position.y + particle.vector.y * particle.speed;
      const scale = lerp(0, 0.5, deltaT / this.length);
      particle.sprite.setScale(scale);
      particle.sprite.setOpacity(scale);
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const hasParticles = this.pool.length > 0;
    if (hasParticles) {
      for (const particle of this.pool) {
        particle.sprite.draw(ctx, particle.position);
      }
    }
  }
}
