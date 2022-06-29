import { HitBox } from '../HitBox';
import { KeyData } from '../interfaces/key-data.interface';
import { Sprite } from '../Sprite';
import { TileMap } from '../TileMap';
import { defaultAttributes } from './default-attributes';
import { GameUIEvent } from './interfaces/game-ui-event.interface';
import { ElementName } from './types/element-name.type';
import { ListenerHandler } from './types/listener-handler.type';
import { ListenerType } from './types/listener.type';

export class CanvasElement {
  private hitBox: HitBox;

  private listeners: Map<ListenerType, ListenerHandler[]> = new Map();
  private attributeList: Map<string, unknown> = defaultAttributes();

  private children: CanvasElement[] = [];
  private _parent: CanvasElement | null = null;

  public id: string | null = null;
  public elementName: ElementName = 'base';

  constructor(
    width: number,
    height: number,
    position: DOMPoint,
    private background: Sprite
  ) {
    this.hitBox = new HitBox(width, height, position, [0, 0], '#043cf3');
    this.background.setDimensions(width, height);
    this.attributeList.set('width', width);
    this.attributeList.set('height', height);
    this.attributeList.set('position', position);
  }

  public draw(ctx: CanvasRenderingContext2D, drawBox = false) {
    if (!this.visible || this.disabled) return;
    if (this.visible && !this.disabled) {
      this.background.draw(ctx, this.position);
    }

    if (this.borderColor && !this.borderImage) {
      const hb = new HitBox(
        this.width,
        this.height,
        this.position,
        [this.padding, this.padding],
        this.borderColor
      );
      hb.draw(ctx);
    }

    if (this.borderImage) {
      this.drawBorderImage(ctx);
    }

    for (const child of this.children) {
      child.draw(ctx, drawBox);
    }

    if (drawBox && !this.disabled) {
      this.hitBox.draw(ctx);
    }
  }

  private drawBorderImage(ctx: CanvasRenderingContext2D) {
    if (!this.borderImage) return;
    const image = this.borderImage;

    if (image.getCount()[0] === 2) {
      this.draw2x2BorderImageMap(ctx, image);
    } else {
      this.draw3x3BorderImageMap(ctx, image);
    }
  }

  private draw2x2BorderImageMap(ctx: CanvasRenderingContext2D, image: TileMap) {
    const tileDim = image.getTileDimensions();
    const height = Math.ceil(this.height / tileDim.height) + 1;
    const width = Math.ceil(this.width / tileDim.width) + 1;
    if (Math.abs(height) === Infinity || Math.abs(width) === Infinity) return;
    const pos = new DOMPoint(
      this.position.x - tileDim.width,
      this.position.y - tileDim.height
    );
    const map = {
      tl: new DOMPoint(0, 0),
      tr: new DOMPoint(2, 0),

      bl: new DOMPoint(0, 2),
      br: new DOMPoint(2, 2)
    };
    for (let y = 0; y < height; y++) {
      const posY = pos.y + y * tileDim.height;
      for (let x = 0; x < width; x++) {
        const posX = pos.x + x * tileDim.width;
        const newPos = new DOMPoint(posX, posY);

        // Corners
        if (x === 0 && y === 0) {
          image.drawTile(ctx, newPos, map.tl);
        } else if (x === width - 1 && y === 0) {
          image.drawTile(ctx, newPos, map.tr);
        } else if (x === 0 && y === height - 1) {
          image.drawTile(ctx, newPos, map.bl);
        } else if (x === width - 1 && y === height - 1) {
          image.drawTile(ctx, newPos, map.br);
        }
      }
    }
  }

