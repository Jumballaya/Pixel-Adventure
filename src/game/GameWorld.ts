import { Fruit } from '../engine/entities/Fruit';
import { Player } from '../engine/entities/Player';
import { HitBox } from '../engine/HitBox';
import { GravitySystem } from '../engine/systems/GravitySystem';
import { TileMapper } from '../engine/TileMapper';
import { CanvasUI } from '../engine/ui/CanvasUI';
import { GameMap } from './GameMap';
import { createUi } from './ui';

export class GameWorld {
  private drawBox = false;

  private ctx: CanvasRenderingContext2D;
  private worldBox: HitBox;
  private worldBoxLeft: HitBox;
  private worldBoxRight: HitBox;
  private gameMap: TileMapper;
  private player: Player;
  private ui: CanvasUI;

  private gravSystem = new GravitySystem(0.25);

  constructor(private $canvas, private width: number, private height: number) {
    this.ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    $canvas.setAttribute('width', `${this.width}px`);
    $canvas.setAttribute('height', `${this.height}px`);
    this.worldBox = new HitBox(
      this.width - 8,
      this.height - 8,
      new DOMPoint(4, 4),
      [4, 4]
    );
    this.gameMap = GameMap(this.width, this.height);

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
  }

  public update() {
    // Gravity
    this.gravSystem.update([this.player]);

    // Ground Collision
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

    // Side Collision
    if (
      this.player.hitbox.collided(this.worldBoxRight) &&
      this.player.velocity.x > 0
    ) {
      this.gameMap.shiftLeft(this.player.velocity.x);
      const oldPos = this.player.position;
      this.player.setPosition(
        new DOMPoint(oldPos.x - this.player.velocity.x, oldPos.y)
      );
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
    }

    // Entity <-> Player Collision
    for (const ent of this.gameMap.getEntities()) {
      if (ent instanceof Fruit) {
        if (this.player.hitbox.collided(ent.hitbox)) {
          this.gameMap.removeEntity(ent);
          this.player.addFruit(ent.type);
        }
      }
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
    this.player.update(this.worldBox);
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
    this.ui.draw(this.drawBox);
  }
}
