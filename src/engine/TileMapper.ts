import { TileMap } from './TileMap';
import { HitBox } from './HitBox';
import { MapData } from './interfaces/map-data.interface';
import { Entity } from './entities/Entity';

export class TileMapper {
  private height: number;
  private width: number;
  private position: DOMPoint;
  private tileMaps: Map<string, TileMap>;
  private hitBoxes: Map<string, Array<HitBox>>;
  private tileDimensions: { width: number; height: number };
  private entities: Map<string, (pos: DOMPoint) => Entity>;
  private instances: Array<Entity> = [];
  private map: Map<
    string,
    Array<
      Array<{
        map: string;
        tile?: DOMPoint;
        entity?: boolean;
        instance?: Entity;
      } | null>
    >
  >;
  private paused = false;

  constructor(data: MapData) {
    this.position = data.position;
    this.tileMaps = data.tileMaps;
    this.hitBoxes = data.hitboxes;
    this.tileDimensions = data.tileDimensions;
    this.entities = data.entities;
    this.map = data.map;
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
    const layers = Array.from(this.map)
      .sort((a, b) => tag(a[0]) - tag(b[0]))
      .map((l) => l[0]);
    for (const layer of layers) {
      this.drawLayer(layer, ctx, worldBox, drawBox);
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
    ctx: CanvasRenderingContext2D,
    worldBox: HitBox,
    drawBox = false
  ) {
    const map = this.map.get(name);
    if (!map) return;
    const tileDim = this.tileDimensions;
    const start = this.position;

    for (let y = 0; y < this.height; y++) {
      const yOffset = start.y + tileDim.height * y;
      for (let x = 0; x < this.width; x++) {
        const xOffset = start.x + tileDim.width * x;
        const pos = new DOMPoint(xOffset, yOffset);
        if (map[y]?.[x]) {
          const hitBox = new HitBox(tileDim.width, tileDim.height, pos);
          if (drawBox) {
            hitBox.draw(ctx);
          }
          if (worldBox.collided(hitBox)) {
            const data = map[y][x];
            if (data && data.tile) {
              const tiles = this.tileMaps.get(data.map);
              tiles?.drawTile(ctx, pos, data.tile);
            } else if (data && data.entity) {
              const entity = this.entities.get(data.map);
              if (entity && !data.instance) {
                data.instance = entity(pos);
                this.instances.push(data.instance);
              }
              if (data.instance) {
                data.instance.setPosition(pos);
              }
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
  }

  public moveTo(pos: DOMPoint) {
    const oldPos = this.position;
    this.position = pos;
    this.hitBoxes.forEach((hbs) => {
      hbs.forEach((hb) => {
        const diffX = oldPos.x - pos.x;
        const diffY = oldPos.y - pos.y;
        const hbPos = new DOMPoint(diffX + pos.x, diffY + pos.y);
        hb.setPosition(hbPos);
      });
    });
  }

  public pause() {
    for (const inst of this.instances) {
      inst.pause();
    }
    this.paused = true;
  }

  public unpause() {
    for (const inst of this.instances) {
      inst.unpause();
    }
    this.paused = false;
  }
}
