import terrainPng from '../assets/Terrain (16x16).png';
import { TileMap } from '../engine/TileMap';
import { TileMapper } from '../engine/TileMapper';

const tilemap = new TileMap(terrainPng, [22, 11], 2);

export const GameMap = (width: number, height: number) =>
  new TileMapper({
    tileDimensions: { width: 32, height: 32 },
    position: new DOMPoint(0, 0),
    height: Math.ceil(height / 16),
    width: Math.ceil(width / 16),
    tileMaps: new Map([['main', tilemap]]),
    hitboxes: new Map(),
    map: [
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
        { map: 'main', tile: new DOMPoint(10, 1) },
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
        { map: 'main', tile: new DOMPoint(8, 0) }
      ]
    ]
  });
