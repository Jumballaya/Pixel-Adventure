import { Entity } from './Entity';
import applePng from '../../assets/Items/Fruits/Apple.png';
import bananasPng from '../../assets/Items/Fruits/Bananas.png';
import cherriesPng from '../../assets/Items/Fruits/Cherries.png';
import kiwiPng from '../../assets/Items/Fruits/Kiwi.png';
import melonPng from '../../assets/Items/Fruits/Melon.png';
import orangePng from '../../assets/Items/Fruits/Orange.png';
import pineapplePng from '../../assets/Items/Fruits/Pineapple.png';
import strawberryPng from '../../assets/Items/Fruits/Strawberry.png';
import { Sprite } from '../Sprite';
import { HitBox } from '../HitBox';

export type FruitType =
  | 'apple'
  | 'bananas'
  | 'cherries'
  | 'kiwi'
  | 'melon'
  | 'orange'
  | 'pineapple'
  | 'strawberry';

export const fruitList: FruitType[] = [
  'apple',
  'bananas',
  'cherries',
  'kiwi',
  'melon',
  'orange',
  'pineapple',
  'strawberry'
];

const sprites: Record<FruitType, () => Sprite> = {
  apple: () => new Sprite(applePng, 17, 3),
  bananas: () => new Sprite(bananasPng, 17, 3),
  cherries: () => new Sprite(cherriesPng, 17, 3),
  kiwi: () => new Sprite(kiwiPng, 17, 3),
  melon: () => new Sprite(melonPng, 17, 3),
  orange: () => new Sprite(orangePng, 17, 3),
  pineapple: () => new Sprite(pineapplePng, 17, 3),
  strawberry: () => new Sprite(strawberryPng, 17, 3)
};

export class Fruit extends Entity {
  constructor(public type: FruitType, position: DOMPoint) {
    super(position, sprites[type](), new HitBox(32, 32, position));
  }
}
