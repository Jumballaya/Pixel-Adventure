export interface TiledJSonLayer {
  data?: Array<number>;
  objects?: Array<{
    class: string;
    height: number;
    id: number;
    name: string;
    rotation: number;
    visible: boolean;
    width: number;
    x: number;
    y: number;
  }>;
  drawOrder?: number;
  height: number;
  id: number;
  name: string;
  opacity: number;
  type: string;
  class: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
}
