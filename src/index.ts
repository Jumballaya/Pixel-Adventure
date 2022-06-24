import { GameWorld } from './game/GameWorld';

const gameWorld = new GameWorld(
  document.getElementById('canvas') as HTMLCanvasElement,
  1024,
  768
);

// Game State Update
const update = () => {
  gameWorld.update();
};

// Main Loop
const draw = () => {
  gameWorld.draw();
};

const loop = () => {
  requestAnimationFrame(loop);
  update();
  draw();
};

loop();
