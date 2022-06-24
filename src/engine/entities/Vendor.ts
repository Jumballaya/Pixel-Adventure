import idlePng from '../../assets/Ninja Frog/Idle (32x32).png';
import frame from '../../assets/menu-gui-paper.png';

import { HitBox } from '../HitBox';
import { Sprite } from '../Sprite';
import { TileMap } from '../TileMap';
import { CanvasElement } from '../ui/CanvasElement';
import { CanvasUIBuilder } from '../ui/CanvasUIBuilder';
import { Entity } from './Entity';

const helperDialog = new CanvasUIBuilder().parseFromString(`
  <div family="'Press Start 2P', sans-serif">
    <img width="174" height="32" backgroundColor="#ead4aa">
    <p size="10">Press 'e' to open</p>
    <p size="10" position="[0, 16]">the shop!</p>
  </div>`) as CanvasElement;

helperDialog.borderImage = new TileMap(frame, [3, 3], 0.25);
helperDialog.width = 174;
helperDialog.height = 38;

export class Vendor extends Entity {
  private showHelperMessage = false;

  constructor() {
    const sprite = new Sprite(idlePng, 11);
    const hitbox = new HitBox(32, 38, new DOMPoint(0, 0), [-4, -5], '#ff0000');
    super(new DOMPoint(64, 768 - 40), sprite, hitbox);
    this.facing = false;
    this.sprite.flip(true);
  }

  public toggleHelperMessage(toggle: boolean) {
    this.showHelperMessage = toggle;
  }

  public draw(ctx: CanvasRenderingContext2D, drawBox = false) {
    super.draw(ctx, drawBox);

    if (this.showHelperMessage) {
      helperDialog.position = new DOMPoint(
        this.position.x - 64,
        this.position.y - 36
      );
      helperDialog.draw(ctx);
    }
  }
}
