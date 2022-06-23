import { Sprite } from '../Sprite';
import { CanvasElement } from './CanvasElement';
import { ElementName } from './types/element-name.type';

export class CanvasImage extends CanvasElement {
  public elementName: ElementName = 'image';
  private image: Sprite;

  constructor(
    public src: string,
    width: number,
    height: number,
    position: DOMPoint,
    count = 1,
    framesHold = 5,
    scale = 1,
    repeat = true,
    flipped = false
  ) {
    const image = new Sprite(src, count, framesHold, scale, repeat, flipped);
    super(width * count, height, position, image);
    this.image = image;
    this.image.setDimensions(width * count, height);
  }

  public draw(ctx: CanvasRenderingContext2D, drawBox = false) {
    this.image.draw(ctx, this.position);
  }

  set width(w: number) {
    const dim = this.image.getDimension();
    this.image.setDimensions(w, dim.height);
  }

  set height(h: number) {
    const dim = this.image.getDimension();
    this.image.setDimensions(dim.width, h);
  }
}
