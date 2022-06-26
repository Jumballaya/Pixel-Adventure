import { Sprite } from '../Sprite';
import { HitBox } from '../HitBox';
import { CanvasUI } from '../ui/CanvasUI';

export class Entity {
  public velocity = { x: 0, y: 0 };
  public facing = true;

  protected paused = false;

  constructor(
    public position: DOMPoint,
    public sprite: Sprite,
    public hitbox: HitBox
  ) {}

  public draw(ctx: CanvasRenderingContext2D, drawBox = false) {
    this.sprite.draw(ctx, this.position);

    if (drawBox) {
      this.hitbox.draw(ctx);
    }
  }

  public update(worldBox: HitBox, ui: CanvasUI) {}

  public setPosition(position: DOMPoint) {
    if (!this.paused) {
      this.position = position;
      this.hitbox.setPosition(position);
    }
  }

  public setSprite(sprite: Sprite) {
    this.sprite = sprite;
  }

  public pause() {
    this.sprite.pause();
    this.paused = true;
  }

  public unpause() {
    this.sprite.unpause();
    this.paused = false;
  }
}
