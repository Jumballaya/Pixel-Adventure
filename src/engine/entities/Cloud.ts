import { Sprite } from '../Sprite';
import { Entity } from './Entity';
import cloudPng from '../../assets/cloud.png';
import { HitBox } from '../HitBox';

const sprite = new Sprite(cloudPng);

export class Cloud extends Entity {
  constructor(position: DOMPoint) {
    super(position, sprite, new HitBox(128, 128, position));
  }
}
