import { CanvasUIBuilder } from '../../engine/ui/CanvasUIBuilder';

const builder = new CanvasUIBuilder();
export const playerDataUi = (width: number, height: number) =>
  builder.parseFromString(`
  <div position="[${width - 224}, 28]" family="'Press Start 2P', sans-serif">
    <div>
      <p position="[109, 16]" size="9" color="#ffffff">Health</p>
      <img position="[0, 16]" backgroundColor="#f7ec8a" width="104" height="14" />
      <img position="[2, 18]" id="health-bar" backgroundColor="#d13548" width="100" height="10" />
    </div>
    <div position="[0, 24]">
      <p position="[109, 16]" size="9" color="#ffffff">Stamina</p>
      <img position="[0, 16]" backgroundColor="#f7ec8a" width="104" height="14" />
      <img position="[2, 18]" id="stamina-bar" backgroundColor="#813d3f" width="100" height="10" />
    </div>
  </div>
`);