  private draw3x3BorderImageMap(ctx: CanvasRenderingContext2D, image: TileMap) {
    const tileDim = image.getTileDimensions();
    const height = Math.ceil(this.height / tileDim.height) + 1;
    const width = Math.ceil(this.width / tileDim.width) + 1;
    if (Math.abs(height) === Infinity || Math.abs(width) === Infinity) return;
    const pos = new DOMPoint(
      this.position.x - tileDim.width,
      this.position.y - tileDim.height
    );
    const map = {
      tl: new DOMPoint(0, 0),
      t: new DOMPoint(1, 0),
      tr: new DOMPoint(2, 0),

      ml: new DOMPoint(0, 1),
      mr: new DOMPoint(2, 1),

      bl: new DOMPoint(0, 2),
      b: new DOMPoint(1, 2),
      br: new DOMPoint(2, 2)
    };
    for (let y = 0; y < height; y++) {
      const posY = pos.y + y * tileDim.height;
      for (let x = 0; x < width; x++) {
        const posX = pos.x + x * tileDim.width;
        const newPos = new DOMPoint(posX, posY);

        // Sides
        if (y === 0 && x < width - 1) {
          image.drawTile(ctx, newPos, map.t);
        } else if (x === 0 && y < height - 1) {
          image.drawTile(ctx, newPos, map.ml);
        } else if (x === width - 1 && y < height - 1 && y > 0) {
          image.drawTile(ctx, newPos, map.mr);
        } else if (x > 0 && x < width - 1 && y === height - 1) {
          image.drawTile(ctx, newPos, map.b);
        }

        // Corners
        if (x === 0 && y === 0) {
          image.drawTile(ctx, newPos, map.tl);
        } else if (x === width - 1 && y === 0) {
          image.drawTile(ctx, newPos, map.tr);
        } else if (x === 0 && y === height - 1) {
          image.drawTile(ctx, newPos, map.bl);
        } else if (x === width - 1 && y === height - 1) {
          image.drawTile(ctx, newPos, map.br);
        }
      }
    }
  }

  public appendChild(child: CanvasElement) {
    if (this.children.includes(child)) return;
    child.parent = this;
    const offset = child.position;
    const selfPos = this.position;
    const pos = new DOMPoint(selfPos.x + offset.x, selfPos.y + offset.y);
    child.position = pos;

    if (this.id !== 'BODY') {
      // Inheritable styles
      child.family = this.family;
    }

    this.children.push(child);
  }

  public removeChild(child: CanvasElement) {
    this.children = this.children.filter((c) => c !== child);
  }

  public hasChild(child: CanvasElement): boolean {
    return this.children.includes(child);
  }

  public findElementById(id: string): CanvasElement | null {
    if (this.id === id) return this;
    let found = this.children.find((el) => el.id === id) || null;
    if (found) return found;
    for (const child of this.children) {
      found = child.findElementById(id);
      if (found) {
        break;
      }
    }
    return found;
  }

  public addEventListener(name: ListenerType, handler: ListenerHandler) {
    const current = this.listeners.get(name);
    if (current) {
      current.push(handler);
      this.listeners.set(name, current);
    } else {
      this.listeners.set(name, [handler]);
    }
  }

  protected fireEvent(name: ListenerType, evt: GameUIEvent) {
    if (
      this.attributeList.has('disabled') &&
      !this.attributeList.get('disabled')!
    ) {
      const handlers = this.listeners.get(name) || [];
      handlers.forEach((h) => h(evt));
    }
  }

  public click(pos: DOMPoint, propagate = true) {
    const enabled =
      this.attributeList.has('disabled') && !this.attributeList.get('disabled');
    if (enabled && this.hitBox.collided(new HitBox(3, 3, pos))) {
      this.fireEvent('ui-click', {
        target: this,
        data: { position: pos, keys: {} }
      });
      if (propagate) {
        for (const child of this.children) {
          child.click(pos);
        }
      }
    }
  }

  public mouseover(pos: DOMPoint, propagate = true) {
    const enabled =
      this.attributeList.has('disabled') && !this.attributeList.get('disabled');
    if (enabled && this.hitBox.collided(new HitBox(3, 3, pos))) {
      this.fireEvent('ui-mouseover', {
        target: this,
        data: { position: pos, keys: {} }
      });
      if (propagate) {
        for (const child of this.children) {
          child.mouseover(pos, true);
        }
      }
    }
  }

  public mouseout(pos: DOMPoint, propagate = true) {
    const enabled =
      this.attributeList.has('disabled') && !this.attributeList.get('disabled');
    if (enabled) {
      if (propagate) {
        for (const child of this.children) {
          child.mouseout(pos, true);
        }
      }
    }
    if (enabled && !this.hitBox.collided(new HitBox(3, 3, pos))) {
      this.fireEvent('ui-mouseout', {
        target: this,
        data: { position: pos, keys: {} }
      });
    }
  }

  public focus(pos: DOMPoint) {
    const enabled =
      this.attributeList.has('disabled') && !this.attributeList.get('disabled');
    const click = new HitBox(3, 3, pos);
    if (enabled && this.hitBox.collided(click)) {
      this.fireEvent('ui-focus', {
        target: this,
        data: { position: pos, keys: {} }
      });
      for (const child of this.children) {
        child.mouseover(pos);
      }
      let childCollisions = this.children.map((child) =>
        child.hitBox.collided(click)
      );
      childCollisions = childCollisions.length > 0 ? childCollisions : [false];
      const collidedWithChild = childCollisions.reduce(
        (acc, cur) => acc && cur,
        true
      );
      if (collidedWithChild) {
        this.setAttribute('focus', false);
      } else {
        this.setAttribute('focus', true);
      }
    }
  }

