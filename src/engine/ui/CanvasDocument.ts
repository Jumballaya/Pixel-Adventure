import { Sprite } from '../Sprite';
import { CanvasElement } from './CanvasElement';

export class CanvasDocument {
  private ctx: CanvasRenderingContext2D;
  public body: CanvasElement;

  public drawBox = false;

  constructor(private canvasElement: HTMLCanvasElement) {
    this.ctx = this.canvasElement.getContext('2d') as CanvasRenderingContext2D;
    this.body = new CanvasElement(
      this.canvasElement.width,
      this.canvasElement.height,
      new DOMPoint(0, 0),
      new Sprite('rgba(0,0,0,0)')
    );
    this.body.id = 'BODY';
  }

  public draw() {
    this.body.draw(this.ctx, this.drawBox);
  }

  get width(): number {
    return this.canvasElement.width;
  }

  get height(): number {
    return this.canvasElement.height;
  }
}
