import idlePng from '../../assets/Ninja Frog/Idle (32x32).png';
import { HitBox } from '../HitBox';
import { Sprite } from '../Sprite';
import { Entity } from './Entity';
import { CanvasUI } from '../ui/CanvasUI';

export class Vendor extends Entity {
  private showHelperMessage = false;
  private shopIsOpen = false;

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

  public update(worldBox: HitBox, ui: CanvasUI): void {
    if (!this.hitbox.collided(worldBox)) return;

    const vendorDialog = ui.document.body.findElementById('vendor-dialog');
    const shopWindow = ui.document.body.findElementById('vendor-shop');
    if (vendorDialog) {
      if (this.showHelperMessage) {
        vendorDialog.position = new DOMPoint(
          this.position.x - 64,
          this.position.y - 36
        );
      } else {
        vendorDialog.position = new DOMPoint(-500, -500);
      }
    }

    if (shopWindow) {
      if (this.shopIsOpen) {
        shopWindow.position = new DOMPoint(300, 200);
      } else {
        shopWindow.position = new DOMPoint(-500, -500);
      }
    }
  }

  public openShop() {
    this.shopIsOpen = true;
  }

  public closeShop() {
    this.shopIsOpen = false;
  }

  public shopOpen(): boolean {
    return this.shopIsOpen;
  }
}
