import { Sprite } from '../Sprite';
import { CanvasButton } from './CanvasButton';
import { CanvasElement } from './CanvasElement';
import { CanvasImage } from './CanvasImage';
import { CanvasText } from './CanvasText';

export class CanvasUIBuilder {
  public parseFromString(markup: string): CanvasElement | null {
    const domParser = new DOMParser();
    const fragment = domParser.parseFromString(markup, 'text/html');
    const $root = fragment.body.firstChild as HTMLElement;
    if (!$root) return null;
    const root = this.domToCanvas($root);
    return root;
  }

  private stringToTuple(str: string): [number, number] {
    try {
      return JSON.parse(str);
    } catch (_) {
      return [0, 0];
    }
  }

  private domElementIsTextType($el: HTMLElement): boolean {
    return $el instanceof HTMLParagraphElement;
  }

  private domElementIsButtonType($el: HTMLElement): boolean {
    return $el instanceof HTMLButtonElement;
  }

  private domElementIsImageType($el: HTMLElement): boolean {
    return $el instanceof HTMLImageElement;
  }

  private getAttributesFromDomElement($el: HTMLElement) {
    const width = parseInt($el.getAttribute('width') || '0');
    const height = parseInt($el.getAttribute('height') || '0');
    const [x, y] = this.stringToTuple($el.getAttribute('position') || '');
    const backgroundColor =
      $el.getAttribute('backgroundColor') || 'rgba(0,0,0,0)';
    const visible = $el.getAttribute('visible');
    const disabled = $el.getAttribute('disabled');
    const size = parseInt($el.getAttribute('size') || '16');
    const color = $el.getAttribute('color') || '#000000';
    const padding = parseInt($el.getAttribute('padding') || '0');
    const family = $el.getAttribute('family') || 'serif';
    const lineHeight = parseInt($el.getAttribute('lineHeight') || '1.3');
    const content = Array.from($el.childNodes)
      .reduce((acc, cur) => {
        if (cur.nodeName === '#text') return acc + '\n' + cur.textContent;
        return acc;
      }, '')
      .trim();
    const borderColor = $el.getAttribute('borderColor') || 'rgba(0,0,0,0)';
    const borderWidth = parseInt($el.getAttribute('borderWidth') || '0');
    const scale = parseInt($el.getAttribute('scale') || '1');
    const backgroundImage = $el.getAttribute('backgroundImage') || '';
    const id = $el.id || null;
    const src = $el.getAttribute('src') || '';
    const count = parseInt($el.getAttribute('count') || '1');
    const framesHold = parseInt($el.getAttribute('framesHold') || '5');
    const repeat = $el.getAttribute('repeat');
    const flipped = $el.getAttribute('flipped');

    return {
      width,
      height,
      position: new DOMPoint(x, y),
      backgroundColor,
      visible: visible === null ? true : visible === 'true',
      disabled: disabled === null ? false : disabled === 'true',
      repeat: repeat === null ? true : repeat === 'true',
      flipped: flipped === null ? false : flipped === 'true',
      size,
      color,
      padding,
      family,
      lineHeight,
      content,
      borderColor,
      borderWidth,
      scale,
      backgroundImage,
      src,
      count,
      framesHold,
      id
    };
  }

  private setupElement(
    el: CanvasElement,
    attributes: Record<string, any>
  ): CanvasElement {
    el.position = attributes.position;
    el.visible = attributes.visible;
    el.disabled = attributes.disabled;
    el.size = attributes.size;
    el.color = attributes.color;
    el.padding = attributes.padding;
    el.content = attributes.content;
    el.borderColor = attributes.borderColor;
    el.setAttribute('lineHeight', attributes.lineHeight);
    el.setAttribute('backgroundColor', attributes.backgroundColor);
    el.setAttribute('backgroundImage', attributes.backgroundImage);
    el.setAttribute('borderwidth', attributes.borderWidth);
    el.setAttribute('scale', attributes.scale);
    el.family = attributes.family;
    el.id = attributes.id;
    return el;
  }

  private createElement(
    $el: HTMLElement,
    attributes: Record<string, any>
  ): CanvasElement {
    if (this.domElementIsImageType($el)) {
      return this.setupElement(
        new CanvasImage(
          attributes.src,
          attributes.width,
          attributes.height,
          attributes.pos,
          attributes.count,
          attributes.framesHold,
          attributes.scale,
          attributes.repeat,
          attributes.flipped
        ),
        attributes
      );
    }
    if (this.domElementIsTextType($el)) {
      return this.setupElement(
        new CanvasText(attributes.content, attributes.position),
        attributes
      );
    }
    if (this.domElementIsButtonType($el)) {
      return this.setupElement(
        new CanvasButton(
          attributes.width,
          attributes.height,
          attributes.content,
          attributes.position
        ),
        attributes
      );
    }
    return this.setupElement(
      new CanvasElement(
        attributes.width,
        attributes.height,
        attributes.position,
        new Sprite(
          attributes.backgroundImage || attributes.backgroundColor,
          undefined,
          undefined,
          attributes.scale
        )
      ),
      attributes
    );
  }

  private domToCanvas($el: HTMLElement): CanvasElement {
    const attributes = this.getAttributesFromDomElement($el);
    const element = this.createElement($el, attributes);

    for (const child of $el.children) {
      const el = this.domToCanvas(child as HTMLElement);
      element.appendChild(el);
    }

    return element;
  }
}
