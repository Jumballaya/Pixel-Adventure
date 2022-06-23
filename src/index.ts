import { Fruit } from './engine/entities/Fruit';
import { Player } from './engine/entities/Player';
import { HitBox } from './engine/HitBox';
import { GravitySystem } from './engine/systems/GravitySystem';
import { CanvasUI } from './engine/ui/CanvasUI';
import { GameMap } from './game/GameMap';
import { playerDataUi } from './game/ui/player-data';
import { scoreUi } from './game/ui/score';

const DRAWBOX = false;

// SET UP CANVAS
const WIDTH = 1024;
const HEIGHT = 768;
const $canvas = document.getElementById('canvas') as HTMLCanvasElement;
const $ctx = $canvas.getContext('2d') as CanvasRenderingContext2D;
$canvas.setAttribute('width', `${WIDTH}px`);
$canvas.setAttribute('height', `${HEIGHT}px`);

/**
 *
 *  World
 *
 */

// Game Map
const worldBox = new HitBox(WIDTH - 8, HEIGHT - 8, new DOMPoint(4, 4), [4, 4]);
const gameMap = GameMap(WIDTH, HEIGHT);

// Side Boxes
const worldLeftBox = new HitBox(
  256,
  HEIGHT,
  new DOMPoint(0, 0),
  [0, 0],
  '#00ff00'
);
const worldRightBox = new HitBox(
  256,
  HEIGHT,
  new DOMPoint(WIDTH - 256, 0),
  [0, 0],
  '#00ff00'
);

//
//
//
//
//

// Handle UI
const ui = new CanvasUI($canvas);

if (scoreUi) {
  ui.document.body.appendChild(scoreUi);
}

// Player
const player = new Player(ui.events);

// Systems
const gravSystem = new GravitySystem(0.25);

// Game State Update
const update = () => {
  gravSystem.update([player]);

  // WORLD

  // Ground Collision
  for (const ground of gameMap.getHitboxes('platforms')) {
    if (player.hitbox.collided(ground)) {
      if (player.velocity.y < 0) {
        const pos = player.position;
        player.setPosition(new DOMPoint(pos.x, ground.getPosition().y - 33));
        player.velocity.y = 0;
        player.jumpCount = 0;
      }
    }
  }

  // Side Collision
  if (player.hitbox.collided(worldRightBox) && player.velocity.x > 0) {
    gameMap.shiftLeft(player.velocity.x);
    const oldPos = player.position;
    player.setPosition(new DOMPoint(oldPos.x - player.velocity.x, oldPos.y));
  }
  if (
    player.hitbox.collided(worldLeftBox) &&
    gameMap.getPosition().x < 0 &&
    player.velocity.x < 0
  ) {
    gameMap.shiftRight(-player.velocity.x);
    const oldPos = player.position;
    player.setPosition(new DOMPoint(oldPos.x - player.velocity.x, oldPos.y));
  }

  // Entity <-> Player Collision
  for (const ent of gameMap.getEntities()) {
    if (ent instanceof Fruit) {
      if (player.hitbox.collided(ent.hitbox)) {
        gameMap.removeEntity(ent);
        player.addFruit(ent.type);
      }
    }
  }

  //
  //
  //
  //

  // UI Update
  ui.document.body
    .findElementById('appleScore')
    ?.setAttribute('content', player.fruit['apple']);
  ui.document.body
    .findElementById('cherriesScore')
    ?.setAttribute('content', player.fruit['cherries']);
  ui.document.body
    .findElementById('bananasScore')
    ?.setAttribute('content', player.fruit['bananas']);
  ui.document.body
    .findElementById('kiwiScore')
    ?.setAttribute('content', player.fruit['kiwi']);
  ui.document.body
    .findElementById('melonScore')
    ?.setAttribute('content', player.fruit['melon']);
  ui.document.body
    .findElementById('orangeScore')
    ?.setAttribute('content', player.fruit['orange']);
  ui.document.body
    .findElementById('pineappleScore')
    ?.setAttribute('content', player.fruit['pineapple']);
  ui.document.body
    .findElementById('strawberryScore')
    ?.setAttribute('content', player.fruit['strawberry']);

  // Player Update
  player.update(worldBox);
};

// Main Loop
const draw = () => {
  $ctx.clearRect(0, 0, WIDTH, HEIGHT);
  $ctx.fillStyle = '#211f30';
  $ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Game World
  gameMap.draw($ctx, worldBox, DRAWBOX);
  if (DRAWBOX) {
    worldLeftBox.draw($ctx);
    worldRightBox.draw($ctx);
  }

  //
  //
  //

  player.draw($ctx, DRAWBOX);
  ui.draw(DRAWBOX);
};

const loop = () => {
  requestAnimationFrame(loop);
  update();
  draw();
};

loop();
