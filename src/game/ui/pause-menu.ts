import { TileMap } from '../../engine/TileMap';
import { CanvasElement } from '../../engine/ui/CanvasElement';
import { CanvasUIBuilder } from '../../engine/ui/CanvasUIBuilder';
import frame from '../../assets/menu-gui-wood.png';

export const pauseMenu = new CanvasUIBuilder().parseFromString(`
  <div visible=false width="250" height="216" position="[387, 259]" id="pause-menu" family="'Press Start 2P', sans-serif">
    <p position="[72, 40]">Paused</p>
    <p position="[29, 104]">Press Escape</p>
    <p position="[53, 136]">to resume</p>
  </div>
`) as CanvasElement;

pauseMenu.borderImage = new TileMap(frame, [3, 3], 0.75);
pauseMenu.backgroundColor = '#ead4aa';
