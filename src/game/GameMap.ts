import terrainPng from '../assets/Terrain (16x16).png';
import tiledJson from '../assets/main-map.json';
import { Fruit } from '../engine/entities/Fruit';
import { Slime } from '../engine/entities/Slime';
import { Vendor } from '../engine/entities/Vendor';
import { TileMap } from '../engine/TileMap';
import { TileMapper } from '../engine/TileMapper';
import { TiledJson } from '../engine/interfaces/tiled/tiled-json.interface';
import { Ctor } from '../engine/interfaces/ctor.interface';

const entityData: Array<[string, Ctor]> = [
  ['Fruit', Fruit],
  ['Slime', Slime],
  ['Vendor', Vendor]
];
const tileMaps = new Map([['Map', new TileMap(terrainPng, [22, 11])]]);
const classMap = new Map(entityData);

export const GameMap = new TileMapper(
  tiledJson as TiledJson,
  tileMaps,
  classMap
);
