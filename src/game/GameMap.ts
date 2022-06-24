import terrainPng from '../assets/Terrain (16x16).png';
import { Fruit } from '../engine/entities/Fruit';
import { HitBox } from '../engine/HitBox';
import { TileMap } from '../engine/TileMap';
import { TileMapper } from '../engine/TileMapper';

const tilemap = new TileMap(terrainPng, [22, 11], 2);

export const GameMap = (width: number, height: number) =>
  new TileMapper({
    tileDimensions: { width: 32, height: 32 },
    position: new DOMPoint(0, 0),
    height: Math.ceil(height / 32),
    width: Math.ceil(width / 8),
    entities: new Map([
      ['apple', (pos: DOMPoint) => new Fruit('apple', pos)],
      ['bananas', (pos: DOMPoint) => new Fruit('bananas', pos)],
      ['cherries', (pos: DOMPoint) => new Fruit('cherries', pos)],
      ['melon', (pos: DOMPoint) => new Fruit('melon', pos)],
      ['pineapple', (pos: DOMPoint) => new Fruit('pineapple', pos)],
      ['kiwi', (pos: DOMPoint) => new Fruit('kiwi', pos)],
      ['orange', (pos: DOMPoint) => new Fruit('orange', pos)],
      ['strawberry', (pos: DOMPoint) => new Fruit('strawberry', pos)]
    ]),
    tileMaps: new Map([['main', tilemap]]),
    hitboxes: new Map([
      [
        'platforms',
        [
          new HitBox(width * 4, 2, new DOMPoint(0, 768 - 32)),
          new HitBox(148, 2, new DOMPoint(132, 768 - 128)),
          new HitBox(376, 2, new DOMPoint(260, height - 7 * 32)),
          new HitBox(374, 2, new DOMPoint(6 + 16 * 32, height - 3 * 32))
        ]
      ]
    ]),
    map: new Map([
      [
        '1:fruit',
        [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            { entity: true, map: 'apple' },
            { entity: true, map: 'melon' },
            { entity: true, map: 'apple' },
            { entity: true, map: 'orange' },
            { entity: true, map: 'apple' },
            { entity: true, map: 'kiwi' },
            { entity: true, map: 'apple' },
            { entity: true, map: 'pineapple' },
            { entity: true, map: 'apple' },
            { entity: true, map: 'strawberry' },
            { entity: true, map: 'apple' },
            { entity: true, map: 'melon' },
            null,
            null
          ],
          [],
          [],
          [
            null,
            null,
            null,
            null,
            { entity: true, map: 'cherries' },
            { entity: true, map: 'bananas' },
            { entity: true, map: 'bananas' },
            { entity: true, map: 'kiwi' },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            { entity: true, map: 'cherries' },
            { entity: true, map: 'kiwi' },
            { entity: true, map: 'bananas' },
            { entity: true, map: 'kiwi' },
            { entity: true, map: 'pineapple' },
            { entity: true, map: 'apple' },
            { entity: true, map: 'strawberry' },
            { entity: true, map: 'melon' },
            { entity: true, map: 'orange' }
          ]
        ]
      ],
      [
        '0:main',
        [
          [
            { map: 'main', tile: new DOMPoint(0, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) },
            { map: 'main', tile: new DOMPoint(1, 4) }
          ],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [{ map: 'main', tile: new DOMPoint(0, 5) }],
          [
            { map: 'main', tile: new DOMPoint(0, 5) },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            { map: 'main', tile: new DOMPoint(6, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(8, 0) },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          [
            { map: 'main', tile: new DOMPoint(0, 5) },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            { map: 'main', tile: new DOMPoint(6, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(8, 1) },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          [
            { map: 'main', tile: new DOMPoint(0, 5) },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            { map: 'main', tile: new DOMPoint(6, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(8, 1) },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          [
            { map: 'main', tile: new DOMPoint(0, 5) },
            null,
            null,
            null,
            { map: 'main', tile: new DOMPoint(6, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(8, 0) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(8, 1) },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          [
            { map: 'main', tile: new DOMPoint(0, 5) },
            null,
            null,
            null,
            { map: 'main', tile: new DOMPoint(6, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(8, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(6, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(8, 0) },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          [
            { map: 'main', tile: new DOMPoint(0, 5) },
            null,
            null,
            null,
            { map: 'main', tile: new DOMPoint(6, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(8, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(6, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(7, 1) },
            { map: 'main', tile: new DOMPoint(8, 1) },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          [
            { map: 'main', tile: new DOMPoint(6, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(7, 0) },
            { map: 'main', tile: new DOMPoint(8, 0) }
          ]
        ]
      ]
    ])
  });
