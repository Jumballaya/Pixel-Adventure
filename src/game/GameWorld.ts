import { Fruit, FruitType } from '../engine/entities/Fruit';
import { Player } from '../engine/entities/Player';
import { Slime } from '../engine/entities/Slime';
import { Vendor } from '../engine/entities/Vendor';
import { HitBox } from '../engine/HitBox';
import { GravitySystem } from '../engine/systems/GravitySystem';
import { TileMapper } from '../engine/TileMapper';
import { CanvasUI } from '../engine/ui/CanvasUI';
import { GameMap } from './GameMap';
import { createUi } from './ui';
import { shopWindow } from './ui/shop-window';
import { vendorDialog } from './ui/vendor-dialog';
import { pauseMenu } from './ui/pause-menu';
import { clouds } from './clouds';

export class GameWorld {
  private drawBox = false;

  private ctx: CanvasRenderingContext2D;
  private worldBox: HitBox;
  private worldBoxLeft: HitBox;
  private worldBoxRight: HitBox;
  private gameMap: TileMapper;
  private player: Player;
  private ui: CanvasUI;

  private paused = false;

  private gravSystem = new GravitySystem(0.25);

  private abilities: Record<string, boolean> = {
    tripleJump: false,
    quadJump: false,
    extraHealth1: false,
    extraHealth2: false,
    extraStamina1: false,
    extraStamina2: false,
    speedBoost1: false,
    speedBoost2: false
  };

  private abilitiesCosts: Record<string, Partial<Record<FruitType, number>>> = {
    tripleJump: { apple: 9 },
    quadJump: { apple: 4, bananas: 4, pineapple: 4, orange: 4 },
    extraHealth1: { melon: 3, strawberry: 3, orange: 3 },
    extraHealth2: { kiwi: 6, bananas: 6 },
    extraStamina1: { cherries: 3, pineapple: 3, bananas: 3 },
    extraStamina2: { orange: 6, melon: 6 },
    speedBoost1: { orange: 6, melon: 3, strawberry: 3, apple: 3 },
    speedBoost2: { strawberry: 8, kiwi: 8, cherries: 4 }
  };

