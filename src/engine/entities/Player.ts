import idlePng from '../../assets/Virtual Guy/Idle (32x32).png';
import fallPng from '../../assets/Virtual Guy/Fall (32x32).png';
import jumpPng from '../../assets/Virtual Guy/Jump (32x32).png';
import runPng from '../../assets/Virtual Guy/Run (32x32).png';
import doubleJumpPng from '../../assets/Virtual Guy/Double Jump (32x32).png';
import particlePng from '../../assets/Dust Particle.png';

import { HitBox } from '../HitBox';
import { Sprite } from '../Sprite';
import { Entity } from './Entity';
import { Events } from '../Events';
import { FruitType } from './Fruit';
import { Particles } from '../Particles';
import { CanvasUI } from '../ui/CanvasUI';

const playerSprites = {
  idle: new Sprite(idlePng, 11),
  fall: new Sprite(fallPng),
  jump: new Sprite(jumpPng),
  run: new Sprite(runPng, 12, 3),
  doubleJump: new Sprite(doubleJumpPng, 6, 3, 1, false)
};

export class Player extends Entity {
  public jumpCount = 0;
  public jumpMax = 2;
  public jumpAmount = 7;

  public health = 100;
  public hpMax = 100;

  public stamina = 1000;
  public stamMax = 1000;

  private particles: Particles[] = [];

  public runSpeed = 5;
  public walkSpeed = 3;

  public fruit: Record<FruitType, number> = {
    apple: 999,
    bananas: 999,
    cherries: 999,
    kiwi: 999,
    melon: 999,
    orange: 999,
    pineapple: 999,
    strawberry: 999
  };

  constructor(events: Events) {
    const sprite = playerSprites.run;
    const hitbox = new HitBox(32, 38, new DOMPoint(0, 0), [-4, -5], '#ff0000');
    super(new DOMPoint(64, 768 - 40), sprite, hitbox);
    this.facing = false;
    this.setupEvents(events);
  }

  public draw(ctx: CanvasRenderingContext2D, drawBox = false) {
    super.draw(ctx, drawBox);
    for (const particle of this.particles) {
      particle.draw(ctx);
    }
  }

  public update(worldBox: HitBox, ui: CanvasUI) {
    if (this.paused) return;
    if (this.velocity.x !== 0) {
      this.sprite = playerSprites.run;
    } else {
      this.sprite = playerSprites.idle;
    }
    if (this.velocity.y < 0) {
      this.sprite = playerSprites.fall;
    }
    if (this.velocity.y > 0) {
      this.sprite = playerSprites.jump;
    }
    if (this.jumpCount > 1) {
      this.sprite = playerSprites.doubleJump;
      if (this.sprite.done()) {
        this.sprite = playerSprites.fall;
      }
    }

    const worldPos = worldBox.getPosition();
    const worldDim = worldBox.getDimensions();
    const worldRight =
      worldPos.x + worldDim.width - this.hitbox.getDimensions().width;
    const worldLeft = worldPos.x;
    if (this.position.x <= worldLeft) {
      this.position.x = worldPos.x;
    }
    if (this.position.x >= worldRight) {
      this.position.x =
        worldPos.x + worldDim.width - this.hitbox.getDimensions().width;
    }

    if (Math.abs(this.velocity.x) == this.runSpeed && this.stamina > 0) {
      this.stamina -= 0.5;
    } else if (this.stamina < this.stamMax) {
      this.stamina += 0.25;
    }

    if (this.stamina === 0) {
      this.velocity.x = this.velocity.x > 0 ? this.walkSpeed : -this.walkSpeed;
    }

    for (const particle of this.particles) {
      particle.update();
    }

    this.sprite.flip(this.facing);
  }

  public jump() {
    if (this.paused) return;
    if (this.jumpCount < this.jumpMax) {
      playerSprites.doubleJump.reset();
      this.actionParticles();
    }

    if (this.jumpCount < this.jumpMax) {
      this.jumpCount++;
      this.velocity.y = this.jumpAmount;
    }
  }

  public actionParticles() {
    if (this.paused) return;
    const particles = new Particles(particlePng, 10, 200);
    this.particles.push(particles);
    particles.start(new DOMPoint(this.position.x, this.position.y + 32));
    setTimeout(() => {
      this.particles = this.particles.filter((p) => p !== particles);
    }, 200);
  }

  public canBuy(check: Partial<Record<FruitType, number>>): boolean {
    let ret = true;
    for (const key in check) {
      if (this.fruit[key] < check[key]) ret = false;
    }
    return ret;
  }

  public buy(fruit: Partial<Record<FruitType, number>>) {
    for (const key in fruit) {
      this.fruit[key] -= fruit[key];
    }
  }

  public addFruit(type: FruitType) {
    if (this.paused) return;
    this.fruit[type] += 1;
  }

  public getHealthPercent() {
    return (this.health / this.hpMax) * 100;
  }

  public getStaminaPercent() {
    return (this.stamina / this.stamMax) * 100;
  }

  private setupEvents(events: Events) {
    events.listen('keydown', (evt) => {
      if (this.paused) return;
      const d = evt.keys?.get('d');
      const a = evt.keys?.get('a');
      const shift = evt.keys?.get('shift');
      const space = evt.keys?.get(' ');
      if (d?.pressed && !a?.pressed) {
        this.velocity.x = this.walkSpeed;
        this.facing = false;
      }
      if (a?.pressed && !d?.pressed) {
        this.velocity.x = -this.walkSpeed;
        this.facing = true;
      }
      if (a?.pressed && d?.pressed) {
        if (a?.lastPressed > d?.lastPressed) {
          this.velocity.x = -this.walkSpeed;
          this.facing = true;
        } else {
          this.velocity.x = this.walkSpeed;
          this.facing = false;
        }
      }
      if (shift?.pressed) {
        if (this.velocity.x > 0) {
          this.velocity.x = this.runSpeed;
        } else if (this.velocity.x < 0) {
          this.velocity.x = -this.runSpeed;
        }
      }

      if (space && space.pressed) {
        this.jump();
      }
    });

    events.listen('keyup', (evt) => {
      if (this.paused) return;
      const d = evt.keys?.get('d');
      const a = evt.keys?.get('a');
      const shift = evt.keys?.get('shift');

      if (d?.pressed && !a?.pressed) {
        this.velocity.x = this.walkSpeed;
        this.facing = false;
      }
      if (a?.pressed && !d?.pressed) {
        this.velocity.x = -this.walkSpeed;
        this.facing = true;
      }

      if (!d?.pressed && !a?.pressed) {
        this.velocity.x = 0;
      }
      if (shift?.pressed) {
        if (this.velocity.x > 0) {
          this.velocity.x = this.runSpeed;
        } else if (this.velocity.x < 0) {
          this.velocity.x = -this.runSpeed;
        }
      }
    });
  }
}
