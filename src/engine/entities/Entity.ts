import { Sprite } from '../Sprite';
import { HitBox } from '../HitBox';


export class Entity {

  public velocity = { x: 0, y: 0 };
  public facing: boolean = true;

  constructor(public position: DOMPoint, public sprite: Sprite, public hitbox: HitBox) {}

  public draw(ctx: CanvasRenderingContext2D, drawBox = false) {
    this.sprite.draw(ctx, this.position);
  
    if (drawBox) {
      this.hitbox.draw(ctx);
    }
  }

  public setPosition(position: DOMPoint) {
    this.position = position;
    this.hitbox.setPosition(position);
  }

  public setSprite(sprite: Sprite) {
    this.sprite = sprite;
  }
}