  constructor(
    private $canvas: HTMLCanvasElement,
    private width: number,
    private height: number
  ) {
    this.ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    $canvas.setAttribute('width', `${this.width}px`);
    $canvas.setAttribute('height', `${this.height}px`);
    this.worldBox = new HitBox(
      this.width - 8,
      this.height - 8,
      new DOMPoint(4, 4),
      [4, 4]
    );
    this.gameMap = GameMap;

    this.worldBoxLeft = new HitBox(
      256,
      this.height,
      new DOMPoint(0, 0),
      [0, 0],
      '#00ff00'
    );
    this.worldBoxRight = new HitBox(
      256,
      this.height,
      new DOMPoint(this.width - 256, 0),
      [0, 0],
      '#00ff00'
    );
    this.ui = createUi(this.$canvas, this.width, this.height);
    this.player = new Player(this.ui.events);

    this.ui.events.listen('keydown', (evt) => {
      const escape = evt.keys?.get('escape');
      if (escape && escape.pressed) {
        if (this.paused) this.unpause();
        else this.pause();
        const vendor = this.gameMap
          .getEntities()
          .filter((e) => e instanceof Vendor)[0] as Vendor | undefined;
        if (vendor) {
          vendor.closeShop();
        }
      }
    });

    this.ui.document.body.appendChild(vendorDialog);
    this.ui.document.body.appendChild(shopWindow);
    this.ui.document.body.appendChild(pauseMenu);

    shopWindow
      .findElementById('triple-jump')
      ?.addEventListener('ui-click', (evt) => {
        if (
          !this.abilities.tripleJump &&
          this.player.canBuy(this.abilitiesCosts.tripleJump)
        ) {
          evt.target.setAttribute('purchased', true);
          this.player.buy(this.abilitiesCosts.tripleJump);
          this.abilities.tripleJump = true;
          this.player.jumpMax = 3;
        }
      });

    shopWindow
      .findElementById('quad-jump')
      ?.addEventListener('ui-click', (evt) => {
        if (
          !this.abilities.quadJump &&
          this.player.canBuy(this.abilitiesCosts.quadJump)
        ) {
          evt.target.setAttribute('purchased', true);
          this.player.buy(this.abilitiesCosts.quadJump);
          this.abilities.quadJump = true;
          this.player.jumpMax = 4;
        }
      });

    shopWindow
      .findElementById('more-health-i')
      ?.addEventListener('ui-click', (evt) => {
        if (
          !this.abilities.extraHealth1 &&
          this.player.canBuy(this.abilitiesCosts.extraHealth1)
        ) {
          evt.target.setAttribute('purchased', true);
          this.player.buy(this.abilitiesCosts.extraHealth1);
          this.abilities.extraHealth1 = true;
          this.player.hpMax += 25;
          this.player.health = this.player.hpMax;
        }
      });

    shopWindow
      .findElementById('more-health-ii')
      ?.addEventListener('ui-click', (evt) => {
        if (
          !this.abilities.extraHealth2 &&
          this.player.canBuy(this.abilitiesCosts.extraHealth2)
        ) {
          evt.target.setAttribute('purchased', true);
          this.player.buy(this.abilitiesCosts.extraHealth2);
          this.abilities.extraHealth2 = true;
          this.player.hpMax += 35;
          this.player.health = this.player.hpMax;
        }
      });

    shopWindow
      .findElementById('more-stamina-i')
      ?.addEventListener('ui-click', (evt) => {
        if (
          !this.abilities.extraStamina1 &&
          this.player.canBuy(this.abilitiesCosts.extraStamina1)
        ) {
          evt.target.setAttribute('purchased', true);
          this.player.buy(this.abilitiesCosts.extraStamina1);
          this.abilities.extraStamina1 = true;
          this.player.stamMax += 35;
          this.player.stamina = this.player.stamMax;
        }
      });

    shopWindow
      .findElementById('more-stamina-ii')
      ?.addEventListener('ui-click', (evt) => {
        if (
          !this.abilities.extraStamina2 &&
          this.player.canBuy(this.abilitiesCosts.extraStamina2)
        ) {
          evt.target.setAttribute('purchased', true);
          this.player.buy(this.abilitiesCosts.extraStamina2);
          this.abilities.extraStamina2 = true;
          this.player.stamMax += 35;
          this.player.stamina = this.player.stamMax;
        }
      });

    shopWindow
      .findElementById('speed-boost-i')
      ?.addEventListener('ui-click', (evt) => {
        if (
          !this.abilities.speedBoost1 &&
          this.player.canBuy(this.abilitiesCosts.speedBoost1)
        ) {
          evt.target.setAttribute('purchased', true);
          this.player.buy(this.abilitiesCosts.speedBoost1);
          this.abilities.speedBoost1 = true;
          this.player.runSpeed += this.player.runSpeed / 4;
          this.player.walkSpeed += this.player.walkSpeed / 4;
        }
      });

    shopWindow
      .findElementById('speed-boost-ii')
      ?.addEventListener('ui-click', (evt) => {
        if (
          !this.abilities.speedBoost2 &&
          this.player.canBuy(this.abilitiesCosts.speedBoost2)
        ) {
          evt.target.setAttribute('purchased', true);
          this.player.buy(this.abilitiesCosts.speedBoost2);
          this.abilities.speedBoost2 = true;
          this.player.runSpeed += this.player.runSpeed / 4;
          this.player.walkSpeed += this.player.walkSpeed / 4;
        }
      });

    this.gameMap.draw(this.ctx, this.worldBox, this.drawBox);
  }

