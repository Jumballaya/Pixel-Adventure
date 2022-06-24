import { CanvasUI } from '../../engine/ui/CanvasUI';
import { playerDataUi } from './player-data';
import { scoreUi } from './score';

export const createUi = (
  $canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  const ui = new CanvasUI($canvas);
  if (scoreUi) {
    ui.document.body.appendChild(scoreUi);
  }
  const playerUi = playerDataUi(width, height);
  if (playerUi) {
    ui.document.body.appendChild(playerUi);
  }
  return ui;
};