  public keydown(keys: Record<string, KeyData>) {
    const enabled =
      this.attributeList.has('disabled') && !this.attributeList.get('disabled');
    if (enabled) {
      this.fireEvent('ui-keydown', {
        target: this,
        data: { position: this.position, keys }
      });
      for (const child of this.children) {
        child.keydown(keys);
      }
    }
  }

  public keyup(keys: Record<string, KeyData>) {
    const enabled =
      this.attributeList.has('disabled') && !this.attributeList.get('disabled');
    if (enabled) {
      this.fireEvent('ui-keyup', {
        target: this,
        data: { position: this.position, keys }
      });
      for (const child of this.children) {
        child.keydown(keys);
      }
    }
  }

  public getChildren(): CanvasElement[] {
    return this.children;
  }

  public getAttribute<T = unknown>(key: string): T | undefined {
    return this.attributeList.get(key) as T | undefined;
  }

  public setAttribute(key: string, value: unknown) {
    this.attributeList.set(key, value);
  }

  public get position(): DOMPoint {
    return this.attributeList.get('position') as DOMPoint;
  }

  public set position(pos: DOMPoint) {
    const oldPos = this.position;
    this.attributeList.set('position', pos);
    this.hitBox.setPosition(pos);
    this.children.forEach((child) => {
      const childPos = child.position;
      const offset = new DOMPoint(childPos.x - oldPos.x, childPos.y - oldPos.y);
      const newPos = new DOMPoint(pos.x + offset.x, pos.y + offset.y);
      child.position = newPos;
    });
  }

  public get visible(): boolean {
    return this.attributeList.get('visible') as boolean;
  }

  public set visible(v: boolean) {
    this.attributeList.set('visible', v);
  }

  public get disabled(): boolean {
    return this.attributeList.get('disabled') as boolean;
  }

  public set disabled(d: boolean) {
    this.attributeList.set('disabled', d);
  }

  public getParent(): CanvasElement | null {
    return this._parent;
  }

  public set parent(el: CanvasElement) {
    this._parent = el;
  }

  public set height(h: number) {
    this.attributeList.set('height', h);
    this.hitBox.setDimensions(this.height, h);
  }

  public get height(): number {
    return this.attributeList.get('height') as number;
  }

  public set width(w: number) {
    this.attributeList.set('width', w);
    this.hitBox.setDimensions(w, this.width);
  }

  public get width(): number {
    return this.attributeList.get('width') as number;
  }

  public get content(): string {
    return this.attributeList.get('content') as string;
  }

  public set content(c: string) {
    this.attributeList.set('content', c);
  }

  public get size(): number {
    return this.attributeList.get('size') as number;
  }

  public set size(s: number) {
    this.attributeList.set('size', s);
    if (this.elementName === 'text') {
      this.attributeList.set(
        'height',
        s * ((this.attributeList.get('lineHeight') as number) || 1)
      );
    }
    for (const child of this.children) {
      if (child.elementName === 'text') {
        child.attributeList.set('size', s);
      }
    }
  }

  public get color(): string {
    return this.attributeList.get('color') as string;
  }

  public set color(c: string) {
    this.attributeList.set('color', c);
    this.children.forEach((child) => {
      if (child.elementName === 'text') {
        child.color = c;
      }
    });
  }

  public get family(): string {
    return this.attributeList.get('family') as string;
  }

  public set family(f: string) {
    this.attributeList.set('family', f);
    for (const child of this.children) {
      if (child.elementName === 'text') {
        child.family = f;
      }
      for (const subChild of child.getChildren()) {
        if (subChild.elementName === 'text') {
          subChild.family = f;
        }
      }
    }
  }

  public get borderColor(): string {
    return this.attributeList.get('borderColor') as string;
  }

  public set borderColor(bc: string) {
    this.attributeList.set('borderColor', bc);
  }

  public get padding(): number {
    return this.attributeList.get('padding') as number;
  }

  public set padding(p: number) {
    this.attributeList.set('padding', p);
  }

  public set borderImage(bi: TileMap | null) {
    this.attributeList.set('borderImage', bi);
  }

  public get borderImage(): TileMap | null {
    return this.attributeList.get('borderImage') as TileMap | null;
  }

  public set backgroundColor(bc: string) {
    this.attributeList.set('backgroundColr', bc);
    this.background.setColor(bc);
  }
}
