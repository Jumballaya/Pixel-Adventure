import { Player } from './engine/entities/Player';
import { HitBox } from './engine/HitBox';
import { GravitySystem } from './engine/systems/GravitySystem';
import { CanvasUI } from './engine/ui/CanvasUI';
import { GameMap } from './game/GameMap';

const DRAWBOX = false;

// SET UP CANVAS
const WIDTH = 1024;
const HEIGHT = 768;
const $canvas = document.getElementById('canvas') as HTMLCanvasElement;
const $ctx = $canvas.getContext('2d') as CanvasRenderingContext2D;
$canvas.setAttribute('width', `${WIDTH}px`);
$canvas.setAttribute('height', `${HEIGHT}px`);

// Game Map
const worldBox = new HitBox(WIDTH - 8, HEIGHT - 8, new DOMPoint(4, 4), [4, 4]);
const gameMap = GameMap(WIDTH, HEIGHT);

// Handle UI
const ui = new CanvasUI($canvas);

// Player
const player = new Player();
player.setupEvents(ui.events);

// World
const ground = new HitBox(2000, 2, new DOMPoint(0, 768 - 32));
const floating = new HitBox(132, 2, new DOMPoint(132, 768 - 128));
const floating2 = new HitBox(376, 2, new DOMPoint(260, HEIGHT - 7 * 32));
const platforms: HitBox[] = [ground, floating, floating2];

// Systems
const gravSystem = new GravitySystem(0.25);

// Game State Update
const update = () => {
  gravSystem.update([player]);

  // Ground Collision
  for (const ground of platforms) {
    if (player.hitbox.collided(ground)) {
      if (player.velocity.y < 0) {
        const pos = player.position;
        player.setPosition(new DOMPoint(pos.x, ground.getPosition().y - 33));
        player.velocity.y = 0;
        player.jumpCount = 0;
      }
    }
  }

  player.update(worldBox);
};

// Main Loop
const draw = () => {
  $ctx.clearRect(0, 0, WIDTH, HEIGHT);
  $ctx.fillStyle = '#211f30';
  $ctx.fillRect(0, 0, WIDTH, HEIGHT);
  gameMap.draw($ctx, worldBox, DRAWBOX);

  player.draw($ctx, DRAWBOX);

  if (DRAWBOX) {
    for (const ground of platforms) {
      ground.draw($ctx);
    }
  }

  ui.draw(DRAWBOX);
};

const loop = () => {
  requestAnimationFrame(loop);
  update();
  draw();
};

loop();
