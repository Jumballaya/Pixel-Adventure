import { HitBox } from "../HitBox";
import { TileMap } from "../TileMap";

export interface MapData {
  tileDimensions: { width: number; height: number }   // Width and height of the tiles
  position: DOMPoint;                                 // Starting draw position of the map
  height: number;                                     // Height in tile count
  width: number;                                      // Width in tile count
  tileMaps: Map<string, TileMap>;                     // TileMaps by name
  hitboxes: Map<string, Array<HitBox>>;               // Hitboxes list by category
  map: Array<Array<{                                  // 2D array of tiles to draw
    map: string;
    tile: DOMPoint,
  } | null>>;
}