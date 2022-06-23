import { Sprite } from "../Sprite";
import { CanvasElement } from "./CanvasElement";
import { ElementName } from "./types/element-name.type";

export class CanvasText extends CanvasElement {

  public elementName: ElementName = 'text';

  constructor(content: string, position: DOMPoint) {
    super(0, 0, position, new Sprite('rgba(0,0,0,0'));
    this.setAttribute('content', content);
    this.setAttribute('borderColor', 'rgba(0,0,0,0)');
  }
  
  public draw(ctx: CanvasRenderingContext2D, drawBox = false) {
    const pos = new DOMPoint(this.position.x, this.position.y + this.height);
    const old = {
      font: ctx.font,
      fill: ctx.fillStyle,
      stroke: ctx.strokeStyle,
    }
    
    ctx.font = `${this.size}px ${this.family}`;
    ctx.fillStyle = this.color;
    ctx.fillText(this.content, pos.x, pos.y);
    ctx.textBaseline = 'bottom';
    const metrics = ctx.measureText(this.content);
    this.width = metrics.actualBoundingBoxRight - metrics.actualBoundingBoxLeft;
    super.draw(ctx, drawBox);

    ctx.font = old.font;
    ctx.fillStyle = old.fill;
    ctx.strokeStyle = old.stroke;
  }
}