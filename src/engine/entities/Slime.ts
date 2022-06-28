import { Entity } from './Entity';
import slimePng from '../../assets/slime-jump.png';
import { Sprite } from '../Sprite';
import { HitBox } from '../HitBox';

export class Slime extends Entity {
  public damage = 3;

  constructor(position: DOMPoint) {
    super(
      position,
      new Sprite(slimePng, 12, 5, 0.5),
      new HitBox(32, 32, position)
    );
  }
}
