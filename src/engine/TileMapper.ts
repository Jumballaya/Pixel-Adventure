import { TileMap } from "./TileMap";
import { HitBox } from "./HitBox";
import { MapData } from "./interfaces/map-data.interface";

export class TileMapper {

  private height: number;
  private width: number;
  private position: DOMPoint;
  private tileMaps: Map<string, TileMap>;
  private hitBoxes: Map<string, Array<HitBox>>;
  private tileDimensions: { width: number; height: number; };
  private map: Array<Array<{ map: string; tile: DOMPoint; } | null>>;

  constructor(data: MapData) {
    this.position = data.position;
    this.tileMaps = data.tileMaps;
    this.hitBoxes = data.hitboxes;
    this.tileDimensions = data.tileDimensions;
    this.map = data.map;
    this.width = data.width;
    this.height = data.height;
  }
  
  public getPosition(): DOMPoint {
    return this.position;
  }

  public draw(ctx: CanvasRenderingContext2D, worldBox: HitBox, drawBox = false) {
    const tileDim = this.tileDimensions;
    const start = this.position

    for (let y = 0; y < this.height; y++) {
      const yOffset = start.y + ((tileDim.height) * y);
      for (let x = 0; x < this.width; x++) {
        const xOffset = start.x + ((tileDim.width) * x);
        const pos = new DOMPoint(xOffset, yOffset);
        if (this.map[y]?.[x]) {
          const hitBox = new HitBox(tileDim.width, tileDim.height, pos);
          if (drawBox) {
            hitBox.draw(ctx);
          }
          if (worldBox.collided(hitBox)) {
            const data = this.map[y][x];
            if (data) {
              const tiles = this.tileMaps.get(data.map);
              tiles?.drawTile(ctx, pos, data.tile);
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

  public shiftLeft(n: number) {
    this.position.x -= n;
    this.hitBoxes.forEach(hbs => {
      hbs.forEach(hb => {
        const pos = hb.getPosition();
        pos.x -= n;
        hb.setPosition(pos);
      });
    });
  }

  public shiftRight(n: number) {
    this.position.x += n;
    this.hitBoxes.forEach(hbs => {
      hbs.forEach(hb => {
        const pos = hb.getPosition();
        pos.x += n;
        hb.setPosition(pos);
      });
    });
  }

  public shiftUp(n: number) {
    this.position.y -= n;
    this.hitBoxes.forEach(hbs => {
      hbs.forEach(hb => {
        const pos = hb.getPosition();
        pos.y -= n;
        hb.setPosition(pos);
      });
    });
  }

  public shiftDown(n: number) {
    this.position.y += n;
    this.hitBoxes.forEach(hbs => {
      hbs.forEach(hb => {
        const pos = hb.getPosition();
        pos.y += n;
        hb.setPosition(pos);
      })
    });
  }

  public moveTo(pos: DOMPoint) {
    const oldPos = this.position;
    this.position = pos;
    this.hitBoxes.forEach(hbs => {
      hbs.forEach(hb => {
        const diffX = oldPos.x - pos.x;
        const diffY = oldPos.y - pos.y;
        const hbPos = new DOMPoint(diffX + pos.x, diffY + pos.y);
        hb.setPosition(hbPos);
      });
    });
  }


}