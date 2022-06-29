import { TileMap } from './TileMap';
import { HitBox } from './HitBox';
import { Entity } from './entities/Entity';
import { TiledJson } from './interfaces/tiled/tiled-json.interface';
import { Ctor } from './interfaces/ctor.interface';

export class TileMapper {
  private height: number;
  private width: number;
  private position: DOMPoint;
  private hitBoxes: Map<string, Array<HitBox>>;
  private tileDimensions: { width: number; height: number };
  private instances: Array<Entity> = [];
  private map: Map<string, number[]>;

  constructor(
    data: TiledJson,
    private tileMaps: Map<string, TileMap>,
    private classMap: Map<string, Ctor>
  ) {
    this.position = new DOMPoint(0, 0);
    this.hitBoxes = this.extractHitboxes(data);
    this.tileDimensions = { height: 16, width: 16 };
    this.instances = this.extractInstances(data);
    this.map = this.extractMap(data);
    this.width = data.width;
    this.height = data.height;
  }

  public getPosition(): DOMPoint {
    return this.position;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    worldBox: HitBox,
    drawBox = false
  ) {
    const tag = (s: string): number => parseInt(s.split(':')[0]) || 0;
    for (const [name, data] of this.map) {
      this.drawLayer(name, data, ctx, worldBox, drawBox);
    }
    for (const instance of this.instances) {
      instance.draw(ctx, drawBox);
    }
    if (drawBox) {
      for (const [_, boxes] of this.hitBoxes) {
        for (const hb of boxes) {
          if (hb.collided(worldBox)) {
            hb.draw(ctx);
          }
        }
      }
    }
  }

  public drawLayer(
    name: string,
    map: number[],
    ctx: CanvasRenderingContext2D,
    worldBox: HitBox,
    drawBox = false
  ) {
    const tileDim = this.tileDimensions;
    const start = this.position;

    for (let y = 0; y < this.height; y++) {
      const yOffset = start.y + tileDim.height * y;
      for (let x = 0; x < this.width; x++) {
        const xOffset = start.x + tileDim.width * x;
        const index = y * this.width + x;
        const pos = new DOMPoint(xOffset, yOffset);
        if (map[index]) {
          const hitBox = new HitBox(tileDim.width, tileDim.height, pos);
          if (drawBox) {
            hitBox.draw(ctx);
          }
          if (worldBox.collided(hitBox)) {
            const tiles = this.tileMaps.get(name);
            if (tiles) {
              const data = map[index];
              const [mW, mH] = tiles?.getCount();
              const x = data % mW;
              const y = Math.floor(data / mW);
              const tile = new DOMPoint(x - 1, y);
              tiles.drawTile(ctx, pos, tile);
            }
          }
        }
      }
    }

    if (drawBox) {
      for (const [type, hbs] of this.hitBoxes) {
        for (const hb of hbs) {
          if (worldBox.collided(hb)) {
            hb.draw(ctx);
          }
        }
      }
    }
  }

  public getHitboxes(name: string): Array<HitBox> {
    return this.hitBoxes.get(name) || [];
  }

  public getEntities(): Array<Entity> {
    return this.instances;
  }

  public removeEntity(ent: Entity) {
    this.instances = this.instances.filter((e) => e !== ent);
  }

  public shiftLeft(n: number) {
    this.position.x -= n;
    this.hitBoxes.forEach((hbs) => {
      hbs.forEach((hb) => {
        const pos = hb.getPosition();
        pos.x -= n;
        hb.setPosition(pos);
      });
    });
    this.instances.forEach((inst: Entity) => {
      const pos = inst.position;
      pos.x -= n;
      inst.setPosition(pos);
    });
  }

  public shiftRight(n: number) {
    this.position.x += n;
    this.hitBoxes.forEach((hbs) => {
      hbs.forEach((hb) => {
        const pos = hb.getPosition();
        pos.x += n;
        hb.setPosition(pos);
      });
    });
    this.instances.forEach((inst: Entity) => {
      const pos = inst.position;
      pos.x += n;
      inst.setPosition(pos);
    });
  }

  public shiftUp(n: number) {
    this.position.y -= n;
    this.hitBoxes.forEach((hbs) => {
      hbs.forEach((hb) => {
        const pos = hb.getPosition();
        pos.y -= n;
        hb.setPosition(pos);
      });
    });
    this.instances.forEach((inst: Entity) => {
      const pos = inst.position;
      pos.y -= n;
      inst.setPosition(pos);
    });
  }

  public shiftDown(n: number) {
    this.position.y += n;
    this.hitBoxes.forEach((hbs) => {
      hbs.forEach((hb) => {
        const pos = hb.getPosition();
        pos.y += n;
        hb.setPosition(pos);
      });
    });
    this.instances.forEach((inst: Entity) => {
      const pos = inst.position;
      pos.y += n;
      inst.setPosition(pos);
    });
  }

  public moveTo(pos: DOMPoint) {
    const oldPos = this.position;
    this.position = pos;
    const diffX = oldPos.x - pos.x;
    const diffY = oldPos.y - pos.y;
    this.hitBoxes.forEach((hbs) => {
      hbs.forEach((hb) => {
        const hbPos = new DOMPoint(diffX + pos.x, diffY + pos.y);
        hb.setPosition(hbPos);
      });
    });
    this.instances.forEach((inst: Entity) => {
      inst.setPosition(new DOMPoint(diffX + pos.x, diffY + pos.y));
    });
  }

  public pause() {
    for (const inst of this.instances) {
      inst.pause();
    }
  }

  public unpause() {
    for (const inst of this.instances) {
      inst.unpause();
    }
  }

  private extractHitboxes(json: TiledJson): Map<string, HitBox[]> {
    const ret: Map<string, HitBox[]> = new Map();
    for (const layer of json.layers) {
      if (layer.class === 'Hitbox' && layer.objects) {
        const boxes: HitBox[] = [];
        for (const obj of layer.objects) {
          const { x, y, height, width } = obj;
          const hb = new HitBox(width, height, new DOMPoint(x, y));
          boxes.push(hb);
        }
        ret.set(layer.name, boxes);
      }
    }

    return ret;
  }

  private extractMap(json: TiledJson): Map<string, number[]> {
    const maps: Map<string, number[]> = new Map();

    for (const layer of json.layers) {
      if (layer.data) {
        maps.set(layer.name, layer.data);
      }
    }

    return maps;
  }

  private extractInstances(json: TiledJson): Entity[] {
    const instances: Entity[] = [];
    for (const layer of json.layers) {
      const ctor = this.classMap.get(layer.name);
      if (ctor && layer.objects) {
        for (const obj of layer.objects) {
          const { x, y } = obj;
          instances.push(new ctor(new DOMPoint(x, y), obj.name) as Entity);
        }
      }
    }
    return instances;
  }
}
