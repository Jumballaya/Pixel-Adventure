import { CanvasUIBuilder } from '../../engine/ui/CanvasUIBuilder';

const builder = new CanvasUIBuilder();
export const playerDataUi = (width: number, height: number) =>
  builder.parseFromString(`
  <div pos="[${width}, ${height}]">
    <img src="#ff0000" width="200" height="32" />
    <img id="health-bar" src="#00ff00" width="100" height="32" />
  </div>
`);
