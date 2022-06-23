import { Sprite } from '../Sprite';
import { CanvasText } from './CanvasText';
import { CanvasElement } from './CanvasElement';
import { ElementName } from './types/element-name.type';

export class CanvasButton extends CanvasElement {
  public elementName: ElementName = 'button';
  private innerText: CanvasElement;

  constructor(
    width: number,
    height: number,
    text: string,
    pos: DOMPoint,
    background?: Sprite
  ) {
    super(width, height, pos, background || new Sprite('rgba(0,0,0,0'));
    this.padding = 8;
    this.borderColor = '#000000';
    this.visible = true;
    this.disabled = false;

    this.innerText = new CanvasText(text, new DOMPoint(0, 0));
    this.appendChild(this.innerText);
  }

  public set content(c: string) {
    this.innerText.setAttribute('content', c);
    this.setAttribute('content', c);
  }
}