  public update() {
    // Gravity
    if (!this.paused) {
      this.gravSystem.update([this.player]);
    }

    // Ground Collision
    if (!this.paused) {
      for (const ground of this.gameMap.getHitboxes('platforms')) {
        if (this.player.hitbox.collided(ground)) {
          if (this.player.velocity.y < 0) {
            const pos = this.player.position;
            this.player.setPosition(
              new DOMPoint(pos.x, ground.getPosition().y - 33)
            );
            this.player.velocity.y = 0;
            this.player.jumpCount = 0;
          }
        }
      }
    }

    // Side Collision
    if (!this.paused) {
      if (
        this.player.hitbox.collided(this.worldBoxRight) &&
        this.gameMap.getPosition().x > -(this.width * 1.5) &&
        this.player.velocity.x > 0
      ) {
        this.gameMap.shiftLeft(this.player.velocity.x);
        const oldPos = this.player.position;
        this.player.setPosition(
          new DOMPoint(oldPos.x - this.player.velocity.x, oldPos.y)
        );
        clouds.shiftLeft(this.player.velocity.x);
      }
      if (
        this.player.hitbox.collided(this.worldBoxLeft) &&
        this.gameMap.getPosition().x < 0 &&
        this.player.velocity.x < 0
      ) {
        this.gameMap.shiftRight(-this.player.velocity.x);
        const oldPos = this.player.position;
        this.player.setPosition(
          new DOMPoint(oldPos.x - this.player.velocity.x, oldPos.y)
        );
        clouds.shiftRight(this.player.velocity.x);
      }
    }

    // Entity <-> Player Collision
    if (!this.paused) {
      for (const ent of this.gameMap.getEntities()) {
        if (ent instanceof Fruit) {
          if (this.player.hitbox.collided(ent.hitbox)) {
            this.gameMap.removeEntity(ent);
            this.player.addFruit(ent.type);
          }
        }

        if (ent instanceof Vendor) {
          if (this.player.hitbox.collided(ent.hitbox)) {
            ent.toggleHelperMessage(true);
            if (
              this.ui.events.getLastPressed()?.key === 'e' &&
              !ent.shopOpen()
            ) {
              ent.openShop();
              this.pause(false);
            }
          } else {
            ent.closeShop();
            ent.toggleHelperMessage(false);
          }
        }

        if (ent instanceof Slime) {
          if (this.player.hitbox.collided(ent.hitbox)) {
            this.player.velocity.x = -this.player.velocity.x;
            this.player.velocity.y = -this.player.velocity.y;

            this.player.health -= ent.damage;
          }
        }

        ent.update(this.worldBox, this.ui);
      }

      clouds.update();
    }

    // UI Update
    this.ui.document.body
      .findElementById('appleScore')
      ?.setAttribute('content', this.player.fruit['apple']);
    this.ui.document.body
      .findElementById('cherriesScore')
      ?.setAttribute('content', this.player.fruit['cherries']);
    this.ui.document.body
      .findElementById('bananasScore')
      ?.setAttribute('content', this.player.fruit['bananas']);
    this.ui.document.body
      .findElementById('kiwiScore')
      ?.setAttribute('content', this.player.fruit['kiwi']);
    this.ui.document.body
      .findElementById('melonScore')
      ?.setAttribute('content', this.player.fruit['melon']);
    this.ui.document.body
      .findElementById('orangeScore')
      ?.setAttribute('content', this.player.fruit['orange']);
    this.ui.document.body
      .findElementById('pineappleScore')
      ?.setAttribute('content', this.player.fruit['pineapple']);
    this.ui.document.body
      .findElementById('strawberryScore')
      ?.setAttribute('content', this.player.fruit['strawberry']);

    const hpBar = this.ui.document.body.findElementById('health-bar');
    if (hpBar) {
      hpBar.width = this.player.getHealthPercent();
    }

    const stamBar = this.ui.document.body.findElementById('stamina-bar');
    if (stamBar) {
      stamBar.width = this.player.getStaminaPercent();
    }

    // Update Player
    if (!this.paused) {
      this.player.update(this.worldBox, this.ui);
    }
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#211f30';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.gameMap.draw(this.ctx, this.worldBox, this.drawBox);
    if (this.drawBox) {
      this.worldBoxLeft.draw(this.ctx);
      this.worldBoxRight.draw(this.ctx);
    }

    this.player.draw(this.ctx, this.drawBox);
    clouds.draw(this.ctx);
    this.ui.draw(this.drawBox);
  }

  public pause(showMenu = true) {
    this.paused = true;
    this.player.pause();
    this.gameMap.pause();
    if (showMenu) {
      const pauseMenu = this.ui.document.body.findElementById('pause-menu');
      if (pauseMenu) pauseMenu.visible = true;
    }
  }

  public unpause() {
    this.paused = false;
    this.player.unpause();
    this.gameMap.unpause();
    const pauseMenu = this.ui.document.body.findElementById('pause-menu');
    if (pauseMenu) pauseMenu.visible = false;
  }
}
