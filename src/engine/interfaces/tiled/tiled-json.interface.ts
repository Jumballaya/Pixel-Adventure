import { TiledJSonLayer } from './tiled-json-layer.interface';

export interface TiledJson {
  compressionlevel: number;
  height: number;
  infinite: boolean;
  layers: Array<TiledJSonLayer>;
  nextlayerid: number;
  nextobjectid: number;
  orientation: string;
  renderorder: string;
  tiledversion: string;
  tileheight: number;
  tilesets: Array<{
    firstgid: number;
    source: string;
  }>;
  tilewidth: number;
  type: string;
  version: string;
  width: number;
}
