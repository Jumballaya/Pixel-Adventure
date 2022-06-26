import { CanvasElement } from '../../engine/ui/CanvasElement';
import { CanvasUIBuilder } from '../../engine/ui/CanvasUIBuilder';
import frame from '../../assets/menu-gui-paper.png';
import { TileMap } from '../../engine/TileMap';

export const vendorDialog = new CanvasUIBuilder().parseFromString(`
  <div id="vendor-dialog" family="'Press Start 2P', sans-serif">
    <img width="174" height="32" backgroundColor="#ead4aa">
    <p size="10">Press 'e' to open</p>
    <p size="10" position="[0, 16]">the shop!</p>
  </div>`) as CanvasElement;

vendorDialog.borderImage = new TileMap(frame, [3, 3], 0.25);
vendorDialog.width = 174;
vendorDialog.height = 38;
