import { Entity } from '../entities/Entity';
import { HitBox } from '../HitBox';
import { TileMap } from '../TileMap';

export interface MapData {
  tileDimensions: { width: number; height: number }; // Width and height of the tiles
  position: DOMPoint; // Starting draw position of the map
  height: number; // Height in tile count
  width: number; // Width in tile count
  tileMaps: Map<string, TileMap>; // TileMaps by name
  hitboxes: Map<string, Array<HitBox>>; // Hitboxes list by category
  entities: Map<string, (pos: DOMPoint) => Entity>; // Map of spawnable entities
  map: Map<
    string,
    Array<
      Array<{
        map: string;
        tile?: DOMPoint;
        entity?: boolean;
      } | null>
    >
  >;
}
