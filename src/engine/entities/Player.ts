import idlePng from '../../assets/Virtual Guy/Idle (32x32).png';
import fallPng from '../../assets/Virtual Guy/Fall (32x32).png';
import jumpPng from '../../assets/Virtual Guy/Jump (32x32).png';
import runPng from '../../assets/Virtual Guy/Run (32x32).png';
import doubleJumpPng from '../../assets/Virtual Guy/Double Jump (32x32).png';

import { HitBox } from '../HitBox';

import { Sprite } from '../Sprite';
import { Entity } from './Entity';
import { Events } from '../Events';
import { FruitType } from './Fruit';

const playerSprites = {
  idle: new Sprite(idlePng, 11),
  fall: new Sprite(fallPng),
  jump: new Sprite(jumpPng),
  run: new Sprite(runPng, 12, 3),
  doubleJump: new Sprite(doubleJumpPng, 6, 3, 1, false)
};

export class Player extends Entity {
  public jumpCount = 0;

  public fruit: Record<FruitType, number> = {
    apple: 0,
    bananas: 0,
    cherries: 0,
    kiwi: 0,
    melon: 0,
    orange: 0,
    pineapple: 0,
    strawberry: 0
  };

  constructor(events: Events) {
    const sprite = playerSprites.run;
    const hitbox = new HitBox(32, 38, new DOMPoint(0, 0), [-4, -5], '#ff0000');
    super(new DOMPoint(0, 0), sprite, hitbox);
    this.setupEvents(events);
  }

  public update(worldBox: HitBox) {
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
    if (this.jumpCount === 2) {
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

    this.sprite.flip(this.facing);
  }

  public jump() {
    playerSprites.doubleJump.reset();
    if (this.jumpCount < 2) {
      this.jumpCount++;
      this.velocity.y = 8;
    }
  }

  public addFruit(type: FruitType) {
    this.fruit[type] += 1;
  }

  private setupEvents(events: Events) {
    events.listen('keydown', (evt) => {
      const d = evt.keys?.get('d');
      const a = evt.keys?.get('a');
      const shift = evt.keys?.get('shift');
      const space = evt.keys?.get(' ');

      if (d?.pressed && !a?.pressed) {
        this.velocity.x = 1.5;
        this.facing = false;
      }
      if (a?.pressed && !d?.pressed) {
        this.velocity.x = -1.5;
        this.facing = true;
      }
      if (a?.pressed && d?.pressed) {
        if (a?.lastPressed > d?.lastPressed) {
          this.velocity.x = -1.5;
          this.facing = true;
        } else {
          this.velocity.x = 1.5;
          this.facing = false;
        }
      }
      if (shift?.pressed) {
        this.velocity.x *= 3;
      }

      if (space && space.pressed) {
        this.jump();
      }
    });

    events.listen('keyup', (evt) => {
      const d = evt.keys?.get('d');
      const a = evt.keys?.get('a');
      const shift = evt.keys?.get('shift');

      if (d?.pressed && !a?.pressed) {
        this.velocity.x = 1.5;
        this.facing = false;
      }
      if (a?.pressed && !d?.pressed) {
        this.velocity.x = -1.5;
        this.facing = true;
      }

      if (!d?.pressed && !a?.pressed) {
        this.velocity.x = 0;
      }
      if (shift?.pressed) {
        this.velocity.x *= 3;
      }
    });
  }
}
